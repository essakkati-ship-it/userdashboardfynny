import React from 'react';
import {
  ChevronLeft, Check, ChevronRight, Bookmark, Settings, Calculator, Star, TrendingUp, Award, PiggyBank
} from 'lucide-react';

// Saved Lessons Screen
export const SavedLessonsScreen = ({ setActiveScreen }) => (
  <div className="max-w-xl" data-testid="saved-lessons-screen">
    <header className="mb-5">
      <button 
        onClick={() => setActiveScreen('home')} 
        className="text-sm text-gray-500 mb-3 hover:text-gray-700 flex items-center gap-1 transition-colors"
        data-testid="saved-back-btn"
      >
        <ChevronLeft size={16} /> Back
      </button>
      <h1 className="text-2xl font-semibold text-gray-800">Saved Lessons</h1>
      <p className="text-gray-500 mt-1">Lessons you've bookmarked for later</p>
    </header>

    <div className="space-y-3">
      {[
        { title: 'Understanding emotional spending', theme: 'How Money Feels', color: 'pink' },
        { title: 'The 24-hour rule for purchases', theme: 'Money Habits', color: 'purple' },
        { title: 'Celebrating non-financial wins', theme: 'Success Beyond Balance', color: 'green' },
      ].map((lesson, i) => (
        <div 
          key={i} 
          className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
          data-testid={`saved-lesson-${i}`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              lesson.color === 'pink' ? 'bg-pink-100' : 
              lesson.color === 'purple' ? 'bg-purple-100' : 
              'bg-green-100'
            }`}>
              <Bookmark size={18} className={`${
                lesson.color === 'pink' ? 'text-pink-500' : 
                lesson.color === 'purple' ? 'text-purple-500' : 
                'text-green-500'
              }`} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 mb-1">{lesson.title}</h3>
              <p className="text-xs text-gray-400">{lesson.theme}</p>
            </div>
            <ChevronRight size={20} className="text-gray-300" />
          </div>
        </div>
      ))}
    </div>

    <div className="mt-6 text-center p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
      <Bookmark size={32} className="text-gray-300 mx-auto mb-2" />
      <p className="text-sm text-gray-500">Tap the bookmark icon during lessons to save them here</p>
    </div>
  </div>
);

// Payment Plan Screen
export const PaymentPlanScreen = ({ setActiveScreen }) => (
  <div className="max-w-xl" data-testid="payment-plan-screen">
    <header className="mb-5">
      <button 
        onClick={() => setActiveScreen('home')} 
        className="text-sm text-gray-500 mb-3 hover:text-gray-700 flex items-center gap-1 transition-colors"
        data-testid="payment-back-btn"
      >
        <ChevronLeft size={16} /> Back
      </button>
      <h1 className="text-2xl font-semibold text-gray-800">Payment Plan</h1>
      <p className="text-gray-500 mt-1">Manage your subscription</p>
    </header>

    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-5 border border-teal-200 shadow-sm mb-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold uppercase text-teal-600 tracking-wide">Current Plan</span>
          <h2 className="text-xl font-semibold text-gray-800 mt-1">Fynny Premium</h2>
        </div>
        <div className="bg-teal-100 px-3 py-1.5 rounded-full">
          <span className="text-sm font-semibold text-teal-700">Active</span>
        </div>
      </div>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-3xl font-bold text-gray-800">$14.99</span>
        <span className="text-gray-500">/month</span>
      </div>
      <p className="text-sm text-gray-600 mb-4">Next billing date: February 15, 2026</p>
      <div className="border-t border-teal-200 pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Includes:</h4>
        <ul className="space-y-2">
          {['Unlimited learning modules', 'Daily check-ins and tracking', 'Personalized insights', 'All calculators and tools'].map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
              <Check size={16} className="text-teal-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <button 
      className="w-full py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
      data-testid="manage-subscription-btn"
    >
      Manage subscription
    </button>
  </div>
);

// Calculators Screen
export const CalculatorsScreen = ({ setActiveScreen }) => {
  const calculators = [
    { name: 'Savings Goal', desc: 'Plan your savings journey', Icon: PiggyBank, color: 'pink' },
    { name: 'Budget Planner', desc: 'Balance your income', Icon: Calculator, color: 'blue' },
    { name: 'Debt Payoff', desc: 'Create a payoff plan', Icon: TrendingUp, color: 'green' },
    { name: 'Emergency Fund', desc: 'How much do you need?', Icon: Award, color: 'amber' },
  ];

  return (
    <div className="max-w-xl" data-testid="calculators-screen">
      <header className="mb-5">
        <button 
          onClick={() => setActiveScreen('home')} 
          className="text-sm text-gray-500 mb-3 hover:text-gray-700 flex items-center gap-1 transition-colors"
          data-testid="calculators-back-btn"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Calculators</h1>
        <p className="text-gray-500 mt-1">Tools to help you plan and understand</p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {calculators.map((calc, i) => {
          const CalcIcon = calc.Icon;
          return (
            <button 
              key={i} 
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all text-left"
              data-testid={`calculator-${i}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                calc.color === 'pink' ? 'bg-pink-100' :
                calc.color === 'blue' ? 'bg-blue-100' :
                calc.color === 'green' ? 'bg-green-100' :
                'bg-amber-100'
              }`}>
                <CalcIcon size={24} className={`${
                  calc.color === 'pink' ? 'text-pink-500' :
                  calc.color === 'blue' ? 'text-blue-500' :
                  calc.color === 'green' ? 'text-green-500' :
                  'text-amber-500'
                }`} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{calc.name}</h3>
              <p className="text-xs text-gray-500">{calc.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Settings Placeholder Screen
export const PlaceholderScreen = ({ title, setActiveScreen }) => (
  <div className="max-w-xl" data-testid="placeholder-screen">
    <header className="mb-5">
      <button 
        onClick={() => setActiveScreen('home')} 
        className="text-sm text-gray-500 mb-3 hover:text-gray-700 flex items-center gap-1 transition-colors"
        data-testid="placeholder-back-btn"
      >
        <ChevronLeft size={16} /> Back
      </button>
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
    </header>
    <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center shadow-sm">
      <Settings size={40} className="text-gray-300 mx-auto mb-3" />
      <p className="text-gray-500">Coming soon...</p>
    </div>
  </div>
);
