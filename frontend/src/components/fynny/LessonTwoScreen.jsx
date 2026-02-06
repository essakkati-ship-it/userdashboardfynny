import React, { useState } from 'react';
import {
  ChevronLeft, Check, Sparkles, Award, Heart,
  BookOpen, Volume2, Bookmark, Brain, Lightbulb, TrendingUp
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

  const pages = [
    { cta: "TELL ME MORE" },
    { cta: "INTERESTING" },
    { cta: "MAKES SENSE" },
    { cta: "I'M READY" },
    { cta: "COMPLETE LESSON" },
  ];

  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return (
          <div className="flex-1 overflow-auto">
            <div className="bg-gradient-to-br from-purple-200 via-purple-100 to-indigo-100 p-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 left-6">
                <Sparkles size={20} className="text-purple-300" />
              </div>
              <div className="absolute bottom-4 right-8">
                <div className="w-16 h-16 border-2 border-purple-300 rounded-full opacity-40"></div>
              </div>
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center shadow-xl">
                <Brain size={48} className="text-white" />
              </div>
            </div>

            <div className="p-5">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Discover Your Money Style</h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-5">
                Everyone has a unique relationship with money. <span className="bg-purple-100 px-1">Understanding your "money style" is the first step to making lasting changes.</span>
              </p>

              <p className="text-gray-700 text-lg leading-relaxed">
                In this lesson, you'll discover which of the four money personalities resonates most with you—and learn how to work with (not against) your natural tendencies.
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="flex-1 overflow-auto">
            <div className="bg-gradient-to-br from-purple-400 to-indigo-500 p-6 relative">
              <h3 className="text-white font-bold text-lg mb-2">The Four Money Styles</h3>
              <p className="text-purple-100 text-sm">Which one sounds like you?</p>
            </div>

            <div className="p-5 space-y-4">
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                    <Heart size={20} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800">The Emotional Spender</h4>
                </div>
                <p className="text-gray-600 text-sm">Uses spending to cope with feelings. Shops when stressed, sad, or celebrating.</p>
              </div>

              <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <TrendingUp size={20} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800">The Saver</h4>
                </div>
                <p className="text-gray-600 text-sm">Finds security in saving. May struggle to enjoy money even when it's okay to spend.</p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Lightbulb size={20} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800">The Avoider</h4>
                </div>
                <p className="text-gray-600 text-sm">Prefers not to think about money. Bills pile up, accounts go unchecked.</p>
              </div>

              <div className="bg-pink-50 rounded-2xl p-4 border border-pink-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                    <Award size={20} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800">The Status Seeker</h4>
                </div>
                <p className="text-gray-600 text-sm">Ties self-worth to wealth appearance. Spending often exceeds actual means.</p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex-1 overflow-auto">
            <div className="bg-gradient-to-br from-teal-100 to-green-100 p-8 flex items-center justify-center">
              <div className="relative">
                <div className="w-28 h-28 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Lightbulb size={48} className="text-amber-500" />
                </div>
                <Sparkles size={20} className="text-purple-400 absolute -top-2 -right-2" />
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-4">The Good News</h3>

              <p className="text-gray-700 text-lg leading-relaxed mb-5">
                <span className="bg-purple-100 px-1">There's no "bad" money style.</span> Each has strengths and challenges. The key is awareness.
              </p>

              <div className="bg-purple-50 rounded-2xl p-5 mb-5 border border-purple-200">
                <p className="text-gray-700 text-center leading-relaxed">
                  "When you understand your patterns, you can work <strong>with</strong> them instead of fighting against them."
                </p>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                Most people are a mix of styles. <span className="bg-purple-100 px-1">Over the coming days, we'll help you identify your primary style</span> and develop strategies tailored to you.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex-1 overflow-auto">
            <div className="bg-gradient-to-br from-purple-200 via-purple-100 to-indigo-100 p-6 relative">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center">
                  <Brain size={20} className="text-purple-600" />
                </div>
                <h3 className="text-purple-700 font-bold text-lg">Quick Reflection</h3>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Think about your last purchase...</h3>

              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">1</div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    What were you feeling <strong>before</strong> you made it?
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">2</div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Was it <strong>planned</strong> or <strong>spontaneous</strong>?
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">3</div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    How did you feel <strong>after</strong>?
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                <p className="text-amber-700 text-center text-sm">
                  <span className="bg-purple-100 px-1">No need to answer now</span> — just let these questions simmer as you go about your day.
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex-1 overflow-auto">
            <div className="bg-gradient-to-br from-green-100 via-teal-50 to-emerald-50 p-8 flex items-center justify-center">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center shadow-xl">
                  <Check size={48} className="text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Award size={20} className="text-white" />
                </div>
              </div>
            </div>

            <div className="p-5">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Lesson Complete!</h2>

              <p className="text-gray-700 text-lg leading-relaxed text-center mb-5">
                You've taken the first step in understanding your money style. <span className="bg-purple-100 px-1">This awareness will be your superpower.</span>
              </p>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 mb-5 border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Award size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">+1 Fynny earned!</p>
                    <p className="text-sm text-gray-500">Lesson 2 complete</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-center text-sm">
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
    <div className="max-w-lg mx-auto bg-white min-h-screen flex flex-col" data-testid="lesson-two-screen">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <button 
          onClick={() => setActiveScreen('home')} 
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          data-testid="lesson-two-back-btn"
        >
          <ChevronLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-purple-500" />
          <span className="font-medium text-gray-700">Lesson 2</span>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <Bookmark size={20} className="text-gray-400" />
        </button>
      </div>

      {renderPageContent()}

      <div className="p-5 border-t border-gray-100 bg-white">
        <div className="flex justify-center gap-1.5 mb-4">
          {[...Array(totalPages)].map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentPage ? 'w-6 bg-purple-500' : 'w-2 bg-gray-300'}`} />
          ))}
        </div>
        <button
          onClick={nextPage}
          data-testid="lesson-two-next-btn"
          className="w-full py-4 rounded-full font-semibold text-lg shadow-md transition-all bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
        >
          {pages[currentPage].cta}
        </button>
      </div>
    </div>
  );
};

export default LessonTwoScreen;
