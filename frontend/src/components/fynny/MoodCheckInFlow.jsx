import React, { useState, useEffect, useRef } from 'react';
import { X, Lightbulb, Briefcase, Heart, Moon, Dumbbell, Cloud, Users, Home, Backpack, Car, Stethoscope, ChevronRight, Pencil } from 'lucide-react';
import { useUser } from '../../context/UserContext';

// Money-focused mood options
const MOOD_OPTIONS = [
  { id: 'calm', label: 'Calm', value: 100, color: '#14B8A6', emoji: '😌' },
  { id: 'confident', label: 'Confident', value: 85, color: '#10B981', emoji: '💪' },
  { id: 'motivated', label: 'Motivated', value: 70, color: '#F59E0B', emoji: '🔥' },
  { id: 'slightly-stressed', label: 'Slightly stressed', value: 50, color: '#FBBF24', emoji: '😐' },
  { id: 'overwhelmed', label: 'Overwhelmed', value: 30, color: '#F97316', emoji: '😰' },
  { id: 'avoiding-it', label: 'Avoiding it', value: 15, color: '#EF4444', emoji: '🙈' },
];

// Contributing factors
const CONTRIBUTING_FACTORS = [
  { id: 'work', label: 'Work', icon: Briefcase },
  { id: 'health', label: 'Health', icon: Stethoscope },
  { id: 'sleep', label: 'Sleep', icon: Moon },
  { id: 'exercise', label: 'Exercise', icon: Dumbbell },
  { id: 'weather', label: 'Weather', icon: Cloud },
  { id: 'relationship', label: 'Relationship', icon: Heart },
  { id: 'family', label: 'Family', icon: Home },
  { id: 'friends', label: 'Friends', icon: Users },
  { id: 'activities', label: 'Activities', icon: Backpack },
  { id: 'travel', label: 'Travel', icon: Car },
];

// Get mood info from score
const getMoodFromScore = (score) => {
  if (score >= 90) return MOOD_OPTIONS[0]; // Calm
  if (score >= 75) return MOOD_OPTIONS[1]; // Confident
  if (score >= 60) return MOOD_OPTIONS[2]; // Motivated
  if (score >= 40) return MOOD_OPTIONS[3]; // Slightly stressed
  if (score >= 20) return MOOD_OPTIONS[4]; // Overwhelmed
  return MOOD_OPTIONS[5]; // Avoiding it
};

// Mood Blob Component - Animated face that changes expression
const MoodBlob = ({ moodValue }) => {
  const mood = getMoodFromScore(moodValue);
  
  // Get expression based on mood value
  const getExpression = () => {
    if (moodValue <= 20) return { eyeY: 45, mouthPath: 'M 30 70 Q 50 55 70 70', eyebrowRotate: 15 };
    if (moodValue <= 35) return { eyeY: 43, mouthPath: 'M 30 65 Q 50 58 70 65', eyebrowRotate: 8 };
    if (moodValue <= 55) return { eyeY: 42, mouthPath: 'M 35 62 L 65 62', eyebrowRotate: 0 };
    if (moodValue <= 75) return { eyeY: 40, mouthPath: 'M 30 60 Q 50 68 70 60', eyebrowRotate: -5 };
    if (moodValue <= 90) return { eyeY: 38, mouthPath: 'M 28 58 Q 50 72 72 58', eyebrowRotate: -8 };
    return { eyeY: 36, mouthPath: 'M 25 55 Q 50 78 75 55', eyebrowRotate: -12 };
  };

  const { eyeY, mouthPath, eyebrowRotate } = getExpression();

  return (
    <div className="relative w-36 h-36 mx-auto mb-4">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Blob body */}
        <ellipse 
          cx="50" 
          cy="55" 
          rx="42" 
          ry="38" 
          fill={mood.color}
          className="transition-all duration-300"
        />
        
        {/* Left eye */}
        <ellipse 
          cx="35" 
          cy={eyeY} 
          rx="6" 
          ry="7" 
          fill="white"
          className="transition-all duration-300"
        />
        <circle cx="36" cy={eyeY + 1} r="3" fill="#1F2937" />
        
        {/* Right eye */}
        <ellipse 
          cx="65" 
          cy={eyeY} 
          rx="6" 
          ry="7" 
          fill="white"
          className="transition-all duration-300"
        />
        <circle cx="66" cy={eyeY + 1} r="3" fill="#1F2937" />
        
        {/* Eyebrows */}
        <line 
          x1="28" y1={eyeY - 12} 
          x2="42" y2={eyeY - 10 + eyebrowRotate/3} 
          stroke="#1F2937" 
          strokeWidth="2.5" 
          strokeLinecap="round"
          className="transition-all duration-300"
        />
        <line 
          x1="72" y1={eyeY - 12} 
          x2="58" y2={eyeY - 10 + eyebrowRotate/3} 
          stroke="#1F2937" 
          strokeWidth="2.5" 
          strokeLinecap="round"
          className="transition-all duration-300"
        />
        
        {/* Mouth */}
        <path 
          d={mouthPath} 
          fill="none" 
          stroke="#1F2937" 
          strokeWidth="3" 
          strokeLinecap="round"
          className="transition-all duration-300"
        />
        
        {/* Blush cheeks when happy */}
        {moodValue > 70 && (
          <>
            <circle cx="25" cy="55" r="6" fill="#FDA4AF" opacity="0.5" />
            <circle cx="75" cy="55" r="6" fill="#FDA4AF" opacity="0.5" />
          </>
        )}
      </svg>
    </div>
  );
};

// Custom Touch-Friendly Slider Component
const TouchSlider = ({ value, onChange, min = 0, max = 100 }) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const calculateValue = (clientX) => {
    if (!sliderRef.current) return value;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    return Math.round(percentage * (max - min) + min);
  };

  const handleStart = (clientX) => {
    setIsDragging(true);
    onChange(calculateValue(clientX));
  };

  const handleMove = (clientX) => {
    if (isDragging) {
      onChange(calculateValue(clientX));
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Add/remove global event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  const percentage = ((value - min) / (max - min)) * 100;
  const mood = getMoodFromScore(value);

  return (
    <div className="w-full px-2">
      {/* Slider track */}
      <div 
        ref={sliderRef}
        className="relative h-3 bg-gradient-to-r from-red-400 via-amber-400 to-teal-400 rounded-full cursor-pointer touch-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        data-testid="mood-slider-track"
      >
        {/* Thumb */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-4 transition-transform ${isDragging ? 'scale-110' : ''}`}
          style={{ 
            left: `calc(${percentage}% - 16px)`,
            borderColor: mood.color,
          }}
        />
      </div>
      
      {/* Scale labels */}
      <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
        <span>0</span>
        <span>20</span>
        <span>40</span>
        <span>60</span>
        <span>80</span>
        <span>100</span>
      </div>
    </div>
  );
};

// Mood Slider Screen
const MoodSliderScreen = ({ moodValue, setMoodValue, onNext, onClose }) => {
  const mood = getMoodFromScore(moodValue);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
          <Lightbulb size={20} className="text-amber-500" />
        </button>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          data-testid="close-mood-checkin"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <h1 className="text-xl font-bold text-gray-800 mb-2 text-center">How are you feeling about money today?</h1>
        
        {/* Mood Blob */}
        <MoodBlob moodValue={moodValue} />
        
        {/* Mood Label with Score */}
        <div className="text-center mb-6">
          <p className="text-2xl font-bold" style={{ color: mood.color }}>{mood.label}</p>
          <p className="text-4xl font-bold text-gray-800 mt-1">{moodValue}</p>
        </div>
        
        {/* Touch-Friendly Slider */}
        <div className="w-full max-w-sm mb-6">
          <TouchSlider 
            value={moodValue} 
            onChange={setMoodValue}
            min={0}
            max={100}
          />
        </div>
        
        {/* Mood Options Quick Select */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {MOOD_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setMoodValue(option.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                mood.id === option.id 
                  ? 'text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={mood.id === option.id ? { backgroundColor: option.color } : {}}
            >
              {option.emoji} {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="p-6">
        <button
          onClick={onNext}
          data-testid="mood-next-btn"
          className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-full shadow-lg transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// Contributing Factors Screen
const ContributingFactorsScreen = ({ selectedFactors, setSelectedFactors, note, setNote, onDone, onBack, onClose }) => {
  const toggleFactor = (factorId) => {
    if (selectedFactors.includes(factorId)) {
      setSelectedFactors(selectedFactors.filter(f => f !== factorId));
    } else {
      setSelectedFactors([...selectedFactors, factorId]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <ChevronRight size={20} className="text-gray-600 rotate-180" />
        </button>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 pb-4">
        <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
          What might be contributing to your mood?
        </h1>
        
        {/* Factor buttons grid */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {CONTRIBUTING_FACTORS.map((factor) => {
            const Icon = factor.icon;
            const isSelected = selectedFactors.includes(factor.id);
            
            return (
              <button
                key={factor.id}
                onClick={() => toggleFactor(factor.id)}
                data-testid={`factor-${factor.id}`}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${
                  isSelected 
                    ? 'bg-teal-100 border-2 border-teal-400' 
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isSelected ? 'bg-teal-500' : 'bg-gray-200'
                }`}>
                  <Icon size={18} className={isSelected ? 'text-white' : 'text-gray-600'} />
                </div>
                <span className={`text-[10px] font-medium ${isSelected ? 'text-teal-700' : 'text-gray-600'}`}>
                  {factor.label}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Note input */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
            <Pencil size={14} />
            Add a note (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Any specific details about how you're feeling?"
            rows={3}
            data-testid="mood-note-input"
            className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-teal-400 focus:outline-none resize-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Done Button */}
      <div className="p-6 pt-2">
        <button
          onClick={onDone}
          data-testid="mood-done-btn"
          className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-full shadow-lg transition-all"
        >
          Done
        </button>
      </div>
    </div>
  );
};

// Success/Confirmation Screen
const MoodSuccessScreen = ({ moodValue, onClose }) => {
  const mood = getMoodFromScore(moodValue);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-end p-4">
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Success animation */}
        <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce-slow">
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-white">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Check-in complete!</h1>
        <p className="text-gray-600 text-center mb-2">
          You logged feeling <span className="font-semibold" style={{ color: mood.color }}>{mood.label.toLowerCase()}</span>
        </p>
        <p className="text-3xl font-bold text-gray-800 mb-6">Score: {moodValue}</p>
        
        {/* Fynny earned */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">🏆</span>
          </div>
          <div>
            <p className="font-semibold text-gray-800">+1 Fynny earned!</p>
            <p className="text-sm text-gray-500">Daily check-in complete</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 text-center">
          Keep tracking your mood to discover patterns and insights.
        </p>
      </div>

      {/* Close Button */}
      <div className="p-6">
        <button
          onClick={onClose}
          data-testid="mood-close-btn"
          className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-full shadow-lg transition-all"
        >
          Back to Home
        </button>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Main Mood Check-in Flow Component
const MoodCheckInFlow = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [moodValue, setMoodValue] = useState(50);
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [note, setNote] = useState('');
  const { logMoodCheckIn } = useUser();

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setMoodValue(50);
      setSelectedFactors([]);
      setNote('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDone = async () => {
    const mood = getMoodFromScore(moodValue);

    // Create note with factors and score
    const fullNote = [
      `Score: ${moodValue}`,
      selectedFactors.length > 0 ? `Factors: ${selectedFactors.join(', ')}` : '',
      note ? `Note: ${note}` : ''
    ].filter(Boolean).join(' | ');

    try {
      await logMoodCheckIn(mood.label, fullNote);
    } catch (err) {
      console.error('Failed to log mood:', err);
    }
    
    setStep(3);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white" data-testid="mood-checkin-flow">
      {step === 1 && (
        <MoodSliderScreen
          moodValue={moodValue}
          setMoodValue={setMoodValue}
          onNext={() => setStep(2)}
          onClose={handleClose}
        />
      )}
      {step === 2 && (
        <ContributingFactorsScreen
          selectedFactors={selectedFactors}
          setSelectedFactors={setSelectedFactors}
          note={note}
          setNote={setNote}
          onDone={handleDone}
          onBack={() => setStep(1)}
          onClose={handleClose}
        />
      )}
      {step === 3 && (
        <MoodSuccessScreen
          moodValue={moodValue}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default MoodCheckInFlow;
export { MOOD_OPTIONS, getMoodFromScore };
