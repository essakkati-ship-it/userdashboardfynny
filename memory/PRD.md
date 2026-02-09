# Fynny Financial Wellbeing Dashboard - PRD

## Original Problem Statement
Build the Fynny Financial Wellbeing Dashboard from GitHub repository (https://github.com/essakkati-ship-it/fynnymobile) into Emergent platform. User requested UI only for initial phase.

## Project Overview
Fynny is a Noom-inspired financial wellbeing app that helps users build healthy money habits through daily learning, check-ins, and spending tracking.

## User Personas
1. **Primary User**: Individuals seeking to improve their financial wellness and reduce money-related stress
2. **Learning-focused User**: People who prefer bite-sized educational content about personal finance
3. **Habit-building User**: Users who want to track and build consistent money management habits

## Core Requirements (Static)
- Dashboard with daily plan and progress tracking
- Learning modules with interactive lessons
- Weekly commitment system
- Streak/reward system (Fynnies)
- Resource section (calculators, payment plans)

## Tech Stack
- **Frontend**: React 19 with Tailwind CSS
- **Icons**: Lucide React
- **Build**: Create React App with Craco

---

## What's Been Implemented

### Date: February 9, 2026 (Latest)

#### ✅ Course Card with Hidden Lessons & Modal Flow
Redesigned the "Learn with Fynny" section to match user's reference (Noom-style):

**Course Card Design:**
- Compact card with medal/ribbon icon (pink background)
- "Finish today's topic" header with current lesson subtitle
- Diamond progress indicators (◆◆◇) showing completed/total lessons
- "X lesson(s) left" text
- Click to expand and show lessons

**Lesson Modal (Mobile):**
- Slides up from bottom of screen
- Pull indicator (rounded bar) at top
- "Finish today's topic" or "Learning goal achieved!" header
- Lesson list with vertical connecting line
- Teal checkmarks for completed lessons
- Current lesson highlighted with pink background
- "Read" and "Listen" buttons in teal

**Lesson Modal (Desktop ≥1024px):**
- **Centered modal** (480px width)
- Fade-in with scale animation
- Close button (X) in top right
- Medal icon next to current lesson
- Same lesson list structure as mobile

**Files Modified:**
- `/app/frontend/src/components/fynny/HomeScreen.jsx`
  - Added `DiamondProgress` component
  - Replaced `LessonModal` with `CourseLessonModal`
  - Redesigned `LearnWithFynnySection` as compact course card
  - Fixed mobile layout overflow issue (`min-w-0`)

### Date: February 9, 2026 (Earlier)

#### ✅ Desktop Lesson Experience - Noom-Style Layout
Applied consistent focused reading layout to ALL lesson screens for desktop (≥1024px):

**Desktop Layout Pattern:**
- Centered container (max-width 720px) with subtle shadow
- Lightweight top bar: "Back to Dashboard", page title, "X of Y" progress
- Clean centered illustrations (not card-styled)
- Beautiful typography with generous spacing
- Progress bar with percentage at bottom
- "Continue" CTA button aligned right

**Mobile Layout Pattern (Preserved):**
- Card-style illustrations with gradient backgrounds
- Full-width content
- Progress dots at bottom
- Full-width CTA button

**Screens Updated:**
- LessonScreen (6 pages) - rose/pink theme
- LessonTwoScreen (5 pages) - purple theme
- LiteracyCheckScreen (4 pages) - amber/orange theme
- DailyBoostScreen (4 pages) - indigo/purple theme
- MoneyTipScreen (3 pages) - green theme
- StreakScreen - amber celebration theme

#### ✅ Financial Health Feature Updated (Based on BudgetBuddy)
Replaced content with structure from reference project using 3 brand colors:
- **Pink (#E85A99)**: Over budget, accent color
- **Orange (#F97316)**: At budget, Fynnies
- **Green (emerald-500)**: Under budget, positive trends

**Trends Tab (Updated):**
- Fynnies Earned card (12 earned, +3 from last week)
- Spending chart with 3-color system (€115 avg daily)
- Lessons chart (22 lessons completed in 7 days)
- Wealth Building chart (€575 saved this week)
- Mood chart (68/100 average daily score)

**Financial Insights Tab (Updated):**
- Debt Overview (€2,450, -€320 this month, debt-free in 8 months)
- Net Worth (€8,720, +€1,240 this month, faster than 72% of users)
- Financial Stress Age (32 stress age vs 25 actual age)

**My Fynny Tab (Updated):**
- Course map journey with SVG dashed path
- 4 modules with alternating left/right layout:
  1. How Money Feels (completed ✓)
  2. Success Beyond the Balance (completed ✓)
  3. The Psychology of Money Habits (current, with play indicator)
  4. The Secret to Lasting Financial Change (locked)
- "Take your time. Every small step counts." encouragement

### Date: February 6, 2026

#### ✅ Complete Frontend UI Implementation
- **Main Dashboard (HomeScreen)**
  - Week tracker with day badges showing Fynnies earned
  - Today's Plan section with expandable lesson card
  - Microlearning section (Daily Boost, Literacy Check, Money Tip)
  - Weekly commitment card
  - Side panel with This Week's Focus

- **Navigation & Sidebar**
  - Full sidebar with user profile
  - My Stuff section (Plan, Commitments, Learning Path, Saved Lessons)
  - Resources section (Payment Plan, Calculators)
  - Settings placeholder
  - Mobile responsive top bar

- **Interactive Lessons**
  - LessonScreen (6-page interactive lesson about Fynny basics)
  - LessonTwoScreen (5-page lesson about money styles)
  - StreakScreen (Fynny reward celebration)

- **Microlearning Modules**
  - LiteracyCheckScreen (3-question financial quiz)
  - DailyBoostScreen (4-page motivational content)
  - MoneyTipScreen (3-page practical tips)

- **Learning Path**
  - 4 themed journeys with colorful cards
  - Progress indicators
  - Journey detail view with tools preview

- **Additional Screens**
  - CommitmentsScreen (view active/past commitments)
  - CommitmentFlowScreen (set weekly commitment)
  - SavedLessonsScreen (bookmarked content)
  - PaymentPlanScreen (subscription info)
  - CalculatorsScreen (financial tools grid)
  - PlaceholderScreen (for Settings)

---

## Prioritized Backlog

### P0 - Critical (Next Phase)
- [ ] Backend API for user authentication
- [ ] MongoDB models for user data, progress, commitments
- [ ] Persist lesson progress and Fynnies earned

### P1 - High Priority
- [ ] Track spending functionality (input and logging)
- [ ] Check-in feature with mood tracking
- [ ] Calculator implementations (Savings, Budget, Debt Payoff, Emergency Fund)

### P2 - Medium Priority
- [ ] Audio feature for lessons (Listen button)
- [ ] Bookmark/save lessons functionality
- [ ] Weekly commitment reminders
- [ ] Push notifications

### P3 - Nice to Have
- [ ] Social sharing of achievements
- [ ] Leaderboard features
- [ ] Custom course creation
- [ ] Dark mode support

---

## Next Tasks
1. Refactor lesson screens to use shared reusable layout component (reduce code duplication)
2. Add backend authentication (JWT or Google OAuth)
3. Create MongoDB schemas for User, Progress, Commitment
4. Wire up lesson completion to save progress
5. Implement spending tracker with categories
