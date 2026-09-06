from pinecone import Pinecone
from config.confi import settings
import os

_index = None

def get_pinecone_index():
    global _index
    if _index is None:
        api_key = settings.PINECONE_API or os.getenv("PINECONE_API")
        if not api_key:
            raise ValueError("PINECONE_API key is missing in environment settings.")
        pc = Pinecone(api_key=api_key)
        _index = pc.Index("ats")
    return _index

def upsert_resume_chunks(user_id: str, resume_chunks: list[dict]):
    index = get_pinecone_index()
    vectors_to_upsert = [
        (f"{user_id}-{i}", chunk["vector"], {"text": chunk["text"], "section": chunk["section"]})
        for i, chunk in enumerate(resume_chunks)
    ]
    index.upsert(vectors=vectors_to_upsert, namespace=user_id)
    print(index.describe_index_stats())

