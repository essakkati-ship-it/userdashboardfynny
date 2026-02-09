import React, { useState } from 'react';
import {
  ChevronLeft, Check, Sparkles, Award, Heart,
  BookOpen, Bookmark, Brain, Lightbulb, TrendingUp
} from 'lucide-react';

const LessonTwoScreen = ({ setActiveScreen }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 5;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setActiveScreen('streak');
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pages = [
    { cta: "Continue", title: "Money Styles" },
    { cta: "Continue", title: "Four Styles" },
    { cta: "Continue", title: "Good News" },
    { cta: "Continue", title: "Reflection" },
    { cta: "Complete Lesson", title: "Complete" },
  ];

  // Desktop illustration component
  const DesktopIllustration = ({ children, className = "" }) => (
    <div className={`hidden lg:flex items-center justify-center py-8 ${className}`}>
      <div className="relative">
        {children}
      </div>
    </div>
  );

  // Mobile illustration component
  const MobileIllustration = ({ children, className = "" }) => (
    <div className={`lg:hidden ${className}`}>
      {children}
    </div>
  );

  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return (
          <div className="flex-1 overflow-auto">
            {/* Mobile illustration */}
            <MobileIllustration className="bg-gradient-to-br from-purple-200 via-purple-100 to-indigo-100 p-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 left-6">
                <Sparkles size={20} className="text-purple-300" />
              </div>
              <div className="absolute bottom-4 right-8">
                <div className="w-16 h-16 border-2 border-purple-300 rounded-full opacity-40"></div>
              </div>
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center shadow-xl">
                <Brain size={48} className="text-white" />
              </div>
            </MobileIllustration>

            {/* Desktop illustration */}
            <DesktopIllustration className="py-10">
              <div className="w-28 h-28 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center shadow-xl">
                <Brain size={56} className="text-white" />
              </div>
              <Sparkles size={24} className="text-purple-400 absolute -top-2 -right-2" />
            </DesktopIllustration>

            <div className="p-5 lg:p-0 lg:py-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Discover Your Money Style</h2>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-6">
                Everyone has a unique relationship with money. <span className="bg-purple-100 px-1 rounded">Understanding your "money style" is the first step to making lasting changes.</span>
              </p>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
                In this lesson, you'll discover which of the four money personalities resonates most with you—and learn how to work with (not against) your natural tendencies.
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="flex-1 overflow-auto">
            {/* Mobile header */}
            <MobileIllustration className="bg-gradient-to-br from-purple-400 to-indigo-500 p-6 relative">
              <h3 className="text-white font-bold text-lg mb-2">The Four Money Styles</h3>
              <p className="text-purple-100 text-sm">Which one sounds like you?</p>
            </MobileIllustration>

            {/* Desktop header */}
            <div className="hidden lg:block py-6 border-b border-gray-100 mb-6">
              <h3 className="text-2xl font-bold text-gray-800">The Four Money Styles</h3>
              <p className="text-gray-500 mt-1">Which one sounds like you?</p>
            </div>

            <div className="p-5 lg:p-0 lg:py-4 space-y-4">
              <div className="bg-amber-50 lg:bg-white lg:border lg:border-amber-200 rounded-2xl p-4 lg:p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-amber-400 rounded-full flex items-center justify-center">
                    <Heart size={20} className="text-white lg:w-6 lg:h-6" />
                  </div>
                  <h4 className="font-semibold text-gray-800 lg:text-lg">The Emotional Spender</h4>
                </div>
                <p className="text-gray-600 text-sm lg:text-base">Uses spending to cope with feelings. Shops when stressed, sad, or celebrating.</p>
              </div>

              <div className="bg-green-50 lg:bg-white lg:border lg:border-green-200 rounded-2xl p-4 lg:p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <TrendingUp size={20} className="text-white lg:w-6 lg:h-6" />
                  </div>
                  <h4 className="font-semibold text-gray-800 lg:text-lg">The Saver</h4>
                </div>
                <p className="text-gray-600 text-sm lg:text-base">Finds security in saving. May struggle to enjoy money even when it's okay to spend.</p>
              </div>

              <div className="bg-blue-50 lg:bg-white lg:border lg:border-blue-200 rounded-2xl p-4 lg:p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Lightbulb size={20} className="text-white lg:w-6 lg:h-6" />
                  </div>
                  <h4 className="font-semibold text-gray-800 lg:text-lg">The Avoider</h4>
                </div>
                <p className="text-gray-600 text-sm lg:text-base">Prefers not to think about money. Bills pile up, accounts go unchecked.</p>
              </div>

              <div className="bg-pink-50 lg:bg-white lg:border lg:border-pink-200 rounded-2xl p-4 lg:p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-pink-500 rounded-full flex items-center justify-center">
                    <Award size={20} className="text-white lg:w-6 lg:h-6" />
                  </div>
                  <h4 className="font-semibold text-gray-800 lg:text-lg">The Status Seeker</h4>
                </div>
                <p className="text-gray-600 text-sm lg:text-base">Ties self-worth to wealth appearance. Spending often exceeds actual means.</p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex-1 overflow-auto">
            {/* Mobile illustration */}
            <MobileIllustration className="bg-gradient-to-br from-teal-100 to-green-100 p-8 flex items-center justify-center">
              <div className="relative">
                <div className="w-28 h-28 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Lightbulb size={48} className="text-amber-500" />
                </div>
                <Sparkles size={20} className="text-purple-400 absolute -top-2 -right-2" />
              </div>
            </MobileIllustration>

            {/* Desktop illustration */}
            <DesktopIllustration className="py-10">
              <div className="w-28 h-28 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-amber-100">
                <Lightbulb size={56} className="text-amber-500" />
              </div>
              <Sparkles size={24} className="text-purple-400 absolute -top-2 -right-2" />
            </DesktopIllustration>

            <div className="p-5 lg:p-0 lg:py-6">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">The Good News</h3>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-6">
                <span className="bg-purple-100 px-1 rounded">There's no "bad" money style.</span> Each has strengths and challenges. The key is awareness.
              </p>

              <div className="bg-purple-50 lg:bg-gradient-to-r lg:from-purple-50 lg:to-indigo-50 lg:border lg:border-purple-200 rounded-2xl p-5 lg:p-6 mb-6">
                <p className="text-gray-700 lg:text-lg text-center leading-relaxed">
                  "When you understand your patterns, you can work <strong>with</strong> them instead of fighting against them."
                </p>
              </div>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
                Most people are a mix of styles. <span className="bg-purple-100 px-1 rounded">Over the coming days, we'll help you identify your primary style</span> and develop strategies tailored to you.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex-1 overflow-auto">
            {/* Mobile header */}
            <MobileIllustration className="bg-gradient-to-br from-purple-200 via-purple-100 to-indigo-100 p-6 relative">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center">
                  <Brain size={20} className="text-purple-600" />
                </div>
                <h3 className="text-purple-700 font-bold text-lg">Quick Reflection</h3>
              </div>
            </MobileIllustration>

            {/* Desktop header */}
            <div className="hidden lg:block py-6 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Brain size={24} className="text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Quick Reflection</h3>
              </div>
            </div>

            <div className="p-5 lg:p-0 lg:py-4">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">Think about your last purchase...</h3>

              <div className="space-y-5 mb-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm lg:text-base">1</div>
                  </div>
                  <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
                    What were you feeling <strong>before</strong> you made it?
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm lg:text-base">2</div>
                  </div>
                  <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
                    Was it <strong>planned</strong> or <strong>spontaneous</strong>?
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm lg:text-base">3</div>
                  </div>
                  <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
                    How did you feel <strong>after</strong>?
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 lg:bg-gradient-to-r lg:from-amber-50 lg:to-orange-50 lg:border lg:border-amber-200 rounded-2xl p-4 lg:p-5">
                <p className="text-amber-700 text-center text-sm lg:text-base">
                  <span className="bg-purple-100 px-1 rounded">No need to answer now</span> — just let these questions simmer as you go about your day.
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex-1 overflow-auto">
            {/* Mobile illustration */}
            <MobileIllustration className="bg-gradient-to-br from-green-100 via-teal-50 to-emerald-50 p-8 flex items-center justify-center">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center shadow-xl">
                  <Check size={48} className="text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Award size={20} className="text-white" />
                </div>
              </div>
            </MobileIllustration>

            {/* Desktop illustration */}
            <DesktopIllustration className="py-10">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center shadow-xl">
                <Check size={56} className="text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                <Award size={24} className="text-white" />
              </div>
            </DesktopIllustration>

            <div className="p-5 lg:p-0 lg:py-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-6">Lesson Complete!</h2>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed text-center mb-6">
                You've taken the first step in understanding your money style. <span className="bg-purple-100 px-1 rounded">This awareness will be your superpower.</span>
              </p>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 lg:bg-gradient-to-r lg:border lg:border-purple-200 rounded-2xl p-5 lg:p-6 mb-6">
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                    <Award size={28} className="text-white lg:w-8 lg:h-8" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">+1 Fynny earned!</p>
                    <p className="text-sm text-gray-500">Lesson 2 complete</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-center lg:text-lg">
                Tomorrow, we'll dive deeper into your specific patterns.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white lg:bg-gray-50" data-testid="lesson-two-screen">
      {/* Desktop: Centered container */}
      <div className="lg:max-w-[720px] lg:mx-auto lg:bg-white lg:min-h-screen lg:shadow-sm">
        
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:px-8 lg:py-5">
          <button 
            onClick={() => currentPage > 0 ? prevPage() : setActiveScreen('home')} 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            data-testid="lesson-two-back-btn"
          >
            <ChevronLeft size={20} className="lg:w-5 lg:h-5" />
            <span className="hidden lg:inline text-sm font-medium">Back to Dashboard</span>
          </button>
          
          {/* Center */}
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-purple-500 lg:hidden" />
            <span className="font-medium text-gray-700 lg:text-gray-800 lg:font-semibold">
              <span className="lg:hidden">Lesson 2</span>
              <span className="hidden lg:inline">{pages[currentPage].title}</span>
            </span>
          </div>
          
          {/* Right: Progress */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden lg:inline">{currentPage + 1} of {totalPages}</span>
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-purple-50 flex items-center justify-center">
              <span className="text-purple-500 text-xs lg:text-sm font-semibold">{currentPage + 1}/{totalPages}</span>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col min-h-[calc(100vh-140px)] lg:min-h-[calc(100vh-160px)]">
          <div className="flex-1 lg:px-8">
            {renderPageContent()}
          </div>

          {/* Bottom navigation */}
          <div className="p-5 lg:px-8 lg:py-6 border-t border-gray-100 bg-white">
            {/* Progress dots - Mobile only */}
            <div className="flex justify-center gap-1.5 mb-4 lg:hidden">
              {[...Array(totalPages)].map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentPage ? 'w-6 bg-purple-500' : 'w-2 bg-gray-300'}`} />
              ))}
            </div>

            {/* Desktop: Progress bar */}
            <div className="hidden lg:block mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-medium text-gray-700">{Math.round(((currentPage + 1) / totalPages) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                />
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={nextPage}
              data-testid="lesson-two-next-btn"
              className="w-full lg:w-auto lg:min-w-[200px] lg:float-right py-4 lg:py-3 px-8 rounded-full font-semibold text-lg lg:text-base shadow-md transition-all bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
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

export default LessonTwoScreen;
