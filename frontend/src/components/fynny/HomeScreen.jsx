import React, { useState } from 'react';
import {
  ChevronRight, Play, Check, Sparkles, Award, ChevronLeft, Target,
  Receipt, Bell, Volume2, X,
  Sun, Leaf, Zap, Smile, BookOpen, Heart
} from 'lucide-react';

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

// Lesson Popup Modal - Slides up from bottom
const LessonModal = ({ lesson, isOpen, onClose, setActiveScreen }) => {
  if (!isOpen || !lesson) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal - slides up from bottom */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
        <div className="bg-white rounded-t-3xl max-h-[85vh] overflow-hidden shadow-2xl">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center z-10 transition-colors"
            data-testid="close-lesson-modal"
          >
            <X size={18} className="text-gray-600" />
          </button>

          {/* Illustration Header */}
          <div className="bg-gradient-to-br from-pink-100 via-rose-50 to-pink-50 p-8 flex items-center justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-xl">
                <Heart size={48} className="text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              {lesson.status === 'done' && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-medium">
                {lesson.status === 'done' ? 'COMPLETED' : 'UP NEXT'}
              </span>
              <span className="text-xs text-gray-400">{lesson.duration}</span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{lesson.title}</h2>
            <p className="text-gray-600 mb-6">
              {lesson.id === 1 
                ? "Learn the three simple things you need to do each day to find financial calm."
                : lesson.id === 2
                ? "Discover which of the four money personalities resonates most with you."
                : "Start building awareness around your spending habits without judgment."
              }
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => { onClose(); setActiveScreen(lesson.screen); }}
                data-testid={`modal-read-btn`}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-lg transition-all ${
                  lesson.status === 'done'
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gradient-to-r from-[#E85A99] to-rose-500 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                <BookOpen size={20} />
                {lesson.status === 'done' ? 'Read again' : 'Read'}
              </button>
              <button
                onClick={() => {}}
                data-testid={`modal-listen-btn`}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
              >
                <Volume2 size={20} />
                {lesson.status === 'done' ? 'Listen again' : 'Listen'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

// Prominent Learn with Fynny Section - Calm/Coursera style
const LearnWithFynnySection = ({ setActiveScreen }) => {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const lessons = [
    { id: 1, title: 'Prepare your finances', duration: '2 min', status: 'done', screen: 'lesson' },
    { id: 2, title: 'Discover your money style', duration: '2 min', status: 'current', screen: 'lesson-two' },
    { id: 3, title: 'Start tracking calmly', duration: '2 min', status: 'locked', screen: null },
  ];

  return (
    <>
      <div className="mb-6" data-testid="learn-fynny-section">
        {/* Hero Card - Dark/Teal background like Calm */}
        <div className="bg-gradient-to-br from-[#1a3a4a] via-[#1e4d5f] to-[#2a5f73] rounded-3xl p-6 mb-4 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs text-teal-300 font-medium uppercase tracking-wider">TODAY'S LEARNING</span>
                <h2 className="text-white text-2xl font-bold mt-1">Learn with Fynny</h2>
              </div>
              <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
                <Award size={14} className="text-amber-400" />
                <span className="text-white text-sm font-medium">+1 Fynny</span>
              </div>
            </div>

            <p className="text-teal-100 mb-4">Your mini-course: <span className="text-white font-medium">How Money Feels</span></p>

            {/* Progress indicator */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"></div>
              </div>
              <span className="text-teal-200 text-sm">1/3 lessons</span>
            </div>

            {/* Illustration */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <Heart size={40} className="text-white" />
                </div>
                <Sparkles size={20} className="text-amber-400 absolute -top-2 -right-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Lesson List */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Today's lessons</h3>
          </div>
          
          {lessons.map((lesson, index) => (
            <button
              key={lesson.id}
              onClick={() => lesson.status !== 'locked' && setSelectedLesson(lesson)}
              disabled={lesson.status === 'locked'}
              data-testid={`lesson-item-${lesson.id}`}
              className={`w-full flex items-center gap-4 p-4 text-left transition-all ${
                index !== lessons.length - 1 ? 'border-b border-gray-100' : ''
              } ${lesson.status === 'locked' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}`}
            >
              {/* Status indicator */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                lesson.status === 'done' 
                  ? 'bg-green-500' 
                  : lesson.status === 'current'
                  ? 'bg-gradient-to-br from-[#E85A99] to-rose-500'
                  : 'bg-gray-200'
              }`}>
                {lesson.status === 'done' ? (
                  <Check size={20} className="text-white" />
                ) : lesson.status === 'current' ? (
                  <Play size={18} className="text-white ml-0.5" fill="white" />
                ) : (
                  <span className="text-gray-400 text-sm font-medium">{lesson.id}</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium ${lesson.status === 'locked' ? 'text-gray-400' : 'text-gray-800'}`}>
                  {lesson.title}
                </h4>
                <p className={`text-sm ${lesson.status === 'locked' ? 'text-gray-300' : 'text-gray-500'}`}>
                  {lesson.duration}
                </p>
              </div>

              {/* Arrow */}
              {lesson.status !== 'locked' && (
                <ChevronRight size={20} className="text-gray-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Modal */}
      <LessonModal 
        lesson={selectedLesson}
        isOpen={!!selectedLesson}
        onClose={() => setSelectedLesson(null)}
        setActiveScreen={setActiveScreen}
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
      <div className="flex-1 max-w-xl">
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
