"""
Fynny API Backend Tests
Tests for user progress, mood check-ins, spending, lessons, and daily tasks
"""
import pytest
import requests
import os
import uuid
from datetime import datetime

# Get BASE_URL from environment
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test user prefix for cleanup
TEST_PREFIX = "TEST_"


class TestHealthCheck:
    """API Health Check Tests"""
    
    def test_api_root_returns_success(self):
        """Test that API root endpoint returns success message"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "Fynny API is running" in data["message"]


class TestUserAPI:
    """User Creation and Retrieval Tests"""
    
    def test_create_user_success(self):
        """Test creating a new user"""
        unique_username = f"{TEST_PREFIX}user_{uuid.uuid4().hex[:8]}"
        response = requests.post(f"{BASE_URL}/api/users", json={
            "username": unique_username,
            "display_name": "Test User"
        })
        
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["username"] == unique_username
        assert data["display_name"] == "Test User"
        assert "created_at" in data
        
        # Store user_id for cleanup
        return data["id"]
    
    def test_create_user_returns_existing(self):
        """Test that creating user with existing username returns existing user"""
        # Create user first
        unique_username = f"{TEST_PREFIX}existing_{uuid.uuid4().hex[:8]}"
        response1 = requests.post(f"{BASE_URL}/api/users", json={
            "username": unique_username,
            "display_name": "First User"
        })
        assert response1.status_code == 200
        user1 = response1.json()
        
        # Try to create same user again
        response2 = requests.post(f"{BASE_URL}/api/users", json={
            "username": unique_username,
            "display_name": "Second User"
        })
        assert response2.status_code == 200
        user2 = response2.json()
        
        # Should return same user
        assert user1["id"] == user2["id"]
        assert user2["display_name"] == "First User"  # Original display name preserved
    
    def test_get_user_by_username(self):
        """Test getting user by username"""
        # Create user first
        unique_username = f"{TEST_PREFIX}getuser_{uuid.uuid4().hex[:8]}"
        create_response = requests.post(f"{BASE_URL}/api/users", json={
            "username": unique_username,
            "display_name": "Get Test User"
        })
        assert create_response.status_code == 200
        created_user = create_response.json()
        
        # Get user by username
        get_response = requests.get(f"{BASE_URL}/api/users/{unique_username}")
        assert get_response.status_code == 200
        fetched_user = get_response.json()
        
        assert fetched_user["id"] == created_user["id"]
        assert fetched_user["username"] == unique_username
    
    def test_get_nonexistent_user_returns_404(self):
        """Test that getting non-existent user returns 404"""
        response = requests.get(f"{BASE_URL}/api/users/nonexistent_user_xyz123")
        assert response.status_code == 404


class TestProgressAPI:
    """User Progress Tests"""
    
    @pytest.fixture
    def test_user(self):
        """Create a test user for progress tests"""
        unique_username = f"{TEST_PREFIX}progress_{uuid.uuid4().hex[:8]}"
        response = requests.post(f"{BASE_URL}/api/users", json={
            "username": unique_username,
            "display_name": "Progress Test User"
        })
        assert response.status_code == 200
        return response.json()
    
    def test_get_user_progress(self, test_user):
        """Test getting user progress"""
        user_id = test_user["id"]
        response = requests.get(f"{BASE_URL}/api/progress/{user_id}")
        
        assert response.status_code == 200
        data = response.json()
        
        # Verify progress structure
        assert data["user_id"] == user_id
        assert "fynnies" in data
        assert "current_streak" in data
        assert "longest_streak" in data
        assert "total_lessons_completed" in data
        assert "week_data" in data
        assert "lesson_progress" in data
        assert "daily_tasks" in data
        
        # Verify week_data has 7 days
        assert len(data["week_data"]) == 7
        
        # Verify each day has required fields
        for day in data["week_data"]:
            assert "day" in day
            assert "date" in day
            assert "status" in day
            assert "type" in day
    
    def test_new_user_has_zero_fynnies(self, test_user):
        """Test that new user starts with 0 fynnies"""
        user_id = test_user["id"]
        response = requests.get(f"{BASE_URL}/api/progress/{user_id}")
        
        assert response.status_code == 200
        data = response.json()
        assert data["fynnies"] == 0
        assert data["current_streak"] == 0
        assert data["total_lessons_completed"] == 0


class TestMoodAPI:
    """Mood Check-in Tests"""
    
    @pytest.fixture
    def test_user(self):
        """Create a test user for mood tests"""
        unique_username = f"{TEST_PREFIX}mood_{uuid.uuid4().hex[:8]}"
        response = requests.post(f"{BASE_URL}/api/users", json={
            "username": unique_username,
            "display_name": "Mood Test User"
        })
        assert response.status_code == 200
        return response.json()
    
    def test_create_mood_checkin(self, test_user):
        """Test creating a mood check-in"""
        user_id = test_user["id"]
        response = requests.post(f"{BASE_URL}/api/mood/{user_id}", json={
            "mood": "happy",
            "note": "Feeling great today!"
        })
        
        assert response.status_code == 200
        data = response.json()
        
        assert data["user_id"] == user_id
        assert data["mood"] == "happy"
        assert data["note"] == "Feeling great today!"
        assert "id" in data
        assert "timestamp" in data
    
    def test_mood_checkin_awards_fynny(self, test_user):
        """Test that mood check-in awards a fynny"""
        user_id = test_user["id"]
        
        # Get initial fynnies
        progress_before = requests.get(f"{BASE_URL}/api/progress/{user_id}").json()
        initial_fynnies = progress_before["fynnies"]
        
        # Create mood check-in
        response = requests.post(f"{BASE_URL}/api/mood/{user_id}", json={
            "mood": "calm"
        })
        assert response.status_code == 200
        
        # Verify fynnies increased
        progress_after = requests.get(f"{BASE_URL}/api/progress/{user_id}").json()
        assert progress_after["fynnies"] == initial_fynnies + 1
    
    def test_mood_checkin_updates_daily_task(self, test_user):
        """Test that mood check-in updates daily task"""
        user_id = test_user["id"]
        
        # Create mood check-in
        response = requests.post(f"{BASE_URL}/api/mood/{user_id}", json={
            "mood": "anxious"
        })
        assert response.status_code == 200
        
        # Verify daily task updated
        progress = requests.get(f"{BASE_URL}/api/progress/{user_id}").json()
        assert "check_in" in progress["daily_tasks"]
        assert progress["daily_tasks"]["check_in"]["completed"] == True
        assert progress["daily_tasks"]["check_in"]["value"] == "anxious"
    
    def test_get_mood_history(self, test_user):
        """Test getting mood history"""
        user_id = test_user["id"]
        
        # Create multiple mood check-ins
        moods = ["happy", "calm", "stressed"]
        for mood in moods:
            requests.post(f"{BASE_URL}/api/mood/{user_id}", json={"mood": mood})
        
        # Get history
        response = requests.get(f"{BASE_URL}/api/mood/{user_id}?limit=10")
        assert response.status_code == 200
        data = response.json()
        
        assert "checkins" in data
        assert len(data["checkins"]) >= 3


class TestSpendingAPI:
    """Spending Entry Tests"""
    
    @pytest.fixture
    def test_user(self):
        """Create a test user for spending tests"""
        unique_username = f"{TEST_PREFIX}spending_{uuid.uuid4().hex[:8]}"
        response = requests.post(f"{BASE_URL}/api/users", json={
            "username": unique_username,
            "display_name": "Spending Test User"
        })
        assert response.status_code == 200
        return response.json()
    
    def test_create_spending_entry(self, test_user):
        """Test creating a spending entry"""
        user_id = test_user["id"]
        response = requests.post(f"{BASE_URL}/api/spending/{user_id}", json={
            "amount": 25.50,
            "category": "food",
            "description": "Lunch at cafe"
        })
        
        assert response.status_code == 200
        data = response.json()
        
        assert data["user_id"] == user_id
        assert data["amount"] == 25.50
        assert data["category"] == "food"
        assert data["description"] == "Lunch at cafe"
        assert "id" in data
        assert "timestamp" in data
    
    def test_spending_updates_daily_task_progress(self, test_user):
        """Test that spending entries update daily task progress"""
        user_id = test_user["id"]
        
        # Create first spending entry
        requests.post(f"{BASE_URL}/api/spending/{user_id}", json={
            "amount": 10.00,
            "category": "transport"
        })
        
        # Check progress
        progress = requests.get(f"{BASE_URL}/api/progress/{user_id}").json()
        assert "track_spending" in progress["daily_tasks"]
        assert progress["daily_tasks"]["track_spending"]["progress"] >= 1
        assert progress["daily_tasks"]["track_spending"]["total"] == 3
    
    def test_spending_completes_after_three_entries(self, test_user):
        """Test that spending task completes after 3 entries"""
        user_id = test_user["id"]
        
        # Create 3 spending entries
        for i in range(3):
            response = requests.post(f"{BASE_URL}/api/spending/{user_id}", json={
                "amount": 10.00 + i,
                "category": "misc"
            })
            assert response.status_code == 200
        
        # Check task is completed
        progress = requests.get(f"{BASE_URL}/api/progress/{user_id}").json()
        assert progress["daily_tasks"]["track_spending"]["completed"] == True
        assert progress["daily_tasks"]["track_spending"]["progress"] == 3
    
    def test_get_spending_history(self, test_user):
        """Test getting spending history"""
        user_id = test_user["id"]
        
        # Create spending entries
        for i in range(3):
            requests.post(f"{BASE_URL}/api/spending/{user_id}", json={
                "amount": 15.00 + i,
                "category": "shopping"
            })
        
        # Get history
        response = requests.get(f"{BASE_URL}/api/spending/{user_id}?limit=10")
        assert response.status_code == 200
        data = response.json()
        
        assert "entries" in data
        assert len(data["entries"]) >= 3


class TestLessonProgressAPI:
    """Lesson Progress Tests"""
    
    @pytest.fixture
    def test_user(self):
        """Create a test user for lesson tests"""
        unique_username = f"{TEST_PREFIX}lesson_{uuid.uuid4().hex[:8]}"
        response = requests.post(f"{BASE_URL}/api/users", json={
            "username": unique_username,
            "display_name": "Lesson Test User"
        })
        assert response.status_code == 200
        return response.json()
    
    def test_update_lesson_progress(self, test_user):
        """Test updating lesson progress"""
        user_id = test_user["id"]
        response = requests.post(f"{BASE_URL}/api/progress/{user_id}/lessons", json={
            "lesson_id": 1,
            "course_id": "how-money-feels",
            "status": "current"
        })
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
    
    def test_complete_lesson_awards_fynny(self, test_user):
        """Test that completing a lesson awards a fynny"""
        user_id = test_user["id"]
        
        # Get initial fynnies
        progress_before = requests.get(f"{BASE_URL}/api/progress/{user_id}").json()
        initial_fynnies = progress_before["fynnies"]
        
        # Complete a lesson
        response = requests.post(f"{BASE_URL}/api/progress/{user_id}/lessons", json={
            "lesson_id": 1,
            "course_id": "test-course",
            "status": "done"
        })
        assert response.status_code == 200
        
        # Verify fynnies increased
        progress_after = requests.get(f"{BASE_URL}/api/progress/{user_id}").json()
        assert progress_after["fynnies"] == initial_fynnies + 1
        assert progress_after["total_lessons_completed"] == 1
    
    def test_get_course_lessons(self, test_user):
        """Test getting course lesson progress"""
        user_id = test_user["id"]
        
        # Update some lessons
        for i in range(1, 4):
            requests.post(f"{BASE_URL}/api/progress/{user_id}/lessons", json={
                "lesson_id": i,
                "course_id": "test-course-2",
                "status": "done" if i < 3 else "current"
            })
        
        # Get course lessons
        response = requests.get(f"{BASE_URL}/api/progress/{user_id}/lessons/test-course-2")
        assert response.status_code == 200
        data = response.json()
        
        assert "lessons" in data
        assert len(data["lessons"]) == 3


class TestDailyTasksAPI:
    """Daily Tasks Tests"""
    
    @pytest.fixture
    def test_user(self):
        """Create a test user for task tests"""
        unique_username = f"{TEST_PREFIX}tasks_{uuid.uuid4().hex[:8]}"
        response = requests.post(f"{BASE_URL}/api/users", json={
            "username": unique_username,
            "display_name": "Tasks Test User"
        })
        assert response.status_code == 200
        return response.json()
    
    def test_update_daily_task(self, test_user):
        """Test updating a daily task"""
        user_id = test_user["id"]
        response = requests.post(f"{BASE_URL}/api/progress/{user_id}/tasks", json={
            "task_type": "set_commitment",
            "completed": True,
            "value": "Save €50 this week"
        })
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
    
    def test_get_daily_tasks(self, test_user):
        """Test getting daily tasks"""
        user_id = test_user["id"]
        
        # Update a task first
        requests.post(f"{BASE_URL}/api/progress/{user_id}/tasks", json={
            "task_type": "check_in",
            "completed": True,
            "value": "happy"
        })
        
        # Get tasks
        response = requests.get(f"{BASE_URL}/api/progress/{user_id}/tasks")
        assert response.status_code == 200
        data = response.json()
        
        assert "tasks" in data
        assert "check_in" in data["tasks"]
        assert data["tasks"]["check_in"]["completed"] == True


class TestStreakAPI:
    """Streak Tests"""
    
    @pytest.fixture
    def test_user(self):
        """Create a test user for streak tests"""
        unique_username = f"{TEST_PREFIX}streak_{uuid.uuid4().hex[:8]}"
        response = requests.post(f"{BASE_URL}/api/users", json={
            "username": unique_username,
            "display_name": "Streak Test User"
        })
        assert response.status_code == 200
        return response.json()
    
    def test_update_streak(self, test_user):
        """Test updating streak"""
        user_id = test_user["id"]
        response = requests.post(f"{BASE_URL}/api/progress/{user_id}/streak")
        
        assert response.status_code == 200
        data = response.json()
        assert "current_streak" in data
        assert "longest_streak" in data


class TestCourseCompletionAPI:
    """Course Completion Tests"""
    
    @pytest.fixture
    def test_user(self):
        """Create a test user for course completion tests"""
        unique_username = f"{TEST_PREFIX}course_{uuid.uuid4().hex[:8]}"
        response = requests.post(f"{BASE_URL}/api/users", json={
            "username": unique_username,
            "display_name": "Course Test User"
        })
        assert response.status_code == 200
        return response.json()
    
    def test_complete_course_awards_bonus_fynnies(self, test_user):
        """Test that completing a course awards bonus fynnies"""
        user_id = test_user["id"]
        
        # Get initial fynnies
        progress_before = requests.get(f"{BASE_URL}/api/progress/{user_id}").json()
        initial_fynnies = progress_before["fynnies"]
        
        # Complete course
        response = requests.post(
            f"{BASE_URL}/api/progress/{user_id}/complete-course?course_id=test-course"
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        
        # Verify bonus fynnies (5) awarded
        progress_after = requests.get(f"{BASE_URL}/api/progress/{user_id}").json()
        assert progress_after["fynnies"] == initial_fynnies + 5


class TestDemoUser:
    """Tests for demo_user which is used by frontend"""
    
    def test_demo_user_exists_or_can_be_created(self):
        """Test that demo_user can be created/retrieved"""
        response = requests.post(f"{BASE_URL}/api/users", json={
            "username": "demo_user",
            "display_name": "Fynny User"
        })
        
        assert response.status_code == 200
        data = response.json()
        assert data["username"] == "demo_user"
        assert "id" in data
    
    def test_demo_user_progress_accessible(self):
        """Test that demo_user progress is accessible"""
        # First ensure demo_user exists
        user_response = requests.post(f"{BASE_URL}/api/users", json={
            "username": "demo_user",
            "display_name": "Fynny User"
        })
        user = user_response.json()
        
        # Get progress
        progress_response = requests.get(f"{BASE_URL}/api/progress/{user['id']}")
        assert progress_response.status_code == 200
        
        progress = progress_response.json()
        assert progress["user_id"] == user["id"]
        assert "fynnies" in progress
        assert "week_data" in progress


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
