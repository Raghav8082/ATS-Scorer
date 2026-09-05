# app/rag/keyword_scoring.py
import re

# A fixed technical vocabulary — extend this over time as you notice gaps
TECH_KEYWORDS = {
    "python", "fastapi", "postgresql", "postgres", "redis", "mongodb",
    "sqlalchemy", "node.js", "nestjs", "react", "next.js", "express",
    "go", "golang", "gin", "gorm", "docker", "aws", "jwt", "oauth",
    "rbac", "encryption", "aes", "microservices", "distributed systems",
    "async", "asynchronous", "bullmq", "celery", "websockets", "rest api",
    "graphql", "ci/cd", "kubernetes", "vector database", "pinecone",
    "embeddings", "llm", "rag", "machine learning", "prisma", "typescript",
}


def extract_keywords(text: str) -> set[str]:
    text_lower = text.lower()
    found = set()
    for keyword in TECH_KEYWORDS:
        if keyword in text_lower:
            found.add(keyword)
    return found


def keyword_overlap_score(resume_text: str, job_text: str) -> float:
    resume_keywords = extract_keywords(resume_text)
    job_keywords = extract_keywords(job_text)

    if not job_keywords:
        return 0.0

    overlap = resume_keywords & job_keywords
    return len(overlap) / len(job_keywords)