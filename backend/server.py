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


# ==================== MODULE/LESSON MODELS ====================

class CardContent(BaseModel):
    """Flexible content structure for lesson cards"""
    model_config = ConfigDict(extra="allow")

class LessonCard(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: str  # text, list, quiz, reflection, completion, illustration
    title: str
    cta: str = "Continue"
    content: Dict[str, Any] = {}
    order: int = 0

class LessonCardCreate(BaseModel):
    type: str
    title: str
    cta: str = "Continue"
    content: Dict[str, Any] = {}
    order: int = 0

class Lesson(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    module_id: str
    title: str
    description: Optional[str] = None
    duration: str = "2 min"
    order: int = 0
    theme_color: str = "rose"
    cards: List[Dict[str, Any]] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LessonCreate(BaseModel):
    module_id: str
    title: str
    description: Optional[str] = None
    duration: str = "2 min"
    order: int = 0
    theme_color: str = "rose"
    cards: List[Dict[str, Any]] = []

class Module(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: Optional[str] = None
    icon: str = "BookOpen"
    theme_color: str = "rose"
    order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ModuleCreate(BaseModel):
    title: str
    description: Optional[str] = None
    icon: str = "BookOpen"
    theme_color: str = "rose"
    order: int = 0

class ModuleWithLessons(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    description: Optional[str] = None
    icon: str
    theme_color: str
    order: int
    lessons: List[Dict[str, Any]] = []


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


# ==================== MODULE ROUTES ====================

@api_router.post("/modules", response_model=Module)
async def create_module(input: ModuleCreate):
    """Create a new learning module"""
    module = Module(**input.model_dump())
    doc = module.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.modules.insert_one(doc)
    return module

@api_router.get("/modules")
async def get_all_modules():
    """Get all modules with their lessons"""
    modules = await db.modules.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    
    result = []
    for module in modules:
        # Get lessons for this module
        lessons = await db.lessons.find(
            {"module_id": module["id"]},
            {"_id": 0}
        ).sort("order", 1).to_list(100)
        
        module["lessons"] = lessons
        result.append(module)
    
    return {"modules": result}

@api_router.get("/modules/{module_id}")
async def get_module(module_id: str):
    """Get a single module with its lessons"""
    module = await db.modules.find_one({"id": module_id}, {"_id": 0})
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    
    # Get lessons for this module
    lessons = await db.lessons.find(
        {"module_id": module_id},
        {"_id": 0}
    ).sort("order", 1).to_list(100)
    
    module["lessons"] = lessons
    return module

@api_router.put("/modules/{module_id}")
async def update_module(module_id: str, input: ModuleCreate):
    """Update a module"""
    result = await db.modules.update_one(
        {"id": module_id},
        {"$set": input.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Module not found")
    return {"success": True, "message": "Module updated"}

@api_router.delete("/modules/{module_id}")
async def delete_module(module_id: str):
    """Delete a module and its lessons"""
    # Delete all lessons in this module
    await db.lessons.delete_many({"module_id": module_id})
    # Delete the module
    result = await db.modules.delete_one({"id": module_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Module not found")
    return {"success": True, "message": "Module and lessons deleted"}


# ==================== LESSON ROUTES ====================

@api_router.post("/lessons", response_model=Lesson)
async def create_lesson(input: LessonCreate):
    """Create a new lesson"""
    lesson = Lesson(**input.model_dump())
    doc = lesson.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.lessons.insert_one(doc)
    return lesson

@api_router.get("/lessons/{lesson_id}")
async def get_lesson(lesson_id: str):
    """Get a single lesson with its cards"""
    lesson = await db.lessons.find_one({"id": lesson_id}, {"_id": 0})
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson

@api_router.get("/modules/{module_id}/lessons")
async def get_module_lessons(module_id: str):
    """Get all lessons for a module"""
    lessons = await db.lessons.find(
        {"module_id": module_id},
        {"_id": 0}
    ).sort("order", 1).to_list(100)
    return {"lessons": lessons}

@api_router.put("/lessons/{lesson_id}")
async def update_lesson(lesson_id: str, input: LessonCreate):
    """Update a lesson"""
    result = await db.lessons.update_one(
        {"id": lesson_id},
        {"$set": input.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return {"success": True, "message": "Lesson updated"}

@api_router.delete("/lessons/{lesson_id}")
async def delete_lesson(lesson_id: str):
    """Delete a lesson"""
    result = await db.lessons.delete_one({"id": lesson_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return {"success": True, "message": "Lesson deleted"}

@api_router.post("/lessons/{lesson_id}/cards")
async def add_card_to_lesson(lesson_id: str, input: LessonCardCreate):
    """Add a card to a lesson"""
    card = LessonCard(**input.model_dump())
    
    result = await db.lessons.update_one(
        {"id": lesson_id},
        {"$push": {"cards": card.model_dump()}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return {"success": True, "card_id": card.id}

@api_router.put("/lessons/{lesson_id}/cards/{card_id}")
async def update_card(lesson_id: str, card_id: str, input: LessonCardCreate):
    """Update a card in a lesson"""
    result = await db.lessons.update_one(
        {"id": lesson_id, "cards.id": card_id},
        {"$set": {
            "cards.$.type": input.type,
            "cards.$.title": input.title,
            "cards.$.cta": input.cta,
            "cards.$.content": input.content,
            "cards.$.order": input.order
        }}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lesson or card not found")
    return {"success": True, "message": "Card updated"}

@api_router.delete("/lessons/{lesson_id}/cards/{card_id}")
async def delete_card(lesson_id: str, card_id: str):
    """Delete a card from a lesson"""
    result = await db.lessons.update_one(
        {"id": lesson_id},
        {"$pull": {"cards": {"id": card_id}}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return {"success": True, "message": "Card deleted"}


# ==================== SEED DATA ROUTE ====================

@api_router.post("/seed/modules")
async def seed_sample_modules():
    """Seed the database with sample module data"""
    # Check if modules already exist
    existing = await db.modules.count_documents({})
    if existing > 0:
        return {"message": "Modules already seeded", "count": existing}
    
    # Sample module data
    sample_module = {
        "id": "how-money-feels",
        "title": "How Money Feels",
        "description": "Understand your emotional relationship with money",
        "icon": "Heart",
        "theme_color": "rose",
        "order": 1,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.modules.insert_one(sample_module)
    
    # Sample lessons
    sample_lessons = [
        {
            "id": "prepare-finances",
            "module_id": "how-money-feels",
            "title": "Prepare your finances",
            "description": "Getting started with Fynny",
            "duration": "2 min",
            "order": 1,
            "theme_color": "rose",
            "cards": [
                {
                    "id": "card-1-1",
                    "type": "text",
                    "title": "Getting Started",
                    "cta": "Continue",
                    "order": 0,
                    "content": {
                        "icon": "Heart",
                        "blocks": [
                            {"type": "bold", "text": "There are three simple things you need to do each day to be successful with Fynny—that's it!"},
                            {"type": "list", "style": "numbered", "items": ["Learn", "Check in", "Track your spending"]},
                            {"type": "text", "text": "You've already started learning by simply reading this lesson.", "highlight": "Before getting started with your next action (checking in), let's take a quick look at the key role each action plays in helping you find financial calm."}
                        ]
                    }
                },
                {
                    "id": "card-1-2",
                    "type": "text",
                    "title": "Learn",
                    "cta": "Continue",
                    "order": 1,
                    "content": {
                        "sectionNumber": 1,
                        "sectionTitle": "LEARN",
                        "icon": "BookOpen",
                        "blocks": [
                            {"type": "text", "highlight": "Your Fynny course has been personalized to your needs and goals.", "text": "It's broken down into mini-courses on topics like understanding your money emotions, building healthy habits, and more."},
                            {"type": "callout", "style": "info", "text": "Every day, you'll learn about yourself and build healthy money habits through fun, bite-size lessons."}
                        ]
                    }
                },
                {
                    "id": "card-1-3",
                    "type": "completion",
                    "title": "Complete",
                    "cta": "Complete Lesson",
                    "order": 2,
                    "content": {
                        "heading": "Lesson Complete!",
                        "message": "You've taken the first step in your financial wellness journey.",
                        "highlight": "This awareness will be your superpower.",
                        "reward": {"fynnies": 1, "label": "Lesson 1 complete"}
                    }
                }
            ],
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "discover-money-style",
            "module_id": "how-money-feels",
            "title": "Discover your money style",
            "description": "Understanding your money personality",
            "duration": "2 min",
            "order": 2,
            "theme_color": "purple",
            "cards": [
                {
                    "id": "card-2-1",
                    "type": "text",
                    "title": "Money Styles",
                    "cta": "Continue",
                    "order": 0,
                    "content": {
                        "icon": "Brain",
                        "blocks": [
                            {"type": "heading", "text": "Discover Your Money Style"},
                            {"type": "text", "text": "Everyone has a unique relationship with money.", "highlight": "Understanding your 'money style' is the first step to making lasting changes."}
                        ]
                    }
                },
                {
                    "id": "card-2-2",
                    "type": "list",
                    "title": "Four Styles",
                    "cta": "Continue",
                    "order": 1,
                    "content": {
                        "heading": "The Four Money Styles",
                        "subheading": "Which one sounds like you?",
                        "items": [
                            {"title": "The Emotional Spender", "description": "Uses spending to cope with feelings.", "icon": "Heart", "color": "amber"},
                            {"title": "The Saver", "description": "Finds security in saving.", "icon": "TrendingUp", "color": "green"},
                            {"title": "The Avoider", "description": "Prefers not to think about money.", "icon": "Lightbulb", "color": "blue"},
                            {"title": "The Status Seeker", "description": "Ties self-worth to wealth appearance.", "icon": "Award", "color": "pink"}
                        ]
                    }
                },
                {
                    "id": "card-2-3",
                    "type": "completion",
                    "title": "Complete",
                    "cta": "Complete Lesson",
                    "order": 2,
                    "content": {
                        "heading": "Lesson Complete!",
                        "message": "You've learned about the four money styles.",
                        "reward": {"fynnies": 1, "label": "Lesson 2 complete"}
                    }
                }
            ],
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "start-tracking",
            "module_id": "how-money-feels",
            "title": "Start tracking calmly",
            "description": "Begin your tracking journey without stress",
            "duration": "2 min",
            "order": 3,
            "theme_color": "teal",
            "cards": [
                {
                    "id": "card-3-1",
                    "type": "text",
                    "title": "Calm Tracking",
                    "cta": "Continue",
                    "order": 0,
                    "content": {
                        "icon": "Target",
                        "blocks": [
                            {"type": "heading", "text": "Tracking Without Stress"},
                            {"type": "text", "text": "Many people avoid tracking because it feels overwhelming.", "highlight": "We're going to change that."}
                        ]
                    }
                },
                {
                    "id": "card-3-2",
                    "type": "completion",
                    "title": "Complete",
                    "cta": "Complete Lesson",
                    "order": 1,
                    "content": {
                        "heading": "Module Complete!",
                        "message": "You've completed the How Money Feels module!",
                        "reward": {"fynnies": 5, "label": "Module complete!"}
                    }
                }
            ],
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    for lesson in sample_lessons:
        await db.lessons.insert_one(lesson)
    
    return {"message": "Sample modules seeded successfully", "modules": 1, "lessons": len(sample_lessons)}


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