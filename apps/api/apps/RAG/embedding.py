from sentence_transformers import SentenceTransformer
import torch

_model = None

def get_embedding_model() -> SentenceTransformer:
    global _model
    if _model is None:
        device = "cuda" if torch.cuda.is_available() else "cpu"
        _model = SentenceTransformer("BAAI/bge-small-en-v1.5", device=device)
    return _model




def embed_chunks(chunks: list[dict]) -> list[dict]:
    """Takes chunk dicts, returns them with an added 'vector' field."""
    model = get_embedding_model()
    texts = [chunk["text"] for chunk in chunks]
    vectors = model.encode(texts, batch_size=8)  # batched, not looped

    for chunk, vector in zip(chunks, vectors):
        chunk["vector"] = vector.tolist()  # numpy array → plain list for storage/JSON

    return chunks