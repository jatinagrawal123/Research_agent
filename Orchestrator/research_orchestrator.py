# orchestrator/research_orchestrator.py

import asyncio

from services.llm_service import (
    LLMService
)

from agents.planner_agent import (
    PlannerAgent
)

from agents.worker_agent import (
    WorkerAgent
)

from prompts.prompts import (
    FINAL_REPORT_PROMPT
)

from utils.async_runner import (
    gather_tasks
)


class ResearchOrchestrator:

    def __init__(
        self,
        verbose: bool = True
    ):

        self.verbose = verbose

        self.planner = PlannerAgent()

        self.worker = WorkerAgent()

        self.llm = LLMService()

        self.state = {
            "query": "",
            "research_tasks": [],
            "worker_results": [],
            "final_report": ""
        }

    async def run_research(
        self,
        query: str
    ):

        if self.verbose:
            print(
                "\n========== ORCHESTRATION STARTED ==========\n"
            )

        self.state["query"] = query

        tasks = (
            self.planner.create_research_plan(
                query
            )
        )

        self.state["research_tasks"] = (
            tasks
        )

        if self.verbose:
            print(
                f"\nCreated {len(tasks)} tasks\n"
            )

        # Parallel Worker Execution

        worker_tasks = [

            self.worker.research_subtopic(
                task
            )

            for task in tasks
        ]

        all_results = await gather_tasks(
            worker_tasks
        )

        self.state["worker_results"] = (
            all_results
        )

        combined_research = ""

        for result in all_results:

            combined_research += f"""

SUBTOPIC:
{result['subtopic']}

RESEARCH:
{result['research']}

--------------------------------
"""

        if self.verbose:
            print(
                "\nGenerating Final Report...\n"
            )

        final_prompt = (
            FINAL_REPORT_PROMPT.format(
                query=query,
                content=combined_research
            )
        )

        final_report = await asyncio.to_thread(
            self.llm.invoke,
            final_prompt
        )

        self.state["final_report"] = (
            final_report
        )

        return final_report

    async def run_research_details(
        self,
        query: str
    ):

        await self.run_research(query)

        return {
            "query": self.state["query"],
            "research_tasks": self.state["research_tasks"],
            "worker_results": self.state["worker_results"],
            "final_report": self.state["final_report"]
        }