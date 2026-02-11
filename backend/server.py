from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ==================== MODELS ====================

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# User Model
class UserCreate(BaseModel):
    username: str
    display_name: Optional[str] = None

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    display_name: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Lesson Progress Model
class LessonProgress(BaseModel):
    model_config = ConfigDict(extra="ignore")
    lesson_id: int
    course_id: str
    status: str = "locked"  # locked, current, done
    completed_at: Optional[datetime] = None

class LessonProgressUpdate(BaseModel):
    lesson_id: int
    course_id: str
    status: str

# Daily Task Model
class DailyTask(BaseModel):
    model_config = ConfigDict(extra="ignore")
    task_type: str  # check_in, track_spending, set_commitment
    completed: bool = False
    value: Optional[str] = None
    progress: Optional[int] = None
    total: Optional[int] = None
    date: str  # YYYY-MM-DD format

class DailyTaskUpdate(BaseModel):
    task_type: str
    completed: Optional[bool] = None
    value: Optional[str] = None
    progress: Optional[int] = None

# Mood Check-in Model
class MoodCheckIn(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    mood: str
    note: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class MoodCheckInCreate(BaseModel):
    mood: str
    note: Optional[str] = None

# Spending Entry Model
class SpendingEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    amount: float
    category: str
    description: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SpendingEntryCreate(BaseModel):
    amount: float
    category: str
    description: Optional[str] = None

# User Progress Response Model
class UserProgress(BaseModel):
    model_config = ConfigDict(extra="ignore")
    user_id: str
    fynnies: int = 0
    current_streak: int = 0
    longest_streak: int = 0
    total_lessons_completed: int = 0
    week_data: List[Dict[str, Any]] = []
    lesson_progress: List[Dict[str, Any]] = []
    daily_tasks: Dict[str, Any] = {}

# Week Day Status
class WeekDayStatus(BaseModel):
    model_config = ConfigDict(extra="ignore")
    user_id: str
    date: str  # YYYY-MM-DD
    status: str = "upcoming"  # upcoming, current, partial, complete
    type: str = "none"  # none, half, fynny, streak


# ==================== HELPER FUNCTIONS ====================

def get_today_str() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")

def get_week_dates() -> List[str]:
    """Get dates for current week (Monday to Sunday)"""
    today = datetime.now(timezone.utc)
    monday = today - timedelta(days=today.weekday())
    return [(monday + timedelta(days=i)).strftime("%Y-%m-%d") for i in range(7)]


# ==================== STATUS ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "Fynny API is running"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# ==================== USER ROUTES ====================

@api_router.post("/users", response_model=User)
async def create_user(input: UserCreate):
    """Create a new user or return existing user"""
    existing = await db.users.find_one({"username": input.username}, {"_id": 0})
    if existing:
        return User(**existing)
    
    user = User(
        username=input.username,
        display_name=input.display_name or input.username
    )
    doc = user.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.users.insert_one(doc)
    
    # Initialize user progress
    progress_doc = {
        "user_id": user.id,
        "fynnies": 0,
        "current_streak": 0,
        "longest_streak": 0,
        "total_lessons_completed": 0
    }
    await db.user_progress.insert_one(progress_doc)
    
    return user

@api_router.get("/users/{username}", response_model=User)
async def get_user(username: str):
    """Get user by username"""
    user = await db.users.find_one({"username": username}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**user)


# ==================== PROGRESS ROUTES ====================

@api_router.get("/progress/{user_id}", response_model=UserProgress)
async def get_user_progress(user_id: str):
    """Get complete user progress including lessons, tasks, and streaks"""
    # Get base progress
    progress = await db.user_progress.find_one({"user_id": user_id}, {"_id": 0})
    if not progress:
        progress = {
            "user_id": user_id,
            "fynnies": 0,
            "current_streak": 0,
            "longest_streak": 0,
            "total_lessons_completed": 0
        }
    
    # Get lesson progress
    lessons = await db.lesson_progress.find({"user_id": user_id}, {"_id": 0}).to_list(100)
    
    # Get week data
    week_dates = get_week_dates()
    week_data = []
    for i, date in enumerate(week_dates):
        day_status = await db.week_status.find_one({"user_id": user_id, "date": date}, {"_id": 0})
        if day_status:
            week_data.append({
                "day": ["M", "T", "W", "T", "F", "S", "S"][i],
                "date": date,
                "status": day_status.get("status", "upcoming"),
                "type": day_status.get("type", "none")
            })
        else:
            today = get_today_str()
            status = "current" if date == today else ("upcoming" if date > today else "upcoming")
            week_data.append({
                "day": ["M", "T", "W", "T", "F", "S", "S"][i],
                "date": date,
                "status": status,
                "type": "none"
            })
    
    # Get today's tasks
    today = get_today_str()
    daily_tasks = {}
    tasks = await db.daily_tasks.find({"user_id": user_id, "date": today}, {"_id": 0}).to_list(10)
    for task in tasks:
        daily_tasks[task["task_type"]] = {
            "completed": task.get("completed", False),
            "value": task.get("value"),
            "progress": task.get("progress"),
            "total": task.get("total")
        }
    
    return UserProgress(
        user_id=user_id,
        fynnies=progress.get("fynnies", 0),
        current_streak=progress.get("current_streak", 0),
        longest_streak=progress.get("longest_streak", 0),
        total_lessons_completed=progress.get("total_lessons_completed", 0),
        week_data=week_data,
        lesson_progress=lessons,
        daily_tasks=daily_tasks
    )


# ==================== LESSON PROGRESS ROUTES ====================

@api_router.post("/progress/{user_id}/lessons")
async def update_lesson_progress(user_id: str, input: LessonProgressUpdate):
    """Update lesson progress for a user"""
    today = get_today_str()
    
    # Update or insert lesson progress
    await db.lesson_progress.update_one(
        {"user_id": user_id, "lesson_id": input.lesson_id, "course_id": input.course_id},
        {"$set": {
            "user_id": user_id,
            "lesson_id": input.lesson_id,
            "course_id": input.course_id,
            "status": input.status,
            "completed_at": datetime.now(timezone.utc).isoformat() if input.status == "done" else None
        }},
        upsert=True
    )
    
    # If lesson completed, award fynnies and update streak
    if input.status == "done":
        await db.user_progress.update_one(
            {"user_id": user_id},
            {
                "$inc": {"fynnies": 1, "total_lessons_completed": 1},
                "$setOnInsert": {"current_streak": 0, "longest_streak": 0}
            },
            upsert=True
        )
        
        # Update week status
        await db.week_status.update_one(
            {"user_id": user_id, "date": today},
            {"$set": {"status": "complete", "type": "fynny"}},
            upsert=True
        )
    
    return {"success": True, "message": "Lesson progress updated"}

@api_router.get("/progress/{user_id}/lessons/{course_id}")
async def get_course_lessons(user_id: str, course_id: str):
    """Get lesson progress for a specific course"""
    lessons = await db.lesson_progress.find(
        {"user_id": user_id, "course_id": course_id},
        {"_id": 0}
    ).to_list(100)
    return {"lessons": lessons}


# ==================== DAILY TASKS ROUTES ====================

@api_router.post("/progress/{user_id}/tasks")
async def update_daily_task(user_id: str, input: DailyTaskUpdate):
    """Update a daily task"""
    today = get_today_str()
    
    update_fields = {"user_id": user_id, "task_type": input.task_type, "date": today}
    if input.completed is not None:
        update_fields["completed"] = input.completed
    if input.value is not None:
        update_fields["value"] = input.value
    if input.progress is not None:
        update_fields["progress"] = input.progress
    
    # Set total for spending task
    if input.task_type == "track_spending":
        update_fields["total"] = 3
    
    await db.daily_tasks.update_one(
        {"user_id": user_id, "task_type": input.task_type, "date": today},
        {"$set": update_fields},
        upsert=True
    )
    
    # If task completed, potentially award fynnies
    if input.completed:
        await db.user_progress.update_one(
            {"user_id": user_id},
            {"$inc": {"fynnies": 1}},
            upsert=True
        )
    
    return {"success": True, "message": "Task updated"}

@api_router.get("/progress/{user_id}/tasks")
async def get_daily_tasks(user_id: str):
    """Get today's tasks for a user"""
    today = get_today_str()
    tasks = await db.daily_tasks.find({"user_id": user_id, "date": today}, {"_id": 0}).to_list(10)
    
    # Format response
    result = {}
    for task in tasks:
        result[task["task_type"]] = {
            "completed": task.get("completed", False),
            "value": task.get("value"),
            "progress": task.get("progress"),
            "total": task.get("total")
        }
    
    return {"tasks": result}


# ==================== MOOD CHECK-IN ROUTES ====================

@api_router.post("/mood/{user_id}", response_model=MoodCheckIn)
async def create_mood_checkin(user_id: str, input: MoodCheckInCreate):
    """Log a mood check-in"""
    today = get_today_str()
    
    checkin = MoodCheckIn(user_id=user_id, mood=input.mood, note=input.note)
    doc = checkin.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.mood_checkins.insert_one(doc)
    
    # Update daily task
    await db.daily_tasks.update_one(
        {"user_id": user_id, "task_type": "check_in", "date": today},
        {"$set": {
            "user_id": user_id,
            "task_type": "check_in",
            "date": today,
            "completed": True,
            "value": input.mood
        }},
        upsert=True
    )
    
    # Award fynny for check-in
    await db.user_progress.update_one(
        {"user_id": user_id},
        {"$inc": {"fynnies": 1}},
        upsert=True
    )
    
    return checkin

@api_router.get("/mood/{user_id}")
async def get_mood_history(user_id: str, limit: int = 30):
    """Get mood check-in history"""
    checkins = await db.mood_checkins.find(
        {"user_id": user_id},
        {"_id": 0}
    ).sort("timestamp", -1).to_list(limit)
    return {"checkins": checkins}


# ==================== SPENDING ROUTES ====================

@api_router.post("/spending/{user_id}", response_model=SpendingEntry)
async def create_spending_entry(user_id: str, input: SpendingEntryCreate):
    """Log a spending entry"""
    today = get_today_str()
    
    entry = SpendingEntry(
        user_id=user_id,
        amount=input.amount,
        category=input.category,
        description=input.description
    )
    doc = entry.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.spending_entries.insert_one(doc)
    
    # Count today's entries
    today_start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    count = await db.spending_entries.count_documents({
        "user_id": user_id,
        "timestamp": {"$gte": today_start.isoformat()}
    })
    
    # Update daily task progress
    completed = count >= 3
    await db.daily_tasks.update_one(
        {"user_id": user_id, "task_type": "track_spending", "date": today},
        {"$set": {
            "user_id": user_id,
            "task_type": "track_spending",
            "date": today,
            "completed": completed,
            "progress": min(count, 3),
            "total": 3
        }},
        upsert=True
    )
    
    # Award fynny if just completed
    if completed and count == 3:
        await db.user_progress.update_one(
            {"user_id": user_id},
            {"$inc": {"fynnies": 2}},
            upsert=True
        )
    
    return entry

@api_router.get("/spending/{user_id}")
async def get_spending_history(user_id: str, limit: int = 50):
    """Get spending history"""
    entries = await db.spending_entries.find(
        {"user_id": user_id},
        {"_id": 0}
    ).sort("timestamp", -1).to_list(limit)
    return {"entries": entries}


# ==================== STREAK ROUTES ====================

@api_router.post("/progress/{user_id}/streak")
async def update_streak(user_id: str):
    """Update user streak based on activity"""
    today = get_today_str()
    yesterday = (datetime.now(timezone.utc) - timedelta(days=1)).strftime("%Y-%m-%d")
    
    # Check if user was active yesterday
    yesterday_status = await db.week_status.find_one({"user_id": user_id, "date": yesterday})
    today_status = await db.week_status.find_one({"user_id": user_id, "date": today})
    
    progress = await db.user_progress.find_one({"user_id": user_id}, {"_id": 0})
    current_streak = progress.get("current_streak", 0) if progress else 0
    longest_streak = progress.get("longest_streak", 0) if progress else 0
    
    # If active today
    if today_status and today_status.get("status") in ["complete", "partial"]:
        if yesterday_status and yesterday_status.get("status") in ["complete", "partial"]:
            current_streak += 1
        else:
            current_streak = 1
        
        longest_streak = max(longest_streak, current_streak)
        
        await db.user_progress.update_one(
            {"user_id": user_id},
            {"$set": {"current_streak": current_streak, "longest_streak": longest_streak}},
            upsert=True
        )
    
    return {"current_streak": current_streak, "longest_streak": longest_streak}

@api_router.post("/progress/{user_id}/complete-course")
async def complete_course(user_id: str, course_id: str):
    """Mark a course as complete and award bonus fynnies"""
    today = get_today_str()
    
    # Award bonus fynnies for course completion
    await db.user_progress.update_one(
        {"user_id": user_id},
        {"$inc": {"fynnies": 5}},
        upsert=True
    )
    
    # Update week status to show achievement
    await db.week_status.update_one(
        {"user_id": user_id, "date": today},
        {"$set": {"status": "complete", "type": "streak"}},
        upsert=True
    )
    
    # Update streak
    await update_streak(user_id)
    
    return {"success": True, "message": "Course completed! Bonus fynnies awarded."}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()