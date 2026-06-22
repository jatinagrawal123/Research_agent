# graph/workflow.py

from langgraph.graph import (
    StateGraph,
    END
)

from graph.state import (
    ResearchState
)

from graph.nodes import (
    planner_node,
    research_node,
    evaluation_node,
    writer_node
)


def route_after_evaluation(
    state
):

    score = state[
        "evaluation_score"
    ]

    if score >= 7:

        return "writer"

    return "research"


def build_graph():

    workflow = StateGraph(
        ResearchState
    )

    workflow.add_node(
        "planner",
        planner_node
    )

    workflow.add_node(
        "research",
        research_node
    )

    workflow.add_node(
        "evaluation",
        evaluation_node
    )

    workflow.add_node(
        "writer",
        writer_node
    )

    workflow.set_entry_point(
        "planner"
    )

    workflow.add_edge(
        "planner",
        "research"
    )

    workflow.add_edge(
        "research",
        "evaluation"
    )

    workflow.add_conditional_edges(
        "evaluation",
        route_after_evaluation,
        {
            "research": "research",
            "writer": "writer"
        }
    )

    workflow.add_edge(
        "writer",
        END
    )

    return workflow.compile()