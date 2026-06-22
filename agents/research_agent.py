# agents/research_agent.py

from services.llm_service import LLMService

from tools.web_search import WebSearchTool
from tools.web_scraper import WebScraperTool
from tools.text_chunker import TextChunker

from prompts.prompts import (
    CHUNK_SUMMARY_PROMPT,
    FINAL_REPORT_PROMPT
)


class ResearchAgent:

    def __init__(self):

        self.llm = LLMService()

        self.search_tool = WebSearchTool()
        self.scraper_tool = WebScraperTool()
        self.chunker = TextChunker()

        self.state = {
            "query": "",
            "search_results": [],
            "scraped_content": [],
            "chunk_summaries": [],
            "final_report": ""
        }

    def research(self, query: str):

        self.state["query"] = query

        print("\n[1] Searching Web...\n")

        # STEP 1 — SEARCH
        search_results = self.search_tool.search(query)

        self.state["search_results"] = search_results

        all_summaries = []

        # STEP 2 — SCRAPE EACH URL
        for index, result in enumerate(search_results):

            print(f"\n[2] Scraping URL {index + 1}")

            url = result["url"]

            scraped_text = self.scraper_tool.scrape(url)

            if not scraped_text:
                continue

            self.state["scraped_content"].append(scraped_text)

            print(f"[3] Chunking Content {index + 1}")

            chunks = self.chunker.chunk_text(scraped_text)

            # STEP 3 — SUMMARIZE CHUNKS
            chunk_summaries = []

            for chunk_index, chunk in enumerate(chunks):

                print(
                    f"[4] Summarizing Chunk "
                    f"{chunk_index + 1}"
                )

                prompt = CHUNK_SUMMARY_PROMPT.format(
                    content=chunk
                )

                summary = self.llm.invoke(prompt)

                chunk_summaries.append(summary)

            combined_summary = "\n".join(
                chunk_summaries
            )

            all_summaries.append({
                "title": result["title"],
                "summary": combined_summary,
                "url": url
            })

        self.state["chunk_summaries"] = all_summaries

        # STEP 4 — FINAL REPORT
        print("\n[5] Generating Final Report...\n")

        combined_text = ""

        for item in all_summaries:

            combined_text += f"""
            TITLE:
            {item['title']}

            SUMMARY:
            {item['summary']}

            SOURCE:
            {item['url']}

            -------------------------
            """

        final_prompt = FINAL_REPORT_PROMPT.format(
            query=query,
            content=combined_text
        )

        final_report = self.llm.invoke(
            final_prompt
        )

        self.state["final_report"] = final_report

        return final_report