import os
import time
import re
from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()

_MAX_RETRIES = 5
_BASE_DELAY = 1.5  # seconds


class LLMService:

    def __init__(self):
        self.llm = ChatGroq(
            groq_api_key=os.getenv("GROQ_API_KEY"),
            model_name=os.getenv("MODEL_NAME"),
            temperature=0.3
        )

    def invoke(self, prompt: str) -> str:
        last_exc: Exception | None = None
        for attempt in range(_MAX_RETRIES):
            try:
                response = self.llm.invoke(prompt)
                return response.content
            except Exception as exc:
                msg = str(exc)
                # Retry on Groq / OpenAI rate-limit errors (HTTP 429)
                if "429" in msg or "rate_limit" in msg.lower():
                    # Honour the retry-after value if the API embeds it
                    match = re.search(r"try again in (\d+(?:\.\d+)?)(ms|s)", msg, re.I)
                    if match:
                        wait = float(match.group(1))
                        if match.group(2).lower() == "ms":
                            wait /= 1000
                    else:
                        wait = _BASE_DELAY * (2 ** attempt)
                    print(f"[LLMService] Rate limited — waiting {wait:.1f}s before retry {attempt + 1}/{_MAX_RETRIES}")
                    time.sleep(wait)
                    last_exc = exc
                else:
                    raise
        raise RuntimeError(
            f"LLM call failed after {_MAX_RETRIES} retries due to rate limiting."
        ) from last_exc