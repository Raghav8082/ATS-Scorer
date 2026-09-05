# app/rag/chunking.py
import tiktoken
import re
from langchain_text_splitters import ExperimentalMarkdownSyntaxTextSplitter

encoding = tiktoken.get_encoding("cl100k_base")  # matches OpenAI embedding models

def count_tokens(text: str) -> int:
    return len(encoding.encode(text))


def chunk_by_tokens(text: str, chunk_size: int = 150, overlap: int = 0) -> list[str]:
    """Generic fixed-size token chunker — the reusable low-level primitive."""
    tokens = encoding.encode(text)
    chunks = []
    start = 0
    while start < len(tokens):
        end = start + chunk_size
        chunk_tokens = tokens[start:end]
        chunks.append(encoding.decode(chunk_tokens))
        start += chunk_size - overlap   # overlap=0 just moves forward by chunk_size
    return chunks




def resume_text_to_markdown(resume_text: str) -> str:
    """Convert plain extracted PDF text into Markdown, promoting both
    top-level sections (## ) and individual projects (### ) to headers."""

    md_text = resume_text

    # Step 1: top-level sections → ## headers
    section_titles = [
        "Professional Summary", "Education", "Technical Skills",
        "Experience", "Projects", "Certifications"
    ]
    for title in section_titles:
        md_text = re.sub(rf"(?m)^{re.escape(title)}$", f"## {title}", md_text)

    # Step 2: project title lines → ### headers
    # Matches lines like: "VaultGate | Distributed API Key & Secrets Management Gateway (Go)  July – August 2026"
    # Pattern: starts with a capitalized word/phrase, followed by " | ", ending in a date range
    project_line_pattern = re.compile(
    r"(?m)^([A-Z][A-Za-z0-9]+)\s*\|.*\b(19|20)\d{2}\s*$"
    )
    md_text = project_line_pattern.sub(lambda m: f"### {m.group(0)}", md_text)

    return md_text


def chunk_resume(resume_text: str) -> list[dict]:
    """Resume-specific: section-aware, falls back to chunk_by_tokens for oversized sections."""
    md_text = resume_text_to_markdown(resume_text)
    splitter = ExperimentalMarkdownSyntaxTextSplitter()
    splits = splitter.split_text(md_text)

    chunks = []
    if splits:
        for doc in splits:
            section_name = doc.metadata.get("Header 3") or doc.metadata.get("Header 2", "unknown")
            section_text = doc.page_content
            if count_tokens(section_text) > 200:
                # oversized section — fall back to the generic utility
                for i, piece in enumerate(chunk_by_tokens(section_text, chunk_size=150, overlap=20)):
                    chunks.append({"section": section_name, "part": i, "text": piece})
            else:
                chunks.append({"section": section_name, "part": 0, "text": section_text})
    else:
        for i, piece in enumerate(chunk_by_tokens(resume_text, chunk_size=150, overlap=20)):
            chunks.append({"section": "General", "part": i, "text": piece})

    return chunks


def prepare_job_description_for_embedding(text: str) -> str:
    return f"Represent this sentence for searching relevant passages: {text}"


def prepare_job_description(job_text: str) -> list[dict]:
    """Job descriptions: formats text for BGE query embedding and splits into chunks."""
    if count_tokens(job_text) < 500:
        return [{"text": prepare_job_description_for_embedding(job_text), "section": "full_posting"}]
    else:
        return [
            {"text": prepare_job_description_for_embedding(piece), "section": f"part_{i}"}
            for i, piece in enumerate(chunk_by_tokens(job_text, chunk_size=250, overlap=20))
        ]