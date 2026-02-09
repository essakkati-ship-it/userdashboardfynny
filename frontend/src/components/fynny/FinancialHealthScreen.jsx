import React, { useState } from 'react';
import {
  ChevronLeft, TrendingUp, TrendingDown, Lightbulb, Award, 
  ArrowUp, ArrowDown, DollarSign, ShoppingCart, Coffee, Home,
  Car, Utensils, Sparkles, Heart, Target, BarChart3, PieChart,
  Activity, Zap, Star, ChevronRight
} from 'lucide-react';

const FinancialHealthScreen = ({ setActiveScreen }) => {
  const [activeTab, setActiveTab] = useState('trends');

  // Trends Data
  const spendingTrends = [
    { category: 'Food & Dining', amount: 342, change: -12, icon: Utensils, color: 'orange' },
    { category: 'Shopping', amount: 189, change: 8, icon: ShoppingCart, color: 'pink' },
    { category: 'Transport', amount: 156, change: -5, icon: Car, color: 'blue' },
    { category: 'Housing', amount: 850, change: 0, icon: Home, color: 'green' },
    { category: 'Entertainment', amount: 95, change: 23, icon: Coffee, color: 'purple' },
  ];

  const weeklyData = [
    { day: 'Mon', amount: 45, goal: 60 },
    { day: 'Tue', amount: 32, goal: 60 },
    { day: 'Wed', amount: 78, goal: 60 },
    { day: 'Thu', amount: 56, goal: 60 },
    { day: 'Fri', amount: 89, goal: 60 },
    { day: 'Sat', amount: 67, goal: 60 },
    { day: 'Sun', amount: 23, goal: 60 },
  ];

  // Financial Insights Data
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

  // My Fynny Data
  const fynnyStats = {
    totalEarned: 47,
    thisWeek: 12,
    streak: 8,
    level: 'Money Mindful',
    nextLevel: 'Budget Boss',
    progress: 68
  };

  const achievements = [
    { id: 1, title: 'First Steps', desc: 'Completed your first lesson', earned: true, icon: Star },
    { id: 2, title: 'Week Warrior', desc: '7-day learning streak', earned: true, icon: Zap },
    { id: 3, title: 'Budget Beginner', desc: 'Set your first budget', earned: true, icon: Target },
    { id: 4, title: 'Insight Seeker', desc: 'Viewed 10 financial insights', earned: true, icon: Lightbulb },
    { id: 5, title: 'Savings Star', desc: 'Saved for 4 weeks straight', earned: false, icon: Award },
    { id: 6, title: 'Money Master', desc: 'Complete all courses', earned: false, icon: Heart },
  ];

  const renderTrends = () => (
    <div className="space-y-6">
      {/* Weekly Spending Chart */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Weekly Spending</h3>
          <span className="text-sm text-gray-500">Goal: $60/day</span>
        </div>
        <div className="flex items-end justify-between gap-2 h-32">
          {weeklyData.map((item, i) => {
            const height = (item.amount / 100) * 100;
            const isOverBudget = item.amount > item.goal;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-600">${item.amount}</span>
                <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100px' }}>
                  <div 
                    className={`absolute bottom-0 w-full rounded-t-lg transition-all ${
                      isOverBudget 
                        ? 'bg-gradient-to-t from-rose-400 to-rose-300' 
                        : 'bg-gradient-to-t from-teal-400 to-teal-300'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  <div 
                    className="absolute w-full border-t-2 border-dashed border-amber-400"
                    style={{ bottom: `${(item.goal / 100) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-500">{item.day}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-teal-400"></div>
            <span className="text-xs text-gray-600">Under budget</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-rose-400"></div>
            <span className="text-xs text-gray-600">Over budget</span>
          </div>
        </div>
      </div>

      {/* Category Trends */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Spending by Category</h3>
        <div className="space-y-3">
          {spendingTrends.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.color === 'orange' ? 'bg-orange-100' :
                  item.color === 'pink' ? 'bg-pink-100' :
                  item.color === 'blue' ? 'bg-blue-100' :
                  item.color === 'green' ? 'bg-green-100' :
                  'bg-purple-100'
                }`}>
                  <IconComponent size={18} className={`${
                    item.color === 'orange' ? 'text-orange-500' :
                    item.color === 'pink' ? 'text-pink-500' :
                    item.color === 'blue' ? 'text-blue-500' :
                    item.color === 'green' ? 'text-green-500' :
                    'text-purple-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{item.category}</p>
                  <p className="text-gray-500 text-xs">${item.amount} this month</p>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  item.change < 0 ? 'bg-green-100 text-green-700' :
                  item.change > 0 ? 'bg-rose-100 text-rose-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {item.change !== 0 && (
                    item.change < 0 ? <ArrowDown size={12} /> : <ArrowUp size={12} />
                  )}
                  {item.change === 0 ? 'No change' : `${Math.abs(item.change)}%`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Overview */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-5 border border-teal-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
            <PieChart size={20} className="text-teal-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Monthly Overview</h3>
            <p className="text-sm text-gray-500">January 2026</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-gray-800">$1,632</p>
            <p className="text-xs text-gray-500">Total Spent</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-teal-600">$368</p>
            <p className="text-xs text-gray-500">Saved</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-amber-600">82%</p>
            <p className="text-xs text-gray-500">Budget Used</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInsights = () => (
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

  const renderMyFynny = () => (
    <div className="space-y-5">
      {/* Fynny Overview Card */}
      <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-2 right-4 opacity-20">
          <Award size={80} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Award size={24} />
            <span className="font-bold text-lg">My Fynnies</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-5xl font-bold">{fynnyStats.totalEarned}</span>
            <span className="text-white/80">total earned</span>
          </div>
          <p className="text-white/90 text-sm">+{fynnyStats.thisWeek} this week</p>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-500">Current Level</p>
            <h3 className="font-bold text-gray-800 text-lg">{fynnyStats.level}</h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Next Level</p>
            <h3 className="font-semibold text-pink-500">{fynnyStats.nextLevel}</h3>
          </div>
        </div>
        <div className="relative">
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all"
              style={{ width: `${fynnyStats.progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">{fynnyStats.progress}% to next level</p>
        </div>
      </div>

      {/* Streak Card */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-5 border border-pink-200">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
            <Zap size={28} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Streak</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-800">{fynnyStats.streak}</span>
              <span className="text-gray-600">days</span>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-pink-600 font-medium">Keep it going!</p>
            <p className="text-xs text-gray-500">Best: 12 days</p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Achievements</h3>
          <span className="text-sm text-gray-500">{achievements.filter(a => a.earned).length}/{achievements.length}</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement) => {
            const IconComponent = achievement.icon;
            return (
              <div 
                key={achievement.id}
                className={`p-3 rounded-xl text-center transition-all ${
                  achievement.earned 
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200' 
                    : 'bg-gray-50 border border-gray-200 opacity-50'
                }`}
                data-testid={`achievement-${achievement.id}`}
              >
                <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                  achievement.earned ? 'bg-amber-100' : 'bg-gray-200'
                }`}>
                  <IconComponent size={18} className={achievement.earned ? 'text-amber-600' : 'text-gray-400'} />
                </div>
                <p className={`text-xs font-medium ${achievement.earned ? 'text-gray-800' : 'text-gray-400'}`}>
                  {achievement.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fynny History */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Completed daily lesson', fynnies: 1, time: 'Today' },
            { action: 'Logged spending 3 times', fynnies: 1, time: 'Today' },
            { action: 'Weekly commitment achieved', fynnies: 3, time: 'Yesterday' },
            { action: 'Completed literacy check', fynnies: 1, time: '2 days ago' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <Award size={14} className="text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">{item.action}</p>
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>
              <span className="text-amber-600 font-semibold text-sm">+{item.fynnies}</span>
            </div>
          ))}
        </div>
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

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-5 bg-gray-100 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('trends')}
          data-testid="tab-trends"
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'trends'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5">
            <TrendingUp size={16} />
            Trends
          </div>
        </button>
        <button
          onClick={() => setActiveTab('insights')}
          data-testid="tab-insights"
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'insights'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5">
            <Lightbulb size={16} />
            Insights
          </div>
        </button>
        <button
          onClick={() => setActiveTab('fynny')}
          data-testid="tab-fynny"
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'fynny'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5">
            <Award size={16} />
            My Fynny
          </div>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'trends' && renderTrends()}
      {activeTab === 'insights' && renderInsights()}
      {activeTab === 'fynny' && renderMyFynny()}
    </div>
  );
};

export default FinancialHealthScreen;
