import React, { useState } from 'react';

// Import all components
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import HomeScreen from './HomeScreen';
import LessonScreen from './LessonScreen';
import LessonTwoScreen from './LessonTwoScreen';
import StreakScreen from './StreakScreen';
import FinancialHealthScreen from './FinancialHealthScreen';
import { LiteracyCheckScreen, DailyBoostScreen, MoneyTipScreen } from './MicrolearningScreens';
import { CommitmentFlowScreen, CommitmentsScreen, HealthScreen, PlanScreen } from './NavigationScreens';
import { SavedLessonsScreen, PaymentPlanScreen, CalculatorsScreen, PlaceholderScreen } from './ResourceScreens';
import { CourseStreakScreen } from './CelebrationScreens';
import DynamicLessonViewer from './DynamicLessonViewer';
import { useUser } from '../../context/UserContext';

export default function FynnyDashboard() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentModuleId, setCurrentModuleId] = useState(null);
  
  const { getLessonById, getModuleLessons } = useUser();

  // Navigate to a specific lesson
  const navigateToLesson = (moduleId, lessonId) => {
    const lesson = getLessonById(moduleId, lessonId);
    if (lesson) {
      setCurrentLesson(lesson);
      setCurrentModuleId(moduleId);
      setActiveScreen('dynamic-lesson');
    }
  };

  // Handle lesson completion
  const handleLessonComplete = () => {
    if (!currentModuleId) {
      setActiveScreen('home');
      return;
    }
    
    const moduleLessons = getModuleLessons(currentModuleId);
    const currentIndex = moduleLessons.findIndex(l => l.id === currentLesson?.id);
    
    // If there's a next lesson, go to it
    if (currentIndex >= 0 && currentIndex < moduleLessons.length - 1) {
      const nextLesson = moduleLessons[currentIndex + 1];
      setCurrentLesson(nextLesson);
    } else {
      // Module complete, go to celebration
      setActiveScreen('course-streak');
    }
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home': return <HomeScreen setActiveScreen={setActiveScreen} navigateToLesson={navigateToLesson} />;
      case 'plan': return <PlanScreen setActiveScreen={setActiveScreen} />;
      case 'health': return <HealthScreen setActiveScreen={setActiveScreen} />;
      case 'commitments': return <CommitmentsScreen setActiveScreen={setActiveScreen} />;
      case 'commitment-flow': return <CommitmentFlowScreen setActiveScreen={setActiveScreen} />;
      case 'lesson': return <LessonScreen setActiveScreen={setActiveScreen} />;
      case 'lesson-two': return <LessonTwoScreen setActiveScreen={setActiveScreen} />;
      case 'dynamic-lesson': 
        return (
          <DynamicLessonViewer 
            lesson={currentLesson}
            moduleId={currentModuleId}
            onComplete={handleLessonComplete}
            onBack={() => setActiveScreen('home')}
            onNavigateToLesson={navigateToLesson}
          />
        );
      case 'streak': return <StreakScreen setActiveScreen={setActiveScreen} />;
      case 'course-streak': return <CourseStreakScreen setActiveScreen={setActiveScreen} />;
      case 'literacy-check': return <LiteracyCheckScreen setActiveScreen={setActiveScreen} />;
      case 'daily-boost': return <DailyBoostScreen setActiveScreen={setActiveScreen} />;
      case 'money-tip': return <MoneyTipScreen setActiveScreen={setActiveScreen} />;
      case 'saved': return <SavedLessonsScreen setActiveScreen={setActiveScreen} />;
      case 'financial-health': return <FinancialHealthScreen setActiveScreen={setActiveScreen} />;
      case 'payment-plan': return <PaymentPlanScreen setActiveScreen={setActiveScreen} />;
      case 'calculators': return <CalculatorsScreen setActiveScreen={setActiveScreen} />;
      case 'settings': return <PlaceholderScreen title="Settings" setActiveScreen={setActiveScreen} />;
      default: return <HomeScreen setActiveScreen={setActiveScreen} navigateToLesson={navigateToLesson} />;
    }
  };

  const fullScreenScreens = ['lesson', 'lesson-two', 'dynamic-lesson', 'streak', 'course-streak', 'literacy-check', 'daily-boost', 'money-tip'];
  const isFullScreen = fullScreenScreens.includes(activeScreen);

  if (isFullScreen) {
    return (
      <div className="min-h-screen bg-white" data-testid="fynny-fullscreen">
        {renderScreen()}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50" data-testid="fynny-dashboard">
      <TopBar setIsOpen={setSidebarOpen} />
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        activeScreen={activeScreen} 
        setActiveScreen={setActiveScreen} 
      />
      <main className="flex-1 p-4 lg:p-6 pt-20 lg:pt-6 overflow-auto min-h-screen">
        {renderScreen()}
      </main>
    </div>
  );
}
