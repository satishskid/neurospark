# Developer Quick Start Guide

## 🚀 Get Started in 5 Minutes

This guide helps developers quickly understand the project and start contributing.

---

## 📁 Project Structure

```
neurospark/
├── src/
│   ├── components/          # React components
│   │   ├── LessonView.tsx   # Main lesson display
│   │   ├── QuizView.tsx     # Quiz component
│   │   ├── ExerciseView.tsx # Exercise component
│   │   └── ...
│   ├── services/
│   │   ├── aiService.ts     # AI provider integration (Gemini, Groq)
│   │   └── firebaseService.ts # Firebase auth & database
│   ├── constants.tsx        # Curriculum content (MEDICAL)
│   ├── types.ts             # TypeScript interfaces
│   └── App.tsx              # Main app component
├── ENHANCEMENT_SPECS.md     # 📘 Complete specifications
├── IMPLEMENTATION_ROADMAP.md # 📅 12-week plan
└── README_ENHANCEMENTS.md   # 📋 Summary
```

---

## 🎯 Key Files to Understand

### 1. **constants.tsx** - Curriculum Content
```typescript
export const CURRICULUM_MEDICAL: Module[] = [
  {
    id: 'med-1',
    title: 'Module 1: AI in Your Practice',
    lessons: [
      {
        id: 'med-1-1',
        title: 'What AI Already Does for You',
        type: 'content',
        content: <div>...</div>,
        estimatedTimeMinutes: 3
      }
    ]
  }
];
```

**Your task:** Expand from 4 modules to 7 modules (see specs)

---

### 2. **types.ts** - Data Structures
```typescript
interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type: 'content' | 'quiz' | 'exercise';
  content?: React.ReactNode;
  quiz?: QuizData;
  exercise?: ExerciseData;
  estimatedTimeMinutes: number;
}
```

**Your task:** Add new interfaces for performance tracking, glossary

---

### 3. **aiService.ts** - AI Integration
```typescript
// Current: Same prompt for both providers
export async function getChatbotResponse(
  module: Module,
  chatHistory: ChatHistoryItem[],
  newUserQuery: string
): Promise<string> {
  const provider = getAIProvider(); // 'gemini' or 'groq'
  // ... uses same prompt for both
}
```

**Your task:** Create provider-specific prompts (Groq needs more detail)

---

### 4. **App.tsx** - Main Application
```typescript
export default function App() {
  const [view, setView] = useState<AppView>('onboarding');
  const [progress, setProgress] = useState<UserProgress>({...});
  
  // Handles routing between:
  // - Onboarding
  // - Login
  // - Journey (main learning)
  // - Certificate
  // - Admin (if admin mode)
}
```

**Your task:** Add Dashboard view, improve navigation

---

## 🐛 Known Issues to Fix

### Critical Bug: Module 9B Ordering
**Location:** `constants.tsx`  
**Problem:** Module 9B appears between Module 1 and 2  
**Fix:** Reorder CURRICULUM_MEDICAL array to proper sequence

```typescript
// WRONG (current):
export const CURRICULUM_MEDICAL: Module[] = [
  { id: 'med-1', ... },
  { id: 'module-9B', ... }, // ❌ Out of order!
  { id: 'med-2', ... },
  ...
];

// CORRECT:
export const CURRICULUM_MEDICAL: Module[] = [
  { id: 'med-1', ... },
  { id: 'med-2', ... },
  { id: 'med-3', ... },
  { id: 'med-4', ... },
  { id: 'med-5', ... },
  { id: 'med-6', ... },
  { id: 'med-7', ... },
];
```

---

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account
- Gemini API key OR Groq API key

### Installation
```bash
# Clone repo
git clone https://github.com/satishskid/neurospark.git
cd neurospark

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your Firebase config

# Start dev server
npm run dev
```

### Environment Variables
```bash
# .env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
# ... (see .env.example)
```

---

## 📝 Coding Standards

### TypeScript
- Use strict mode
- Define interfaces for all data structures
- Avoid `any` type

### React
- Functional components with hooks
- Use TypeScript for props
- Keep components small and focused

### Styling
- Tailwind CSS utility classes
- Consistent spacing (use Tailwind scale)
- Mobile-first responsive design

### Git
- Branch naming: `feature/module-1-content`, `fix/module-ordering`
- Commit messages: Clear, descriptive
- PR template: Include screenshots for UI changes

---

## 🎨 UI Components

### Lesson Layout Pattern
```tsx
<div className="space-y-4">
  {/* TL;DR Summary */}
  <div className="p-4 bg-slate-800/50 rounded-lg">
    <p className="font-semibold">TL;DR</p>
    <p>Quick summary...</p>
  </div>

  {/* Main Content */}
  <p>Lesson content with generous white space...</p>

  {/* Callout Box */}
  <Callout icon={<Icon />}>
    <p>Important concept...</p>
  </Callout>

  {/* Exercise */}
  <div className="mt-6">
    <ExerciseView exercise={...} />
  </div>
</div>
```

### Color Palette
- Background: `slate-900`, `slate-800`
- Primary: `cyan-400`, `blue-500`
- Success: `green-400`
- Warning: `yellow-400`
- Error: `red-400`
- Text: `white`, `slate-300`, `slate-400`

---

## 🧪 Testing

### Run Tests
```bash
# Unit tests
npm run test

# With UI
npm run test:ui

# Coverage
npm run test:coverage
```

### Test Files
- `*.test.tsx` - Component tests
- Located next to component files

### Example Test
```typescript
import { render, screen } from '@testing-library/react';
import QuizView from './QuizView';

test('renders quiz question', () => {
  const quiz = { questions: [{ question: 'Test?', ... }] };
  render(<QuizView quiz={quiz} onComplete={() => {}} />);
  expect(screen.getByText('Test?')).toBeInTheDocument();
});
```

---

## 🔥 Firebase Setup

### Collections
```
users/
  {userId}/
    - email, name, role, institution
    - progress, completedLessons

whitelisted_users/
  {email}/
    - name, role, status

user_performance/
  {userId}/
    - quizScores, exerciseAttempts
    - tutorInteractions, timeSpent

system_logs/
  {logId}/
    - timestamp, severity, component, message
```

### Security Rules
```javascript
// Firestore rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Only admins can access whitelisted_users
    match /whitelisted_users/{email} {
      allow read: if request.auth != null;
      allow write: if request.auth.token.admin == true;
    }
  }
}
```

---

## 📚 Where to Start

### Week 1 Tasks (Foundation)
1. **Fix Module 9B bug** (30 min)
   - File: `constants.tsx`
   - Reorder modules
   - Test in browser

2. **Update TypeScript interfaces** (1 hour)
   - File: `types.ts`
   - Add `PerformanceMetrics`, `TechTerm`
   - Update `User` interface

3. **Set up Firestore collections** (2 hours)
   - Firebase console
   - Create collections
   - Configure security rules

### Week 3 Tasks (UX)
1. **Create Dashboard component** (4 hours)
   - File: `components/DashboardView.tsx`
   - Visual journey map
   - Progress cards

2. **Redesign Sidebar** (4 hours)
   - File: `components/CurriculumView.tsx`
   - Collapsible modules
   - Always-visible tutor

### Week 5 Tasks (Content)
1. **Write Module 1 content** (8 hours)
   - File: `constants.tsx`
   - 4 lessons with medical analogies
   - Interactive exercises

---

## 🆘 Need Help?

### Documentation
- **Full Specs:** `ENHANCEMENT_SPECS.md`
- **Timeline:** `IMPLEMENTATION_ROADMAP.md`
- **Summary:** `README_ENHANCEMENTS.md`

### Common Questions

**Q: How do I add a new lesson?**  
A: Edit `constants.tsx`, add to module's `lessons` array

**Q: How do I test AI tutor locally?**  
A: Add your API key in Settings, then use the chat interface

**Q: How do I preview changes?**  
A: Run `npm run dev`, open http://localhost:5173

**Q: Where are user analytics stored?**  
A: Firestore `user_performance` collection

---

## 🎯 Priority Tasks

### P0 (Must Have for Launch)
- [ ] Fix Module 9B ordering
- [ ] Complete 7 modules
- [ ] Dashboard home screen
- [ ] Always-visible AI tutor
- [ ] Quiz Study/Test mode

### P1 (Should Have)
- [ ] Provider-specific prompts
- [ ] Performance tracking
- [ ] Admin dashboard
- [ ] Technical glossary

### P2 (Nice to Have)
- [ ] Curriculum editor
- [ ] Advanced analytics
- [ ] Voice input

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
# Output: dist/
```

### Deploy to Netlify
```bash
npm run netlify:prod
```

### Environment Check
```bash
# Verify all env vars are set
npm run check-env
```

---

## 📞 Contact

**Questions?** Open an issue on GitHub  
**Bugs?** Create a bug report with reproduction steps  
**Ideas?** Start a discussion in GitHub Discussions

---

**Happy coding! 🎉**
