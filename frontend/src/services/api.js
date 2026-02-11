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

// ==================== MODULES API ====================

export const modulesApi = {
  /**
   * Get all modules with lessons
   */
  getAll: async () => {
    return apiCall('/modules');
  },

  /**
   * Get a single module with lessons
   */
  getById: async (moduleId) => {
    return apiCall(`/modules/${moduleId}`);
  },

  /**
   * Create a new module
   */
  create: async (data) => {
    return apiCall('/modules', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update a module
   */
  update: async (moduleId, data) => {
    return apiCall(`/modules/${moduleId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete a module
   */
  delete: async (moduleId) => {
    return apiCall(`/modules/${moduleId}`, {
      method: 'DELETE',
    });
  },

  /**
   * Seed sample modules
   */
  seedSampleData: async () => {
    return apiCall('/seed/modules', {
      method: 'POST',
    });
  },
};

// ==================== LESSONS API ====================

export const lessonsApi = {
  /**
   * Get a single lesson
   */
  getById: async (lessonId) => {
    return apiCall(`/lessons/${lessonId}`);
  },

  /**
   * Get all lessons for a module
   */
  getByModule: async (moduleId) => {
    return apiCall(`/modules/${moduleId}/lessons`);
  },

  /**
   * Create a new lesson
   */
  create: async (data) => {
    return apiCall('/lessons', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update a lesson
   */
  update: async (lessonId, data) => {
    return apiCall(`/lessons/${lessonId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete a lesson
   */
  delete: async (lessonId) => {
    return apiCall(`/lessons/${lessonId}`, {
      method: 'DELETE',
    });
  },

  /**
   * Add a card to a lesson
   */
  addCard: async (lessonId, cardData) => {
    return apiCall(`/lessons/${lessonId}/cards`, {
      method: 'POST',
      body: JSON.stringify(cardData),
    });
  },

  /**
   * Update a card in a lesson
   */
  updateCard: async (lessonId, cardId, cardData) => {
    return apiCall(`/lessons/${lessonId}/cards/${cardId}`, {
      method: 'PUT',
      body: JSON.stringify(cardData),
    });
  },

  /**
   * Delete a card from a lesson
   */
  deleteCard: async (lessonId, cardId) => {
    return apiCall(`/lessons/${lessonId}/cards/${cardId}`, {
      method: 'DELETE',
    });
  },
};

export default {
  user: userApi,
  progress: progressApi,
  mood: moodApi,
  spending: spendingApi,
  health: healthApi,
  modules: modulesApi,
  lessons: lessonsApi,
};
