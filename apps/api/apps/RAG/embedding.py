import os
from google import genai
from config.confi import settings

def embed_chunks(chunks: list[dict]) -> list[dict]:
    """Takes chunk dicts, returns them with an added 384d 'vector' field from Gemini API."""
    api_key = settings.GEMINI_API_KEY or os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY or GOOGLE_API_KEY is missing in environment settings.")

    client = genai.Client(api_key=api_key.strip())

    for chunk in chunks:
        response = client.models.embed_content(
            model="models/gemini-embedding-001",
            contents=chunk["text"],
            config={"output_dimensionality": 384},
        )
        chunk["vector"] = response.embeddings[0].values

    return chunks

