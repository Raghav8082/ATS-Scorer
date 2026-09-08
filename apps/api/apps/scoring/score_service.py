from apps.RAG.pinecone import get_pinecone_index


def compute_match_score(user_id: str, job_chunks: list[dict]) -> dict:
    all_scores = []  # every (resume_chunk, job_chunk, score) triple
    index = get_pinecone_index()

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
                "resume_text": match["metadata"]["text"],   # ← added: needed for cover letter generation
                "job_section": job_chunk["section"],
                "score": match["score"],
            })

    # Take the best score per resume section (avoids double-counting one
    # strong resume chunk matching multiple job chunks)
    best_per_resume_section = {}
    for entry in all_scores:
        section = entry["resume_section"]
        if section not in best_per_resume_section or entry["score"] > best_per_resume_section[section]["score"]:
            best_per_resume_section[section] = entry

    all_sections = sorted(
    best_per_resume_section.values(),
    key=lambda x: x["score"],
    reverse=True
     )

    top_scores = all_sections[:3]

    embedding_score = (
    sum(e["score"] for e in top_scores) / len(top_scores)
    if top_scores else 0.0
     )

    return {
        "embedding_score": embedding_score,
        "top_matches": all_sections,
    }