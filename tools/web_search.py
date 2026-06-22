import os
import requests

from dotenv import load_dotenv

load_dotenv()


class WebSearchTool:

    def __init__(self):

        self.api_key = os.getenv("SERPER_API_KEY")

        self.url = "https://google.serper.dev/search"

        self.headers = {
            "X-API-KEY": self.api_key,
            "Content-Type": "application/json"
        }

    def search(self, query: str, max_results: int = 1):

        payload = {
            "q": query
        }

        response = requests.post(
            self.url,
            headers=self.headers,
            json=payload
        )

        data = response.json()

        organic_results = data.get("organic", [])

        results = []

        for item in organic_results[:max_results]:

            results.append({
                "title": item.get("title"),
                "content": item.get("snippet"),
                "url": item.get("link")
            })

        return results