import React from 'react';
import { Sparkles, Award, Zap, ChevronRight, ChevronLeft } from 'lucide-react';

const StreakScreen = ({ setActiveScreen }) => {
  return (
    <div className="min-h-screen bg-white lg:bg-gray-50" data-testid="streak-screen">
      <div className="lg:max-w-[720px] lg:mx-auto lg:bg-white lg:min-h-screen lg:shadow-sm">
        {/* Top bar - Desktop only */}
        <div className="hidden lg:flex items-center justify-between px-8 py-5 border-b border-gray-100">
          <button 
            onClick={() => setActiveScreen('home')} 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>
          
          <span className="font-semibold text-gray-800">Fynny Earned!</span>
          
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
            <Award size={20} className="text-amber-500" />
          </div>
        </div>

        <div className="flex flex-col min-h-screen lg:min-h-[calc(100vh-80px)]">
          {/* Mobile: Full gradient background */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-amber-50 to-orange-50 lg:bg-transparent lg:py-12">
            
            {/* Illustration */}
            <div className="relative mb-8">
              <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                <Award size={64} className="text-white lg:w-20 lg:h-20" />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                <Sparkles size={20} className="text-white lg:w-6 lg:h-6" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center">
                <Zap size={16} className="text-white lg:w-5 lg:h-5" />
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">You earned a Fynny!</h1>
            <p className="text-gray-600 text-lg lg:text-xl mb-10 max-w-md">Keep up the great work on your financial wellness journey.</p>

            {/* Progress Card */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-amber-200 w-full max-w-sm lg:max-w-md mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 font-medium lg:text-lg">Today's Progress</span>
                <span className="text-amber-600 font-bold lg:text-lg">1/3 complete</span>
              </div>
              <div className="h-3 lg:h-4 bg-amber-100 rounded-full overflow-hidden mb-4">
                <div className="h-full w-1/3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Award size={20} className="text-white lg:w-6 lg:h-6" />
                </div>
                <span className="text-gray-800 font-semibold lg:text-lg">12 Fynnies total</span>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 lg:bg-white lg:border lg:border-pink-200 rounded-2xl p-5 lg:p-6 w-full max-w-sm lg:max-w-md">
              <p className="text-pink-700 lg:text-gray-700 text-center lg:text-lg">
                <span className="font-semibold">Did you know?</span> Users who earn 5+ Fynnies per week report <span className="bg-pink-100 px-1 rounded">40% less financial stress!</span>
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="p-5 lg:px-8 lg:py-6 bg-white border-t border-gray-100">
            <button
              onClick={() => setActiveScreen('home')}
              data-testid="streak-continue-btn"
              className="w-full lg:w-auto lg:min-w-[200px] lg:float-right py-4 lg:py-3 px-8 rounded-full font-semibold text-lg lg:text-base shadow-md transition-all bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white flex items-center justify-center gap-2"
            >
              Continue
              <ChevronRight size={20} />
            </button>
            <div className="lg:clear-both"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakScreen;
