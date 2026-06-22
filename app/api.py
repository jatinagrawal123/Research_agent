from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app.bootstrap import ensure_project_root_on_path

ensure_project_root_on_path()

from Orchestrator.research_orchestrator import ResearchOrchestrator


class ResearchRequest(BaseModel):
    query: str = Field(..., min_length=3, max_length=500)


class SourceSummary(BaseModel):
    title: str | None
    summary: str
    url: str


class WorkerResult(BaseModel):
    subtopic: str
    research: List[SourceSummary]


class ResearchResponse(BaseModel):
    query: str
    research_tasks: List[str]
    worker_results: List[WorkerResult]
    final_report: str
 

app = FastAPI(
    title="Deep Research Agent API",
    version="1.0.0",
    description="API for generating structured AI research reports."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/research", response_model=ResearchResponse)
async def run_research(request: ResearchRequest) -> ResearchResponse:
    try:
        orchestrator = ResearchOrchestrator(verbose=False)
        result = await orchestrator.run_research_details(request.query)
        return ResearchResponse(**result)
    except RuntimeError as exc:
        # Friendly message for rate-limit exhaustion after all retries
        if "rate limiting" in str(exc).lower():
            raise HTTPException(
                status_code=429,
                detail="The AI service is busy right now. Please wait a minute and try again."
            ) from exc
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Something went wrong while generating the report. Please try again."
        ) from exc
