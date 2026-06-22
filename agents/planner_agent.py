# agents/planner_agent.py

from services.llm_service import LLMService

from prompts.prompts import (
    PLANNER_PROMPT
)


class PlannerAgent:

    def __init__(self, verbose: bool = True):

        self.llm = LLMService()
        self.verbose = verbose

    def create_research_plan(
        self,
        query: str
    ):

        if self.verbose:
            print("\n[Planner] Creating research plan...\n")

        prompt = PLANNER_PROMPT.format(
            query=query
        )

        response = self.llm.invoke(prompt)

        lines = response.split("\n")

        tasks = []

        for line in lines:

            cleaned = line.strip()

            if cleaned:

                tasks.append(cleaned)

        return tasks