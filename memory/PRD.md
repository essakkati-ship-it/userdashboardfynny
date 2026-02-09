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

### Date: February 9, 2026

#### ✅ Financial Health Feature (NEW)
Added under "My stuff" in sidebar with 3 tabs:

- **Trends Tab**
  - Weekly spending bar chart with daily goal line ($60/day)
  - Color-coded bars (teal for under budget, rose for over budget)
  - Spending by category with percentage changes
  - Monthly overview with total spent, saved, and budget used

- **Financial Insights Tab**
  - Financial Snapshot summary card
  - 4 personalized insight cards with types (Positive, Heads up, Pattern)
  - Actionable tips with sparkle icons
  - Category-specific insights (food, entertainment, etc.)

- **My Fynny Tab**
  - Total Fynnies earned (47) with weekly progress
  - Level system (Money Mindful → Budget Boss, 68%)
  - Current streak tracker (8 days, best: 12)
  - Achievements grid (4/6 earned)
  - Recent activity history

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
1. Add backend authentication (JWT or Google OAuth)
2. Create MongoDB schemas for User, Progress, Commitment
3. Wire up lesson completion to save progress
4. Implement spending tracker with categories
