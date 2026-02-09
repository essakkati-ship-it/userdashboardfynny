import React from 'react';
import { ChevronLeft } from 'lucide-react';

/**
 * Shared layout wrapper for all lesson-type screens
 * Provides consistent structure for top bar, content area, and bottom navigation
 */
export const LessonLayout = ({
  children,
  currentPage,
  totalPages,
  onBack,
  onNext,
  title,
  mobileTitle,
  mobileIcon,
  ctaText,
  themeColor = 'rose', // rose, purple, amber, indigo, green
  disabled = false,
  testId = 'lesson-screen',
}) => {
  // Theme color mappings
  const themes = {
    rose: {
      iconBg: 'bg-rose-50',
      iconText: 'text-rose-500',
      progressBg: 'bg-gradient-to-r from-rose-400 to-rose-500',
      buttonBg: 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700',
      dotActive: 'bg-rose-500',
    },
    purple: {
      iconBg: 'bg-purple-50',
      iconText: 'text-purple-500',
      progressBg: 'bg-gradient-to-r from-purple-400 to-indigo-500',
      buttonBg: 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700',
      dotActive: 'bg-purple-500',
    },
    amber: {
      iconBg: 'bg-amber-50',
      iconText: 'text-amber-600',
      progressBg: 'bg-gradient-to-r from-amber-400 to-orange-500',
      buttonBg: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
      dotActive: 'bg-amber-500',
    },
    indigo: {
      iconBg: 'bg-indigo-50',
      iconText: 'text-indigo-600',
      progressBg: 'bg-gradient-to-r from-indigo-500 to-purple-600',
      buttonBg: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700',
      dotActive: 'bg-indigo-500',
    },
    green: {
      iconBg: 'bg-green-50',
      iconText: 'text-green-600',
      progressBg: 'bg-gradient-to-r from-green-400 to-emerald-500',
      buttonBg: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
      dotActive: 'bg-green-500',
    },
    teal: {
      iconBg: 'bg-teal-50',
      iconText: 'text-teal-600',
      progressBg: 'bg-gradient-to-r from-teal-400 to-teal-500',
      buttonBg: 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700',
      dotActive: 'bg-teal-500',
    },
  };

  const theme = themes[themeColor] || themes.rose;

  return (
    <div className="min-h-screen bg-white lg:bg-gray-50" data-testid={testId}>
      {/* Desktop: Centered container */}
      <div className="lg:max-w-[720px] lg:mx-auto lg:bg-white lg:min-h-screen lg:shadow-sm">
        
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:px-8 lg:py-5">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            data-testid={`${testId}-back-btn`}
          >
            <ChevronLeft size={20} className="lg:w-5 lg:h-5" />
            <span className="hidden lg:inline text-sm font-medium">Back to Dashboard</span>
          </button>
          
          {/* Center: Lesson title */}
          <div className="flex items-center gap-2">
            {mobileIcon && <span className="lg:hidden">{mobileIcon}</span>}
            <span className="font-medium text-gray-700 lg:text-gray-800 lg:font-semibold">
              <span className="lg:hidden">{mobileTitle || title}</span>
              <span className="hidden lg:inline">{title}</span>
            </span>
          </div>
          
          {/* Right: Progress indicator */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden lg:inline">{currentPage + 1} of {totalPages}</span>
            <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full ${theme.iconBg} flex items-center justify-center`}>
              <span className={`${theme.iconText} text-xs lg:text-sm font-semibold`}>{currentPage + 1}/{totalPages}</span>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col min-h-[calc(100vh-140px)] lg:min-h-[calc(100vh-160px)]">
          {/* Main content */}
          <div className="flex-1 lg:px-8">
            {children}
          </div>

          {/* Bottom navigation */}
          <div className="p-5 lg:px-8 lg:py-6 border-t border-gray-100 bg-white">
            {/* Progress dots - Mobile only */}
            <div className="flex justify-center gap-1.5 mb-4 lg:hidden">
              {[...Array(totalPages)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentPage ? `w-6 ${theme.dotActive}` : 'w-2 bg-gray-300'
                  }`} 
                />
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
                  className={`h-full ${theme.progressBg} rounded-full transition-all duration-300`}
                  style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                />
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onNext}
              disabled={disabled}
              data-testid={`${testId}-next-btn`}
              className={`w-full lg:w-auto lg:min-w-[200px] lg:float-right py-4 lg:py-3 px-8 rounded-full font-semibold text-lg lg:text-base shadow-md transition-all ${
                disabled 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : `${theme.buttonBg} text-white`
              }`}
            >
              {ctaText}
            </button>
            <div className="lg:clear-both"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Desktop illustration wrapper - hidden on mobile
 */
export const DesktopIllustration = ({ children, className = "" }) => (
  <div className={`hidden lg:flex items-center justify-center py-8 ${className}`}>
    <div className="relative">
      {children}
    </div>
  </div>
);

/**
 * Mobile illustration wrapper - hidden on desktop
 */
export const MobileIllustration = ({ children, className = "" }) => (
  <div className={`lg:hidden ${className}`}>
    {children}
  </div>
);

export default LessonLayout;
