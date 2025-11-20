# GreyWaken Platform - Technical Team Manual

## 🔧 Technical Overview

This manual provides comprehensive technical documentation for developers, DevOps, and technical support staff working on the GreyWaken AI learning platform.

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Development Setup](#development-setup)
4. [Database Schema](#database-schema)
5. [Admin System](#admin-system)
6. [User Management](#user-management)
7. [Issue Tracking System](#issue-tracking-system)
8. [Deployment](#deployment)
9. [Monitoring & Maintenance](#monitoring--maintenance)
10. [Troubleshooting](#troubleshooting)
11. [API Documentation](#api-documentation)

---

## 🏗️ Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Main App   │  │  Admin App   │  │  Components  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Services Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  dbService   │  │ authService  │  │  aiService   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  Firebase Backend                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  Firestore   │  │     Auth     │  │   Hosting    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Key Components

**Frontend:**
- React 18 with TypeScript
- Vite build tool
- Tailwind CSS for styling
- React Router for navigation

**Backend:**
- Firebase Firestore (database)
- Firebase Authentication
- Firebase Hosting

**External Services:**
- Google Gemini API (AI features)
- Groq API (fallback AI)

---

## 💻 Technology Stack

### Core Technologies

```json
{
  "runtime": "Node.js 18+",
  "framework": "React 18",
  "language": "TypeScript 5",
  "build": "Vite 6",
  "styling": "Tailwind CSS 3",
  "database": "Firebase Firestore",
  "auth": "Firebase Auth",
  "hosting": "Firebase Hosting / Netlify"
}
```

### Dependencies

**Production:**
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "firebase": "^10.x",
  "react-router-dom": "^6.x"
}
```

**Development:**
```json
{
  "typescript": "^5.x",
  "vite": "^6.x",
  "tailwindcss": "^3.x",
  "@types/react": "^18.x"
}
```

---

## 🚀 Development Setup

### Prerequisites

```bash
# Required
- Node.js 18 or higher
- npm or yarn
- Git
- Firebase CLI

# Optional
- VS Code with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
```

### Initial Setup

```bash
# 1. Clone repository
git clone https://github.com/satishskid/neurospark.git
cd neurospark

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your Firebase config

# 4. Start development server
npm run dev

# 5. Build for production
npm run build

# 6. Preview production build
npm run preview
```

### Environment Variables

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Optional: AI API Keys (user-provided)
# These are stored in browser localStorage, not in env
```

---

## 🗄️ Database Schema

### Firebase Firestore Collections

#### 1. `users` Collection

```typescript
interface User {
  uid: string;                    // Firebase Auth UID
  name: string;                   // User's full name
  email: string;                  // User's email
  isLoggedIn: boolean;            // Current login status
  createdAt: string;              // ISO timestamp
  updatedAt: string;              // ISO timestamp
  
  // Optional fields
  isAdmin?: boolean;              // Admin flag
  userPersona?: string | null;    // User type
  courseMode?: string | null;     // Course preference
  userProfession?: string | null; // Profession
  currentLevelIndex?: number;     // Progress level
  totalPoints?: number;           // Gamification points
  achievedBadgeIds?: string[];    // Earned badges
  completedSteps?: Record<string, boolean>;
  theme?: string;                 // UI theme preference
  analogyTheme?: string | null;   // Learning style
  
  // Course progress
  courseProgress?: Record<string, CourseProgress>;
}

interface CourseProgress {
  completedLessons: string[];     // Array of lesson IDs
  currentModuleIndex: number;     // Current module
  totalScore: number;             // Total points
  lastAccessed: string;           // ISO timestamp
  certificateEarned?: boolean;    // Completion status
}
```

**Indexes:**
- `email` (for lookups)
- `isLoggedIn` (for active user queries)
- `createdAt` (for sorting)

#### 2. `whitelist` Collection

```typescript
interface WhitelistEntry {
  email: string;                  // Whitelisted email
  name?: string;                  // User name (optional)
  role?: string;                  // User role
  institution?: string;           // Organization
  addedDate: string;              // ISO timestamp
  addedBy: string;                // Admin email
  status: 'active' | 'pending' | 'inactive';
}
```

**Indexes:**
- `email` (unique, for fast lookups)
- `status` (for filtering)

#### 3. `issues` Collection (NEW)

```typescript
interface Issue {
  // Auto-generated document ID
  
  // User information
  userId: string;                 // Reporter's UID
  userEmail: string;              // Reporter's email
  userName: string;               // Reporter's name
  
  // Issue details
  issueType: 'bug' | 'feature' | 'content' | 'technical' | 'other';
  title: string;                  // Brief description
  description: string;            // Detailed explanation
  severity: 'low' | 'medium' | 'high' | 'critical';
  
  // Status tracking
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;              // ISO timestamp
  updatedAt: string;              // ISO timestamp
  resolvedAt: string | null;      // ISO timestamp when resolved
  
  // Context
  currentPage?: string;           // URL path where issue occurred
  browserInfo?: string;           // User agent string
  adminNotes?: string;            // Admin comments
}
```

**Indexes:**
- `status` (for filtering)
- `severity` (for prioritization)
- `createdAt` (for sorting)
- `userId` (for user's issues)

---

## 👨‍💼 Admin System

### Admin Access Control

**Admin Emails (Hardcoded):**
```typescript
// services/firebaseService.ts
const adminEmails = [
  'satish@skids.health',
  'drsatish@skids.health',
  'admin@skids.health',
  'admin@greywaken.ai'
];
```

**Admin Detection Flow:**
```typescript
// 1. User logs in
authService.onAuthStateChanged((user) => {
  // 2. Check if email is in admin list
  if (authService.isAdmin(user)) {
    setIsUserAdmin(true);
    // 3. Show "Admin" button in header
  }
});
```

### Admin Dashboard Components

**Location:** `neurospark/AdminApp.tsx`

**Tabs:**
1. **Overview** - `AdminDashboard.tsx`
2. **Users** - `UserManagementPanel.tsx`
3. **Issues** - `IssuesPanel.tsx`
4. **Curriculum** - `CurriculumManagementPanel.tsx`
5. **Promotional** - `PromotionalContentPanel.tsx`

### Admin Data Flow

```typescript
// User Management
AdminApp → UserManagementPanel → dbService.getAllUsers() → Firestore

// Issue Tracking
AdminApp → IssuesPanel → dbService.getAllIssues() → Firestore
                      → dbService.updateIssueStatus() → Firestore

// Analytics
AdminApp → AdminDashboard → dbService.getUserAnalytics() → Firestore
```

---

## 👥 User Management

### User Registration Flow

```
1. User visits platform
2. Clicks "Begin Learning"
3. Selects curriculum (Medical/Basics)
4. Signs in with Google/Email
   ↓
5. Firebase Auth creates account
   ↓
6. Check if email in whitelist
   ├─ YES → Create user document in Firestore
   └─ NO  → Show "Contact support" message
   ↓
7. User proceeds to course
```

### Adding Users to Whitelist

**Manual Process (Current):**

```typescript
// 1. Get user email list from BD team
const emails = [
  'user1@example.com',
  'user2@example.com',
  // ...
];

// 2. Add to Firestore whitelist collection
// Use Firebase Console or script:
emails.forEach(async (email) => {
  await db.collection('whitelist').add({
    email: email.toLowerCase(),
    addedDate: new Date().toISOString(),
    addedBy: 'admin@greybrain.ai',
    status: 'active'
  });
});
```

**Bulk Import Script:**

```bash
# Create CSV file: emails.csv
# Format: email,name,institution

# Run import script (create this)
node scripts/import-whitelist.js emails.csv
```

### User Data Queries

```typescript
// Get all users
const users = await dbService.getAllUsers();

// Get user analytics
const analytics = await dbService.getUserAnalytics();
// Returns: {
//   totalUsers,
//   activeUsers,
//   newUsersToday,
//   completionRate,
//   dailyActiveUsers,
//   weeklyActiveUsers,
//   monthlyActiveUsers
// }

// Search users
const results = users.filter(u => 
  u.name.toLowerCase().includes(query) ||
  u.email.toLowerCase().includes(query)
);
```

---

## 🐛 Issue Tracking System

### Issue Reporting Flow

```
User Side:
1. User clicks Settings → "Report a Problem"
2. Fills form (type, severity, title, description)
3. Submits → dbService.reportIssue()
4. Document created in Firestore 'issues' collection
5. Success message shown

Admin Side:
1. Admin opens Issues tab
2. dbService.getAllIssues() fetches all issues
3. Admin sees list with filters
4. Admin updates status → dbService.updateIssueStatus()
5. Firestore document updated
```

### Issue Management API

```typescript
// Report new issue
await dbService.reportIssue({
  userId: string,
  userEmail: string,
  userName: string,
  issueType: 'bug' | 'feature' | 'content' | 'technical' | 'other',
  title: string,
  description: string,
  severity: 'low' | 'medium' | 'high' | 'critical',
  currentPage?: string,
  browserInfo?: string
});

// Get all issues
const issues = await dbService.getAllIssues();

// Update issue status
await dbService.updateIssueStatus(
  issueId: string,
  status: 'open' | 'in-progress' | 'resolved' | 'closed',
  adminNotes?: string
);
```

### Issue Lifecycle

```
open → in-progress → resolved → closed
  ↑         ↓           ↓
  └─────────┴───────────┘
     (can reopen if needed)
```

---

## 🚀 Deployment

### Build Process

```bash
# 1. Install dependencies
npm install

# 2. Run tests (if available)
npm test

# 3. Build for production
npm run build
# Output: dist/ folder

# 4. Preview build locally
npm run preview
```

### Firebase Hosting Deployment

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login to Firebase
firebase login

# 3. Initialize project (first time only)
firebase init hosting

# 4. Build project
npm run build

# 5. Deploy to Firebase
firebase deploy --only hosting

# 6. Deploy to specific site
firebase deploy --only hosting:greywaken
```

### Netlify Deployment

```bash
# Option 1: Netlify CLI
npm install -g netlify-cli
netlify deploy --prod

# Option 2: Git-based deployment
# Push to main branch → Auto-deploys
git push origin main
```

### Environment-Specific Builds

```bash
# Development
npm run dev

# Staging
VITE_ENV=staging npm run build
firebase deploy --only hosting:staging

# Production
VITE_ENV=production npm run build
firebase deploy --only hosting:production
```

---

## 📊 Monitoring & Maintenance

### Health Checks

**Frontend:**
- Check if site loads: `https://greywaken.greybrain.in`
- Check admin portal: Login → Click "Admin"
- Check user registration: Try signing up

**Backend:**
- Firebase Console: Check Firestore queries
- Firebase Auth: Check user count
- Firebase Hosting: Check deployment status

### Performance Monitoring

**Metrics to Track:**
- Page load time
- Time to interactive
- Bundle size
- API response times
- Error rates

**Tools:**
- Firebase Performance Monitoring
- Google Analytics
- Browser DevTools
- Lighthouse audits

### Database Maintenance

**Regular Tasks:**

```typescript
// 1. Clean up old sessions (monthly)
// Find users with isLoggedIn=true but lastActive > 30 days
// Set isLoggedIn=false

// 2. Archive old issues (quarterly)
// Move closed issues older than 90 days to archive collection

// 3. Backup data (weekly)
// Use Firebase export feature
firebase firestore:export gs://backup-bucket/$(date +%Y%m%d)

// 4. Monitor storage usage
// Check Firestore usage in Firebase Console
```

### Security Audits

**Monthly Checklist:**
- [ ] Review Firebase Security Rules
- [ ] Check for exposed API keys
- [ ] Audit admin access logs
- [ ] Review user permissions
- [ ] Check for suspicious activity
- [ ] Update dependencies
- [ ] Run security scan

---

## 🔍 Troubleshooting

### Common Issues

#### 1. Admin Button Not Showing

**Symptoms:** User is admin but doesn't see "Admin" button

**Debug Steps:**
```typescript
// 1. Check browser console
console.log('User email:', user.email);
console.log('Is admin?', authService.isAdmin(user));

// 2. Verify email matches exactly
// Check for typos, case sensitivity

// 3. Check auth state
console.log('Auth state:', user);
console.log('isLoggedIn:', user.isLoggedIn);

// 4. Clear cache and reload
localStorage.clear();
location.reload();
```

**Solution:**
- Verify email is in admin list (firebaseService.ts)
- Check isLoggedIn status
- Clear browser cache

#### 2. Users Can't Register

**Symptoms:** "Contact support" message on login

**Debug Steps:**
```typescript
// 1. Check if email is whitelisted
const isWhitelisted = await dbService.isUserWhitelisted(email);
console.log('Whitelisted?', isWhitelisted);

// 2. Check Firestore whitelist collection
// Firebase Console → Firestore → whitelist

// 3. Verify email format
console.log('Email:', email.toLowerCase());
```

**Solution:**
- Add email to whitelist collection
- Check for typos in email
- Verify whitelist query works

#### 3. Issues Not Saving

**Symptoms:** Issue submission fails

**Debug Steps:**
```typescript
// 1. Check browser console for errors
// 2. Verify Firebase permissions
// 3. Check network tab for failed requests

// 4. Test manually
await dbService.reportIssue({
  userId: 'test',
  userEmail: 'test@example.com',
  userName: 'Test User',
  issueType: 'bug',
  title: 'Test',
  description: 'Test',
  severity: 'low'
});
```

**Solution:**
- Check Firebase Security Rules
- Verify user is authenticated
- Check Firestore quotas

#### 4. Build Failures

**Symptoms:** `npm run build` fails

**Common Causes:**
```bash
# TypeScript errors
npm run build 2>&1 | grep "error TS"

# Missing dependencies
npm install

# Node version mismatch
node --version  # Should be 18+

# Memory issues
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

---

## 📡 API Documentation

### dbService API

**Location:** `services/dbService.ts`

#### User Management

```typescript
// Check if user is whitelisted
isUserWhitelisted(email: string): Promise<boolean>

// Create new user
createUser(user: User): Promise<void>

// Find user by UID
findUser(uid: string): Promise<User | null>

// Update user
updateUser(uid: string, updates: Partial<User>): Promise<void>

// Get all users (admin only)
getAllUsers(): Promise<User[]>

// Get user analytics (admin only)
getUserAnalytics(): Promise<UserAnalytics>
```

#### Issue Management

```typescript
// Report new issue
reportIssue(issue: IssueData): Promise<void>

// Get all issues (admin only)
getAllIssues(): Promise<Issue[]>

// Update issue status (admin only)
updateIssueStatus(
  issueId: string,
  status: IssueStatus,
  adminNotes?: string
): Promise<void>
```

#### Whitelist Management

```typescript
// Get all whitelisted users (admin only)
getWhitelistedUsers(): Promise<WhitelistEntry[]>
```

### authService API

**Location:** `services/firebaseService.ts`

```typescript
// Sign in with email/password
signInWithEmail(email: string, password: string): Promise<User | null>

// Sign in with Google
signInWithGoogle(): Promise<User | null>

// Sign out
signOut(): Promise<void>

// Listen to auth state changes
onAuthStateChanged(callback: (user: User | null) => void): () => void

// Check if user is admin
isAdmin(user: User): boolean

// Check if user is demo admin
isDemoAdmin(user: User): boolean
```

---

## 🔐 Security

### Firebase Security Rules

**Firestore Rules:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection
    match /users/{userId} {
      // Users can read their own data
      allow read: if request.auth != null && request.auth.uid == userId;
      // Only authenticated users can create
      allow create: if request.auth != null;
      // Users can update their own data
      allow update: if request.auth != null && request.auth.uid == userId;
    }
    
    // Whitelist collection (read-only for authenticated users)
    match /whitelist/{entry} {
      allow read: if request.auth != null;
      allow write: if false; // Admin only via backend
    }
    
    // Issues collection
    match /issues/{issueId} {
      // Users can create issues
      allow create: if request.auth != null;
      // Users can read their own issues
      allow read: if request.auth != null;
      // Only admins can update (implement admin check)
      allow update: if request.auth != null && 
        request.auth.token.email in [
          'satish@skids.health',
          'drsatish@skids.health',
          'admin@skids.health',
          'admin@greywaken.ai'
        ];
    }
  }
}
```

### API Key Management

**User API Keys:**
- Stored in browser localStorage
- Never sent to backend
- Used for direct AI API calls

**Firebase Config:**
- Stored in environment variables
- Public keys (safe to expose)
- Restricted by Firebase Security Rules

---

## 📝 Code Style & Standards

### TypeScript

```typescript
// Use interfaces for data structures
interface User {
  uid: string;
  name: string;
  email: string;
}

// Use type for unions
type Status = 'open' | 'closed';

// Use async/await, not promises
async function getUser(uid: string): Promise<User> {
  const user = await dbService.findUser(uid);
  return user;
}
```

### React Components

```typescript
// Functional components with TypeScript
interface Props {
  user: User;
  onUpdate: (user: User) => void;
}

const UserCard: React.FC<Props> = ({ user, onUpdate }) => {
  // Component logic
};

export default UserCard;
```

### File Organization

```
neurospark/
├── components/          # React components
├── services/           # Business logic
├── types.ts            # TypeScript interfaces
├── constants.tsx       # Static data
├── App.tsx             # Main app
├── AdminApp.tsx        # Admin app
└── index.tsx           # Entry point
```

---

## 🧪 Testing

### Manual Testing Checklist

**User Flow:**
- [ ] Registration works
- [ ] Login works
- [ ] Course selection works
- [ ] Lessons load correctly
- [ ] Progress saves
- [ ] Certificate generates

**Admin Flow:**
- [ ] Admin button appears
- [ ] Dashboard loads
- [ ] User list shows real data
- [ ] Search works
- [ ] Issues display correctly
- [ ] Status updates work

**Issue Reporting:**
- [ ] Report button works
- [ ] Form submits successfully
- [ ] Issue appears in admin panel
- [ ] Status can be updated

### Automated Testing (Future)

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

---

## 📞 Support Contacts

**Technical Issues:**
- Email: tech@greybrain.ai
- Lead: Dr. Satish Rath (satish@skids.health)

**Firebase/Infrastructure:**
- Firebase Console: https://console.firebase.google.com
- Project ID: [your-project-id]

**Repository:**
- GitHub: https://github.com/satishskid/neurospark
- Branch: main

---

## 📚 Additional Resources

**Documentation:**
- Firebase Docs: https://firebase.google.com/docs
- React Docs: https://react.dev
- TypeScript Docs: https://www.typescriptlang.org/docs
- Tailwind CSS: https://tailwindcss.com/docs

**Internal Docs:**
- ADMIN_USER_MANUAL.md - For admin users
- BD_TEAM_MANUAL.md - For business development
- ADMIN_SYSTEM_TEST.md - Testing documentation
- DEPLOYMENT_GUIDE.md - Deployment procedures

---

**Last Updated:** November 2024
**Version:** 1.0
