from apps.RAG.keyword_scoring import keyword_overlap_score
from apps.RAG.pinecone import index

def compute_match_score(user_id: str, job_chunks: list[dict], resume_full_text: str, job_full_text: str) -> dict:
    all_scores = []

    for job_chunk in job_chunks:
        results = index.query(
            vector=job_chunk["vector"],
            namespace=user_id,
            top_k=9,
            include_metadata=True,
        )
        for match in results["matches"]:
            all_scores.append({
                "resume_section": match["metadata"]["section"],
                "job_section": job_chunk["section"],
                "score": match["score"],
            })

    best_per_resume_section = {}
    for entry in all_scores:
        section = entry["resume_section"]
        if section not in best_per_resume_section or entry["score"] > best_per_resume_section[section]["score"]:
            best_per_resume_section[section] = entry

    top_scores = sorted(best_per_resume_section.values(), key=lambda x: x["score"], reverse=True)[:3]
    embedding_score = sum(e["score"] for e in top_scores) / len(top_scores) if top_scores else 0.0

    keyword_score = keyword_overlap_score(resume_full_text, job_full_text)

    final_score = (0.6 * embedding_score) + (0.4 * keyword_score)

    return {
        "overall_score": final_score,
        "embedding_score": embedding_score,
        "keyword_score": keyword_score,
        "top_matches": top_scores,
    }