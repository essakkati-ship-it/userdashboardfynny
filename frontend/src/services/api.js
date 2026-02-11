/**
 * Fynny API Service
 * Handles all communication with the backend for user progress persistence
 */

const API_BASE = process.env.REACT_APP_BACKEND_URL || '';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE}/api${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

// ==================== USER API ====================

export const userApi = {
  /**
   * Create or get existing user
   */
  createUser: async (username, displayName = null) => {
    return apiCall('/users', {
      method: 'POST',
      body: JSON.stringify({ username, display_name: displayName }),
    });
  },

  /**
   * Get user by username
   */
  getUser: async (username) => {
    return apiCall(`/users/${username}`);
  },
};

// ==================== PROGRESS API ====================

export const progressApi = {
  /**
   * Get complete user progress
   */
  getUserProgress: async (userId) => {
    return apiCall(`/progress/${userId}`);
  },

  /**
   * Update lesson progress
   */
  updateLessonProgress: async (userId, lessonId, courseId, status) => {
    return apiCall(`/progress/${userId}/lessons`, {
      method: 'POST',
      body: JSON.stringify({ lesson_id: lessonId, course_id: courseId, status }),
    });
  },

  /**
   * Get course lesson progress
   */
  getCourseLessons: async (userId, courseId) => {
    return apiCall(`/progress/${userId}/lessons/${courseId}`);
  },

  /**
   * Update daily task
   */
  updateDailyTask: async (userId, taskType, data = {}) => {
    return apiCall(`/progress/${userId}/tasks`, {
      method: 'POST',
      body: JSON.stringify({ task_type: taskType, ...data }),
    });
  },

  /**
   * Get today's tasks
   */
  getDailyTasks: async (userId) => {
    return apiCall(`/progress/${userId}/tasks`);
  },

  /**
   * Update streak
   */
  updateStreak: async (userId) => {
    return apiCall(`/progress/${userId}/streak`, {
      method: 'POST',
    });
  },

  /**
   * Complete a course
   */
  completeCourse: async (userId, courseId) => {
    return apiCall(`/progress/${userId}/complete-course?course_id=${courseId}`, {
      method: 'POST',
    });
  },
};

// ==================== MOOD API ====================

export const moodApi = {
  /**
   * Create mood check-in
   */
  createCheckIn: async (userId, mood, note = null) => {
    return apiCall(`/mood/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ mood, note }),
    });
  },

  /**
   * Get mood history
   */
  getHistory: async (userId, limit = 30) => {
    return apiCall(`/mood/${userId}?limit=${limit}`);
  },
};

// ==================== SPENDING API ====================

export const spendingApi = {
  /**
   * Create spending entry
   */
  createEntry: async (userId, amount, category, description = null) => {
    return apiCall(`/spending/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ amount, category, description }),
    });
  },

  /**
   * Get spending history
   */
  getHistory: async (userId, limit = 50) => {
    return apiCall(`/spending/${userId}?limit=${limit}`);
  },
};

// ==================== HEALTH CHECK ====================

export const healthApi = {
  /**
   * Check API status
   */
  check: async () => {
    return apiCall('/');
  },
};

export default {
  user: userApi,
  progress: progressApi,
  mood: moodApi,
  spending: spendingApi,
  health: healthApi,
};
