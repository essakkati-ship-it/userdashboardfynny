/**
 * Lesson Content Data Model
 * 
 * Structure: Modules → Lessons → Cards
 * 
 * This will eventually be fetched from backend/admin panel.
 * For now, contains the existing lesson content in the new format.
 */

// Card types that can be rendered
export const CARD_TYPES = {
  TEXT: 'text',           // Simple text content
  HIGHLIGHT: 'highlight', // Highlighted text box
  LIST: 'list',           // Numbered or bullet list
  QUIZ: 'quiz',           // Multiple choice question
  ILLUSTRATION: 'illustration', // Image/illustration
  CHART: 'chart',         // Data visualization
  REFLECTION: 'reflection', // Reflection prompt
  COMPLETION: 'completion', // Lesson complete card
};

// Theme colors available for lessons
export const THEME_COLORS = {
  rose: {
    name: 'Rose',
    iconBg: 'bg-rose-50',
    iconText: 'text-rose-500',
    progressBg: 'bg-gradient-to-r from-rose-400 to-rose-500',
    buttonBg: 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700',
    dotActive: 'bg-rose-500',
    headerGradient: 'from-pink-200 via-pink-100 to-rose-100',
    accentBg: 'bg-rose-100',
    accentText: 'text-rose-500',
  },
  purple: {
    name: 'Purple',
    iconBg: 'bg-purple-50',
    iconText: 'text-purple-500',
    progressBg: 'bg-gradient-to-r from-purple-400 to-indigo-500',
    buttonBg: 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700',
    dotActive: 'bg-purple-500',
    headerGradient: 'from-purple-200 via-purple-100 to-indigo-100',
    accentBg: 'bg-purple-100',
    accentText: 'text-purple-500',
  },
  amber: {
    name: 'Amber',
    iconBg: 'bg-amber-50',
    iconText: 'text-amber-600',
    progressBg: 'bg-gradient-to-r from-amber-400 to-orange-500',
    buttonBg: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
    dotActive: 'bg-amber-500',
    headerGradient: 'from-amber-100 via-amber-50 to-orange-50',
    accentBg: 'bg-amber-100',
    accentText: 'text-amber-600',
  },
  indigo: {
    name: 'Indigo',
    iconBg: 'bg-indigo-50',
    iconText: 'text-indigo-600',
    progressBg: 'bg-gradient-to-r from-indigo-500 to-purple-600',
    buttonBg: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700',
    dotActive: 'bg-indigo-500',
    headerGradient: 'from-indigo-200 via-indigo-100 to-purple-100',
    accentBg: 'bg-indigo-100',
    accentText: 'text-indigo-600',
  },
  green: {
    name: 'Green',
    iconBg: 'bg-green-50',
    iconText: 'text-green-600',
    progressBg: 'bg-gradient-to-r from-green-400 to-emerald-500',
    buttonBg: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
    dotActive: 'bg-green-500',
    headerGradient: 'from-green-100 via-green-50 to-emerald-50',
    accentBg: 'bg-green-100',
    accentText: 'text-green-600',
  },
  teal: {
    name: 'Teal',
    iconBg: 'bg-teal-50',
    iconText: 'text-teal-600',
    progressBg: 'bg-gradient-to-r from-teal-400 to-teal-500',
    buttonBg: 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700',
    dotActive: 'bg-teal-500',
    headerGradient: 'from-teal-100 via-teal-50 to-cyan-50',
    accentBg: 'bg-teal-100',
    accentText: 'text-teal-600',
  },
};

/**
 * Sample Module Data
 * This represents the structure that will come from the admin panel
 */
export const SAMPLE_MODULES = [
  {
    id: 'how-money-feels',
    title: 'How Money Feels',
    description: 'Understand your emotional relationship with money',
    icon: 'Heart',
    themeColor: 'rose',
    order: 1,
    lessons: [
      {
        id: 'prepare-finances',
        moduleId: 'how-money-feels',
        title: 'Prepare your finances',
        description: 'Getting started with Fynny',
        duration: '2 min',
        order: 1,
        themeColor: 'rose',
        cards: [
          {
            id: 'card-1-1',
            type: CARD_TYPES.ILLUSTRATION,
            title: 'Getting Started',
            cta: 'Continue',
            content: {
              icon: 'Heart',
              gradient: 'from-pink-200 via-pink-100 to-rose-100',
            },
          },
          {
            id: 'card-1-2',
            type: CARD_TYPES.TEXT,
            title: 'Getting Started',
            cta: 'Continue',
            content: {
              blocks: [
                {
                  type: 'bold',
                  text: 'There are three simple things you need to do each day to be successful with Fynny—that\'s it!',
                },
                {
                  type: 'list',
                  style: 'numbered',
                  items: ['Learn', 'Check in', 'Track your spending'],
                },
                {
                  type: 'text',
                  text: 'You\'ve already started learning by simply reading this lesson.',
                  highlight: 'Before getting started with your next action (checking in), let\'s take a quick look at the key role each action plays in helping you find financial calm.',
                },
              ],
            },
          },
          {
            id: 'card-1-3',
            type: CARD_TYPES.TEXT,
            title: 'Learn',
            cta: 'Continue',
            content: {
              sectionNumber: 1,
              sectionTitle: 'LEARN',
              icon: 'BookOpen',
              blocks: [
                {
                  type: 'text',
                  highlight: 'Your Fynny course has been personalized to your needs and goals.',
                  text: 'It\'s broken down into mini-courses on topics like understanding your money emotions, building healthy habits, and more.',
                },
                {
                  type: 'callout',
                  style: 'info',
                  text: 'Every day, you\'ll learn about yourself and build healthy money habits through fun, bite-size lessons.',
                },
                {
                  type: 'text',
                  highlight: 'You\'ve already set your learning goal, which will determine how many lessons you get each day.',
                  text: 'In a few days, we\'ll check in to see if you want to adjust your pace.',
                },
              ],
            },
          },
          {
            id: 'card-1-4',
            type: CARD_TYPES.TEXT,
            title: 'Check In',
            cta: 'Continue',
            content: {
              sectionNumber: 2,
              sectionTitle: 'CHECK IN',
              icon: 'Smile',
              blocks: [
                {
                  type: 'text',
                  text: 'We get it. Not everyone loves this part. But don\'t worry, we\'ll guide you through.',
                },
                {
                  type: 'text',
                  text: 'Research shows that',
                  highlight: 'people who check in on their finances every day feel more in control than those who check in weekly.',
                  suffix: 'They also adopt a greater number of healthy habits. (Win-win!)',
                },
                {
                  type: 'chart',
                  chartType: 'stress-comparison',
                },
              ],
            },
          },
          {
            id: 'card-1-5',
            type: CARD_TYPES.TEXT,
            title: 'Track Spending',
            cta: 'Continue',
            content: {
              sectionNumber: 3,
              sectionTitle: 'TRACK SPENDING',
              icon: 'FileText',
              blocks: [
                {
                  type: 'text',
                  text: 'Log your spending using a quick note or our categories. We\'ll',
                  highlight: 'track your patterns and offer tips to make mindful choices and stay within your Financial Comfort Zone',
                  suffix: '(more on this soon!).',
                },
                {
                  type: 'icons-row',
                  items: [
                    { icon: 'DollarSign', label: 'Quick note' },
                    { icon: 'Volume2', label: 'Voice' },
                    { icon: 'FileText', label: 'Categories' },
                  ],
                },
                {
                  type: 'text',
                  text: 'Soon, you\'ll learn all about spending awareness and our category system—',
                  highlight: 'the key to feeling in control without restricting yourself.',
                },
              ],
            },
          },
          {
            id: 'card-1-6',
            type: CARD_TYPES.TEXT,
            title: 'Fynnies',
            cta: 'Continue',
            content: {
              icon: 'Award',
              blocks: [
                {
                  type: 'text',
                  text: 'Every day that you complete these three simple actions, you\'ll be rewarded with a Fynny—a token we created to reward the actions you take now that drive your financial wellness later.',
                },
                {
                  type: 'text',
                  text: 'On average,',
                  highlight: 'Fynny users reduce financial stress by 40% for every 5 Fynnies they earn.',
                  suffix: 'And the more you earn, the more confident you become. (Talk about a good investment.)',
                },
                {
                  type: 'callout',
                  style: 'highlight',
                  text: '5 FYNNIES = LESS STRESS',
                },
                {
                  type: 'text',
                  highlight: 'Starting tomorrow, you can earn 1 Fynny each day.',
                  text: 'But to get you off to a strong start, we\'ll give you a Fynny for completing your next (and final) lesson of the day.',
                },
              ],
            },
          },
          {
            id: 'card-1-7',
            type: CARD_TYPES.COMPLETION,
            title: 'Today\'s Challenge',
            cta: 'Complete Lesson',
            content: {
              challengeTitle: 'Today\'s challenge: Notice your money feelings.',
              steps: [
                {
                  highlight: 'Take a moment to notice how you feel about money right now.',
                  text: 'Are you anxious? Curious? Hopeful? Just observe without judgment.',
                },
                {
                  highlight: 'Throughout the day, notice when money thoughts pop up.',
                  text: 'What triggered them?',
                },
              ],
              completionMessage: 'You\'re building awareness — the first step to financial calm!',
            },
          },
        ],
      },
      {
        id: 'discover-money-style',
        moduleId: 'how-money-feels',
        title: 'Discover your money style',
        description: 'Understanding your money personality',
        duration: '2 min',
        order: 2,
        themeColor: 'purple',
        cards: [
          {
            id: 'card-2-1',
            type: CARD_TYPES.TEXT,
            title: 'Money Styles',
            cta: 'Continue',
            content: {
              icon: 'Brain',
              blocks: [
                {
                  type: 'heading',
                  text: 'Discover Your Money Style',
                },
                {
                  type: 'text',
                  text: 'Everyone has a unique relationship with money.',
                  highlight: 'Understanding your "money style" is the first step to making lasting changes.',
                },
                {
                  type: 'text',
                  text: 'In this lesson, you\'ll discover which of the four money personalities resonates most with you—and learn how to work with (not against) your natural tendencies.',
                },
              ],
            },
          },
          {
            id: 'card-2-2',
            type: CARD_TYPES.LIST,
            title: 'Four Styles',
            cta: 'Continue',
            content: {
              heading: 'The Four Money Styles',
              subheading: 'Which one sounds like you?',
              items: [
                {
                  title: 'The Emotional Spender',
                  description: 'Uses spending to cope with feelings. Shops when stressed, sad, or celebrating.',
                  icon: 'Heart',
                  color: 'amber',
                },
                {
                  title: 'The Saver',
                  description: 'Finds security in saving. May struggle to enjoy money even when it\'s okay to spend.',
                  icon: 'TrendingUp',
                  color: 'green',
                },
                {
                  title: 'The Avoider',
                  description: 'Prefers not to think about money. Bills pile up, accounts go unchecked.',
                  icon: 'Lightbulb',
                  color: 'blue',
                },
                {
                  title: 'The Status Seeker',
                  description: 'Ties self-worth to wealth appearance. Spending often exceeds actual means.',
                  icon: 'Award',
                  color: 'pink',
                },
              ],
            },
          },
          {
            id: 'card-2-3',
            type: CARD_TYPES.TEXT,
            title: 'Good News',
            cta: 'Continue',
            content: {
              icon: 'Lightbulb',
              blocks: [
                {
                  type: 'heading',
                  text: 'The Good News',
                },
                {
                  type: 'text',
                  highlight: 'There\'s no "bad" money style.',
                  text: 'Each has strengths and challenges. The key is awareness.',
                },
                {
                  type: 'callout',
                  style: 'quote',
                  text: '"When you understand your patterns, you can work with them instead of fighting against them."',
                },
                {
                  type: 'text',
                  text: 'Most people are a mix of styles.',
                  highlight: 'Over the coming days, we\'ll help you identify your primary style',
                  suffix: 'and develop strategies tailored to you.',
                },
              ],
            },
          },
          {
            id: 'card-2-4',
            type: CARD_TYPES.REFLECTION,
            title: 'Reflection',
            cta: 'Continue',
            content: {
              heading: 'Quick Reflection',
              subheading: 'Think about your last purchase...',
              icon: 'Brain',
              questions: [
                'What were you feeling before you made it?',
                'Was it planned or spontaneous?',
                'How did you feel after?',
              ],
              note: 'No need to answer now — just let these questions simmer as you go about your day.',
            },
          },
          {
            id: 'card-2-5',
            type: CARD_TYPES.COMPLETION,
            title: 'Complete',
            cta: 'Complete Lesson',
            content: {
              icon: 'Check',
              heading: 'Lesson Complete!',
              message: 'You\'ve taken the first step in understanding your money style.',
              highlight: 'This awareness will be your superpower.',
              reward: {
                fynnies: 1,
                label: 'Lesson 2 complete',
              },
              nextPreview: 'Tomorrow, we\'ll dive deeper into your specific patterns.',
            },
          },
        ],
      },
      {
        id: 'start-tracking',
        moduleId: 'how-money-feels',
        title: 'Start tracking calmly',
        description: 'Begin your tracking journey without stress',
        duration: '2 min',
        order: 3,
        themeColor: 'teal',
        cards: [
          {
            id: 'card-3-1',
            type: CARD_TYPES.TEXT,
            title: 'Calm Tracking',
            cta: 'Continue',
            content: {
              icon: 'Target',
              blocks: [
                {
                  type: 'heading',
                  text: 'Tracking Without Stress',
                },
                {
                  type: 'text',
                  text: 'Many people avoid tracking because it feels overwhelming.',
                  highlight: 'We\'re going to change that.',
                },
                {
                  type: 'text',
                  text: 'Fynny\'s approach is different. We focus on awareness, not restriction.',
                },
              ],
            },
          },
          {
            id: 'card-3-2',
            type: CARD_TYPES.TEXT,
            title: 'The Method',
            cta: 'Continue',
            content: {
              blocks: [
                {
                  type: 'heading',
                  text: 'The Fynny Method',
                },
                {
                  type: 'list',
                  style: 'numbered',
                  items: [
                    'Notice the purchase (no judgment)',
                    'Quick log (5 seconds max)',
                    'Observe patterns over time',
                  ],
                },
                {
                  type: 'callout',
                  style: 'info',
                  text: 'That\'s it. No spreadsheets. No categories to memorize. Just simple awareness.',
                },
              ],
            },
          },
          {
            id: 'card-3-3',
            type: CARD_TYPES.COMPLETION,
            title: 'Start Now',
            cta: 'Complete Lesson',
            content: {
              heading: 'Ready to Start?',
              message: 'Your first tracking task is waiting on your dashboard.',
              highlight: 'Remember: progress, not perfection.',
              reward: {
                fynnies: 1,
                label: 'Module complete!',
              },
              nextPreview: 'Head back to log your first spending entry.',
            },
          },
        ],
      },
    ],
  },
];

/**
 * Get a module by ID
 */
export const getModuleById = (moduleId) => {
  return SAMPLE_MODULES.find(m => m.id === moduleId);
};

/**
 * Get a lesson by ID within a module
 */
export const getLessonById = (moduleId, lessonId) => {
  const module = getModuleById(moduleId);
  if (!module) return null;
  return module.lessons.find(l => l.id === lessonId);
};

/**
 * Get all lessons for a module
 */
export const getModuleLessons = (moduleId) => {
  const module = getModuleById(moduleId);
  if (!module) return [];
  return module.lessons.sort((a, b) => a.order - b.order);
};

export default SAMPLE_MODULES;
