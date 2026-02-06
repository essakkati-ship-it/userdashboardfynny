import React, { useState } from 'react';
import {
  ChevronLeft, Play, Check, Sparkles, Award, Heart,
  BookOpen, Volume2, Bookmark, FileText, DollarSign, Smile
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

  const pages = [
    { cta: "LET'S DO IT" },
    { cta: "GOT IT" },
    { cta: "I'VE GOT THIS" },
    { cta: "SOUNDS GREAT" },
    { cta: "CHA-CHING" },
    { cta: "I'VE GOT THIS" },
  ];

  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return (
          <div className="flex-1 overflow-auto">
            <div className="bg-gradient-to-br from-pink-200 via-pink-100 to-rose-100 p-6 flex items-center justify-center relative overflow-hidden">
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
            </div>

            <div className="p-5">
              <p className="text-gray-800 text-lg leading-relaxed mb-4">
                <strong>There are three simple things you need to do each day to be successful with Fynny</strong>—that's it!
              </p>

              <ol className="space-y-3 mb-6">
                <li className="text-gray-800 text-lg">1. Learn</li>
                <li className="text-gray-800 text-lg">2. Check in</li>
                <li className="text-gray-800 text-lg">3. Track your spending</li>
              </ol>

              <p className="text-gray-700 text-lg leading-relaxed">
                You've already started learning by simply reading this lesson. <span className="bg-teal-100 px-1">Before getting started with your next action (checking in), let's take a quick look at the key role each action plays in helping you find financial calm.</span>
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="flex-1 overflow-auto">
            <div className="bg-gradient-to-br from-pink-200 via-pink-100 to-rose-50 p-6 relative overflow-hidden">
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
            </div>

            <div className="p-5">
              <p className="text-gray-700 text-lg leading-relaxed mb-5">
                <span className="bg-teal-100 px-1">Your Fynny course has been personalized to your needs and goals.</span> It's broken down into mini-courses on topics like understanding your money emotions, building healthy habits, and more.
              </p>

              <div className="bg-amber-50 rounded-2xl p-5 mb-5 relative overflow-hidden">
                <div className="absolute top-2 left-2">
                  <div className="w-10 h-10 border-2 border-rose-300 rounded-full opacity-50"></div>
                </div>
                <p className="text-gray-700 text-center leading-relaxed relative z-10">
                  Every day, you'll learn about yourself and build healthy money habits through fun, bite-size lessons.
                </p>
                <div className="absolute bottom-2 right-4">
                  <div className="w-12 h-20 bg-rose-400 rounded-xl opacity-20"></div>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                <span className="bg-teal-100 px-1">You've already set your learning goal, which will determine how many lessons you get each day.</span> In a few days, we'll check in to see if you want to adjust your pace.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex-1 overflow-auto">
            <div className="bg-gradient-to-br from-pink-200 via-pink-100 to-rose-50 p-6 relative">
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
            </div>

            <div className="p-5">
              <p className="text-gray-700 text-lg leading-relaxed mb-5">
                We get it. Not everyone loves this part. But don't worry, we'll guide you through.
              </p>

              <p className="text-gray-700 text-lg leading-relaxed mb-5">
                Research shows that <span className="bg-teal-100 px-1">people who check in on their finances every day feel more in control than those who check in weekly.</span> They also adopt a greater number of healthy habits. (Win-win!)
              </p>

              <div className="bg-gray-50 rounded-2xl p-5 mb-4">
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
            <div className="bg-gradient-to-br from-pink-200 via-pink-100 to-rose-50 p-6 relative">
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
            </div>

            <div className="p-5">
              <p className="text-gray-700 text-lg leading-relaxed mb-5">
                Log your spending using a quick note or our categories. We'll <span className="bg-teal-100 px-1">track your patterns and offer tips to make mindful choices and stay within your Financial Comfort Zone</span> (more on this soon!).
              </p>

              <div className="bg-amber-50 rounded-2xl p-5 mb-5">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-pink-100 rounded-xl border-2 border-dashed border-pink-300 flex items-center justify-center">
                      <DollarSign size={28} className="text-pink-400" />
                    </div>
                  </div>
                  <span className="text-gray-400">or</span>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-pink-200 rounded-full flex items-center justify-center">
                      <Volume2 size={24} className="text-pink-600" />
                    </div>
                  </div>
                  <span className="text-gray-400">or</span>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center">
                      <FileText size={24} className="text-pink-400" />
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                Soon, you'll learn all about <strong>spending awareness</strong> and our <strong>category system</strong>—<span className="bg-teal-100 px-1">the key to feeling in control without restricting yourself.</span> You'll also start noticing that mindful spending is easier than you thought.
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex-1 overflow-auto">
            <div className="bg-gradient-to-br from-pink-200 via-pink-100 to-rose-50 p-6 relative overflow-hidden">
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
            </div>

            <div className="p-5">
              <p className="text-gray-700 text-lg leading-relaxed mb-5">
                Every day that you complete these three simple actions, you'll be rewarded with a <strong>Fynny</strong>—a token we created to reward the actions you take now that drive your financial wellness later.
              </p>

              <p className="text-gray-700 text-lg leading-relaxed mb-5">
                On average, <span className="bg-teal-100 px-1">Fynny users reduce financial stress by 40% for every 5 Fynnies they earn.</span> And the more you earn, the more confident you become. (Talk about a good investment.)
              </p>

              <div className="bg-amber-50 rounded-2xl p-5 mb-5 relative overflow-hidden">
                <div className="absolute top-2 left-2">
                  <Sparkles size={16} className="text-green-400" />
                </div>
                <div className="absolute top-4 right-4">
                  <Sparkles size={12} className="text-pink-400" />
                </div>
                <p className="text-center text-teal-600 font-bold text-xl tracking-wide">
                  5 FYNNIES = LESS STRESS
                </p>
                <div className="absolute bottom-2 right-8">
                  <Heart size={24} className="text-pink-300" />
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                <span className="bg-teal-100 px-1">Starting tomorrow, you can earn 1 Fynny each day.</span> But to get you off to a strong start, we'll give you a Fynny for completing your next (and final) lesson of the day.
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="flex-1 overflow-auto">
            <div className="bg-gradient-to-br from-pink-200 via-pink-100 to-rose-100 p-8 flex items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Check size={48} className="text-green-500" />
                </div>
                <Sparkles size={20} className="text-amber-400 absolute -top-2 right-0" />
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Today's challenge: Notice your money feelings.</h3>

              <p className="text-gray-700 text-lg mb-4">Here's how:</p>

              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-rose-500 transform rotate-45 mt-2"></div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="bg-teal-100 px-1">Take a moment to notice how you feel about money right now.</span> Are you anxious? Curious? Hopeful? Just observe without judgment.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-rose-500 transform rotate-45 mt-2"></div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="bg-teal-100 px-1">Throughout the day, notice when money thoughts pop up.</span> What triggered them?
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
                <p className="text-green-700 text-center font-medium">
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
    <div className="max-w-lg mx-auto bg-white min-h-screen flex flex-col" data-testid="lesson-screen">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <button 
          onClick={() => setActiveScreen('home')} 
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          data-testid="lesson-back-btn"
        >
          <ChevronLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-rose-500" />
          <span className="font-medium text-gray-700">Lesson 1</span>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors" data-testid="lesson-bookmark-btn">
          <Bookmark size={20} className="text-gray-400" />
        </button>
      </div>

      {renderPageContent()}

      <div className="p-5 border-t border-gray-100 bg-white">
        <div className="flex justify-center gap-1.5 mb-4">
          {[...Array(totalPages)].map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentPage ? 'w-6 bg-rose-500' : 'w-2 bg-gray-300'}`} />
          ))}
        </div>
        <button
          onClick={nextPage}
          data-testid="lesson-next-btn"
          className="w-full py-4 rounded-full font-semibold text-lg shadow-md transition-all bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white"
        >
          {pages[currentPage].cta}
        </button>
      </div>
    </div>
  );
};

export default LessonScreen;
