# agents/evaluator_agent.py

import re

from services.llm_service import LLMService

from prompts.prompts import (
    EVALUATION_PROMPT
)
c

class EvaluatorAgent:

    def __init__(self):

        self.llm = LLMService()

    def evaluate(
        self,
        research_text: str
    ):

        prompt = EVALUATION_PROMPT.format(
            research=research_text
        )

        response = self.llm.invoke(
            prompt
        )

        score = 5

        match = re.search(
            r"Score:\s*(\d+)",
            response
        )

        if match:
            score = float(
                match.group(1)
            )

        return score