# tools/text_chunker.py


class TextChunker:

    def chunk_text(
        self,
        text: str,
        chunk_size: int = 3000
    ):

        chunks = []

        start = 0

        while start < len(text):

            end = start + chunk_size

            chunk = text[start:end]

            chunks.append(chunk)

            start = end

        return chunks