from __future__ import annotations

from datetime import datetime
from typing import List
from pydantic import BaseModel, Field


class SkillEstimate(BaseModel):
    id: str
    label: str
    level: float = Field(ge=0, le=100)
    trend: str


class MasteryPoint(BaseModel):
    date: str
    value: float


class ProgressSnapshot(BaseModel):
    mastery: float
    streak: int
    next_review_at: str
    lesson_completion_rate: float
    skills: List[SkillEstimate]
    mastery_trend: List[MasteryPoint]


class UpdateRequest(BaseModel):
    lesson_id: str
    delta: float | None = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
