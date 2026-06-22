# agents/writer_agent.py

from services.llm_service import (
    LLMService
)

from prompts.prompts import (
    FINAL_REPORT_PROMPT
)


class WriterAgent:

    def __init__(self):

        self.llm = LLMService()

    def generate_report(
        self,
        query,
        research
    ):

        prompt = FINAL_REPORT_PROMPT.format(
            query=query,
            content=research
        )

        return self.llm.invoke(
            prompt
        )