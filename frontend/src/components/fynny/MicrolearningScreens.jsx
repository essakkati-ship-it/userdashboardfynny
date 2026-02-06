import React, { useState } from 'react';
import {
  ChevronLeft, Check, Sparkles, Award, Sun,
  Bookmark, Clock, Zap, Target, Leaf, Lightbulb, TrendingUp
} from 'lucide-react';

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

  const pages = [
    { cta: "CHECK MY ANSWER" },
    { cta: "NEXT QUESTION" },
    { cta: "SEE RESULTS" },
    { cta: "BACK TO HOME" },
  ];

  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return (
          <div className="flex-1 overflow-auto">
            <div className="bg-gradient-to-br from-amber-100 via-amber-50 to-orange-50 p-8 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                <Sun size={48} className="text-white" />
              </div>
            </div>

            <div className="p-5">
              <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                QUESTION 1 OF 3
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-4">
                If you have $100 in savings at 2% annual interest, how much will you have after 1 year?
              </h2>

              <div className="space-y-3">
                {['$98', '$100', '$102', '$120'].map((answer, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedAnswer(i)}
                    data-testid={`answer-${i}`}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedAnswer === i
                        ? 'bg-amber-100 border-2 border-amber-400'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span className={`font-medium ${selectedAnswer === i ? 'text-amber-700' : 'text-gray-700'}`}>
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
            <div className="bg-gradient-to-br from-green-100 to-teal-100 p-8 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-xl">
                <Check size={48} className="text-white" />
              </div>
            </div>

            <div className="p-5">
              <div className="bg-green-50 rounded-2xl p-5 border border-green-200 mb-5">
                <h3 className="font-bold text-green-700 mb-2">Correct! $102</h3>
                <p className="text-gray-600">
                  2% of $100 is $2, so after one year you'd have $102. <span className="bg-amber-100 px-1">This is the power of compound interest!</span>
                </p>
              </div>

              <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                QUESTION 2 OF 3
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Which typically has the highest interest rate?
              </h2>

              <div className="space-y-3">
                {['Savings account', 'Credit card debt', 'Mortgage', 'Car loan'].map((answer, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedAnswer(i)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedAnswer === i
                        ? 'bg-amber-100 border-2 border-amber-400'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span className={`font-medium ${selectedAnswer === i ? 'text-amber-700' : 'text-gray-700'}`}>
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
            <div className="bg-gradient-to-br from-green-100 to-teal-100 p-8 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-xl">
                <Check size={48} className="text-white" />
              </div>
            </div>

            <div className="p-5">
              <div className="bg-green-50 rounded-2xl p-5 border border-green-200 mb-5">
                <h3 className="font-bold text-green-700 mb-2">Correct! Credit card debt</h3>
                <p className="text-gray-600">
                  Credit cards often charge 15-25% interest, while mortgages are typically 3-7%. <span className="bg-amber-100 px-1">This is why paying off credit cards should be a priority!</span>
                </p>
              </div>

              <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                QUESTION 3 OF 3
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-4">
                What's the recommended emergency fund size?
              </h2>

              <div className="space-y-3">
                {['1 week of expenses', '1 month of expenses', '3-6 months of expenses', '1 year of expenses'].map((answer, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedAnswer(i)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedAnswer === i
                        ? 'bg-amber-100 border-2 border-amber-400'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span className={`font-medium ${selectedAnswer === i ? 'text-amber-700' : 'text-gray-700'}`}>
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
            <div className="bg-gradient-to-br from-amber-100 via-amber-50 to-orange-50 p-8 flex items-center justify-center">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                  <Award size={56} className="text-white" />
                </div>
                <Sparkles size={24} className="text-amber-400 absolute -top-2 -right-2" />
              </div>
            </div>

            <div className="p-5">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Great job!</h2>
              <p className="text-gray-600 text-center mb-6">You got 3 out of 3 correct!</p>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Award size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">+1 Fynny earned!</p>
                    <p className="text-sm text-gray-500">Literacy check complete</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-center text-sm">
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
    <div className="max-w-lg mx-auto bg-white min-h-screen flex flex-col" data-testid="literacy-check-screen">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <button onClick={() => setActiveScreen('home')} className="p-1 hover:bg-gray-100 rounded-full transition-colors" data-testid="literacy-back-btn">
          <ChevronLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <Sun size={20} className="text-amber-500" />
          <span className="font-medium text-gray-700">Literacy Check</span>
        </div>
        <div className="w-8"></div>
      </div>

      {renderPageContent()}

      <div className="p-5 border-t border-gray-100 bg-white">
        <div className="flex justify-center gap-1.5 mb-4">
          {[...Array(totalPages)].map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentPage ? 'w-6 bg-amber-500' : 'w-2 bg-gray-300'}`} />
          ))}
        </div>
        <button
          onClick={nextPage}
          disabled={currentPage < 3 && selectedAnswer === null}
          data-testid="literacy-next-btn"
          className={`w-full py-4 rounded-full font-semibold text-lg shadow-md transition-all ${
            currentPage < 3 && selectedAnswer === null
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
          }`}
        >
          {pages[currentPage].cta}
        </button>
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

  const pages = [
    { cta: "TELL ME MORE" },
    { cta: "I LIKE THAT" },
    { cta: "I'LL TRY IT" },
    { cta: "BACK TO HOME" },
  ];

  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return (
          <div className="flex-1 overflow-auto">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 left-6">
                <Sparkles size={20} className="text-white/30" />
              </div>
              <div className="absolute bottom-6 right-8">
                <Sparkles size={16} className="text-white/20" />
              </div>
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Zap size={48} className="text-amber-300" />
              </div>
            </div>

            <div className="p-5">
              <div className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                DAILY BOOST
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">On Tiny Shifts</h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-5">
                Big changes don't come from big actions. They come from <span className="bg-purple-100 px-1">tiny, consistent shifts</span> that compound over time.
              </p>

              <p className="text-gray-700 text-lg leading-relaxed">
                Today's boost is about embracing the power of small—because small is mighty.
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="flex-1 overflow-auto">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-8 flex items-center justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Lightbulb size={48} className="text-amber-500" />
                </div>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-4">The Science of Small</h3>

              <p className="text-gray-700 text-lg leading-relaxed mb-5">
                Research shows that <span className="bg-purple-100 px-1">habits formed through tiny actions are 2-3x more likely to stick</span> than those requiring big effort.
              </p>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-200">
                <p className="text-gray-700 text-center leading-relaxed">
                  "A 1% improvement every day leads to being <strong>37x better</strong> by the end of the year."
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex-1 overflow-auto">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 relative">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Target size={20} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg">Your Tiny Shift</h3>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Today's micro-challenge:</h3>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 mb-5 border border-amber-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 mb-2">The 2-Minute Money Moment</p>
                    <p className="text-gray-700">
                      <span className="bg-purple-100 px-1">Spend just 2 minutes</span> looking at your bank balance. That's it. No judgment, no action needed—just look.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                This tiny act builds your "money awareness muscle." Over time, <span className="bg-purple-100 px-1">checking in becomes as natural as checking the weather.</span>
              </p>

              <div className="flex items-center gap-2 text-indigo-600">
                <Clock size={16} />
                <span className="text-sm font-medium">Takes less than 2 minutes</span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex-1 overflow-auto">
            <div className="bg-gradient-to-br from-green-100 via-teal-50 to-emerald-50 p-8 flex items-center justify-center">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                  <Zap size={48} className="text-amber-300" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Check size={20} className="text-white" />
                </div>
              </div>
            </div>

            <div className="p-5">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Boost received!</h2>

              <p className="text-gray-700 text-lg leading-relaxed text-center mb-5">
                Remember: <span className="bg-purple-100 px-1">tiny shifts lead to massive transformations.</span> You're already making progress just by showing up.
              </p>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 mb-5 border border-indigo-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Award size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">+1 Fynny earned!</p>
                    <p className="text-sm text-gray-500">Daily boost complete</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-center text-sm">
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
    <div className="max-w-lg mx-auto bg-white min-h-screen flex flex-col" data-testid="daily-boost-screen">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <button onClick={() => setActiveScreen('home')} className="p-1 hover:bg-gray-100 rounded-full transition-colors" data-testid="boost-back-btn">
          <ChevronLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-indigo-500" />
          <span className="font-medium text-gray-700">Daily Boost</span>
        </div>
        <div className="w-8"></div>
      </div>

      {renderPageContent()}

      <div className="p-5 border-t border-gray-100 bg-white">
        <div className="flex justify-center gap-1.5 mb-4">
          {[...Array(totalPages)].map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentPage ? 'w-6 bg-indigo-500' : 'w-2 bg-gray-300'}`} />
          ))}
        </div>
        <button
          onClick={nextPage}
          data-testid="boost-next-btn"
          className="w-full py-4 rounded-full font-semibold text-lg shadow-md transition-all bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
        >
          {pages[currentPage].cta}
        </button>
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

  const pages = [
    { cta: "SHOW ME HOW" },
    { cta: "I'LL TRY THIS" },
    { cta: "BACK TO HOME" },
  ];

  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return (
          <div className="flex-1 overflow-auto">
            <div className="bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50 p-8 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 left-6">
                <Leaf size={24} className="text-green-300" />
              </div>
              <div className="absolute bottom-6 right-8">
                <Sparkles size={20} className="text-teal-300" />
              </div>
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                <Leaf size={48} className="text-white" />
              </div>
            </div>

            <div className="p-5">
              <div className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                TODAY'S TIP
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">The 24-Hour Rule</h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-5">
                Before making any non-essential purchase over $20, <span className="bg-green-100 px-1">wait 24 hours.</span>
              </p>

              <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 mb-1">Why it works:</p>
                    <p className="text-gray-700">
                      This simple pause <span className="bg-green-100 px-1">separates "want" from "need"</span> and helps you avoid impulse purchases you might regret.
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
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-6 relative">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Lightbulb size={20} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg">How to Apply It</h3>
              </div>
            </div>

            <div className="p-5">
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">1</div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">See something you want?</p>
                    <p className="text-gray-600 text-sm">Take a screenshot or add it to a wishlist</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">2</div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Wait 24 hours</p>
                    <p className="text-gray-600 text-sm">Set a reminder if you need to</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">3</div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Ask yourself:</p>
                    <p className="text-gray-600 text-sm">"Do I still want this as much as yesterday?"</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={20} className="text-amber-600" />
                  <p className="font-bold text-gray-800">The result?</p>
                </div>
                <p className="text-gray-700">
                  Studies show that <span className="bg-green-100 px-1">up to 70% of impulse purchases are abandoned</span> after a 24-hour cooling period.
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex-1 overflow-auto">
            <div className="bg-gradient-to-br from-green-100 via-teal-50 to-emerald-50 p-8 flex items-center justify-center">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                  <Check size={48} className="text-white" />
                </div>
                <Sparkles size={24} className="text-amber-400 absolute -top-2 -right-2" />
              </div>
            </div>

            <div className="p-5">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Tip saved!</h2>

              <p className="text-gray-700 text-lg leading-relaxed text-center mb-5">
                Try the 24-hour rule on your next tempting purchase. <span className="bg-green-100 px-1">You might surprise yourself!</span>
              </p>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 mb-5 border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Award size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">+1 Fynny earned!</p>
                    <p className="text-sm text-gray-500">Money tip complete</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <p className="text-gray-600 text-sm">
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
    <div className="max-w-lg mx-auto bg-white min-h-screen flex flex-col" data-testid="money-tip-screen">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <button onClick={() => setActiveScreen('home')} className="p-1 hover:bg-gray-100 rounded-full transition-colors" data-testid="tip-back-btn">
          <ChevronLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <Leaf size={20} className="text-green-500" />
          <span className="font-medium text-gray-700">Money Tip</span>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <Bookmark size={20} className="text-gray-400" />
        </button>
      </div>

      {renderPageContent()}

      <div className="p-5 border-t border-gray-100 bg-white">
        <div className="flex justify-center gap-1.5 mb-4">
          {[...Array(totalPages)].map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentPage ? 'w-6 bg-green-500' : 'w-2 bg-gray-300'}`} />
          ))}
        </div>
        <button
          onClick={nextPage}
          data-testid="tip-next-btn"
          className="w-full py-4 rounded-full font-semibold text-lg shadow-md transition-all bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
        >
          {pages[currentPage].cta}
        </button>
      </div>
    </div>
  );
};
