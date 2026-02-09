import React, { useState, useEffect } from 'react';
import { Zap, Check, Award, Sparkles, X } from 'lucide-react';

/**
 * Confetti animation component
 */
const Confetti = ({ count = 50 }) => {
  const colors = ['#E85A99', '#F97316', '#10B981', '#6366F1', '#F59E0B', '#14B8A6'];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(count)].map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 3 + Math.random() * 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 8 + Math.random() * 8;
        const rotation = Math.random() * 360;
        
        return (
          <div
            key={i}
            className="absolute animate-confetti"
            style={{
              left: `${left}%`,
              top: '-20px',
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              transform: `rotate(${rotation}deg)`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti-fall 4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

/**
 * Goal Achieved Celebration Modal
 * Shows confetti animation and celebration UI when all lessons in a course are completed
 */
export const GoalAchievedModal = ({ 
  isOpen, 
  onClose, 
  onContinue,
  courseName = "How Money Feels",
  lessonsCompleted = 3,
  fynniesEarned = 1,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      // Stop confetti after 4 seconds
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {showConfetti && <Confetti count={60} />}
      
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gradient-to-br from-[#1a3a4a] via-[#1e4d5f] to-[#2a5f73] rounded-3xl overflow-hidden shadow-2xl animate-celebration-pop">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            data-testid="close-celebration-modal"
          >
            <X size={18} className="text-white" />
          </button>

          {/* Sparkles decoration */}
          <div className="absolute top-6 left-6">
            <Sparkles size={24} className="text-amber-400 animate-pulse" />
          </div>
          <div className="absolute top-12 right-12">
            <Sparkles size={16} className="text-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>

          <div className="p-8 pt-12 text-center">
            {/* Trophy/Award icon with glow */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-xl animate-pulse"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                  <Award size={48} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles size={16} className="text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-white mb-2">Learning goal achieved!</h2>
            <p className="text-teal-200 text-lg mb-6">{lessonsCompleted} lessons completed</p>

            {/* Course name */}
            <div className="bg-white/10 rounded-2xl p-4 mb-6">
              <p className="text-teal-300 text-sm uppercase tracking-wider mb-1">Course Complete</p>
              <p className="text-white font-semibold text-lg">{courseName}</p>
            </div>

            {/* Fynnies earned */}
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-4 mb-6 border border-amber-400/30">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Award size={24} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-xl">+{fynniesEarned} Fynny earned!</p>
                  <p className="text-teal-300 text-sm">Great job!</p>
                </div>
              </div>
            </div>

            {/* Celebration dots */}
            <div className="flex justify-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>

            {/* Continue button */}
            <button
              onClick={onContinue}
              data-testid="celebration-continue-btn"
              className="w-full py-4 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold text-lg rounded-full shadow-lg transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes celebration-pop {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-celebration-pop {
          animation: celebration-pop 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

/**
 * Course Streak Screen
 * Displayed after completing a course to show the user's streak
 */
export const CourseStreakScreen = ({ 
  setActiveScreen, 
  streakCount = 5,
  weekDays = [
    { day: 'M', completed: true },
    { day: 'T', completed: false },
    { day: 'W', completed: false },
    { day: 'T', completed: false },
    { day: 'F', completed: false },
    { day: 'S', completed: false },
    { day: 'S', completed: false },
  ]
}) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Stop confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2830] via-[#1a3a4a] to-[#0f2830] flex flex-col" data-testid="course-streak-screen">
      {showConfetti && <Confetti count={40} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Lightning bolt icon with glow */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl scale-150"></div>
          <div className="relative w-20 h-20 flex items-center justify-center">
            <Zap size={80} className="text-amber-400 drop-shadow-lg" fill="#fbbf24" />
            <Sparkles size={20} className="text-white absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>

        {/* Streak number */}
        <div className="text-center mb-8">
          <p className="text-7xl sm:text-8xl font-bold text-amber-400 mb-2 drop-shadow-lg">
            {streakCount}
          </p>
          <p className="text-2xl text-white font-medium tracking-wide">day streak</p>
        </div>

        {/* Week day indicators */}
        <div className="flex items-center gap-4 sm:gap-6 mb-8">
          {weekDays.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                item.completed 
                  ? 'bg-amber-400 shadow-lg shadow-amber-400/30' 
                  : 'bg-white/10'
              }`}>
                {item.completed && <Check size={20} className="text-[#1a3a4a]" strokeWidth={3} />}
              </div>
              <span className={`text-sm font-medium ${item.completed ? 'text-amber-400' : 'text-white/40'}`}>
                {item.day}
              </span>
            </div>
          ))}
        </div>

        {/* Motivational text */}
        <p className="text-white/80 text-lg text-center max-w-xs mb-12">
          Leading with action—and it shows.
        </p>
      </div>

      {/* Bottom button */}
      <div className="p-6 pb-8">
        <button
          onClick={() => setActiveScreen('home')}
          data-testid="streak-continue-btn"
          className="w-full py-4 bg-white hover:bg-gray-100 text-[#1a3a4a] font-semibold text-lg rounded-full shadow-lg transition-all"
        >
          I'm committed
        </button>
      </div>
    </div>
  );
};

export default { GoalAchievedModal, CourseStreakScreen, Confetti };
