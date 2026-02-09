import React, { useState } from 'react';
import {
  ChevronRight, Check, Award, ChevronLeft, Target,
  Receipt, Bell, Volume2, X, Play,
  Sun, Leaf, Zap, Smile, BookOpen
} from 'lucide-react';
import { GoalAchievedModal } from './CelebrationScreens';

const MicrolearningSection = ({ setActiveScreen }) => (
  <div className="mb-6">
    <div className="flex items-center justify-between mb-3">
      <h2 className="font-semibold text-gray-800 text-lg">New for you today</h2>
      <span className="text-xs text-gray-400 flex items-center gap-1">
        <Bell size={12} /> Next in 6h
      </span>
    </div>
    <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
      <button
        onClick={() => setActiveScreen('literacy-check')}
        data-testid="microlearn-literacy-check"
        className="flex-shrink-0 w-40 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-4 hover:shadow-md hover:scale-105 transition-all cursor-pointer text-left"
      >
        <div className="h-14 flex items-center justify-center mb-3">
          <Sun size={36} className="text-amber-400" />
        </div>
        <p className="text-sm font-medium text-gray-700 text-center leading-tight">Quick financial literacy check</p>
      </button>
      <button
        onClick={() => setActiveScreen('daily-boost')}
        data-testid="microlearn-daily-boost"
        className="flex-shrink-0 w-40 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 hover:shadow-lg hover:scale-105 transition-all cursor-pointer text-left"
      >
        <div className="flex justify-end mb-1">
          <span className="text-xs bg-white/90 text-indigo-600 px-2 py-0.5 rounded-full font-semibold">DAILY BOOST</span>
        </div>
        <div className="h-12 flex items-center justify-center">
          <Zap size={32} className="text-amber-300" />
        </div>
        <p className="text-sm font-medium text-white text-center mt-2">On tiny shifts</p>
      </button>
      <button
        onClick={() => setActiveScreen('money-tip')}
        data-testid="microlearn-money-tip"
        className="flex-shrink-0 w-40 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4 hover:shadow-md hover:scale-105 transition-all cursor-pointer text-left"
      >
        <div className="h-14 flex items-center justify-center mb-3">
          <Leaf size={36} className="text-green-500" />
        </div>
        <p className="text-sm font-medium text-gray-700 text-center leading-tight">One money tip</p>
      </button>
    </div>
  </div>
);

// Course Lesson Modal - Slides up on mobile, centered on desktop
const CourseLessonModal = ({ isOpen, onClose, setActiveScreen, lessons, onAllComplete }) => {
  if (!isOpen) return null;

  const completedCount = lessons.filter(l => l.status === 'done').length;
  const allCompleted = completedCount === lessons.length;
  const currentLesson = lessons.find(l => l.status === 'current') || lessons.find(l => l.status !== 'done');

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal - slides up on mobile, centered on desktop */}
      <div className="fixed inset-0 z-50 flex items-end lg:items-center lg:justify-center">
        <div className="w-full lg:w-[480px] lg:max-w-[90vw] bg-white rounded-t-3xl lg:rounded-3xl max-h-[85vh] lg:max-h-[80vh] overflow-hidden shadow-2xl animate-slide-up lg:animate-fade-scale">
          {/* Pull indicator - mobile only */}
          <div className="lg:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
          </div>

          {/* Close button - desktop */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center z-10 transition-colors"
            data-testid="close-lesson-modal"
          >
            <X size={18} className="text-gray-600" />
          </button>

          {/* Header */}
          <div className="p-5 lg:p-6 border-b border-gray-100">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
              {allCompleted ? 'Learning goal achieved!' : 'Finish today\'s topic'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {allCompleted ? `${completedCount} lessons completed` : `${lessons.length - completedCount} lesson${lessons.length - completedCount > 1 ? 's' : ''} left`}
            </p>
          </div>

          {/* Lesson List */}
          <div className="p-5 lg:p-6 overflow-y-auto max-h-[60vh]">
            <div className="relative">
              {/* Vertical line connecting lessons */}
              <div className="absolute left-[18px] top-6 bottom-6 w-0.5 bg-gray-200"></div>
              
              {lessons.map((lesson, index) => {
                const isCurrentLesson = lesson.status === 'current' || (!allCompleted && lesson.status !== 'done' && !lessons.slice(0, index).some(l => l.status !== 'done'));
                const showActions = isCurrentLesson && !allCompleted;

                return (
                  <div 
                    key={lesson.id}
                    className={`relative ${index !== lessons.length - 1 ? 'mb-4' : ''}`}
                  >
                    {/* Lesson item */}
                    <div className={`flex items-start gap-4 ${showActions ? 'bg-pink-50 rounded-2xl p-4 -mx-2' : ''}`}>
                      {/* Status circle */}
                      <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                        lesson.status === 'done' 
                          ? 'bg-teal-500' 
                          : showActions
                          ? 'bg-white border-2 border-gray-300'
                          : 'bg-white border-2 border-gray-200'
                      }`}>
                        {lesson.status === 'done' && (
                          <Check size={18} className="text-white" strokeWidth={3} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${lesson.status === 'done' ? 'text-gray-800' : 'text-gray-700'}`}>
                            {lesson.title}
                          </h4>
                          <span className="text-sm text-gray-400 ml-2">{lesson.duration}</span>
                        </div>

                        {/* Action buttons for current lesson */}
                        {showActions && (
                          <div className="flex gap-2 mt-3">
                            {/* Ribbon/Medal icon */}
                            <div className="hidden lg:flex w-16 h-16 bg-pink-100 rounded-xl items-center justify-center mr-2">
                              <Award size={32} className="text-pink-400" />
                            </div>
                            <button
                              onClick={() => { onClose(); setActiveScreen(lesson.screen); }}
                              data-testid="modal-read-btn"
                              className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-medium transition-colors"
                            >
                              <BookOpen size={16} />
                              Read
                            </button>
                            <button
                              onClick={() => {}}
                              data-testid="modal-listen-btn"
                              className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-medium transition-colors"
                            >
                              <Volume2 size={16} />
                              Listen
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Goal achieved celebration */}
            {allCompleted && (
              <div className="mt-6 text-center">
                <div className="flex justify-center gap-1 mb-2">
                  <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                <p className="text-teal-600 font-semibold text-lg mb-4">GOAL ACHIEVED!</p>
                <div className="flex justify-center gap-1 mb-6">
                  <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                </div>
                {onAllComplete && (
                  <button
                    onClick={onAllComplete}
                    data-testid="celebrate-btn"
                    className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold rounded-full transition-all"
                  >
                    Celebrate! 🎉
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fade-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-fade-scale {
          animation: fade-scale 0.2s ease-out;
        }
        @media (min-width: 1024px) {
          .animate-slide-up {
            animation: fade-scale 0.2s ease-out;
          }
        }
      `}</style>
    </>
  );
};

// Diamond Progress Indicator Component
const DiamondProgress = ({ total, completed }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rotate-45 ${
            index < completed 
              ? 'bg-gray-500' 
              : 'border-2 border-gray-400 bg-transparent'
          }`}
        />
      ))}
    </div>
  );
};

// Prominent Learn with Fynny Section - Course Card Style
const LearnWithFynnySection = ({ setActiveScreen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Lesson data - status can be: 'done', 'current', or 'locked'
  const lessons = [
    { id: 1, title: 'Prepare your finances', duration: '2 min', status: 'done', screen: 'lesson' },
    { id: 2, title: 'Discover your money style', duration: '2 min', status: 'done', screen: 'lesson-two' },
    { id: 3, title: 'Start tracking calmly', duration: '2 min', status: 'current', screen: 'lesson' },
  ];

  const completedCount = lessons.filter(l => l.status === 'done').length;
  const remainingCount = lessons.length - completedCount;
  const currentLesson = lessons.find(l => l.status === 'current') || lessons[completedCount];
  const allCompleted = completedCount === lessons.length;

  // Handle when user completes the final lesson
  const handleLessonComplete = () => {
    setIsModalOpen(false);
    setShowCelebration(true);
  };

  // Handle continuing after celebration
  const handleCelebrationContinue = () => {
    setShowCelebration(false);
    setActiveScreen('course-streak'); // Navigate to streak screen
  };

  return (
    <>
      <div className="mb-6" data-testid="learn-fynny-section">
        {/* Course Card - Clickable to expand lessons */}
        <button
          onClick={() => setIsModalOpen(true)}
          data-testid="course-card"
          className="w-full bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-lg transition-all text-left"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Medal/Ribbon Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-pink-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Award size={32} className="text-pink-400 sm:hidden" strokeWidth={1.5} />
              <Award size={36} className="text-pink-400 hidden sm:block" strokeWidth={1.5} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-800 text-base sm:text-lg">
                {allCompleted ? 'Course complete!' : 'Finish today\'s topic'}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mt-0.5 truncate">
                {allCompleted ? 'How Money Feels' : currentLesson?.title || 'All done!'}
              </p>
              
              {/* Progress row */}
              <div className="flex items-center justify-between mt-2 sm:mt-3">
                <span className="text-xs sm:text-sm text-gray-500">
                  {remainingCount > 0 ? `${remainingCount} lesson${remainingCount > 1 ? 's' : ''} left` : 'All completed!'}
                </span>
                <DiamondProgress total={lessons.length} completed={completedCount} />
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Course Lesson Modal */}
      <CourseLessonModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setActiveScreen={setActiveScreen}
        lessons={lessons}
        onAllComplete={handleLessonComplete}
      />

      {/* Goal Achieved Celebration Modal */}
      <GoalAchievedModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        onContinue={handleCelebrationContinue}
        courseName="How Money Feels"
        lessonsCompleted={lessons.length}
        fynniesEarned={1}
      />
    </>
  );
};

const TodaysPlanSection = ({ setActiveScreen }) => {
  return (
    <div className="space-y-3">
      {/* Track Spending Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-all" data-testid="track-spending-card">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-600 shadow-sm">
            <Receipt size={20} className="text-white" />
          </div>
          <span className="font-semibold text-gray-800">Track your spending</span>
        </div>
        <div className="ml-14">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
            <div className="h-full w-1/3 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500"><span className="text-gray-800 font-medium">1</span>/3 logged today</p>
        </div>
      </div>

      {/* Check In Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-all" data-testid="check-in-card">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-400 shadow-sm">
            <Smile size={20} className="text-white" />
          </div>
          <div>
            <span className="font-semibold text-gray-800">Check in</span>
            <p className="text-sm text-gray-500">How are you feeling?</p>
          </div>
        </div>
      </div>

      {/* Weekly Commitment Card */}
      <button
        onClick={() => setActiveScreen('commitment-flow')}
        data-testid="set-commitment-btn"
        className="w-full bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-all text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-500 to-rose-500 shadow-sm">
            <Target size={20} className="text-white" />
          </div>
          <div>
            <span className="font-semibold text-gray-800">Set weekly commitment</span>
            <p className="text-sm text-gray-500">Choose your focus for this week</p>
          </div>
        </div>
      </button>
    </div>
  );
};

const WeeklyStepsContent = () => (
  <div className="space-y-3">
    {[
      { day: 'Monday', task: 'Understand your stress trigger', status: 'done' },
      { day: 'Tuesday', task: 'Spot your money habit', status: 'current' },
      { day: 'Thursday', task: 'One calm admin action', status: 'pending' },
    ].map((item, i) => (
      <div key={i} className="flex items-start gap-2.5">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
          item.status === 'done' ? 'bg-gradient-to-br from-green-400 to-green-500' :
          item.status === 'current' ? 'bg-gradient-to-br from-pink-400 to-pink-500' :
          'border-2 border-gray-300'
        }`}>
          {item.status === 'done' && <Check className="text-white" size={10} />}
          {item.status === 'current' && <Play className="text-white" size={8} fill="white" />}
        </div>
        <div>
          <p className={`text-xs font-semibold ${item.status === 'current' ? 'text-pink-500' : 'text-gray-700'}`}>{item.day}</p>
          <p className="text-xs text-gray-500">{item.task}</p>
        </div>
      </div>
    ))}
  </div>
);

const HomeScreen = ({ setActiveScreen }) => {
  const weekDays = [
    { day: 'M', status: 'complete', type: 'fynny' },
    { day: 'T', status: 'complete', type: 'streak' },
    { day: 'W', status: 'complete', type: 'fynny' },
    { day: 'T', status: 'partial', type: 'half' },
    { day: 'F', status: 'current', type: 'today' },
    { day: 'S', status: 'upcoming', type: 'none' },
    { day: 'S', status: 'upcoming', type: 'none' },
  ];

  return (
    <div className="flex gap-6" data-testid="home-screen">
      <div className="flex-1 min-w-0 max-w-xl">
        {/* Week Tracker Card - AT THE TOP */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4 shadow-sm" data-testid="week-tracker">
          {/* Week Day Badges */}
          <div className="flex items-center justify-between mb-5 px-2">
            <button className="text-gray-300 hover:text-gray-400" data-testid="prev-week-btn">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              {weekDays.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    item.status === 'complete'
                      ? item.type === 'fynny'
                        ? 'bg-gradient-to-br from-amber-400 to-orange-400 shadow-md'
                        : 'bg-gradient-to-br from-teal-400 to-teal-500 shadow-md'
                      : item.status === 'partial'
                        ? 'bg-gradient-to-br from-amber-200 to-orange-200'
                        : item.status === 'current'
                          ? 'bg-green-100 border-2 border-green-400'
                          : 'bg-gray-100'
                  }`}>
                    {item.status === 'complete' && (
                      item.type === 'fynny'
                        ? <Award size={16} className="text-white" />
                        : <Check size={16} className="text-white" strokeWidth={3} />
                    )}
                    {item.status === 'partial' && <Award size={14} className="text-amber-500" />}
                  </div>
                  <span className={`text-xs font-medium ${item.status === 'current' ? 'text-green-600' : 'text-gray-400'}`}>
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
            <button className="text-gray-300 hover:text-gray-400" data-testid="next-week-btn">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Progress Summary */}
          <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-pink-500">Fynnies</span>
                <span className="text-sm text-gray-500">Financial Calm Zone</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-2/5 bg-gradient-to-r from-green-400 to-teal-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-sm font-semibold text-gray-800">12 <span className="font-normal text-gray-400">earned</span></span>
                <span className="text-sm text-gray-400">15 - 20 weekly</span>
              </div>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            <div className="w-2 h-2 rounded-full bg-gray-800"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
        </div>

        {/* PROMINENT: Learn with Fynny - Below Week Tracker, Above Today's Tasks */}
        <LearnWithFynnySection setActiveScreen={setActiveScreen} />

        {/* Today's Plan Header */}
        <h2 className="font-semibold text-gray-800 text-lg mb-3">Today's Tasks</h2>

        {/* Today's Plan Cards */}
        <TodaysPlanSection setActiveScreen={setActiveScreen} />

        {/* Microlearning Section */}
        <div className="mt-6">
          <MicrolearningSection setActiveScreen={setActiveScreen} />
        </div>
      </div>

      {/* Desktop Sidebar - Weekly Focus */}
      <div className="hidden lg:block w-56 flex-shrink-0">
        <div className="bg-white rounded-2xl p-5 border border-gray-200 sticky top-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">This Week's Focus</p>
          <WeeklyStepsContent />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
