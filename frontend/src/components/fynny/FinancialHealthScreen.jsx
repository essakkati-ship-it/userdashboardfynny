import React, { useState } from 'react';
import {
  ChevronLeft, TrendingUp, TrendingDown, Lightbulb, Award, 
  ArrowUp, ArrowDown, ArrowRight, DollarSign, ShoppingCart, Coffee, Home,
  Car, Utensils, Sparkles, Heart, Target, BarChart3, PieChart,
  Activity, Zap, Star, ChevronRight, BookOpen, Smile, Brain,
  Mountain, Briefcase, Wallet, PiggyBank
} from 'lucide-react';

const FinancialHealthScreen = ({ setActiveScreen }) => {
  const [activeTab, setActiveTab] = useState('trends');

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

  const moodData = [
    { day: 'M', score: 65 },
    { day: 'T', score: 45 },
    { day: 'W', score: 70 },
    { day: 'T', score: 55 },
    { day: 'F', score: 80 },
    { day: 'S', score: 75 },
    { day: 'S', score: 85 }
  ];

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
  const maxMood = 100;

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

      {/* Mood Chart */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-800">Mood</h3>
          <button className="text-sm text-[#E85A99] hover:text-pink-600 font-medium">See full graph</button>
        </div>
        <p className="text-sm text-gray-500 mb-4">68/100 average daily score</p>

        <div className="flex items-end justify-between h-24 gap-2">
          {moodData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '80px' }}>
                <div
                  className="absolute bottom-0 w-full rounded-t-lg bg-indigo-500"
                  style={{ height: `${(item.score / maxMood) * 100}%`, minHeight: '8px' }}
                />
              </div>
              <span className="text-xs text-gray-500 mt-2 font-medium">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // FINANCIAL INSIGHTS TAB
  const renderInsightsTab = () => (
    <div className="space-y-5">
      {/* Debt Overview Card */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-5 border border-pink-200 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <TrendingDown className="w-5 h-5 text-[#E85A99]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Debt Overview</h3>
            <p className="text-xs text-gray-500">Track your debt reduction</p>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">€2,450</span>
          <span className="text-sm text-emerald-600 font-medium">-€320 this month</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">At this rate, you'll be debt-free in 8 months</p>
        <button className="mt-3 text-[#E85A99] hover:text-pink-600 font-medium text-sm flex items-center gap-1">
          View breakdown <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Net Worth Card */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-5 border border-emerald-200 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Net Worth</h3>
            <p className="text-xs text-gray-500">Your total financial picture</p>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">€8,720</span>
          <span className="text-sm text-emerald-600 font-medium">+€1,240 this month</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">You're building wealth faster than 72% of users</p>
        <button className="mt-3 text-[#E85A99] hover:text-pink-600 font-medium text-sm flex items-center gap-1">
          See assets & liabilities <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Financial Stress Age Card */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-5 border border-indigo-200 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Smile className="w-5 h-5 text-indigo-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Financial Stress Age</h3>
            <p className="text-xs text-gray-500">How old your finances make you feel</p>
          </div>
        </div>
        <div className="flex items-center gap-6 mt-2">
          <div className="text-center">
            <span className="text-3xl font-bold text-gray-900">32</span>
            <p className="text-xs text-gray-500">Your stress age</p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold text-emerald-500">25</span>
            <p className="text-xs text-gray-500">Your actual age</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-3">Keep learning to reduce your stress age by 5 years</p>
        <button className="mt-3 text-[#E85A99] hover:text-pink-600 font-medium text-sm flex items-center gap-1">
          See the future you <ArrowRight className="w-4 h-4" />
        </button>
      </div>
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
