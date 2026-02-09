import React, { useState } from 'react';
import {
  ChevronLeft, Play, Check, Star, Clock, BookOpen, Target, Heart, Mountain, Brain, Wrench, Sparkles
} from 'lucide-react';

// Commitment Flow Screen
export const CommitmentFlowScreen = ({ setActiveScreen }) => {
  const [selectedCommitment, setSelectedCommitment] = useState(null);

  const commitments = [
    { text: "This week I will complete one Fynny course module", icon: BookOpen },
    { text: "This week I will check my account balance daily", icon: Target },
    { text: "This week I will open one piece of financial mail", icon: Star },
    { text: "This week I will skip one impulse purchase", icon: Heart },
  ];

  return (
    <div className="max-w-md mx-auto" data-testid="commitment-flow-screen">
      <header className="mb-6">
        <button 
          onClick={() => setActiveScreen('home')} 
          className="text-sm text-gray-500 mb-3 hover:text-gray-700 flex items-center gap-1 transition-colors"
          data-testid="commitment-back-btn"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <h1 className="text-xl font-semibold text-gray-800 text-center">Weekly Commitment</h1>
      </header>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 mb-6 text-center">
        <Target size={40} className="text-amber-500 mx-auto mb-2" />
        <h2 className="text-lg font-semibold text-gray-800">This week I will...</h2>
      </div>

      <div className="space-y-2 mb-6">
        {commitments.map((item, i) => {
          const ItemIcon = item.icon;
          return (
            <button
              key={i}
              onClick={() => setSelectedCommitment(i)}
              data-testid={`commitment-option-${i}`}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all ${
                selectedCommitment === i
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md'
                  : 'bg-amber-50 hover:bg-amber-100 border border-amber-100'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedCommitment === i ? 'bg-white/20' : 'bg-amber-200'}`}>
                <ItemIcon size={20} className={selectedCommitment === i ? 'text-white' : 'text-amber-600'} />
              </div>
              <span className={`text-sm font-medium ${selectedCommitment === i ? 'text-white' : 'text-gray-700'}`}>{item.text}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => selectedCommitment !== null && setActiveScreen('home')}
        data-testid="save-commitment-btn"
        className={`w-full py-4 rounded-full font-semibold text-lg transition-all ${
          selectedCommitment !== null
            ? 'text-white bg-gradient-to-r from-green-500 to-green-600 shadow-md hover:from-green-600 hover:to-green-700'
            : 'bg-gray-200 text-gray-400'
        }`}
        disabled={selectedCommitment === null}
      >
        Save commitment
      </button>
    </div>
  );
};

// Commitments Screen (View all commitments)
export const CommitmentsScreen = ({ setActiveScreen }) => (
  <div className="max-w-xl" data-testid="commitments-screen">
    <header className="mb-5">
      <button 
        onClick={() => setActiveScreen('home')} 
        className="text-sm text-gray-500 mb-3 hover:text-gray-700 flex items-center gap-1 transition-colors"
        data-testid="commitments-back-btn"
      >
        <ChevronLeft size={16} /> Back
      </button>
      <h1 className="text-2xl font-semibold text-gray-800">My Commitments</h1>
    </header>

    <div className="bg-gradient-to-br from-sky-100 to-sky-50 rounded-2xl p-5 border border-sky-200 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Active - January 28 - February 4</p>
      </div>
      <p className="text-lg font-semibold text-gray-800">This week I will complete one Fynny course module</p>
      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 h-2 bg-white/60 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
        </div>
        <span className="text-xs font-medium text-gray-600">33%</span>
      </div>
    </div>

    <div className="mt-4 bg-gray-50 rounded-2xl p-5 border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Past Commitments</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Check size={16} className="text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-700">Checked account balance daily</p>
            <p className="text-xs text-gray-400">Jan 21 - Jan 27</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Learning Path / Health Screen
export const HealthScreen = ({ setActiveScreen }) => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  const themeIcons = {
    'how-money-feels': Heart,
    'success-beyond-balance': Mountain,
    'psychology-of-habits': Brain,
    'lasting-change': Wrench,
  };

  const learningThemes = [
    {
      id: 'how-money-feels',
      title: 'How Money Feels',
      subtitle: 'Start with your emotions, not your numbers',
      duration: '2-3 days',
      bgColor: 'from-pink-100 to-pink-50',
      iconBg: 'bg-gradient-to-br from-pink-200 to-rose-200',
      iconColor: 'text-pink-600',
      about: "Money is not just numbers - it is feelings. In this mini-course, you will explore the emotions that shape your financial decisions and learn to work with them, not against them.",
      tools: [
        { name: 'Money mood check-in', desc: 'Notice how you feel before financial decisions', color: 'bg-pink-100' },
        { name: 'Emotion journaling', desc: 'Track patterns between feelings and spending', color: 'bg-rose-100' },
      ],
      progress: 0.66,
    },
    {
      id: 'success-beyond-balance',
      title: 'Success Beyond the Balance',
      subtitle: 'Progress you can feel, not just measure',
      duration: '1-2 days',
      bgColor: 'from-green-100 to-emerald-50',
      iconBg: 'bg-gradient-to-br from-green-200 to-emerald-200',
      iconColor: 'text-green-600',
      about: "Redefine what financial success means to you. Move beyond account balances to recognize the small wins that make you feel calmer and more in control.",
      tools: [
        { name: 'Non-numeric wins', desc: 'Celebrate progress that is not about money', color: 'bg-green-100' },
        { name: 'Calm moments log', desc: 'Notice when money feels lighter', color: 'bg-emerald-100' },
      ],
      progress: 0,
    },
    {
      id: 'psychology-of-habits',
      title: 'The Psychology of Money Habits',
      subtitle: 'Understand your patterns and shift them',
      duration: '2-3 days',
      bgColor: 'from-purple-100 to-violet-50',
      iconBg: 'bg-gradient-to-br from-purple-200 to-violet-200',
      iconColor: 'text-purple-600',
      about: "Discover how to make and break money habits. You will learn the science behind why we do what we do with money and experience the power of positive triggers.",
      tools: [
        { name: 'Habit pattern reflection', desc: 'Understand what triggers your money behaviors', color: 'bg-purple-100' },
        { name: 'Stress awareness', desc: 'Build self-awareness around financial stress', color: 'bg-violet-100' },
      ],
      progress: 0,
    },
    {
      id: 'lasting-change',
      title: 'The Secret to Lasting Financial Change',
      subtitle: 'Build routines that stick even on bad days',
      duration: '2-3 days',
      bgColor: 'from-amber-100 to-yellow-50',
      iconBg: 'bg-gradient-to-br from-amber-200 to-yellow-200',
      iconColor: 'text-amber-600',
      about: "Lasting financial wellness begins with building habits that are enjoyable and sustainable. Learn how to create routines that support you even when motivation fades.",
      tools: [
        { name: 'One calm admin action', desc: 'Small, consistent steps that add up', color: 'bg-amber-100' },
        { name: 'Routine builder', desc: 'Create simple money check-in rituals', color: 'bg-yellow-100' },
      ],
      progress: 0,
    },
  ];

  if (selectedTheme) {
    const theme = learningThemes.find(t => t.id === selectedTheme);
    const ThemeIcon = themeIcons[theme.id];

    return (
      <div className="max-w-xl mx-auto" data-testid="learning-theme-detail">
        <div className={`bg-gradient-to-b ${theme.bgColor} rounded-b-3xl p-6 pb-10 mb-6`}>
          <button 
            onClick={() => setSelectedTheme(null)} 
            className="flex items-center gap-1 text-gray-600 text-sm mb-8 hover:text-gray-800 transition-colors"
            data-testid="theme-back-btn"
          >
            <ChevronLeft size={18} /> Back to learning path
          </button>

          <div className="flex justify-center mb-4">
            <div className={`w-24 h-24 rounded-full ${theme.iconBg} flex items-center justify-center shadow-lg`}>
              <ThemeIcon size={48} className={theme.iconColor} />
            </div>
          </div>
        </div>

        <div className="px-4 -mt-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">{theme.title}</h1>
          <p className="text-gray-500 text-center mb-4">{theme.subtitle}</p>
          <div className="flex items-center justify-center gap-2 text-gray-500 mb-6">
            <BookOpen size={18} />
            <span>{theme.duration}</span>
          </div>

          {theme.progress > 0 && (
            <div className="mb-6 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <span className="text-sm font-medium text-gray-600">In progress</span>
                </div>
                <span className="text-sm font-semibold text-gray-700">{Math.round(theme.progress * 100)}%</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400" style={{width: (theme.progress * 100) + '%'}}></div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-2xl p-5 mb-5 border border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">About this journey</h3>
            <p className="text-gray-700 leading-relaxed">{theme.about}</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Tools You'll Unlock</h3>
            <div className="space-y-4">
              {theme.tools.map((tool, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-full ${tool.color} flex items-center justify-center`}>
                    <Star size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{tool.name}</p>
                    <p className="text-sm text-gray-500">{tool.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setActiveScreen('lesson')} 
            data-testid="start-journey-btn"
            className="w-full py-4 rounded-full text-white font-semibold text-lg mb-8 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-md transition-all"
          >
            {theme.progress > 0 ? 'Continue learning' : 'Start this journey'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto" data-testid="learning-path-screen">
      <header className="mb-6">
        <button 
          onClick={() => setActiveScreen('home')} 
          className="text-sm text-gray-500 mb-3 hover:text-gray-700 flex items-center gap-1 transition-colors"
          data-testid="learning-path-back-btn"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Your Learning Path</h1>
        <p className="text-gray-500 mt-1">Build calm, clarity and confidence step by step</p>
      </header>

      <div className="relative">
        <div className="absolute left-1/2 top-20 bottom-20 w-0 border-l-2 border-dashed border-gray-300 -translate-x-1/2 z-0"></div>

        <div className="relative z-10 space-y-5">
          {learningThemes.map((theme, index) => {
            const ThemeIcon = themeIcons[theme.id];
            return (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                data-testid={`theme-card-${theme.id}`}
                className={`w-full bg-gradient-to-br ${theme.bgColor} rounded-3xl p-5 border border-white/50 hover:shadow-xl hover:scale-[1.02] transition-all text-left shadow-sm`}
              >
                <div className={`flex items-center gap-4 ${index % 2 === 1 ? 'flex-row-reverse text-right' : ''}`}>
                  <div className={`${theme.iconBg} w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <ThemeIcon size={32} className={theme.iconColor} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">{theme.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{theme.subtitle}</p>
                    <div className={`flex items-center gap-1 text-gray-400 text-xs ${index % 2 === 1 ? 'justify-end' : ''}`}>
                      <BookOpen size={12} />
                      <span>{theme.duration}</span>
                    </div>
                  </div>
                </div>

                {theme.progress > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/50">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-gray-600">In progress</span>
                      <span className="text-xs font-semibold text-gray-700">{Math.round(theme.progress * 100)}%</span>
                    </div>
                    <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400" style={{width: (theme.progress * 100) + '%'}}></div>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-center mt-8 mb-4">
        <p className="text-gray-400 text-sm">Take your time. Every small step counts.</p>
      </div>
    </div>
  );
};

// Plan Screen
export const PlanScreen = ({ setActiveScreen }) => (
  <div className="max-w-xl" data-testid="plan-screen">
    <header className="mb-5">
      <button 
        onClick={() => setActiveScreen('home')} 
        className="text-sm text-gray-500 mb-3 hover:text-gray-700 flex items-center gap-1 transition-colors"
        data-testid="plan-back-btn"
      >
        <ChevronLeft size={16} /> Back
      </button>
      <h1 className="text-2xl font-semibold text-gray-800">Money Habits Plan</h1>
    </header>

    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200 shadow-sm mb-5">
      <div className="flex items-center gap-2 mb-3">
        <Star className="text-amber-500" size={18} />
        <span className="text-xs font-semibold uppercase text-amber-600 tracking-wide">Active Plan</span>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-1">Financial Calm</h2>
      <p className="text-gray-600">A 4-week journey to reduce money stress</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 h-2.5 bg-white/60 rounded-full overflow-hidden">
          <div className="w-1/4 h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
        </div>
        <span className="text-sm font-semibold text-amber-600">Week 1 of 4</span>
      </div>
    </div>

    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">This Week's Focus</h3>
      <div className="space-y-3">
        {[
          { title: 'Understanding Your Money Story', status: 'done' },
          { title: 'Identifying Stress Triggers', status: 'current' },
          { title: 'Building Awareness Habits', status: 'upcoming' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              item.status === 'done' ? 'bg-green-100' :
              item.status === 'current' ? 'bg-pink-100' :
              'bg-gray-200'
            }`}>
              {item.status === 'done' && <Check size={16} className="text-green-600" />}
              {item.status === 'current' && <Play size={14} className="text-pink-600" fill="#db2777" />}
              {item.status === 'upcoming' && <Clock size={14} className="text-gray-400" />}
            </div>
            <span className={`text-sm font-medium ${item.status === 'upcoming' ? 'text-gray-400' : 'text-gray-700'}`}>
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
