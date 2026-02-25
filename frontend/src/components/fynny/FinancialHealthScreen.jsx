import React, { useState } from 'react';
import {
  ChevronLeft, TrendingUp, TrendingDown, Lightbulb, Award, 
  ArrowUp, ArrowDown, ArrowRight, DollarSign, ShoppingCart, Coffee, Home,
  Car, Utensils, Sparkles, Heart, Target, BarChart3, PieChart,
  Activity, Zap, Star, ChevronRight, BookOpen, Smile, Brain,
  Mountain, Briefcase, Wallet, PiggyBank, Pencil, X
} from 'lucide-react';
import { getMoodFromScore } from './MoodCheckInFlow';

const FinancialHealthScreen = ({ setActiveScreen }) => {
  const [activeTab, setActiveTab] = useState('trends');
  const [selectedMoodDay, setSelectedMoodDay] = useState(null);
  const [showMoodGraph, setShowMoodGraph] = useState(false);

  // Data matching the reference project
  const spendingData = [
    { day: 'M', amount: 45, status: 'green' },
    { day: 'T', amount: 120, status: 'orange' },
    { day: 'W', amount: 85, status: 'green' },
    { day: 'T', amount: 200, status: 'pink' },
    { day: 'F', amount: 150, status: 'orange' },
    { day: 'S', amount: 180, status: 'pink' },
    { day: 'S', amount: 30, status: 'green' }
  ];

  const lessonsData = [
    { day: 'M', count: 4 },
    { day: 'T', count: 1 },
    { day: 'W', count: 0 },
    { day: 'T', count: 7 },
    { day: 'F', count: 2 },
    { day: 'S', count: 5 },
    { day: 'S', count: 3 }
  ];

  const wealthData = [
    { day: 'M', amount: 50 },
    { day: 'T', amount: 75 },
    { day: 'W', amount: 60 },
    { day: 'T', amount: 100 },
    { day: 'F', amount: 80 },
    { day: 'S', amount: 120 },
    { day: 'S', amount: 90 }
  ];

  // Enhanced mood data with dates and notes
  const moodData = [
    { day: 'M', date: 'Feb 13', score: 65, note: 'Felt a bit anxious about bills' },
    { day: 'T', date: 'Feb 14', score: 45, note: 'Unexpected expense came up' },
    { day: 'W', date: 'Feb 15', score: 70, note: '' },
    { day: 'T', date: 'Feb 16', score: 55, note: 'Working on budget helped' },
    { day: 'F', date: 'Feb 17', score: 80, note: 'Payday - feeling good!' },
    { day: 'S', date: 'Feb 18', score: 75, note: '' },
    { day: 'S', date: 'Feb 19', score: 85, note: 'Stayed within weekend budget' }
  ];

  const maxMood = Math.max(...moodData.map(d => d.score));

  // Course modules for My Fynny journey
  const courseModules = [
    {
      id: 1,
      title: 'How Money Feels',
      subtitle: 'Discover the emotions behind your spending',
      icon: Heart,
      bgColor: 'from-pink-100 to-rose-100',
      iconColor: 'text-[#E85A99]',
      completed: true
    },
    {
      id: 2,
      title: 'Success Beyond the Balance',
      subtitle: 'What financial wellness really means',
      icon: Mountain,
      bgColor: 'from-emerald-100 to-green-100',
      iconColor: 'text-emerald-500',
      completed: true
    },
    {
      id: 3,
      title: 'The Psychology of Money Habits',
      subtitle: 'Why we do what we do with money',
      icon: Brain,
      bgColor: 'from-pink-100 to-rose-100',
      iconColor: 'text-[#E85A99]',
      completed: false,
      current: true
    },
    {
      id: 4,
      title: 'The Secret to Lasting Financial Change',
      subtitle: 'Build habits that stick',
      icon: Briefcase,
      bgColor: 'from-orange-100 to-amber-100',
      iconColor: 'text-[#F97316]',
      completed: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'green': return 'bg-emerald-500';
      case 'orange': return 'bg-[#F97316]';
      case 'pink': return 'bg-[#E85A99]';
      default: return 'bg-gray-300';
    }
  };

  const maxSpending = Math.max(...spendingData.map(d => d.amount));
  const maxLessons = Math.max(...lessonsData.map(d => d.count));
  const maxWealth = Math.max(...wealthData.map(d => d.amount));
  const maxMood = Math.max(...moodData.map(d => d.score));

  // TRENDS TAB - Contains Spending, Lessons, Wealth Building, Mood
  const renderTrendsTab = () => (
    <div className="space-y-5">
      {/* Fynnies Summary Card */}
      <div className="bg-gradient-to-r from-orange-100 to-amber-50 rounded-2xl p-4 border border-orange-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#F97316] to-orange-400 rounded-full flex items-center justify-center shadow-md">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-orange-700">Fynnies Earned</p>
            <p className="text-2xl font-bold text-orange-900">12</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-orange-600">This week</p>
            <p className="text-sm font-medium text-orange-800">+3 from last week</p>
          </div>
        </div>
      </div>

      {/* Spending Chart */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-800">Spending</h3>
          <button className="text-sm text-[#E85A99] hover:text-pink-600 font-medium">See full graph</button>
        </div>
        <p className="text-sm text-gray-500 mb-4">€115 average daily spending</p>

        <div className="flex items-end justify-between h-32 gap-2">
          {spendingData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <span className="text-xs text-gray-600 mb-1">€{item.amount}</span>
              <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100px' }}>
                <div
                  className={`absolute bottom-0 w-full rounded-t-lg ${getStatusColor(item.status)}`}
                  style={{ height: `${(item.amount / maxSpending) * 100}%`, minHeight: '8px' }}
                />
              </div>
              <span className="text-xs text-gray-500 mt-2 font-medium">{item.day}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-gray-100 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-emerald-500"></div>
            <span className="text-gray-600">Under budget</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#F97316]"></div>
            <span className="text-gray-600">At budget</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#E85A99]"></div>
            <span className="text-gray-600">Over budget</span>
          </div>
        </div>
      </div>

      {/* Lessons Chart */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-800">Lessons</h3>
          <button className="text-sm text-[#E85A99] hover:text-pink-600 font-medium">See full graph</button>
        </div>
        <p className="text-sm text-gray-500 mb-4">22 lessons completed in last 7 days</p>

        <div className="flex items-end justify-between h-24 gap-2">
          {lessonsData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              {item.count > 0 && <span className="text-xs text-gray-600 mb-1">{item.count}</span>}
              <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '80px' }}>
                <div
                  className={`absolute bottom-0 w-full rounded-t-lg ${item.count > 0 ? 'bg-[#E85A99]' : 'bg-gray-200'}`}
                  style={{ height: item.count > 0 ? `${(item.count / maxLessons) * 100}%` : '8px', minHeight: '8px' }}
                />
              </div>
              <span className="text-xs text-gray-500 mt-2 font-medium">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wealth Building Chart */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-800">Wealth Building</h3>
          <button className="text-sm text-[#E85A99] hover:text-pink-600 font-medium">See full graph</button>
        </div>
        <p className="text-sm text-gray-500 mb-4">€575 saved this week</p>

        <div className="flex items-end justify-between h-24 gap-2">
          {wealthData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '80px' }}>
                <div
                  className="absolute bottom-0 w-full rounded-t-lg bg-emerald-500"
                  style={{ height: `${(item.amount / maxWealth) * 100}%`, minHeight: '8px' }}
                />
              </div>
              <span className="text-xs text-gray-500 mt-2 font-medium">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Chart - Bar Chart (like other tables) */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-800">Mood</h3>
          <button 
            onClick={() => setShowMoodGraph(true)}
            className="text-sm text-[#E85A99] hover:text-pink-600 font-medium"
          >
            See full graph
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">68/100 average daily score</p>

        {/* Bar Chart */}
        <div className="flex items-end justify-between h-24 gap-2">
          {moodData.map((item, index) => {
            const mood = getMoodFromScore(item.score);
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '80px' }}>
                  <div
                    className="absolute bottom-0 w-full rounded-t-lg transition-all"
                    style={{ 
                      height: `${(item.score / maxMood) * 100}%`, 
                      minHeight: '8px',
                      backgroundColor: mood.color 
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-2 font-medium">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Mood Graph Modal */}
      {showMoodGraph && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => { setShowMoodGraph(false); setSelectedMoodDay(null); }}
          />
          
          {/* Modal */}
          <div className="fixed inset-4 z-50 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Mood History</h2>
                <p className="text-sm text-gray-500">68/100 average daily score</p>
              </div>
              <button 
                onClick={() => { setShowMoodGraph(false); setSelectedMoodDay(null); }}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            
            {/* Graph Content */}
            <div className="flex-1 p-4 overflow-auto">
              <div className="relative h-64">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-8 w-8 flex flex-col justify-between text-xs text-gray-400 pr-2">
                  <span>100</span>
                  <span>80</span>
                  <span>60</span>
                  <span>40</span>
                  <span>20</span>
                  <span>0</span>
                </div>
                
                {/* Grid lines */}
                <div className="absolute left-10 right-2 top-0 bottom-8">
                  {[0, 20, 40, 60, 80, 100].map((val) => (
                    <div 
                      key={val} 
                      className="absolute w-full border-t border-gray-100"
                      style={{ top: `${100 - val}%` }}
                    />
                  ))}
                </div>
                
                {/* SVG Line Chart - Fixed to connect properly */}
                <svg 
                  className="absolute left-10 right-2 top-0 bottom-8" 
                  preserveAspectRatio="none"
                  style={{ overflow: 'visible' }}
                >
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F97316" />
                      <stop offset="50%" stopColor="#FBBF24" />
                      <stop offset="100%" stopColor="#14B8A6" />
                    </linearGradient>
                  </defs>
                  {/* Line path connecting all points */}
                  <polyline
                    points={moodData.map((d, i) => {
                      const x = (i / (moodData.length - 1)) * 100;
                      const y = 100 - d.score;
                      return `${x}%,${y}%`;
                    }).join(' ')}
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                
                {/* Data points */}
                <div className="absolute left-10 right-2 top-0 bottom-8">
                  {moodData.map((d, i) => {
                    const mood = getMoodFromScore(d.score);
                    const leftPercent = (i / (moodData.length - 1)) * 100;
                    const topPercent = 100 - d.score;
                    const isSelected = selectedMoodDay === i;
                    
                    return (
                      <div 
                        key={i} 
                        className="absolute"
                        style={{ 
                          left: `${leftPercent}%`, 
                          top: `${topPercent}%`, 
                          transform: 'translate(-50%, -50%)' 
                        }}
                      >
                        {/* Tooltip popup */}
                        {isSelected && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-20 animate-fade-in">
                            <div className="bg-gray-800 rounded-xl p-3 shadow-lg min-w-[140px]">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-2xl font-bold text-white">{d.score}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setSelectedMoodDay(null); }}
                                  className="text-gray-400 hover:text-white"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                              <p className="text-gray-400 text-xs uppercase mb-2">{d.date}</p>
                              {d.note ? (
                                <div className="flex items-start gap-1 text-white text-xs bg-gray-700 rounded-lg px-2 py-1.5">
                                  <Pencil size={10} className="mt-0.5 flex-shrink-0" />
                                  <span>{d.note}</span>
                                </div>
                              ) : (
                                <button className="flex items-center gap-1 text-gray-400 text-xs hover:text-white">
                                  <Pencil size={10} />
                                  <span>Add Note</span>
                                </button>
                              )}
                            </div>
                            {/* Arrow */}
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-800 rotate-45" />
                          </div>
                        )}
                        
                        {/* Data point circle */}
                        <button
                          onClick={() => setSelectedMoodDay(isSelected ? null : i)}
                          className={`w-5 h-5 rounded-full border-2 border-white shadow-lg transition-transform hover:scale-125 ${isSelected ? 'scale-125 ring-2 ring-offset-2' : ''}`}
                          style={{ backgroundColor: mood.color, ringColor: mood.color }}
                          data-testid={`mood-point-${i}`}
                        />
                      </div>
                    );
                  })}
                </div>
                
                {/* X-axis labels (dates) */}
                <div className="absolute left-10 right-2 bottom-0 flex justify-between text-xs text-gray-500">
                  {moodData.map((d, i) => (
                    <span key={i} className="text-center">{d.date}</span>
                  ))}
                </div>
              </div>
              
              {/* Legend */}
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#14B8A6]" />
                  <span className="text-xs text-gray-600">Calm/Motivated</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FBBF24]" />
                  <span className="text-xs text-gray-600">Stressed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#F97316]" />
                  <span className="text-xs text-gray-600">Overwhelmed</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translate(-50%, -50%) translateY(4px); }
          to { opacity: 1; transform: translate(-50%, -50%) translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );

  // FINANCIAL INSIGHTS TAB - Original version with personalized insights
  const insights = [
    {
      id: 1,
      type: 'positive',
      title: 'Great progress on food spending!',
      description: 'You spent 12% less on dining out this week compared to last week.',
      tip: 'Keep it up! Consider meal prepping on Sundays to maintain this trend.',
      icon: Utensils,
      color: 'green'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Entertainment spending increased',
      description: 'Your entertainment expenses went up by 23% this month.',
      tip: 'Try free activities like hiking or game nights at home.',
      icon: Coffee,
      color: 'amber'
    },
    {
      id: 3,
      type: 'insight',
      title: 'You tend to spend more on weekends',
      description: 'Friday and Saturday account for 45% of your weekly spending.',
      tip: 'Set a weekend budget limit to stay on track.',
      icon: BarChart3,
      color: 'blue'
    },
    {
      id: 4,
      type: 'positive',
      title: 'Consistent savings streak!',
      description: "You've saved money every week for the past month.",
      tip: 'Consider increasing your automatic savings by just 5%.',
      icon: TrendingUp,
      color: 'teal'
    }
  ];

  const renderInsightsTab = () => (
    <div className="space-y-4">
      {/* Summary Card */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb size={20} />
          <span className="font-medium">Your Financial Snapshot</span>
        </div>
        <p className="text-white/90 text-sm mb-4">
          Based on your spending patterns, you're doing well! Here are personalized insights to help you improve further.
        </p>
        <div className="flex items-center gap-2">
          <Activity size={16} />
          <span className="text-sm">4 new insights this week</span>
        </div>
      </div>

      {/* Insight Cards */}
      {insights.map((insight) => {
        const IconComponent = insight.icon;
        return (
          <div 
            key={insight.id} 
            className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm"
            data-testid={`insight-card-${insight.id}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${
                insight.color === 'green' ? 'bg-green-100' :
                insight.color === 'amber' ? 'bg-amber-100' :
                insight.color === 'blue' ? 'bg-blue-100' :
                'bg-teal-100'
              }`}>
                <IconComponent size={20} className={`${
                  insight.color === 'green' ? 'text-green-600' :
                  insight.color === 'amber' ? 'text-amber-600' :
                  insight.color === 'blue' ? 'text-blue-600' :
                  'text-teal-600'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {insight.type === 'positive' && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Positive</span>
                  )}
                  {insight.type === 'warning' && (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Heads up</span>
                  )}
                  {insight.type === 'insight' && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Pattern</span>
                  )}
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{insight.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{insight.description}</p>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <Sparkles size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700"><strong>Tip:</strong> {insight.tip}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // MY FYNNY TAB - Course Map Journey
  const renderMyFynnyTab = () => (
    <div className="py-4">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-gray-800">Your Learning Journey</h3>
        <p className="text-sm text-gray-500 mt-1">Follow the path to financial calm</p>
      </div>

      <div className="relative max-w-md mx-auto">
        {/* Journey Path SVG */}
        <svg
          className="absolute left-0 top-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
          viewBox="0 0 400 600"
          preserveAspectRatio="none"
        >
          <path
            d="M 100 60
               C 100 100, 300 100, 300 160
               C 300 220, 100 220, 100 280
               C 100 340, 300 340, 300 400
               C 300 460, 100 460, 100 520"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
        </svg>

        {/* Modules */}
        <div className="relative space-y-12" style={{ zIndex: 1 }}>
          {courseModules.map((module, index) => {
            const isLeft = index % 2 === 0;
            const ModuleIcon = module.icon;
            return (
              <div
                key={module.id}
                className={`flex items-center gap-4 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Icon Circle */}
                <div className={`relative flex-shrink-0 ${isLeft ? 'ml-4' : 'mr-4'}`}>
                  <div className={`w-20 h-20 bg-gradient-to-br ${module.bgColor} rounded-full flex items-center justify-center shadow-lg relative`}>
                    <ModuleIcon className={`w-10 h-10 ${module.iconColor}`} />
                    {/* Sparkle decoration */}
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>
                    {/* Completed checkmark */}
                    {module.completed && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    {/* Current indicator */}
                    {module.current && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#F97316] rounded-full flex items-center justify-center shadow animate-pulse">
                        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Card */}
                <div className={`flex-1 ${isLeft ? 'text-left' : 'text-right'}`}>
                  <div className={`inline-block bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 ${module.current ? 'ring-2 ring-[#E85A99]' : ''}`}>
                    <div className="p-4 max-w-[220px]">
                      <h4 className={`font-semibold ${module.completed ? 'text-gray-500' : 'text-gray-800'}`}>
                        <span className="border-b-2 border-dashed border-gray-300">{module.title}</span>
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">{module.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom encouragement */}
      <div className="text-center mt-8 pt-4 border-t border-gray-100">
        <p className="text-gray-400 text-sm">Take your time. Every small step counts.</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-xl" data-testid="financial-health-screen">
      <header className="mb-5">
        <button 
          onClick={() => setActiveScreen('home')} 
          className="text-sm text-gray-500 mb-3 hover:text-gray-700 flex items-center gap-1 transition-colors"
          data-testid="financial-health-back-btn"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Financial Health</h1>
        <p className="text-gray-500 mt-1">Track your progress and insights</p>
      </header>

      {/* Tab Navigation - Underline style matching reference */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('trends')}
            data-testid="tab-trends"
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'trends' 
                ? 'text-[#E85A99] border-[#E85A99]' 
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Trends
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            data-testid="tab-insights"
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'insights' 
                ? 'text-[#E85A99] border-[#E85A99]' 
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Financial Insights
          </button>
          <button
            onClick={() => setActiveTab('fynny')}
            data-testid="tab-fynny"
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'fynny' 
                ? 'text-[#E85A99] border-[#E85A99]' 
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            My Fynny
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'trends' && renderTrendsTab()}
      {activeTab === 'insights' && renderInsightsTab()}
      {activeTab === 'fynny' && renderMyFynnyTab()}
    </div>
  );
};

export default FinancialHealthScreen;
