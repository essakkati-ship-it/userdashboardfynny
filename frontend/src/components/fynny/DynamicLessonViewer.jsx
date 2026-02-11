import React, { useState, useEffect } from 'react';
import {
  ChevronLeft, Check, Sparkles, Award, Heart,
  BookOpen, Volume2, FileText, DollarSign, Smile,
  Brain, Lightbulb, TrendingUp, Target, Zap, Sun, Leaf
} from 'lucide-react';
import { THEME_COLORS, CARD_TYPES } from '../../data/lessonContent';
import { useUser } from '../../context/UserContext';

// Icon mapping
const ICONS = {
  Heart, BookOpen, Volume2, FileText, DollarSign, Smile,
  Brain, Lightbulb, TrendingUp, Target, Zap, Sun, Leaf,
  Award, Check, Sparkles
};

const getIcon = (iconName, props = {}) => {
  const IconComponent = ICONS[iconName];
  return IconComponent ? <IconComponent {...props} /> : null;
};

/**
 * Dynamic Lesson Viewer
 * Renders any lesson from the module/lesson/card data structure
 */
const DynamicLessonViewer = ({ 
  lesson, 
  moduleId,
  onComplete, 
  onBack,
  onNavigateToLesson,
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { updateLessonProgress } = useUser();
  
  const cards = lesson?.cards || [];
  const totalCards = cards.length;
  const currentCard = cards[currentCardIndex];
  const theme = THEME_COLORS[lesson?.themeColor] || THEME_COLORS.rose;

  // Reset card index when lesson changes
  useEffect(() => {
    setCurrentCardIndex(0);
    setSelectedAnswer(null);
  }, [lesson?.id]);

  const handleNext = async () => {
    if (currentCardIndex < totalCards - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setSelectedAnswer(null);
    } else {
      // Lesson complete
      try {
        await updateLessonProgress(lesson.order, moduleId, 'done');
      } catch (err) {
        console.error('Failed to save progress:', err);
      }
      onComplete?.();
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setSelectedAnswer(null);
    } else {
      onBack?.();
    }
  };

  if (!lesson || !currentCard) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Lesson not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white lg:bg-gray-50" data-testid="lesson-viewer">
      <div className="lg:max-w-[720px] lg:mx-auto lg:bg-white lg:min-h-screen lg:shadow-sm">
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:px-8 lg:py-5">
          <button 
            onClick={handlePrev}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            data-testid="lesson-back-btn"
          >
            <ChevronLeft size={20} />
            <span className="hidden lg:inline text-sm font-medium">
              {currentCardIndex === 0 ? 'Back to Dashboard' : 'Back'}
            </span>
          </button>
          
          <div className="flex items-center gap-2">
            {getIcon(lesson.themeColor === 'purple' ? 'Brain' : 'BookOpen', { 
              size: 20, 
              className: `${theme.accentText} lg:hidden` 
            })}
            <span className="font-medium text-gray-700 lg:text-gray-800 lg:font-semibold">
              <span className="lg:hidden">{lesson.title}</span>
              <span className="hidden lg:inline">{currentCard.title}</span>
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden lg:inline">
              {currentCardIndex + 1} of {totalCards}
            </span>
            <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full ${theme.iconBg} flex items-center justify-center`}>
              <span className={`${theme.iconText} text-xs lg:text-sm font-semibold`}>
                {currentCardIndex + 1}/{totalCards}
              </span>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col min-h-[calc(100vh-140px)] lg:min-h-[calc(100vh-160px)]">
          <div className="flex-1 lg:px-8">
            <CardRenderer 
              card={currentCard} 
              theme={theme}
              lesson={lesson}
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
            />
          </div>

          {/* Bottom navigation */}
          <div className="p-5 lg:px-8 lg:py-6 border-t border-gray-100 bg-white">
            {/* Progress dots - Mobile */}
            <div className="flex justify-center gap-1.5 mb-4 lg:hidden">
              {cards.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentCardIndex ? `w-6 ${theme.dotActive}` : 'w-2 bg-gray-300'
                  }`} 
                />
              ))}
            </div>

            {/* Progress bar - Desktop */}
            <div className="hidden lg:block mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round(((currentCardIndex + 1) / totalCards) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${theme.progressBg} rounded-full transition-all duration-300`}
                  style={{ width: `${((currentCardIndex + 1) / totalCards) * 100}%` }}
                />
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleNext}
              data-testid="lesson-next-btn"
              className={`w-full lg:w-auto lg:min-w-[200px] lg:float-right py-4 lg:py-3 px-8 rounded-full font-semibold text-lg lg:text-base shadow-md transition-all ${theme.buttonBg} text-white`}
            >
              {currentCard.cta}
            </button>
            <div className="lg:clear-both"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Card Renderer - Renders different card types
 */
const CardRenderer = ({ card, theme, lesson, selectedAnswer, setSelectedAnswer }) => {
  const content = card.content;

  // Mobile illustration
  const MobileIllustration = ({ children, className = "" }) => (
    <div className={`lg:hidden ${className}`}>{children}</div>
  );

  // Desktop illustration
  const DesktopIllustration = ({ children, className = "" }) => (
    <div className={`hidden lg:flex items-center justify-center py-8 ${className}`}>
      <div className="relative">{children}</div>
    </div>
  );

  // Render text blocks
  const renderTextBlock = (block, index) => {
    switch (block.type) {
      case 'heading':
        return (
          <h2 key={index} className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
            {block.text}
          </h2>
        );
      
      case 'bold':
        return (
          <p key={index} className="text-gray-800 text-lg lg:text-xl leading-relaxed mb-6">
            <strong>{block.text}</strong>
          </p>
        );
      
      case 'text':
        return (
          <p key={index} className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-6">
            {block.text}
            {block.highlight && (
              <span className={`${theme.accentBg} px-1 rounded`}> {block.highlight}</span>
            )}
            {block.suffix && ` ${block.suffix}`}
          </p>
        );
      
      case 'list':
        return (
          <ol key={index} className="space-y-4 mb-8">
            {block.items.map((item, i) => (
              <li key={i} className="text-gray-800 text-lg lg:text-xl flex items-center gap-3">
                <span className={`w-8 h-8 ${theme.accentBg} rounded-full flex items-center justify-center ${theme.accentText} font-semibold text-sm`}>
                  {block.style === 'numbered' ? i + 1 : '•'}
                </span>
                {item}
              </li>
            ))}
          </ol>
        );
      
      case 'callout':
        return (
          <div key={index} className={`${theme.accentBg} lg:border lg:border-gray-200 rounded-2xl p-5 lg:p-6 mb-6`}>
            <p className={`text-center ${block.style === 'highlight' ? `${theme.accentText} font-bold text-xl lg:text-2xl` : 'text-gray-700 lg:text-lg'}`}>
              {block.text}
            </p>
          </div>
        );
      
      case 'icons-row':
        return (
          <div key={index} className="bg-amber-50 lg:bg-gray-50 lg:border lg:border-gray-200 rounded-2xl p-5 lg:p-6 mb-6">
            <div className="flex items-center justify-center gap-4 lg:gap-6">
              {block.items.map((item, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center">
                    <div className={`w-14 h-14 lg:w-16 lg:h-16 ${theme.accentBg} rounded-xl flex items-center justify-center`}>
                      {getIcon(item.icon, { size: 24, className: theme.accentText })}
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{item.label}</span>
                  </div>
                  {i < block.items.length - 1 && <span className="text-gray-400">or</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Render section header (for numbered sections like "1. LEARN")
  const renderSectionHeader = () => {
    if (!content.sectionNumber) return null;
    
    return (
      <>
        {/* Mobile header */}
        <MobileIllustration className={`bg-gradient-to-br ${theme.headerGradient} p-6 relative`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${theme.accentText} text-xl font-bold`}>{content.sectionNumber}.</p>
              <h2 className={`text-3xl font-bold ${theme.accentText} tracking-wide`}>{content.sectionTitle}</h2>
            </div>
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-xl shadow-md flex items-center justify-center">
                {getIcon(content.icon, { size: 40, className: theme.accentText })}
              </div>
            </div>
          </div>
        </MobileIllustration>
        
        {/* Desktop header */}
        <div className="hidden lg:block py-6 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-4">
            <span className={`${theme.accentText} text-2xl font-bold`}>{content.sectionNumber}.</span>
            <h2 className={`text-3xl font-bold ${theme.accentText}`}>{content.sectionTitle}</h2>
            <div className="ml-auto">
              <div className={`w-16 h-16 ${theme.iconBg} rounded-xl flex items-center justify-center`}>
                {getIcon(content.icon, { size: 32, className: theme.accentText })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Main card type rendering
  switch (card.type) {
    case CARD_TYPES.TEXT:
      return (
        <div className="flex-1 overflow-auto">
          {content.icon && !content.sectionNumber && (
            <>
              <MobileIllustration className={`bg-gradient-to-br ${theme.headerGradient} p-6 flex items-center justify-center relative overflow-hidden`}>
                <div className={`w-24 h-24 bg-gradient-to-br ${theme.buttonBg.split(' ')[0].replace('bg-', '')} rounded-full flex items-center justify-center shadow-xl`}>
                  {getIcon(content.icon, { size: 48, className: 'text-white' })}
                </div>
              </MobileIllustration>
              <DesktopIllustration className="py-10">
                <div className={`w-28 h-28 bg-gradient-to-br ${theme.buttonBg.split(' ')[0].replace('bg-', '')} rounded-full flex items-center justify-center shadow-xl`}>
                  {getIcon(content.icon, { size: 56, className: 'text-white' })}
                </div>
                <Sparkles size={24} className={`${theme.accentText} absolute -top-2 -right-2`} />
              </DesktopIllustration>
            </>
          )}
          
          {renderSectionHeader()}
          
          <div className="p-5 lg:p-0 lg:py-6">
            {content.blocks?.map((block, i) => renderTextBlock(block, i))}
          </div>
        </div>
      );

    case CARD_TYPES.LIST:
      return (
        <div className="flex-1 overflow-auto">
          {/* Mobile header */}
          <MobileIllustration className={`bg-gradient-to-br ${theme.buttonBg.replace('hover:', '').split(' ').slice(0, 2).join(' ')} p-6 relative`}>
            <h3 className="text-white font-bold text-lg mb-2">{content.heading}</h3>
            <p className="text-white/80 text-sm">{content.subheading}</p>
          </MobileIllustration>
          
          {/* Desktop header */}
          <div className="hidden lg:block py-6 border-b border-gray-100 mb-6">
            <h3 className="text-2xl font-bold text-gray-800">{content.heading}</h3>
            <p className="text-gray-500 mt-1">{content.subheading}</p>
          </div>
          
          <div className="p-5 lg:p-0 lg:py-4 space-y-4">
            {content.items?.map((item, i) => {
              const colorMap = {
                amber: { bg: 'bg-amber-50 lg:bg-white lg:border-amber-200', icon: 'bg-amber-400' },
                green: { bg: 'bg-green-50 lg:bg-white lg:border-green-200', icon: 'bg-green-500' },
                blue: { bg: 'bg-blue-50 lg:bg-white lg:border-blue-200', icon: 'bg-blue-500' },
                pink: { bg: 'bg-pink-50 lg:bg-white lg:border-pink-200', icon: 'bg-pink-500' },
              };
              const itemColor = colorMap[item.color] || colorMap.amber;
              
              return (
                <div key={i} className={`${itemColor.bg} lg:border rounded-2xl p-4 lg:p-5`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 ${itemColor.icon} rounded-full flex items-center justify-center`}>
                      {getIcon(item.icon, { size: 20, className: 'text-white lg:w-6 lg:h-6' })}
                    </div>
                    <h4 className="font-semibold text-gray-800 lg:text-lg">{item.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm lg:text-base">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      );

    case CARD_TYPES.REFLECTION:
      return (
        <div className="flex-1 overflow-auto">
          {/* Mobile header */}
          <MobileIllustration className={`bg-gradient-to-br ${theme.headerGradient} p-6 relative`}>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center">
                {getIcon(content.icon, { size: 20, className: theme.accentText })}
              </div>
              <h3 className={`${theme.accentText} font-bold text-lg`}>{content.heading}</h3>
            </div>
          </MobileIllustration>
          
          {/* Desktop header */}
          <div className="hidden lg:block py-6 border-b border-gray-100 mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${theme.accentBg} rounded-xl flex items-center justify-center`}>
                {getIcon(content.icon, { size: 24, className: theme.accentText })}
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{content.heading}</h3>
            </div>
          </div>
          
          <div className="p-5 lg:p-0 lg:py-4">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">{content.subheading}</h3>
            
            <div className="space-y-5 mb-8">
              {content.questions?.map((question, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 lg:w-10 lg:h-10 ${theme.accentBg} rounded-full flex items-center justify-center ${theme.accentText} font-bold text-sm lg:text-base`}>
                      {i + 1}
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">{question}</p>
                </div>
              ))}
            </div>
            
            {content.note && (
              <div className="bg-amber-50 lg:bg-gradient-to-r lg:from-amber-50 lg:to-orange-50 lg:border lg:border-amber-200 rounded-2xl p-4 lg:p-5">
                <p className="text-amber-700 text-center text-sm lg:text-base">
                  <span className={`${theme.accentBg} px-1 rounded`}>{content.note}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      );

    case CARD_TYPES.COMPLETION:
      return (
        <div className="flex-1 overflow-auto">
          {/* Illustration */}
          <MobileIllustration className={`bg-gradient-to-br ${theme.headerGradient} p-8 flex items-center justify-center`}>
            <div className="relative">
              <div className={`w-28 h-28 bg-gradient-to-br ${theme.buttonBg.split(' ')[0].replace('bg-', '')} rounded-full flex items-center justify-center shadow-xl`}>
                <Check size={48} className="text-white" />
              </div>
              {content.reward && (
                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Award size={20} className="text-white" />
                </div>
              )}
            </div>
          </MobileIllustration>
          
          <DesktopIllustration className="py-10">
            <div className={`w-32 h-32 bg-gradient-to-br ${theme.buttonBg.split(' ')[0].replace('bg-', '')} rounded-full flex items-center justify-center shadow-xl`}>
              <Check size={56} className="text-white" />
            </div>
            {content.reward && (
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                <Award size={24} className="text-white" />
              </div>
            )}
          </DesktopIllustration>
          
          <div className="p-5 lg:p-0 lg:py-6">
            {content.heading && (
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-6">
                {content.heading}
              </h2>
            )}
            
            {content.challengeTitle && (
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
                {content.challengeTitle}
              </h3>
            )}
            
            {content.message && (
              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed text-center mb-6">
                {content.message}
                {content.highlight && (
                  <span className={`${theme.accentBg} px-1 rounded`}> {content.highlight}</span>
                )}
              </p>
            )}
            
            {content.steps && (
              <div className="space-y-5 mb-8">
                {content.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-3 h-3 ${theme.accentText.replace('text-', 'bg-')} transform rotate-45 mt-2`}></div>
                    </div>
                    <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
                      <span className="bg-teal-100 px-1 rounded">{step.highlight}</span> {step.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
            
            {content.reward && (
              <div className={`bg-gradient-to-br ${theme.headerGradient} lg:border lg:border-gray-200 rounded-2xl p-5 lg:p-6 mb-6`}>
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                    <Award size={28} className="text-white lg:w-8 lg:h-8" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">+{content.reward.fynnies} Fynny earned!</p>
                    <p className="text-sm text-gray-500">{content.reward.label}</p>
                  </div>
                </div>
              </div>
            )}
            
            {content.completionMessage && (
              <div className="bg-green-50 lg:bg-gradient-to-r lg:from-green-50 lg:to-emerald-50 lg:border lg:border-green-200 rounded-2xl p-5 lg:p-6">
                <p className="text-green-700 text-center font-medium lg:text-lg">
                  {content.completionMessage}
                </p>
              </div>
            )}
            
            {content.nextPreview && (
              <p className="text-gray-600 text-center lg:text-lg mt-4">
                {content.nextPreview}
              </p>
            )}
          </div>
        </div>
      );

    case CARD_TYPES.QUIZ:
      return (
        <div className="flex-1 overflow-auto">
          <div className="p-5 lg:p-0 lg:py-6">
            <div className={`inline-block ${theme.accentBg} ${theme.accentText} text-xs font-bold px-3 py-1 rounded-full mb-4`}>
              {content.label}
            </div>
            
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
              {content.question}
            </h2>
            
            <div className="space-y-3">
              {content.answers?.map((answer, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedAnswer(i)}
                  data-testid={`answer-${i}`}
                  className={`w-full p-4 lg:p-5 rounded-xl text-left transition-all ${
                    selectedAnswer === i
                      ? `${theme.accentBg} border-2 border-current ${theme.accentText}`
                      : 'bg-gray-50 lg:bg-white lg:border lg:border-gray-200 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span className={`font-medium text-lg ${selectedAnswer === i ? theme.accentText : 'text-gray-700'}`}>
                    {answer}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="flex-1 overflow-auto p-5">
          <p className="text-gray-500">Unknown card type: {card.type}</p>
        </div>
      );
  }
};

export default DynamicLessonViewer;
