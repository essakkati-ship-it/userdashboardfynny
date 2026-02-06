import React, { useState } from 'react';
import {
  ChevronRight, Play, Check, Sparkles, Award, ChevronLeft, Target,
  Receipt, Bell, ChevronDown, Volume2, Bookmark,
  Sun, Leaf, Zap, Smile, BookOpen
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

const TodaysPlanSection = ({ setActiveScreen }) => {
  const [isLessonExpanded, setIsLessonExpanded] = useState(false);

  const lessons = [
    { id: 1, title: 'Prepare your finances', duration: '2 min', status: 'done', screen: 'lesson' },
    { id: 2, title: 'Discover your money style', duration: '2 min', status: 'current', screen: 'lesson-two' },
    { id: 3, title: 'Start tracking calmly', duration: '2 min', status: 'locked', screen: null },
  ];

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

      {/* Learn with Fynny Card - Expandable */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-all" data-testid="learn-fynny-card">
        <button onClick={() => setIsLessonExpanded(!isLessonExpanded)} className="w-full text-left p-4" data-testid="expand-lessons-btn">
          <div className="flex items-start gap-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center flex-shrink-0">
              <div className="relative">
                <Sun size={28} className="text-pink-400" />
                <Sparkles size={12} className="text-amber-400 absolute -top-1 -right-1" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800">Learn with Fynny</p>
              <p className="text-sm text-gray-600 mt-0.5">Your first mini-course: <span className="text-pink-500">How Money Feels</span></p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-500">3 lessons today</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className={`w-4 h-4 rounded ${i === 0 ? 'bg-amber-100 border border-amber-300' : 'bg-gray-100 border border-gray-200'}`}>
                      {i === 0 && <Sparkles size={10} className="text-amber-400 m-0.5" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ChevronDown size={20} className={`text-gray-400 mt-1 transition-transform duration-200 flex-shrink-0 ${isLessonExpanded ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {isLessonExpanded && (
          <div className="border-t border-gray-100">
            <div className="bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 p-6 flex items-center justify-center">
              <div className="relative">
                <Award size={48} className="text-amber-500" />
                <Sparkles size={16} className="text-amber-400 absolute -top-1 -right-1" />
              </div>
            </div>

            <div className="relative">
              {lessons.map((lesson, index) => (
                <div key={lesson.id} className={`relative ${index !== lessons.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="absolute left-5 top-0 bottom-0 flex flex-col items-center">
                    {index > 0 && <div className="w-0.5 h-4 bg-gray-200"></div>}
                    <div className={`w-3.5 h-3.5 rounded-full flex-shrink-0 border-2 flex items-center justify-center ${
                      lesson.status === 'done' ? 'bg-green-500 border-green-500' :
                      lesson.status === 'current' ? 'border-pink-400 bg-pink-100' :
                      'border-gray-300 bg-white'
                    }`}>
                      {lesson.status === 'done' && <Check size={8} className="text-white" />}
                    </div>
                    {index < lessons.length - 1 && <div className="w-0.5 flex-1 bg-gray-200"></div>}
                  </div>

                  <div className="pl-12 pr-4 py-4">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${lesson.status === 'locked' ? 'text-gray-400' : 'text-gray-800'}`}>{lesson.title}</h3>
                      <span className={`text-sm ${lesson.status === 'locked' ? 'text-gray-300' : 'text-gray-500'}`}>{lesson.duration}</span>
                    </div>

                    {(lesson.status === 'current' || lesson.status === 'done') && lesson.screen && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); setActiveScreen(lesson.screen); }}
                          data-testid={`lesson-read-btn-${lesson.id}`}
                          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all ${
                            lesson.status === 'done'
                              ? 'text-teal-600 bg-teal-50 border border-teal-200 hover:bg-teal-100'
                              : 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'
                          }`}
                        >
                          <BookOpen size={16} />
                          {lesson.status === 'done' ? 'Read again' : 'Read'}
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          data-testid={`lesson-listen-btn-${lesson.id}`}
                          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all ${
                            lesson.status === 'done'
                              ? 'text-teal-600 bg-teal-50 border border-teal-200 hover:bg-teal-100'
                              : 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'
                          }`}
                        >
                          <Volume2 size={16} />
                          {lesson.status === 'done' ? 'Listen again' : 'Listen'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
        {/* Week Tracker Card */}
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

        {/* Today's Plan Header */}
        <h2 className="font-semibold text-gray-800 text-lg mb-3">Today's Plan</h2>

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
