# tools/web_scraper.py

import requests
from bs4 import BeautifulSoup


class WebScraperTool:

    def scrape(self, url: str):

        try:

            headers = {
                "User-Agent": (
                    "Mozilla/5.0"
                )
            }

            response = requests.get(
                url,
                headers=headers,
                timeout=10
            )

            soup = BeautifulSoup(
                response.text,
                "lxml"
            )

            # Remove unwanted tags
            for tag in soup(["script", "style", "noscript"]):
                tag.extract()

            text = soup.get_text(separator=" ")

            # Clean text
            cleaned_text = " ".join(text.split())

            return cleaned_text[:15000]

        except Exception as e:

            print(f"Scraping error: {e}")

            return ""