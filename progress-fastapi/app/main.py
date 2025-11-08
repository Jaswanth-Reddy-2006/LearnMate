from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import ProgressSnapshot, MasteryPoint, UpdateRequest
from .store import store

app = FastAPI(title="LearnMate Progress Analyst", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/progress/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/progress/snapshot", response_model=ProgressSnapshot)
def read_snapshot() -> ProgressSnapshot:
    return store.snapshot()


@app.get("/progress/timeline", response_model=list[MasteryPoint])
def read_timeline() -> list[MasteryPoint]:
    return store.timeline()


@app.post("/progress/update", response_model=ProgressSnapshot)
def update_progress(payload: UpdateRequest) -> ProgressSnapshot:
    delta = payload.delta if payload.delta is not None else 3.0
    return store.update(lesson_id=payload.lesson_id, delta=delta)
