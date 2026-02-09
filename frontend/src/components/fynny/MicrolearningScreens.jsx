import React, { useState } from 'react';
import {
  ChevronLeft, Check, Sparkles, Award, Sun,
  Clock, Zap, Target, Leaf, Lightbulb, TrendingUp
} from 'lucide-react';

// Shared layout components for consistent desktop/mobile experience
const DesktopIllustration = ({ children, className = "" }) => (
  <div className={`hidden lg:flex items-center justify-center py-8 ${className}`}>
    <div className="relative">{children}</div>
  </div>
);

const MobileIllustration = ({ children, className = "" }) => (
  <div className={`lg:hidden ${className}`}>{children}</div>
);

// Literacy Check Screen
export const LiteracyCheckScreen = ({ setActiveScreen }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const totalPages = 4;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      setSelectedAnswer(null);
    } else {
      setActiveScreen('home');
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setSelectedAnswer(null);
    }
  };

  const pages = [
    { cta: "Check Answer", title: "Question 1" },
    { cta: "Continue", title: "Question 2" },
    { cta: "Continue", title: "Question 3" },
    { cta: "Back to Home", title: "Results" },
  ];

  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return (
          <div className="flex-1 overflow-auto">
            <MobileIllustration className="bg-gradient-to-br from-amber-100 via-amber-50 to-orange-50 p-8 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                <Sun size={48} className="text-white" />
              </div>
            </MobileIllustration>

            <DesktopIllustration className="py-10">
              <div className="w-28 h-28 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                <Sun size={56} className="text-white" />
              </div>
              <Sparkles size={24} className="text-amber-400 absolute -top-2 -right-2" />
            </DesktopIllustration>

            <div className="p-5 lg:p-0 lg:py-6">
              <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                QUESTION 1 OF 3
              </div>

              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
                If you have $100 in savings at 2% annual interest, how much will you have after 1 year?
              </h2>

              <div className="space-y-3">
                {['$98', '$100', '$102', '$120'].map((answer, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedAnswer(i)}
                    data-testid={`answer-${i}`}
                    className={`w-full p-4 lg:p-5 rounded-xl text-left transition-all ${
                      selectedAnswer === i
                        ? 'bg-amber-100 border-2 border-amber-400'
                        : 'bg-gray-50 lg:bg-white lg:border lg:border-gray-200 border border-gray-200 hover:bg-gray-100 lg:hover:border-amber-300'
                    }`}
                  >
                    <span className={`font-medium text-lg ${selectedAnswer === i ? 'text-amber-700' : 'text-gray-700'}`}>
                      {answer}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="flex-1 overflow-auto">
            <MobileIllustration className="bg-gradient-to-br from-green-100 to-teal-100 p-8 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-xl">
                <Check size={48} className="text-white" />
              </div>
            </MobileIllustration>

            <DesktopIllustration className="py-8">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-xl">
                <Check size={48} className="text-white" />
              </div>
            </DesktopIllustration>

            <div className="p-5 lg:p-0 lg:py-4">
              <div className="bg-green-50 lg:bg-gradient-to-r lg:from-green-50 lg:to-emerald-50 lg:border lg:border-green-200 rounded-2xl p-5 lg:p-6 mb-6">
                <h3 className="font-bold text-green-700 mb-2 lg:text-lg">Correct! $102</h3>
                <p className="text-gray-600 lg:text-lg">
                  2% of $100 is $2, so after one year you'd have $102. <span className="bg-amber-100 px-1 rounded">This is the power of compound interest!</span>
                </p>
              </div>

              <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                QUESTION 2 OF 3
              </div>

              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
                Which typically has the highest interest rate?
              </h2>

              <div className="space-y-3">
                {['Savings account', 'Credit card debt', 'Mortgage', 'Car loan'].map((answer, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedAnswer(i)}
                    className={`w-full p-4 lg:p-5 rounded-xl text-left transition-all ${
                      selectedAnswer === i
                        ? 'bg-amber-100 border-2 border-amber-400'
                        : 'bg-gray-50 lg:bg-white lg:border lg:border-gray-200 border border-gray-200 hover:bg-gray-100 lg:hover:border-amber-300'
                    }`}
                  >
                    <span className={`font-medium text-lg ${selectedAnswer === i ? 'text-amber-700' : 'text-gray-700'}`}>
                      {answer}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex-1 overflow-auto">
            <MobileIllustration className="bg-gradient-to-br from-green-100 to-teal-100 p-8 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-xl">
                <Check size={48} className="text-white" />
              </div>
            </MobileIllustration>

            <DesktopIllustration className="py-8">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-xl">
                <Check size={48} className="text-white" />
              </div>
            </DesktopIllustration>

            <div className="p-5 lg:p-0 lg:py-4">
              <div className="bg-green-50 lg:bg-gradient-to-r lg:from-green-50 lg:to-emerald-50 lg:border lg:border-green-200 rounded-2xl p-5 lg:p-6 mb-6">
                <h3 className="font-bold text-green-700 mb-2 lg:text-lg">Correct! Credit card debt</h3>
                <p className="text-gray-600 lg:text-lg">
                  Credit cards often charge 15-25% interest, while mortgages are typically 3-7%. <span className="bg-amber-100 px-1 rounded">This is why paying off credit cards should be a priority!</span>
                </p>
              </div>

              <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                QUESTION 3 OF 3
              </div>

              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
                What's the recommended emergency fund size?
              </h2>

              <div className="space-y-3">
                {['1 week of expenses', '1 month of expenses', '3-6 months of expenses', '1 year of expenses'].map((answer, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedAnswer(i)}
                    className={`w-full p-4 lg:p-5 rounded-xl text-left transition-all ${
                      selectedAnswer === i
                        ? 'bg-amber-100 border-2 border-amber-400'
                        : 'bg-gray-50 lg:bg-white lg:border lg:border-gray-200 border border-gray-200 hover:bg-gray-100 lg:hover:border-amber-300'
                    }`}
                  >
                    <span className={`font-medium text-lg ${selectedAnswer === i ? 'text-amber-700' : 'text-gray-700'}`}>
                      {answer}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex-1 overflow-auto">
            <MobileIllustration className="bg-gradient-to-br from-amber-100 via-amber-50 to-orange-50 p-8 flex items-center justify-center">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                  <Award size={56} className="text-white" />
                </div>
                <Sparkles size={24} className="text-amber-400 absolute -top-2 -right-2" />
              </div>
            </MobileIllustration>

            <DesktopIllustration className="py-10">
              <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                <Award size={64} className="text-white" />
              </div>
              <Sparkles size={28} className="text-amber-400 absolute -top-2 -right-2" />
            </DesktopIllustration>

            <div className="p-5 lg:p-0 lg:py-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-4">Great job!</h2>
              <p className="text-gray-600 text-center mb-8 lg:text-lg">You got 3 out of 3 correct!</p>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 lg:border lg:border-amber-200 rounded-2xl p-5 lg:p-6 mb-6">
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                    <Award size={28} className="text-white lg:w-8 lg:h-8" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">+1 Fynny earned!</p>
                    <p className="text-sm text-gray-500">Literacy check complete</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-center lg:text-lg">
                Your financial literacy is strong! Come back tomorrow for more.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white lg:bg-gray-50" data-testid="literacy-check-screen">
      <div className="lg:max-w-[720px] lg:mx-auto lg:bg-white lg:min-h-screen lg:shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:px-8 lg:py-5">
          <button 
            onClick={() => currentPage > 0 ? prevPage() : setActiveScreen('home')} 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            data-testid="literacy-back-btn"
          >
            <ChevronLeft size={20} />
            <span className="hidden lg:inline text-sm font-medium">Back to Dashboard</span>
          </button>
          
          <div className="flex items-center gap-2">
            <Sun size={20} className="text-amber-500 lg:hidden" />
            <span className="font-medium text-gray-700 lg:text-gray-800 lg:font-semibold">
              <span className="lg:hidden">Literacy Check</span>
              <span className="hidden lg:inline">{pages[currentPage].title}</span>
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden lg:inline">{currentPage + 1} of {totalPages}</span>
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-amber-50 flex items-center justify-center">
              <span className="text-amber-600 text-xs lg:text-sm font-semibold">{currentPage + 1}/{totalPages}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col min-h-[calc(100vh-140px)] lg:min-h-[calc(100vh-160px)]">
          <div className="flex-1 lg:px-8">
            {renderPageContent()}
          </div>

          <div className="p-5 lg:px-8 lg:py-6 border-t border-gray-100 bg-white">
            <div className="flex justify-center gap-1.5 mb-4 lg:hidden">
              {[...Array(totalPages)].map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentPage ? 'w-6 bg-amber-500' : 'w-2 bg-gray-300'}`} />
              ))}
            </div>

            <div className="hidden lg:block mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-medium text-gray-700">{Math.round(((currentPage + 1) / totalPages) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300" style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }} />
              </div>
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage < 3 && selectedAnswer === null}
              data-testid="literacy-next-btn"
              className={`w-full lg:w-auto lg:min-w-[200px] lg:float-right py-4 lg:py-3 px-8 rounded-full font-semibold text-lg lg:text-base shadow-md transition-all ${
                currentPage < 3 && selectedAnswer === null
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
              }`}
            >
              {pages[currentPage].cta}
            </button>
            <div className="lg:clear-both"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Daily Boost Screen
export const DailyBoostScreen = ({ setActiveScreen }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 4;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setActiveScreen('home');
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pages = [
    { cta: "Continue", title: "Tiny Shifts" },
    { cta: "Continue", title: "The Science" },
    { cta: "Continue", title: "Your Challenge" },
    { cta: "Back to Home", title: "Complete" },
  ];

  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return (
          <div className="flex-1 overflow-auto">
            <MobileIllustration className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 left-6"><Sparkles size={20} className="text-white/30" /></div>
              <div className="absolute bottom-6 right-8"><Sparkles size={16} className="text-white/20" /></div>
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Zap size={48} className="text-amber-300" />
              </div>
            </MobileIllustration>

            <DesktopIllustration className="py-10">
              <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                <Zap size={56} className="text-amber-300" />
              </div>
              <Sparkles size={24} className="text-indigo-400 absolute -top-2 -right-2" />
            </DesktopIllustration>

            <div className="p-5 lg:p-0 lg:py-6">
              <div className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                DAILY BOOST
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">On Tiny Shifts</h2>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-6">
                Big changes don't come from big actions. They come from <span className="bg-purple-100 px-1 rounded">tiny, consistent shifts</span> that compound over time.
              </p>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
                Today's boost is about embracing the power of small—because small is mighty.
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="flex-1 overflow-auto">
            <MobileIllustration className="bg-gradient-to-br from-amber-100 to-orange-100 p-8 flex items-center justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Lightbulb size={48} className="text-amber-500" />
                </div>
              </div>
            </MobileIllustration>

            <DesktopIllustration className="py-10">
              <div className="w-28 h-28 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-amber-100">
                <Lightbulb size={56} className="text-amber-500" />
              </div>
            </DesktopIllustration>

            <div className="p-5 lg:p-0 lg:py-6">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">The Science of Small</h3>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-6">
                Research shows that <span className="bg-purple-100 px-1 rounded">habits formed through tiny actions are 2-3x more likely to stick</span> than those requiring big effort.
              </p>

              <div className="bg-indigo-50 lg:bg-gradient-to-r lg:from-indigo-50 lg:to-purple-50 lg:border lg:border-indigo-200 rounded-2xl p-5 lg:p-6">
                <p className="text-gray-700 text-center lg:text-lg leading-relaxed">
                  "A 1% improvement every day leads to being <strong>37x better</strong> by the end of the year."
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex-1 overflow-auto">
            <MobileIllustration className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 relative">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Target size={20} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg">Your Tiny Shift</h3>
              </div>
            </MobileIllustration>

            <div className="hidden lg:block py-6 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Target size={24} className="text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Your Tiny Shift</h3>
              </div>
            </div>

            <div className="p-5 lg:p-0 lg:py-4">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">Today's micro-challenge:</h3>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 lg:bg-gradient-to-r lg:border lg:border-amber-200 rounded-2xl p-5 lg:p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap size={24} className="text-white lg:w-7 lg:h-7" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 mb-2 lg:text-lg">The 2-Minute Money Moment</p>
                    <p className="text-gray-700 lg:text-lg">
                      <span className="bg-purple-100 px-1 rounded">Spend just 2 minutes</span> looking at your bank balance. That's it. No judgment, no action needed—just look.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-6">
                This tiny act builds your "money awareness muscle." Over time, <span className="bg-purple-100 px-1 rounded">checking in becomes as natural as checking the weather.</span>
              </p>

              <div className="flex items-center gap-2 text-indigo-600">
                <Clock size={18} />
                <span className="font-medium lg:text-lg">Takes less than 2 minutes</span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex-1 overflow-auto">
            <MobileIllustration className="bg-gradient-to-br from-green-100 via-teal-50 to-emerald-50 p-8 flex items-center justify-center">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                  <Zap size={48} className="text-amber-300" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow">
                  <Check size={20} className="text-white" />
                </div>
              </div>
            </MobileIllustration>

            <DesktopIllustration className="py-10">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                <Zap size={56} className="text-amber-300" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                <Check size={24} className="text-white" />
              </div>
            </DesktopIllustration>

            <div className="p-5 lg:p-0 lg:py-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-6">Boost received!</h2>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed text-center mb-6">
                Remember: <span className="bg-purple-100 px-1 rounded">tiny shifts lead to massive transformations.</span> You're already making progress just by showing up.
              </p>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 lg:border lg:border-indigo-200 rounded-2xl p-5 lg:p-6 mb-6">
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                    <Award size={28} className="text-white lg:w-8 lg:h-8" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">+1 Fynny earned!</p>
                    <p className="text-sm text-gray-500">Daily boost complete</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-center lg:text-lg">
                See you tomorrow for another boost!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white lg:bg-gray-50" data-testid="daily-boost-screen">
      <div className="lg:max-w-[720px] lg:mx-auto lg:bg-white lg:min-h-screen lg:shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:px-8 lg:py-5">
          <button 
            onClick={() => currentPage > 0 ? prevPage() : setActiveScreen('home')} 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            data-testid="boost-back-btn"
          >
            <ChevronLeft size={20} />
            <span className="hidden lg:inline text-sm font-medium">Back to Dashboard</span>
          </button>
          
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-indigo-500 lg:hidden" />
            <span className="font-medium text-gray-700 lg:text-gray-800 lg:font-semibold">
              <span className="lg:hidden">Daily Boost</span>
              <span className="hidden lg:inline">{pages[currentPage].title}</span>
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden lg:inline">{currentPage + 1} of {totalPages}</span>
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-indigo-50 flex items-center justify-center">
              <span className="text-indigo-600 text-xs lg:text-sm font-semibold">{currentPage + 1}/{totalPages}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col min-h-[calc(100vh-140px)] lg:min-h-[calc(100vh-160px)]">
          <div className="flex-1 lg:px-8">
            {renderPageContent()}
          </div>

          <div className="p-5 lg:px-8 lg:py-6 border-t border-gray-100 bg-white">
            <div className="flex justify-center gap-1.5 mb-4 lg:hidden">
              {[...Array(totalPages)].map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentPage ? 'w-6 bg-indigo-500' : 'w-2 bg-gray-300'}`} />
              ))}
            </div>

            <div className="hidden lg:block mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-medium text-gray-700">{Math.round(((currentPage + 1) / totalPages) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-300" style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }} />
              </div>
            </div>

            <button
              onClick={nextPage}
              data-testid="boost-next-btn"
              className="w-full lg:w-auto lg:min-w-[200px] lg:float-right py-4 lg:py-3 px-8 rounded-full font-semibold text-lg lg:text-base shadow-md transition-all bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
            >
              {pages[currentPage].cta}
            </button>
            <div className="lg:clear-both"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Money Tip Screen
export const MoneyTipScreen = ({ setActiveScreen }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setActiveScreen('home');
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pages = [
    { cta: "Continue", title: "24-Hour Rule" },
    { cta: "Continue", title: "How to Apply" },
    { cta: "Back to Home", title: "Complete" },
  ];

  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return (
          <div className="flex-1 overflow-auto">
            <MobileIllustration className="bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50 p-8 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 left-6"><Leaf size={24} className="text-green-300" /></div>
              <div className="absolute bottom-6 right-8"><Sparkles size={20} className="text-teal-300" /></div>
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                <Leaf size={48} className="text-white" />
              </div>
            </MobileIllustration>

            <DesktopIllustration className="py-10">
              <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                <Leaf size={56} className="text-white" />
              </div>
              <Sparkles size={24} className="text-green-400 absolute -top-2 -right-2" />
            </DesktopIllustration>

            <div className="p-5 lg:p-0 lg:py-6">
              <div className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                TODAY'S TIP
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">The 24-Hour Rule</h2>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-6">
                Before making any non-essential purchase over $20, <span className="bg-green-100 px-1 rounded">wait 24 hours.</span>
              </p>

              <div className="bg-green-50 lg:bg-gradient-to-r lg:from-green-50 lg:to-emerald-50 lg:border lg:border-green-200 rounded-2xl p-5 lg:p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-white lg:w-7 lg:h-7" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 mb-1 lg:text-lg">Why it works:</p>
                    <p className="text-gray-700 lg:text-lg">
                      This simple pause <span className="bg-green-100 px-1 rounded">separates "want" from "need"</span> and helps you avoid impulse purchases you might regret.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="flex-1 overflow-auto">
            <MobileIllustration className="bg-gradient-to-br from-green-400 to-emerald-500 p-6 relative">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Lightbulb size={20} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg">How to Apply It</h3>
              </div>
            </MobileIllustration>

            <div className="hidden lg:block py-6 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Lightbulb size={24} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">How to Apply It</h3>
              </div>
            </div>

            <div className="p-5 lg:p-0 lg:py-4">
              <div className="space-y-5 mb-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold lg:text-lg">1</div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 lg:text-lg">See something you want?</p>
                    <p className="text-gray-600 lg:text-base">Take a screenshot or add it to a wishlist</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold lg:text-lg">2</div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 lg:text-lg">Wait 24 hours</p>
                    <p className="text-gray-600 lg:text-base">Set a reminder if you need to</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold lg:text-lg">3</div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 lg:text-lg">Ask yourself:</p>
                    <p className="text-gray-600 lg:text-base">"Do I still want this as much as yesterday?"</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 lg:bg-gradient-to-r lg:from-amber-50 lg:to-orange-50 lg:border lg:border-amber-200 rounded-2xl p-5 lg:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={20} className="text-amber-600" />
                  <p className="font-bold text-gray-800 lg:text-lg">The result?</p>
                </div>
                <p className="text-gray-700 lg:text-lg">
                  Studies show that <span className="bg-green-100 px-1 rounded">up to 70% of impulse purchases are abandoned</span> after a 24-hour cooling period.
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex-1 overflow-auto">
            <MobileIllustration className="bg-gradient-to-br from-green-100 via-teal-50 to-emerald-50 p-8 flex items-center justify-center">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                  <Check size={48} className="text-white" />
                </div>
                <Sparkles size={24} className="text-amber-400 absolute -top-2 -right-2" />
              </div>
            </MobileIllustration>

            <DesktopIllustration className="py-10">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                <Check size={56} className="text-white" />
              </div>
              <Sparkles size={28} className="text-amber-400 absolute -top-2 -right-2" />
            </DesktopIllustration>

            <div className="p-5 lg:p-0 lg:py-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-6">Tip saved!</h2>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed text-center mb-6">
                Try the 24-hour rule on your next tempting purchase. <span className="bg-green-100 px-1 rounded">You might surprise yourself!</span>
              </p>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 lg:border lg:border-green-200 rounded-2xl p-5 lg:p-6 mb-6">
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                    <Award size={28} className="text-white lg:w-8 lg:h-8" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">+1 Fynny earned!</p>
                    <p className="text-sm text-gray-500">Money tip complete</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 lg:bg-white lg:border lg:border-gray-200 rounded-2xl p-4 lg:p-5 text-center">
                <p className="text-gray-600 lg:text-lg">
                  This tip has been saved to your <span className="text-green-600 font-medium">Saved Lessons</span>
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white lg:bg-gray-50" data-testid="money-tip-screen">
      <div className="lg:max-w-[720px] lg:mx-auto lg:bg-white lg:min-h-screen lg:shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:px-8 lg:py-5">
          <button 
            onClick={() => currentPage > 0 ? prevPage() : setActiveScreen('home')} 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            data-testid="tip-back-btn"
          >
            <ChevronLeft size={20} />
            <span className="hidden lg:inline text-sm font-medium">Back to Dashboard</span>
          </button>
          
          <div className="flex items-center gap-2">
            <Leaf size={20} className="text-green-500 lg:hidden" />
            <span className="font-medium text-gray-700 lg:text-gray-800 lg:font-semibold">
              <span className="lg:hidden">Money Tip</span>
              <span className="hidden lg:inline">{pages[currentPage].title}</span>
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden lg:inline">{currentPage + 1} of {totalPages}</span>
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-green-50 flex items-center justify-center">
              <span className="text-green-600 text-xs lg:text-sm font-semibold">{currentPage + 1}/{totalPages}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col min-h-[calc(100vh-140px)] lg:min-h-[calc(100vh-160px)]">
          <div className="flex-1 lg:px-8">
            {renderPageContent()}
          </div>

          <div className="p-5 lg:px-8 lg:py-6 border-t border-gray-100 bg-white">
            <div className="flex justify-center gap-1.5 mb-4 lg:hidden">
              {[...Array(totalPages)].map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentPage ? 'w-6 bg-green-500' : 'w-2 bg-gray-300'}`} />
              ))}
            </div>

            <div className="hidden lg:block mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-medium text-gray-700">{Math.round(((currentPage + 1) / totalPages) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-300" style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }} />
              </div>
            </div>

            <button
              onClick={nextPage}
              data-testid="tip-next-btn"
              className="w-full lg:w-auto lg:min-w-[200px] lg:float-right py-4 lg:py-3 px-8 rounded-full font-semibold text-lg lg:text-base shadow-md transition-all bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              {pages[currentPage].cta}
            </button>
            <div className="lg:clear-both"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
