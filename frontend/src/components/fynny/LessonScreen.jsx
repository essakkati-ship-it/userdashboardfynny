import React, { useState } from 'react';
import {
  ChevronLeft, Sparkles, Award, Heart,
  BookOpen, Volume2, FileText, DollarSign, Smile
} from 'lucide-react';

const LessonScreen = ({ setActiveScreen }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 6;

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
    { cta: "Continue", title: "Getting Started" },
    { cta: "Continue", title: "Learn" },
    { cta: "Continue", title: "Check In" },
    { cta: "Continue", title: "Track Spending" },
    { cta: "Continue", title: "Fynnies" },
    { cta: "Complete Lesson", title: "Today's Challenge" },
  ];

  // Desktop illustration component
  const DesktopIllustration = ({ children, className = "" }) => (
    <div className={`hidden lg:flex items-center justify-center py-8 ${className}`}>
      <div className="relative">
        {children}
      </div>
    </div>
  );

  // Mobile illustration component (card style)
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
            <MobileIllustration className="bg-gradient-to-br from-pink-200 via-pink-100 to-rose-100 p-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 right-8">
                <Sparkles size={24} className="text-gray-400" />
              </div>
              <div className="absolute bottom-4 right-12">
                <div className="w-24 h-6 bg-amber-300 rounded transform rotate-12 flex items-center justify-center">
                  <div className="w-4 h-4 bg-pink-400 rounded-sm mr-1"></div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 border-4 border-rose-400 rounded-full flex items-center justify-center bg-white/50">
                  <div className="w-8 h-4 border-2 border-rose-400 rounded-full"></div>
                </div>
                <div className="w-20 h-36 bg-gradient-to-b from-rose-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart size={32} className="text-white" />
                </div>
              </div>
            </MobileIllustration>

            {/* Desktop illustration */}
            <DesktopIllustration>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 border-4 border-rose-300 rounded-full flex items-center justify-center bg-rose-50">
                  <div className="w-10 h-5 border-2 border-rose-300 rounded-full"></div>
                </div>
                <div className="w-24 h-44 bg-gradient-to-b from-rose-400 to-rose-500 rounded-3xl flex items-center justify-center shadow-xl">
                  <Heart size={40} className="text-white" />
                </div>
                <Sparkles size={28} className="text-amber-400 absolute -top-4 right-0" />
              </div>
            </DesktopIllustration>

            <div className="p-5 lg:p-0 lg:py-6">
              <p className="text-gray-800 text-lg lg:text-xl leading-relaxed mb-6">
                <strong>There are three simple things you need to do each day to be successful with Fynny</strong>—that's it!
              </p>

              <ol className="space-y-4 mb-8">
                <li className="text-gray-800 text-lg lg:text-xl flex items-center gap-3">
                  <span className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 font-semibold text-sm">1</span>
                  Learn
                </li>
                <li className="text-gray-800 text-lg lg:text-xl flex items-center gap-3">
                  <span className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 font-semibold text-sm">2</span>
                  Check in
                </li>
                <li className="text-gray-800 text-lg lg:text-xl flex items-center gap-3">
                  <span className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 font-semibold text-sm">3</span>
                  Track your spending
                </li>
              </ol>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
                You've already started learning by simply reading this lesson. <span className="bg-teal-100 px-1 rounded">Before getting started with your next action (checking in), let's take a quick look at the key role each action plays in helping you find financial calm.</span>
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="flex-1 overflow-auto">
            {/* Mobile illustration */}
            <MobileIllustration className="bg-gradient-to-br from-pink-200 via-pink-100 to-rose-50 p-6 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-rose-400 text-xl font-bold">1.</p>
                  <h2 className="text-3xl font-bold text-rose-500 tracking-wide">LEARN</h2>
                </div>
                <div className="relative">
                  <div className="w-32 h-40 flex items-center justify-center">
                    <div className="absolute">
                      <Sparkles size={20} className="text-rose-400 absolute -top-2 left-0" />
                      <Sparkles size={16} className="text-rose-300 absolute top-4 right-0" />
                    </div>
                    <div className="w-20 h-28 bg-white rounded-lg shadow-md flex items-center justify-center">
                      <BookOpen size={32} className="text-rose-400" />
                    </div>
                  </div>
                </div>
              </div>
            </MobileIllustration>

            {/* Desktop header */}
            <div className="hidden lg:block py-6 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-rose-400 text-2xl font-bold">1.</span>
                <h2 className="text-3xl font-bold text-rose-500">LEARN</h2>
                <div className="ml-auto">
                  <div className="w-16 h-16 bg-rose-50 rounded-xl flex items-center justify-center">
                    <BookOpen size={32} className="text-rose-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 lg:p-0 lg:py-4">
              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-6">
                <span className="bg-teal-100 px-1 rounded">Your Fynny course has been personalized to your needs and goals.</span> It's broken down into mini-courses on topics like understanding your money emotions, building healthy habits, and more.
              </p>

              <div className="bg-amber-50 lg:bg-rose-50/50 rounded-2xl p-5 lg:p-6 mb-6 relative overflow-hidden lg:border lg:border-rose-100">
                <p className="text-gray-700 lg:text-lg text-center leading-relaxed relative z-10">
                  Every day, you'll learn about yourself and build healthy money habits through fun, bite-size lessons.
                </p>
              </div>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
                <span className="bg-teal-100 px-1 rounded">You've already set your learning goal, which will determine how many lessons you get each day.</span> In a few days, we'll check in to see if you want to adjust your pace.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex-1 overflow-auto">
            {/* Mobile illustration */}
            <MobileIllustration className="bg-gradient-to-br from-pink-200 via-pink-100 to-rose-50 p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-rose-400 text-xl font-bold">2.</p>
                  <h2 className="text-3xl font-bold text-rose-500 tracking-wide">CHECK IN</h2>
                </div>
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-xl shadow-md flex items-center justify-center transform rotate-6">
                    <Smile size={40} className="text-amber-400" />
                  </div>
                </div>
              </div>
            </MobileIllustration>

            {/* Desktop header */}
            <div className="hidden lg:block py-6 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-rose-400 text-2xl font-bold">2.</span>
                <h2 className="text-3xl font-bold text-rose-500">CHECK IN</h2>
                <div className="ml-auto">
                  <div className="w-16 h-16 bg-amber-50 rounded-xl flex items-center justify-center">
                    <Smile size={32} className="text-amber-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 lg:p-0 lg:py-4">
              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-6">
                We get it. Not everyone loves this part. But don't worry, we'll guide you through.
              </p>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-6">
                Research shows that <span className="bg-teal-100 px-1 rounded">people who check in on their finances every day feel more in control than those who check in weekly.</span> They also adopt a greater number of healthy habits. (Win-win!)
              </p>

              <div className="bg-gray-50 lg:bg-white lg:border lg:border-gray-200 rounded-2xl p-5 lg:p-6 mb-4">
                <div className="h-32 relative">
                  <p className="text-xs text-gray-500 absolute left-0 top-1/2">Stress</p>
                  <div className="ml-12 h-full flex items-end justify-around">
                    <svg className="w-full h-full" viewBox="0 0 200 80">
                      <path d="M10,20 Q50,25 80,35 T120,50 T180,65" fill="none" stroke="#f9a8d4" strokeWidth="2" />
                      <path d="M10,15 Q50,20 80,20 T120,25 T180,30" fill="none" stroke="#5eead4" strokeWidth="2" />
                      <circle cx="10" cy="20" r="4" fill="#f9a8d4" />
                      <circle cx="80" cy="35" r="4" fill="#f9a8d4" />
                      <circle cx="140" cy="55" r="4" fill="#f9a8d4" />
                      <circle cx="180" cy="65" r="4" fill="#f9a8d4" />
                      <circle cx="10" cy="15" r="4" fill="#5eead4" />
                      <circle cx="80" cy="20" r="4" fill="#5eead4" />
                      <circle cx="140" cy="22" r="4" fill="#5eead4" />
                      <circle cx="180" cy="30" r="4" fill="#5eead4" />
                    </svg>
                  </div>
                  <p className="text-xs text-rose-400 text-center mt-2">Time</p>
                </div>
                <div className="flex justify-center gap-6 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-pink-300"></div>
                    <span className="text-xs text-gray-600">Weekly check-in</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    <span className="text-xs text-gray-600">Daily check-in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex-1 overflow-auto">
            {/* Mobile illustration */}
            <MobileIllustration className="bg-gradient-to-br from-pink-200 via-pink-100 to-rose-50 p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-rose-400 text-xl font-bold">3.</p>
                  <h2 className="text-3xl font-bold text-rose-500 tracking-wide">TRACK<br/>SPENDING</h2>
                </div>
                <div className="relative">
                  <div className="w-20 h-32 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center p-2">
                    <FileText size={24} className="text-teal-500 mb-1" />
                    <div className="w-full space-y-1">
                      <div className="h-1.5 bg-green-200 rounded"></div>
                      <div className="h-1.5 bg-amber-200 rounded w-3/4"></div>
                      <div className="h-1.5 bg-pink-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </MobileIllustration>

            {/* Desktop header */}
            <div className="hidden lg:block py-6 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-rose-400 text-2xl font-bold">3.</span>
                <h2 className="text-3xl font-bold text-rose-500">TRACK SPENDING</h2>
                <div className="ml-auto">
                  <div className="w-16 h-16 bg-teal-50 rounded-xl flex items-center justify-center">
                    <FileText size={32} className="text-teal-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 lg:p-0 lg:py-4">
              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-6">
                Log your spending using a quick note or our categories. We'll <span className="bg-teal-100 px-1 rounded">track your patterns and offer tips to make mindful choices and stay within your Financial Comfort Zone</span> (more on this soon!).
              </p>

              <div className="bg-amber-50 lg:bg-gray-50 lg:border lg:border-gray-200 rounded-2xl p-5 lg:p-6 mb-6">
                <div className="flex items-center justify-center gap-4 lg:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-pink-100 rounded-xl border-2 border-dashed border-pink-300 flex items-center justify-center">
                      <DollarSign size={24} className="text-pink-400 lg:w-7 lg:h-7" />
                    </div>
                    <span className="text-xs text-gray-500 mt-2">Quick note</span>
                  </div>
                  <span className="text-gray-400">or</span>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-pink-200 rounded-full flex items-center justify-center">
                      <Volume2 size={24} className="text-pink-600 lg:w-7 lg:h-7" />
                    </div>
                    <span className="text-xs text-gray-500 mt-2">Voice</span>
                  </div>
                  <span className="text-gray-400">or</span>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-pink-100 rounded-2xl flex items-center justify-center">
                      <FileText size={24} className="text-pink-400 lg:w-7 lg:h-7" />
                    </div>
                    <span className="text-xs text-gray-500 mt-2">Categories</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
                Soon, you'll learn all about <strong>spending awareness</strong> and our <strong>category system</strong>—<span className="bg-teal-100 px-1 rounded">the key to feeling in control without restricting yourself.</span> You'll also start noticing that mindful spending is easier than you thought.
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex-1 overflow-auto">
            {/* Mobile illustration */}
            <MobileIllustration className="bg-gradient-to-br from-pink-200 via-pink-100 to-rose-50 p-6 relative overflow-hidden">
              <div className="absolute top-2 left-4">
                <div className="w-8 h-8 bg-amber-400 rounded-full opacity-60"></div>
              </div>
              <div className="absolute top-8 right-8">
                <div className="w-6 h-6 bg-amber-400 rounded-full opacity-40"></div>
              </div>
              <div className="absolute bottom-4 left-8">
                <div className="w-5 h-5 bg-amber-400 rounded-full opacity-50"></div>
              </div>
              <div className="flex justify-center py-4">
                <div className="w-28 h-28 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full shadow-xl flex items-center justify-center border-4 border-amber-200">
                  <Award size={40} className="text-amber-700" />
                </div>
              </div>
            </MobileIllustration>

            {/* Desktop illustration */}
            <DesktopIllustration className="py-10">
              <div className="w-32 h-32 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full shadow-xl flex items-center justify-center border-4 border-amber-200">
                <Award size={56} className="text-amber-700" />
              </div>
              <Sparkles size={24} className="text-amber-400 absolute -top-2 -right-2" />
              <Sparkles size={16} className="text-amber-300 absolute -bottom-1 -left-3" />
            </DesktopIllustration>

            <div className="p-5 lg:p-0 lg:py-4">
              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-6">
                Every day that you complete these three simple actions, you'll be rewarded with a <strong>Fynny</strong>—a token we created to reward the actions you take now that drive your financial wellness later.
              </p>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-6">
                On average, <span className="bg-teal-100 px-1 rounded">Fynny users reduce financial stress by 40% for every 5 Fynnies they earn.</span> And the more you earn, the more confident you become. (Talk about a good investment.)
              </p>

              <div className="bg-amber-50 lg:bg-gradient-to-r lg:from-amber-50 lg:to-orange-50 lg:border lg:border-amber-200 rounded-2xl p-5 lg:p-6 mb-6 relative overflow-hidden">
                <p className="text-center text-teal-600 font-bold text-xl lg:text-2xl tracking-wide">
                  5 FYNNIES = LESS STRESS
                </p>
              </div>

              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
                <span className="bg-teal-100 px-1 rounded">Starting tomorrow, you can earn 1 Fynny each day.</span> But to get you off to a strong start, we'll give you a Fynny for completing your next (and final) lesson of the day.
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="flex-1 overflow-auto">
            {/* Mobile illustration */}
            <MobileIllustration className="bg-gradient-to-br from-pink-200 via-pink-100 to-rose-100 p-8 flex items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <Sparkles size={20} className="text-amber-400 absolute -top-2 right-0" />
              </div>
            </MobileIllustration>

            {/* Desktop illustration */}
            <DesktopIllustration className="py-10">
              <div className="w-28 h-28 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-green-100">
                <svg className="w-14 h-14 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <Sparkles size={24} className="text-amber-400 absolute -top-2 -right-2" />
            </DesktopIllustration>

            <div className="p-5 lg:p-0 lg:py-4">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">Today's challenge: Notice your money feelings.</h3>

              <p className="text-gray-700 text-lg lg:text-xl mb-6">Here's how:</p>

              <div className="space-y-5 mb-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-rose-500 transform rotate-45 mt-2"></div>
                  </div>
                  <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
                    <span className="bg-teal-100 px-1 rounded">Take a moment to notice how you feel about money right now.</span> Are you anxious? Curious? Hopeful? Just observe without judgment.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-rose-500 transform rotate-45 mt-2"></div>
                  </div>
                  <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
                    <span className="bg-teal-100 px-1 rounded">Throughout the day, notice when money thoughts pop up.</span> What triggered them?
                  </p>
                </div>
              </div>

              <div className="bg-green-50 lg:bg-gradient-to-r lg:from-green-50 lg:to-emerald-50 lg:border lg:border-green-200 rounded-2xl p-5 lg:p-6">
                <p className="text-green-700 text-center font-medium lg:text-lg">
                  You're building awareness — the first step to financial calm!
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
    <div className="min-h-screen bg-white lg:bg-gray-50" data-testid="lesson-screen">
      {/* Desktop: Centered container */}
      <div className="lg:max-w-[720px] lg:mx-auto lg:bg-white lg:min-h-screen lg:shadow-sm">
        
        {/* Top bar - Mobile: full style, Desktop: lightweight */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:px-8 lg:py-5">
          <button 
            onClick={() => currentPage > 0 ? prevPage() : setActiveScreen('home')} 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            data-testid="lesson-back-btn"
          >
            <ChevronLeft size={20} className="lg:w-5 lg:h-5" />
            <span className="hidden lg:inline text-sm font-medium">Back to Dashboard</span>
          </button>
          
          {/* Center: Lesson title (desktop) / Icon (mobile) */}
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-rose-500 lg:hidden" />
            <span className="font-medium text-gray-700 lg:text-gray-800 lg:font-semibold">
              <span className="lg:hidden">Lesson 1</span>
              <span className="hidden lg:inline">{pages[currentPage].title}</span>
            </span>
          </div>
          
          {/* Right: Progress indicator */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden lg:inline">{currentPage + 1} of {totalPages}</span>
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-rose-50 flex items-center justify-center">
              <span className="text-rose-500 text-xs lg:text-sm font-semibold">{currentPage + 1}/{totalPages}</span>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col min-h-[calc(100vh-140px)] lg:min-h-[calc(100vh-160px)]">
          {/* Main content - Desktop: more padding, cleaner typography */}
          <div className="flex-1 lg:px-8">
            {renderPageContent()}
          </div>

          {/* Bottom navigation */}
          <div className="p-5 lg:px-8 lg:py-6 border-t border-gray-100 bg-white">
            {/* Progress dots - Mobile only */}
            <div className="flex justify-center gap-1.5 mb-4 lg:hidden">
              {[...Array(totalPages)].map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentPage ? 'w-6 bg-rose-500' : 'w-2 bg-gray-300'}`} />
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
                  className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                />
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={nextPage}
              data-testid="lesson-next-btn"
              className="w-full lg:w-auto lg:min-w-[200px] lg:float-right py-4 lg:py-3 px-8 rounded-full font-semibold text-lg lg:text-base shadow-md transition-all bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white"
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

export default LessonScreen;
