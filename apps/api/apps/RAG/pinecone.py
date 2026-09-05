from pinecone import Pinecone
from config.confi import settings

pc = Pinecone(api_key=settings.PINECONE_API)
index = pc.Index("ats")




def upsert_resume_chunks(user_id: str, resume_chunks: list[dict]):
    vectors_to_upsert = [
        (f"{user_id}-{i}", chunk["vector"], {"text": chunk["text"], "section": chunk["section"]})
        for i, chunk in enumerate(resume_chunks)
    ]
    index.upsert(vectors=vectors_to_upsert, namespace=user_id)
    print(index.describe_index_stats())
