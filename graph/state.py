# graph/state.py

from typing import TypedDict
from typing import List


class ResearchState(TypedDict):

    query: str

    plan: List[str]

    findings: List[dict]

    evaluation_score: float

    final_report: str