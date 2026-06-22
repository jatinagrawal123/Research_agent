# graph/nodes.py

from agents.planner_agent import (
    PlannerAgent
)

from agents.worker_agent import (
    WorkerAgent
)

from agents.evaluator_agent import (
    EvaluatorAgent
)

from agents.writer_agent import (
    WriterAgent
)


planner = PlannerAgent()

worker = WorkerAgent()

evaluator = EvaluatorAgent()

writer = WriterAgent()


async def planner_node(state):

    plan = planner.create_research_plan(
        state["query"]
    )

    state["plan"] = plan

    return state


async def research_node(state):

    findings = []

    for task in state["plan"]:

        result = await (
            worker.research_subtopic(
                task
            )
        )

        findings.append(result)

    state["findings"] = findings

    return state


async def evaluation_node(state):

    research_text = str(
        state["findings"]
    )

    score = evaluator.evaluate(
        research_text
    )

    state["evaluation_score"] = score

    return state


async def writer_node(state):

    report = (
        writer.generate_report(
            state["query"],
            str(
                state["findings"]
            )
        )
    )

    state["final_report"] = report

    return state