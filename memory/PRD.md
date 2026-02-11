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
- **Backend**: FastAPI with MongoDB (Motor async driver)
- **Database**: MongoDB

---

## What's Been Implemented

### Date: February 11, 2026 (Latest)

#### ✅ Dynamic Lesson System Refactoring
Refactored lesson screens to render dynamically from admin-created modules (modules → lessons → cards):

**Data Structure:**
- **Modules**: Course containers (e.g., "How Money Feels")
  - id, title, description, icon, theme_color, order
- **Lessons**: Individual lessons within modules
  - id, module_id, title, duration, order, theme_color, cards[]
- **Cards**: Lesson content cards rendered in sequence
  - id, type, title, cta, content, order
  - Types: text, list, quiz, reflection, completion, illustration

**Backend API Endpoints (NEW):**
- `GET /api/modules` - Get all modules with lessons
- `GET /api/modules/{id}` - Get single module with lessons
- `POST /api/modules` - Create module (admin)
- `PUT /api/modules/{id}` - Update module (admin)
- `DELETE /api/modules/{id}` - Delete module (admin)
- `GET /api/lessons/{id}` - Get single lesson
- `POST /api/lessons` - Create lesson (admin)
- `PUT /api/lessons/{id}` - Update lesson (admin)
- `DELETE /api/lessons/{id}` - Delete lesson (admin)
- `POST /api/lessons/{id}/cards` - Add card to lesson (admin)
- `PUT /api/lessons/{id}/cards/{card_id}` - Update card (admin)
- `DELETE /api/lessons/{id}/cards/{card_id}` - Delete card (admin)
- `POST /api/seed/modules` - Seed sample data

**New Files Created:**
- `/app/frontend/src/data/lessonContent.js` - Data model and sample content structure
- `/app/frontend/src/components/fynny/DynamicLessonViewer.jsx` - Dynamic card-based lesson renderer

**Files Modified:**
- `/app/backend/server.py` - Added Module/Lesson/Card models and CRUD endpoints
- `/app/frontend/src/services/api.js` - Added modules and lessons API
- `/app/frontend/src/context/UserContext.jsx` - Added modules state and helper methods
- `/app/frontend/src/components/fynny/FynnyDashboard.jsx` - Added dynamic lesson navigation
- `/app/frontend/src/components/fynny/HomeScreen.jsx` - Uses modules from context, navigates to dynamic lessons

**Card Types Supported:**
- `text` - Text content with blocks (bold, highlight, list, callout)
- `list` - Styled list items with icons
- `reflection` - Reflection prompts with numbered questions
- `completion` - Lesson complete with fynny reward
- `quiz` - Multiple choice questions (structure ready)
- `illustration` - Image/icon illustrations

**Theme Colors Available:**
- rose, purple, amber, indigo, green, teal

---

#### ✅ Backend API & MongoDB Integration
Connected the frontend to a FastAPI backend with MongoDB for persisting user progress:

**Backend API Endpoints (`/app/backend/server.py`):**
- `POST /api/users` - Create or get user
- `GET /api/users/{username}` - Get user by username
- `GET /api/progress/{user_id}` - Get complete user progress
- `POST /api/progress/{user_id}/lessons` - Update lesson progress
- `GET /api/progress/{user_id}/lessons/{course_id}` - Get course lessons
- `POST /api/progress/{user_id}/tasks` - Update daily task
- `GET /api/progress/{user_id}/tasks` - Get today's tasks
- `POST /api/mood/{user_id}` - Log mood check-in
- `GET /api/mood/{user_id}` - Get mood history
- `POST /api/spending/{user_id}` - Log spending entry
- `GET /api/spending/{user_id}` - Get spending history
- `POST /api/progress/{user_id}/streak` - Update streak
- `POST /api/progress/{user_id}/complete-course` - Complete course & award bonus

**MongoDB Collections:**
- `users` - User accounts
- `user_progress` - Fynnies, streaks, totals
- `lesson_progress` - Individual lesson completion
- `daily_tasks` - Check-in, spending, commitment status
- `mood_checkins` - Mood history
- `spending_entries` - Spending history
- `week_status` - Daily completion status

**Frontend Integration:**
- `UserContext.jsx` - React context for user state management
- `api.js` - API service layer for backend communication
- Auto-creates demo user on app load
- Real-time progress display (Fynnies, tasks, week calendar)
- Fallback to hardcoded data if backend unavailable

**Files Created:**
- `/app/frontend/src/services/api.js` - API client
- `/app/frontend/src/context/UserContext.jsx` - User state context
- `/app/backend/tests/test_fynny_api.py` - API tests

**Files Modified:**
- `/app/backend/server.py` - Full API implementation
- `/app/frontend/src/App.js` - Added UserProvider
- `/app/frontend/src/components/fynny/HomeScreen.jsx` - Uses context for data

#### ✅ Mobile Week Calendar Alignment Fix
Fixed the week calendar alignment on mobile to fit properly within card boundaries:
- Reduced circle sizes for mobile (w-8 h-8)
- Added max-width constraint (320px) 
- Centered layout with proper spacing
- Reduced icon sizes proportionally

---

### Date: February 10, 2026 (Previous)

#### ✅ Desktop 3-Column Layout Redesign
Major desktop-only layout adjustment to make the dashboard wider, calmer, and more learning-focused:

**Layout Structure:**
- Left navigation: ~18-20% width (unchanged)
- Main content (center): ~55-60% width (wider than before)
- Right column: ~22-25% width (NEW - "New for you today")

**Vertical Order (Center Column):**
1. Week calendar (at top - unchanged)
2. Main Lesson (below calendar - prominent focal point)
3. Today's Tasks (below lesson - compact)

**Main Lesson Card Changes (Desktop):**
- Height: ~280px (25-30% taller than before)
- Width: 100% of center column
- Larger medal icon (44px)
- Pink "UP NEXT" highlight section with current lesson
- Read/Listen buttons in teal
- Primary focal point of the dashboard

**Today's Tasks Changes (Desktop):**
- Horizontal 3-column grid layout (vs vertical stacking)
- Height: ~150px per card (compact)
- Smaller icons (18px vs 20px)
- Functional and supportive, not dominant

**"New for you today" → Right Column:**
- Moved from center column (horizontal scroll) to dedicated right column
- Vertically stacked cards (one per row)
- Card height: ~100px
- Vertical spacing: 16px (gap-4)
- Cards unchanged: literacy check, daily boost, money tip

**Removed:**
- "This Week's Focus" sidebar (right side)

**Mobile Layout:** Unchanged (all changes desktop-only)

**Files Modified:**
- `/app/frontend/src/components/fynny/HomeScreen.jsx`
  - Added `DesktopMicrolearningColumn` component (vertical stack)
  - Added `MobileMicrolearningSection` component (horizontal scroll)
  - Updated `TodaysPlanSection` with desktop horizontal grid
  - Updated `LearnWithFynnySection` with taller desktop card
  - Removed `WeeklyStepsContent` component
  - New 3-column responsive layout with lg: breakpoint

---

### Date: February 9, 2026 (Previous Session)

#### ✅ Shared LessonLayout Component
Created a reusable layout wrapper for all lesson-type screens:

**New File: `/app/frontend/src/components/fynny/LessonLayout.jsx`**
- Handles common structure: top bar, content area, bottom navigation
- Supports multiple theme colors (rose, purple, amber, indigo, green, teal)
- Responsive design with mobile dots and desktop progress bar
- Exports: `LessonLayout`, `DesktopIllustration`, `MobileIllustration`

#### ✅ Goal Achieved Celebration with Confetti
Added celebration animation when all lessons in a course are completed:

**New File: `/app/frontend/src/components/fynny/CelebrationScreens.jsx`**

**GoalAchievedModal Features:**
- Confetti animation (60 colorful particles falling)
- Dark teal gradient background (Fynny brand style)
- Trophy/Award icon with animated glow
- "Learning goal achieved!" title with lessons count
- Course name badge with "COURSE COMPLETE" label
- "+X Fynny earned!" reward display
- Bouncing celebration dots
- "Continue" button to proceed to streak screen

**Confetti Animation:**
- 50-60 colorful particles (pink, orange, green, indigo, amber, teal)
- Random shapes (circles and rectangles)
- Varying sizes, speeds, and delays
- 4-second duration with fadeout

#### ✅ Course Streak Screen (After Completion)
New screen displayed after completing a course, inspired by user's reference image:

**CourseStreakScreen Features:**
- Dark teal/navy gradient background (matching Fynny brand)
- Large lightning bolt icon (amber/yellow) with glow effect
- Large streak number (e.g., "5") in amber color
- "day streak" label in white
- Week day indicators (M T W T F S S) with circular dots
- Completed days show amber circle with checkmark
- Motivational text: "Leading with action—and it shows."
- Confetti animation on load
- "I'm committed" button at bottom (white)

**Files Modified:**
- `/app/frontend/src/components/fynny/HomeScreen.jsx`
  - Added `showCelebration` state
  - Integrated `GoalAchievedModal` component
  - Added `onAllComplete` callback to `CourseLessonModal`
  - Added "Celebrate! 🎉" button when all lessons done
- `/app/frontend/src/components/fynny/FynnyDashboard.jsx`
  - Added `course-streak` screen route
  - Imported `CourseStreakScreen`
- `/app/frontend/src/components/fynny/index.js`
  - Exported new components

### Date: February 9, 2026 (Earlier)

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
- [x] ~~Backend API for user authentication~~ (Implemented basic user management)
- [x] ~~MongoDB models for user data, progress, commitments~~ (Implemented)
- [x] ~~Persist lesson progress and Fynnies earned~~ (Implemented)
- [x] ~~Refactor lesson screens to use shared layout~~ (Implemented - DynamicLessonViewer)
- [x] ~~Dynamic modules/lessons/cards from backend~~ (Implemented)

### P1 - High Priority
- [x] ~~Track spending functionality (input and logging)~~ (API implemented, UI needs full integration)
- [x] ~~Check-in feature with mood tracking~~ (API implemented, UI needs full integration)
- [ ] **Admin Panel for Module Management** - Create/edit/delete modules, lessons, cards
- [ ] Calculator implementations (Savings, Budget, Debt Payoff, Emergency Fund)

### P2 - Medium Priority
- [ ] Audio feature for lessons (Listen button)
- [ ] Bookmark/save lessons functionality
- [ ] Weekly commitment reminders
- [ ] Push notifications
- [ ] Full authentication (JWT tokens, login/logout)

### P3 - Nice to Have
- [ ] Social sharing of achievements
- [ ] Leaderboard features
- [ ] Custom course creation
- [ ] Dark mode support

---

## Next Tasks
1. Build Admin Panel for module/lesson/card management (CRUD UI)
2. Add UI forms for mood check-in and spending entry
3. Implement full JWT authentication with login/logout
4. Build calculator implementations
5. Add audio feature for lessons (Listen button)
