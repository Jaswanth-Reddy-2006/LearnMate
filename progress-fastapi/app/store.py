from __future__ import annotations

import json
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List
from .models import ProgressSnapshot, SkillEstimate, MasteryPoint

DATA_PATH = Path(__file__).parent / "data" / "state.json"

DEFAULT_STATE: Dict[str, object] = {
    "mastery": 62.0,
    "streak": 4,
    "next_review_at": (datetime.utcnow() + timedelta(hours=12)).isoformat(),
    "lesson_completion_rate": 78.0,
    "skills": [
        {"id": "loops", "label": "Loops", "level": 68.0, "trend": "up"},
        {"id": "recursion", "label": "Recursion", "level": 54.0, "trend": "steady"},
        {"id": "structures", "label": "Data Structures", "level": 49.0, "trend": "up"},
    ],
    "mastery_trend": [
        {"date": (datetime.utcnow() - timedelta(days=idx)).strftime("%Y-%m-%d"), "value": max(40, 52 + idx)}
        for idx in reversed(range(7))
    ],
}


class ProgressStore:
    def __init__(self) -> None:
        self._state = self._load()

    def _load(self) -> Dict[str, object]:
        if DATA_PATH.exists():
            with DATA_PATH.open("r", encoding="utf-8") as handle:
                return json.load(handle)
        DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
        with DATA_PATH.open("w", encoding="utf-8") as handle:
            json.dump(DEFAULT_STATE, handle, indent=2)
        return DEFAULT_STATE

    def _save(self) -> None:
        DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
        with DATA_PATH.open("w", encoding="utf-8") as handle:
            json.dump(self._state, handle, indent=2)

    def snapshot(self) -> ProgressSnapshot:
        return ProgressSnapshot(**self._state)

    def timeline(self) -> List[MasteryPoint]:
        return [MasteryPoint(**point) for point in self._state["mastery_trend"]]  # type: ignore[index]

    def update(self, lesson_id: str, delta: float | None = None) -> ProgressSnapshot:
        delta = delta if delta is not None else 3.0
        mastery = float(self._state.get("mastery", 60))
        mastery = max(0.0, min(100.0, mastery + delta))
        self._state["mastery"] = mastery
        streak = int(self._state.get("streak", 0)) + 1
        self._state["streak"] = streak
        lessons = float(self._state.get("lesson_completion_rate", 75))
        self._state["lesson_completion_rate"] = min(100.0, lessons + delta / 2)
        self._state["next_review_at"] = (datetime.utcnow() + timedelta(hours=8)).isoformat()

        skills: List[Dict[str, object]] = list(self._state.get("skills", []))  # type: ignore[assignment]
        target = next((skill for skill in skills if skill["id"] == lesson_id), None)
        if target:
            target["level"] = max(0.0, min(100.0, float(target["level"]) + delta))
            target["trend"] = "up" if delta >= 0 else "down"
        else:
            skills.append({"id": lesson_id, "label": lesson_id.replace('-', ' ').title(), "level": mastery, "trend": "up"})
        self._state["skills"] = skills

        trend: List[Dict[str, object]] = list(self._state.get("mastery_trend", []))  # type: ignore[assignment]
        trend.append({"date": datetime.utcnow().strftime("%Y-%m-%d"), "value": mastery})
        self._state["mastery_trend"] = trend[-14:]

        self._save()
        return ProgressSnapshot(**self._state)


store = ProgressStore()
