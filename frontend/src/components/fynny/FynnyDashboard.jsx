import React, { useState } from 'react';

// Import all components
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import HomeScreen from './HomeScreen';
import LessonScreen from './LessonScreen';
import LessonTwoScreen from './LessonTwoScreen';
import StreakScreen from './StreakScreen';
import { LiteracyCheckScreen, DailyBoostScreen, MoneyTipScreen } from './MicrolearningScreens';
import { CommitmentFlowScreen, CommitmentsScreen, HealthScreen, PlanScreen } from './NavigationScreens';
import { SavedLessonsScreen, PaymentPlanScreen, CalculatorsScreen, PlaceholderScreen } from './ResourceScreens';

export default function FynnyDashboard() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home': return <HomeScreen setActiveScreen={setActiveScreen} />;
      case 'plan': return <PlanScreen setActiveScreen={setActiveScreen} />;
      case 'health': return <HealthScreen setActiveScreen={setActiveScreen} />;
      case 'commitments': return <CommitmentsScreen setActiveScreen={setActiveScreen} />;
      case 'commitment-flow': return <CommitmentFlowScreen setActiveScreen={setActiveScreen} />;
      case 'lesson': return <LessonScreen setActiveScreen={setActiveScreen} />;
      case 'lesson-two': return <LessonTwoScreen setActiveScreen={setActiveScreen} />;
      case 'streak': return <StreakScreen setActiveScreen={setActiveScreen} />;
      case 'literacy-check': return <LiteracyCheckScreen setActiveScreen={setActiveScreen} />;
      case 'daily-boost': return <DailyBoostScreen setActiveScreen={setActiveScreen} />;
      case 'money-tip': return <MoneyTipScreen setActiveScreen={setActiveScreen} />;
      case 'saved': return <SavedLessonsScreen setActiveScreen={setActiveScreen} />;
      case 'payment-plan': return <PaymentPlanScreen setActiveScreen={setActiveScreen} />;
      case 'calculators': return <CalculatorsScreen setActiveScreen={setActiveScreen} />;
      case 'settings': return <PlaceholderScreen title="Settings" setActiveScreen={setActiveScreen} />;
      default: return <HomeScreen setActiveScreen={setActiveScreen} />;
    }
  };

  const fullScreenScreens = ['lesson', 'lesson-two', 'streak', 'literacy-check', 'daily-boost', 'money-tip'];
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
