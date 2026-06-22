# agents/worker_agent.py

import asyncio

from services.llm_service import LLMService

from tools.web_search import WebSearchTool
from tools.web_scraper import WebScraperTool
from tools.text_chunker import TextChunker

from prompts.prompts import (
    CHUNK_SUMMARY_PROMPT
)


class WorkerAgent:

    def __init__(self):

        self.llm = LLMService()

        self.search_tool = WebSearchTool()
        self.scraper_tool = WebScraperTool()
        self.chunker = TextChunker()

    async def research_subtopic(
        self,
        subtopic: str
    ):

        print(
            f"\n[Worker Started] {subtopic}"
        )

        search_results = (
            self.search_tool.search(
                subtopic
            )
        )

        all_summaries = []

        for result in search_results:

            url = result["url"]

            scraped_text = await asyncio.to_thread(
                self.scraper_tool.scrape,
                url
            )

            if not scraped_text:
                continue

            chunks = (
                self.chunker.chunk_text(
                    scraped_text
                )
            )

            chunk_summaries = []

            for chunk in chunks:

                prompt = (
                    CHUNK_SUMMARY_PROMPT.format(
                        content=chunk
                    )
                )

                summary = await asyncio.to_thread(
                    self.llm.invoke,
                    prompt
                )

                chunk_summaries.append(
                    summary
                )

            combined_summary = "\n".join(
                chunk_summaries
            )

            all_summaries.append({
                "title": result["title"],
                "summary": combined_summary,
                "url": url
            })

        print(
            f"[Worker Completed] {subtopic}"
        )

        return {
            "subtopic": subtopic,
            "research": all_summaries
        }