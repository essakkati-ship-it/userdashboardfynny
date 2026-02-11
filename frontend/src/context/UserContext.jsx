import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { userApi, progressApi, moodApi, spendingApi } from '../services/api';

const UserContext = createContext(null);

// Default user for demo/development
const DEFAULT_USERNAME = 'demo_user';

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize user on mount
  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Create or get the demo user
      const userData = await userApi.createUser(DEFAULT_USERNAME, 'Fynny User');
      setUser(userData);
      
      // Fetch user progress
      const progressData = await progressApi.getUserProgress(userData.id);
      setProgress(progressData);
    } catch (err) {
      console.error('Failed to initialize user:', err);
      setError(err.message);
      
      // Set fallback data for offline/demo mode
      setUser({ id: 'demo', username: DEFAULT_USERNAME, display_name: 'Fynny User' });
      setProgress({
        user_id: 'demo',
        fynnies: 12,
        current_streak: 4,
        longest_streak: 7,
        total_lessons_completed: 2,
        week_data: [
          { day: 'M', status: 'complete', type: 'fynny' },
          { day: 'T', status: 'complete', type: 'streak' },
          { day: 'W', status: 'complete', type: 'fynny' },
          { day: 'T', status: 'partial', type: 'half' },
          { day: 'F', status: 'current', type: 'today' },
          { day: 'S', status: 'upcoming', type: 'none' },
          { day: 'S', status: 'upcoming', type: 'none' },
        ],
        lesson_progress: [],
        daily_tasks: {
          check_in: { completed: false, value: null },
          track_spending: { completed: false, progress: 1, total: 3 },
          set_commitment: { completed: false },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // Refresh progress data
  const refreshProgress = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      const progressData = await progressApi.getUserProgress(user.id);
      setProgress(progressData);
    } catch (err) {
      console.error('Failed to refresh progress:', err);
    }
  }, [user?.id]);

  // Update lesson progress
  const updateLessonProgress = useCallback(async (lessonId, courseId, status) => {
    if (!user?.id) return;
    
    try {
      await progressApi.updateLessonProgress(user.id, lessonId, courseId, status);
      await refreshProgress();
    } catch (err) {
      console.error('Failed to update lesson progress:', err);
      throw err;
    }
  }, [user?.id, refreshProgress]);

  // Complete a course
  const completeCourse = useCallback(async (courseId) => {
    if (!user?.id) return;
    
    try {
      await progressApi.completeCourse(user.id, courseId);
      await refreshProgress();
    } catch (err) {
      console.error('Failed to complete course:', err);
      throw err;
    }
  }, [user?.id, refreshProgress]);

  // Log mood check-in
  const logMoodCheckIn = useCallback(async (mood, note = null) => {
    if (!user?.id) return;
    
    try {
      const result = await moodApi.createCheckIn(user.id, mood, note);
      await refreshProgress();
      return result;
    } catch (err) {
      console.error('Failed to log mood:', err);
      throw err;
    }
  }, [user?.id, refreshProgress]);

  // Log spending entry
  const logSpending = useCallback(async (amount, category, description = null) => {
    if (!user?.id) return;
    
    try {
      const result = await spendingApi.createEntry(user.id, amount, category, description);
      await refreshProgress();
      return result;
    } catch (err) {
      console.error('Failed to log spending:', err);
      throw err;
    }
  }, [user?.id, refreshProgress]);

  // Update daily task
  const updateDailyTask = useCallback(async (taskType, data = {}) => {
    if (!user?.id) return;
    
    try {
      await progressApi.updateDailyTask(user.id, taskType, data);
      await refreshProgress();
    } catch (err) {
      console.error('Failed to update task:', err);
      throw err;
    }
  }, [user?.id, refreshProgress]);

  const value = {
    user,
    progress,
    loading,
    error,
    refreshProgress,
    updateLessonProgress,
    completeCourse,
    logMoodCheckIn,
    logSpending,
    updateDailyTask,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export default UserContext;
