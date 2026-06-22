# app/main.py

import asyncio

from graph.workflow import (
    build_graph
)


async def main():

    query = input(
        "Research Topic: "
    )

    graph = build_graph()

    result = await graph.ainvoke(
        {
            "query": query,
            "plan": [],
            "findings": [],
            "evaluation_score": 0,
            "final_report": ""
        }
    )

    print(
        "\n===== FINAL REPORT =====\n"
    )

    print(
        result["final_report"]
    )


if __name__ == "__main__":

    asyncio.run(main())