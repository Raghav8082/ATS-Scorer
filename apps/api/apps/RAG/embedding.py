import os
import google.generativeai as genai
from config.confi import settings

def embed_chunks(chunks: list[dict]) -> list[dict]:
    """Takes chunk dicts, returns them with an added 384d 'vector' field from Gemini API."""
    api_key = settings.GEMINI_API_KEY or os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if api_key:
        genai.configure(api_key=api_key.strip())

    for chunk in chunks:
        res = genai.embed_content(
            model="models/gemini-embedding-001",
            content=chunk["text"],
            output_dimensionality=384
        )
        chunk["vector"] = res["embedding"]

    return chunks
