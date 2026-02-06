import React from 'react';
import { Sparkles, Award, Zap, ChevronRight } from 'lucide-react';

const StreakScreen = ({ setActiveScreen }) => {
  return (
    <div className="max-w-lg mx-auto bg-gradient-to-b from-amber-50 to-orange-50 min-h-screen flex flex-col" data-testid="streak-screen">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-6">
          <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
            <Award size={64} className="text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <div className="absolute -bottom-1 -left-1 w-8 h-8 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">You earned a Fynny!</h1>
        <p className="text-gray-600 text-lg mb-8">Keep up the great work on your financial wellness journey.</p>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-200 w-full max-w-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 font-medium">Today's Progress</span>
            <span className="text-amber-600 font-bold">1/3 complete</span>
          </div>
          <div className="h-3 bg-amber-100 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
              <Award size={16} className="text-white" />
            </div>
            <span className="text-gray-800 font-semibold">12 Fynnies total</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-5 border border-pink-200 w-full max-w-sm">
          <p className="text-pink-700 text-center">
            <span className="font-semibold">Did you know?</span> Users who earn 5+ Fynnies per week report 40% less financial stress!
          </p>
        </div>
      </div>

      <div className="p-5 bg-white border-t border-gray-100">
        <button
          onClick={() => setActiveScreen('home')}
          data-testid="streak-continue-btn"
          className="w-full py-4 rounded-full font-semibold text-lg shadow-md transition-all bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white flex items-center justify-center gap-2"
        >
          Continue
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default StreakScreen;
