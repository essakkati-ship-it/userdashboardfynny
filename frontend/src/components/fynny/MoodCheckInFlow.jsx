import React, { useState, useEffect } from 'react';
import { X, Lightbulb, Briefcase, Heart, Moon, Dumbbell, Cloud, Users, Home, Backpack, Car, Stethoscope, ChevronRight } from 'lucide-react';
import { useUser } from '../../context/UserContext';

// Mood levels with colors and expressions
const MOOD_LEVELS = [
  { value: 0, label: 'Very unpleasant', color: '#5EADB0', expression: 'very-sad' },
  { value: 20, label: 'Unpleasant', color: '#7BC5A8', expression: 'sad' },
  { value: 40, label: 'Slightly unpleasant', color: '#A8D99C', expression: 'neutral-sad' },
  { value: 60, label: 'Slightly pleasant', color: '#C5E88B', expression: 'neutral-happy' },
  { value: 80, label: 'Pleasant', color: '#E8D166', expression: 'happy' },
  { value: 100, label: 'Very pleasant', color: '#F5B74E', expression: 'very-happy' },
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

// Mood Blob Component - Animated face that changes expression
const MoodBlob = ({ moodValue }) => {
  // Get color based on mood value
  const getColor = () => {
    if (moodValue <= 20) return '#14B8A6'; // teal-500
    if (moodValue <= 40) return '#5EEAD4'; // teal-300
    if (moodValue <= 60) return '#FCD34D'; // amber-300
    if (moodValue <= 80) return '#FBBF24'; // amber-400
    return '#F59E0B'; // amber-500
  };

  // Get expression based on mood value
  const getExpression = () => {
    if (moodValue <= 10) return { eyeY: 45, mouthPath: 'M 30 70 Q 50 55 70 70', eyebrowRotate: 15 };
    if (moodValue <= 30) return { eyeY: 43, mouthPath: 'M 30 65 Q 50 58 70 65', eyebrowRotate: 8 };
    if (moodValue <= 50) return { eyeY: 42, mouthPath: 'M 35 62 L 65 62', eyebrowRotate: 0 };
    if (moodValue <= 70) return { eyeY: 40, mouthPath: 'M 30 60 Q 50 68 70 60', eyebrowRotate: -5 };
    if (moodValue <= 90) return { eyeY: 38, mouthPath: 'M 28 58 Q 50 72 72 58', eyebrowRotate: -8 };
    return { eyeY: 36, mouthPath: 'M 25 55 Q 50 78 75 55', eyebrowRotate: -12 };
  };

  const color = getColor();
  const { eyeY, mouthPath, eyebrowRotate } = getExpression();

  return (
    <div className="relative w-40 h-40 mx-auto mb-6">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Blob body */}
        <ellipse 
          cx="50" 
          cy="55" 
          rx="42" 
          ry="38" 
          fill={color}
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
        {moodValue > 60 && (
          <>
            <circle cx="25" cy="55" r="6" fill="#FDA4AF" opacity="0.5" />
            <circle cx="75" cy="55" r="6" fill="#FDA4AF" opacity="0.5" />
          </>
        )}
      </svg>
    </div>
  );
};

// Mood Slider Screen
const MoodSliderScreen = ({ moodValue, setMoodValue, onNext, onClose }) => {
  const getMoodLabel = () => {
    if (moodValue <= 10) return 'Very unpleasant';
    if (moodValue <= 30) return 'Unpleasant';
    if (moodValue <= 50) return 'Slightly unpleasant';
    if (moodValue <= 70) return 'Slightly pleasant';
    if (moodValue <= 90) return 'Pleasant';
    return 'Very pleasant';
  };

  return (
    <div className="flex flex-col h-full">
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
        <h1 className="text-2xl font-bold text-gray-800 mb-8">How are you feeling?</h1>
        
        {/* Mood Blob */}
        <MoodBlob moodValue={moodValue} />
        
        {/* Mood Label */}
        <p className="text-gray-600 text-lg mb-2">I am feeling</p>
        <p className="text-xl font-semibold text-gray-800 mb-10 capitalize">{getMoodLabel()}</p>
        
        {/* Slider */}
        <div className="w-full max-w-sm">
          {/* Slider track */}
          <div className="relative h-2 bg-gradient-to-r from-teal-400 via-amber-300 to-amber-500 rounded-full mb-3">
            <input
              type="range"
              min="0"
              max="100"
              value={moodValue}
              onChange={(e) => setMoodValue(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              data-testid="mood-slider"
            />
            {/* Slider thumb indicator */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-gray-200 transition-all duration-100"
              style={{ left: `calc(${moodValue}% - 12px)` }}
            />
          </div>
          
          {/* Scale markers */}
          <div className="flex justify-between text-xs text-gray-400 px-1">
            <span>0</span>
            <span>20</span>
            <span>40</span>
            <span>60</span>
            <span>80</span>
            <span>100</span>
          </div>
        </div>
        
        {/* Bottom label */}
        <p className="text-sm font-semibold text-gray-500 mt-8 uppercase tracking-wider">
          {getMoodLabel()}
        </p>
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
    <div className="flex flex-col h-full">
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
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Any specific details?"
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
  const getMoodLabel = () => {
    if (moodValue <= 10) return 'Very unpleasant';
    if (moodValue <= 30) return 'Unpleasant';
    if (moodValue <= 50) return 'Slightly unpleasant';
    if (moodValue <= 70) return 'Slightly pleasant';
    if (moodValue <= 90) return 'Pleasant';
    return 'Very pleasant';
  };

  return (
    <div className="flex flex-col h-full">
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
        <p className="text-gray-600 text-center mb-4">
          You logged feeling <span className="font-semibold text-teal-600">{getMoodLabel().toLowerCase()}</span>
        </p>
        
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
    // Get mood label
    let moodLabel = 'neutral';
    if (moodValue <= 10) moodLabel = 'very-unpleasant';
    else if (moodValue <= 30) moodLabel = 'unpleasant';
    else if (moodValue <= 50) moodLabel = 'slightly-unpleasant';
    else if (moodValue <= 70) moodLabel = 'slightly-pleasant';
    else if (moodValue <= 90) moodLabel = 'pleasant';
    else moodLabel = 'very-pleasant';

    // Create note with factors
    const fullNote = [
      `Score: ${moodValue}`,
      selectedFactors.length > 0 ? `Factors: ${selectedFactors.join(', ')}` : '',
      note ? `Note: ${note}` : ''
    ].filter(Boolean).join(' | ');

    try {
      await logMoodCheckIn(moodLabel, fullNote);
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
