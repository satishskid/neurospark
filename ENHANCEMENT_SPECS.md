# GreyWaken Medical - Enhancement Specifications
## AI Learning Platform for Healthcare Professionals

**Version:** 2.0  
**Date:** November 18, 2024  
**Certification Partner:** IIHMRB  
**Target Audience:** Doctors, Nurses, Healthcare Administrators  
**Course Duration:** 6 hours (self-paced, complete within 1 week)

---

## Table of Contents

- [GreyWaken Medical - Enhancement Specifications](#greywaken-medical---enhancement-specifications)
  - [AI Learning Platform for Healthcare Professionals](#ai-learning-platform-for-healthcare-professionals)
  - [Table of Contents](#table-of-contents)
  - [Executive Summary](#executive-summary)
    - [Vision](#vision)
    - [Key Objectives](#key-objectives)
    - [Core Enhancements](#core-enhancements)
  - [Current State Analysis](#current-state-analysis)
    - [Strengths](#strengths)
    - [Critical Gaps](#critical-gaps)
    - [User Feedback Priorities](#user-feedback-priorities)
  - [Enhanced Curriculum](#enhanced-curriculum)
    - [Design Principles](#design-principles)
    - [7-Module Structure](#7-module-structure)
      - [**PHASE 1: DISCOVER (Frictionless Entry)**](#phase-1-discover-frictionless-entry)
      - [**PHASE 2: UNDERSTAND (Build Foundation)**](#phase-2-understand-build-foundation)
      - [**PHASE 3: PROTECT (Safety First)**](#phase-3-protect-safety-first)
      - [**PHASE 4: MASTER (Advanced Skills)**](#phase-4-master-advanced-skills)
      - [**PHASE 5: EVALUATE (Critical Thinking)**](#phase-5-evaluate-critical-thinking)
      - [**PHASE 6: IMPLEMENT (Real-World Application)**](#phase-6-implement-real-world-application)
      - [**PHASE 7: DEMONSTRATE (Capstone)**](#phase-7-demonstrate-capstone)
    - [Total Time: ~6 hours (self-paced, complete within 1 week)](#total-time-6-hours-self-paced-complete-within-1-week)
  - [UX Improvements](#ux-improvements)
    - [1. Dashboard Home Screen (NEW)](#1-dashboard-home-screen-new)
    - [2. Sidebar Redesign](#2-sidebar-redesign)
    - [3. Header Navigation](#3-header-navigation)
    - [4. Lesson Content Redesign](#4-lesson-content-redesign)
    - [5. Quiz Enhancements](#5-quiz-enhancements)
    - [6. Exercise Improvements](#6-exercise-improvements)
    - [7. Mobile Optimization](#7-mobile-optimization)
    - [8. Push Notifications (Simple)](#8-push-notifications-simple)
  - [Technical Enhancements](#technical-enhancements)
    - [1. Provider-Specific AI Prompts](#1-provider-specific-ai-prompts)
      - [Groq Prompt Enhancements](#groq-prompt-enhancements)
    - [2. Technical Glossary Component](#2-technical-glossary-component)
    - [3. Module Ordering Fix](#3-module-ordering-fix)
    - [4. Performance Tracking](#4-performance-tracking)
  - [Admin Dashboard](#admin-dashboard)
    - [Architecture](#architecture)
    - [1. User Management Panel](#1-user-management-panel)
      - [A. Whitelist Management](#a-whitelist-management)
      - [B. User Analytics](#b-user-analytics)
    - [2. System Health Panel](#2-system-health-panel)
      - [A. API Status Monitor](#a-api-status-monitor)
      - [B. Error Logs](#b-error-logs)
      - [C. Performance Metrics](#c-performance-metrics)
    - [3. Curriculum Management Panel](#3-curriculum-management-panel)
      - [A. View Current Curriculum](#a-view-current-curriculum)
      - [B. Edit Module Content](#b-edit-module-content)
      - [C. Publish Changes](#c-publish-changes)
  - [Implementation Plan](#implementation-plan)
    - [Phase 1: Foundation (Week 1-2)](#phase-1-foundation-week-1-2)
      - [1.1 Bug Fixes](#11-bug-fixes)
      - [1.2 Data Structure Updates](#12-data-structure-updates)
      - [1.3 Firebase Setup](#13-firebase-setup)
    - [Phase 2: UX Overhaul (Week 3-4)](#phase-2-ux-overhaul-week-3-4)
      - [2.1 Dashboard Home Screen](#21-dashboard-home-screen)
      - [2.2 Sidebar Redesign](#22-sidebar-redesign)
      - [2.3 Header Navigation](#23-header-navigation)
      - [2.4 Lesson Content Redesign](#24-lesson-content-redesign)
      - [2.5 Quiz Enhancements](#25-quiz-enhancements)
      - [2.6 Exercise Improvements](#26-exercise-improvements)
    - [Phase 3: Curriculum Expansion (Week 5-7)](#phase-3-curriculum-expansion-week-5-7)
      - [3.1 Module 1: AI in Your Practice Today](#31-module-1-ai-in-your-practice-today)
      - [3.2 Module 2: How AI Thinks (Enhanced)](#32-module-2-how-ai-thinks-enhanced)
      - [3.3 Module 3: Protecting Patient Privacy](#33-module-3-protecting-patient-privacy)
      - [3.4 Module 4: Advanced Prompt Engineering](#34-module-4-advanced-prompt-engineering)
      - [3.5 Module 5: AI Safety \& Bias](#35-module-5-ai-safety--bias)
      - [3.6 Module 6: Building Workflows](#36-module-6-building-workflows)
      - [3.7 Module 7: Capstone Project](#37-module-7-capstone-project)
      - [3.8 Technical Glossary](#38-technical-glossary)
    - [Phase 4: AI Enhancements (Week 8)](#phase-4-ai-enhancements-week-8)
      - [4.1 Provider-Specific Prompts](#41-provider-specific-prompts)
      - [4.2 Performance Tracking](#42-performance-tracking)
      - [4.3 Adaptive Learning](#43-adaptive-learning)
    - [Phase 5: Admin Dashboard (Week 9-10)](#phase-5-admin-dashboard-week-9-10)
      - [5.1 Admin Authentication](#51-admin-authentication)
      - [5.2 User Management Panel](#52-user-management-panel)
      - [5.3 System Health Panel](#53-system-health-panel)
      - [5.4 Curriculum Management Panel](#54-curriculum-management-panel)
    - [Phase 6: Polish \& Launch (Week 11-12)](#phase-6-polish--launch-week-11-12)
      - [6.1 Mobile Optimization](#61-mobile-optimization)
      - [6.2 Push Notifications](#62-push-notifications)
      - [6.3 Performance Optimization](#63-performance-optimization)
      - [6.4 Testing](#64-testing)
      - [6.5 Documentation](#65-documentation)
      - [6.6 IIHMRB Certification Integration](#66-iihmrb-certification-integration)
      - [6.7 Deployment](#67-deployment)
  - [Success Metrics](#success-metrics)
    - [User Engagement](#user-engagement)
    - [Learning Outcomes](#learning-outcomes)
    - [System Performance](#system-performance)
    - [User Satisfaction](#user-satisfaction)
    - [Business Metrics](#business-metrics)
  - [Technical Stack](#technical-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [AI Services](#ai-services)
    - [DevOps](#devops)
    - [Security](#security)
  - [Risk Mitigation](#risk-mitigation)
    - [Technical Risks](#technical-risks)
    - [Content Risks](#content-risks)
    - [User Risks](#user-risks)
  - [Appendix A: Key Medical Analogies](#appendix-a-key-medical-analogies)
    - [Technical Concepts → Clinical Analogies](#technical-concepts--clinical-analogies)
  - [Appendix B: Sample Lesson (Full)](#appendix-b-sample-lesson-full)
    - [Module 2, Lesson 2.2: Understanding AI Models](#module-2-lesson-22-understanding-ai-models)
  - [Appendix C: Firebase Schema](#appendix-c-firebase-schema)
    - [Collections](#collections)
      - [`users`](#users)
      - [`whitelisted_users`](#whitelisted_users)
      - [`user_progress`](#user_progress)
      - [`user_performance`](#user_performance)
      - [`system_logs`](#system_logs)
      - [`curriculum_versions`](#curriculum_versions)
  - [Appendix D: Environment Variables](#appendix-d-environment-variables)
  - [Appendix E: Deployment Checklist](#appendix-e-deployment-checklist)
    - [Pre-Deployment](#pre-deployment)
    - [Deployment](#deployment)
    - [Post-Deployment](#post-deployment)
  - [Document Version History](#document-version-history)
  - [Contact \& Support](#contact--support)

---

## Executive Summary

### Vision
Transform GreyWaken into a comprehensive, personalized AI learning platform specifically designed for healthcare professionals, breaking down barriers to AI adoption through intuitive, practical, and fear-reducing education.

### Key Objectives
- **Frictionless Entry:** Immediate practical value from lesson 1
- **Fear Reduction:** No coding, relatable medical analogies, safe sandbox
- **Empowerment:** Every module delivers actionable skills
- **Compliance:** HIPAA-focused, IIHMRB certified
- **Personalization:** Adaptive learning paths based on user performance

### Core Enhancements
1. **Expanded Medical Curriculum:** 4 modules → 7 comprehensive modules (18 min → 6 hours)
2. **Technical Literacy:** Demystify AI jargon (tokens, context, parameters, GPU, models)
3. **UX Overhaul:** Dashboard, collapsible sidebar, always-visible AI tutor, white space
4. **Admin Dashboard:** User management, analytics, system health, curriculum updates
5. **Provider-Specific Prompts:** Enhanced Groq prompts for medical context


---

## Current State Analysis

### Strengths
- Clean architecture (React, TypeScript, Firebase)
- Dual AI provider support (Gemini, Groq)
- Interactive quizzes and exercises with AI evaluation
- Progress tracking and persistence
- Mobile-responsive design

### Critical Gaps
1. **Curriculum Incomplete:** Only 4 modules vs 7 needed
2. **Entry Friction:** Starts with abstract theory, not practical value
3. **Missing Technical Concepts:** Users encounter jargon without explanation
4. **UX Overwhelm:** All modules visible, no dashboard, dense text
5. **No Admin Tools:** Manual user management, no analytics
6. **Generic Prompts:** Same prompts for Gemini and Groq (suboptimal for smaller models)

### User Feedback Priorities
- ✅ Collapse completed modules in sidebar
- ✅ Add dashboard home screen
- ✅ More white space in lessons
- ✅ TL;DR summaries at top of lessons
- ✅ Always-visible AI tutor (not modal)
- ✅ Study mode for quizzes (see answers after completion)
- ✅ Example solutions after 3 exercise attempts
- ✅ Visual journey map
- ✅ Subtle completion indicators (no gamification)
- ✅ Optimize for desktop/tablet (mobile-friendly)
- ✅ Push notifications (if simple)
- ✅ Micro-learning support


---

## Enhanced Curriculum

### Design Principles
1. **Entry:** Start with immediate value, not theory
2. **Progression:** Crawl → Walk → Run → Fly
3. **Fear Reduction:** Safe sandbox, no coding, medical analogies
4. **Empowerment:** Every module = 1 practical skill
5. **Outcome:** "I can use AI safely in my practice tomorrow"

### 7-Module Structure

#### **PHASE 1: DISCOVER (Frictionless Entry)**

**Module 1: AI in Your Practice Today (15 min)**
- Lesson 1.1: What AI Already Does for You (3 min)
- Lesson 1.2: Your First AI Conversation (5 min) - HANDS-ON
- Lesson 1.3: The 3 Rules of Safe AI Use (4 min)
- Lesson 1.4: Quick Wins - 5 Ways to Use AI Tomorrow (3 min)

**Outcome:** "I used AI safely and got immediate value"

---

#### **PHASE 2: UNDERSTAND (Build Foundation)**

**Module 2: How AI Thinks (No Coding Required) (30 min)**
- Lesson 2.1: The AI Brain - Pattern Recognition (4 min)
- Lesson 2.2: Understanding AI Models (7 min) - NEW
  - Open vs Closed models (Generic vs Brand-name drugs)
  - Parameters (Medical student vs Attending)
  - GPU (Lab equipment analogy)
- Lesson 2.3: Tokens & Context - AI's Working Memory (5 min) - NEW
  - What are tokens? (Medical abbreviations)
  - Context window (Working memory during rounds)
  - Practical limits and workarounds
- Lesson 2.4: Why AI Makes Mistakes (Hallucinations) (5 min)
- Lesson 2.5: The Anatomy of a Good Prompt (5 min)
- Lesson 2.6: Practice - Write Your First Clinical Prompt (4 min)

**Outcome:** "I understand AI's strengths and limitations"


---

#### **PHASE 3: PROTECT (Safety First)**

**Module 3: Protecting Patient Privacy (20 min)**
- Lesson 3.1: HIPAA in the AI Era (4 min)
- Lesson 3.2: The 18 Identifiers You Must Remove (5 min)
- Lesson 3.3: De-identification in Practice (6 min) - HANDS-ON
- Lesson 3.4: Choosing HIPAA-Compliant AI Tools (5 min)

**Outcome:** "I can use AI safely and legally"

---

#### **PHASE 4: MASTER (Advanced Skills)**

**Module 4: Advanced Prompt Engineering for Clinicians (25 min)**
- Lesson 4.1: Documentation Workflows (6 min)
  - SOAP notes, H&P, discharge summaries
- Lesson 4.2: Clinical Decision Support Prompts (7 min)
  - Differential diagnosis with safety guardrails
- Lesson 4.3: Literature Search & Synthesis (6 min)
- Lesson 4.4: Patient Communication (6 min)

**Outcome:** "I can handle complex clinical AI tasks"

---

#### **PHASE 5: EVALUATE (Critical Thinking)**

**Module 5: AI Safety & Bias in Healthcare (22 min)**
- Lesson 5.1: When AI Gets It Wrong (5 min)
- Lesson 5.2: Recognizing Bias in AI (6 min)
- Lesson 5.3: Evaluating AI Research (6 min)
- Lesson 5.4: Building Your AI Ethics Framework (5 min)

**Outcome:** "I can critically evaluate AI tools and outputs"

---

#### **PHASE 6: IMPLEMENT (Real-World Application)**

**Module 6: Building Your AI-Enhanced Workflow (28 min)**
- Lesson 6.1: Workflow Analysis (6 min)
- Lesson 6.2: Designing a HIPAA-Compliant Workflow (8 min) - HANDS-ON
- Lesson 6.3: Choosing the Right AI Tools (7 min)
- Lesson 6.4: Change Management & Team Training (7 min)

**Outcome:** "I have a concrete plan to use AI in my practice"

---

#### **PHASE 7: DEMONSTRATE (Capstone)**

**Module 7: Capstone Project - Your AI Action Plan (90 min)**
- Section 1: Knowledge Assessment (25 min)
  - 30 questions spanning all modules
  - Minimum 75% to proceed
- Section 2: Practical Exercises (30 min)
  - Write clinical documentation prompt
  - De-identify complex patient note
  - Evaluate AI output for accuracy
  - Design HIPAA-compliant workflow
- Section 3: Case Study Analysis (20 min)
- Section 4: Your AI Action Plan (15 min)
  - Reflective essay (500 words)
  - Submit for IIHMRB certification

**Outcome:** "I am a certified AI-competent clinician"

---

### Total Time: ~6 hours (self-paced, complete within 1 week)


---

## UX Improvements

### 1. Dashboard Home Screen (NEW)

**Landing page after login showing:**
- Visual journey map (Module 1 ✅ → Module 2 📍 → Module 3 🔒)
- Progress overview (35% complete, 4.2 hours remaining)
- Current lesson with "Continue Learning" button
- This week's goal tracker
- Quick access to Syllabus, Glossary, Capstone
- Recent activity feed

**Purpose:** Orientation and motivation

---

### 2. Sidebar Redesign

**Current Problems:**
- All modules expanded = overwhelming
- No visual hierarchy
- Module 9B out of order (BUG TO FIX)

**New Design:**
- ✅ Completed modules: Auto-collapse, show checkmark
- 📍 Current module: Auto-expand, highlight current lesson
- 🔒 Locked modules: Collapsed, show lock icon
- Click module title to toggle expand/collapse
- Progress indicator per module (2/3 lessons)

**Always-Visible AI Tutor (Bottom of Sidebar):**
- Persistent chat interface (not modal)
- Context-aware suggested questions
- Fundamental questions first, "Go Deeper" section
- Chat history collapsible

---

### 3. Header Navigation

**Top bar includes:**
- [Dashboard] [My Learning]
- [📖 Syllabus] [📝 Glossary] [🎯 Capstone]
- [🔔 Notifications] [⚙️ Settings] [User Menu]

**Modal Interactions:**
- Clicking Syllabus/Glossary/Capstone opens modal overlay
- Prominent "Back to Learning" button
- Current lesson position preserved (no navigation loss)

---

### 4. Lesson Content Redesign

**Enhancements:**
- **TL;DR Summary** at top of every lesson
- **Generous white space:** 2-3x current spacing
- **Short paragraphs:** Max 3-4 lines
- **Visual breaks:** Callout boxes, examples, exercises
- **Clinical examples:** Not patronizing, directly relevant
- **Scannable:** Headers, bullets, clear hierarchy

**Example Structure:**
```
┌─────────────────────────────────────┐
│ 📌 TL;DR (Quick Summary)            │
│ Key takeaway in 2-3 sentences       │
└─────────────────────────────────────┘

[White space]

📖 LESSON CONTENT
Short paragraph...

[White space]

┌─────────────────────────────────────┐
│ 💡 CLINICAL EXAMPLE                 │
│ Real-world scenario...              │
└─────────────────────────────────────┘

[White space]

🎯 PRACTICE EXERCISE
[Interactive component]
```


---

### 5. Quiz Enhancements

**Study Mode vs Test Mode:**

| Feature | Study Mode | Test Mode |
|---------|-----------|-----------|
| See answers | After completion | After completion |
| Retake | Unlimited | 3 attempts max |
| Hints | Available | No |
| Counts toward grade | No | Yes |

**Adaptive Hints (3-Tier System):**
- Tier 1 (after 1st wrong): Gentle nudge
- Tier 2 (after 2nd wrong): Conceptual hint
- Tier 3 (after 3rd wrong): Educational redirect + offer to review module

---

### 6. Exercise Improvements

**3-Attempt System:**
- Attempt 1: AI feedback → "Try again" or "Correct!"
- Attempt 2: AI feedback with hint → "Try again" or "Correct!"
- Attempt 3: AI feedback → If still wrong, show example solution

**Example Solution Display:**
```
┌─────────────────────────────────────┐
│ 💡 EXAMPLE SOLUTION                 │
│ You've given this a great effort!   │
│ Here's one way to approach this:    │
│                                     │
│ [Example solution]                  │
│                                     │
│ Key principles:                     │
│ • [Principle 1]                     │
│ • [Principle 2]                     │
│                                     │
│ [Mark Complete] [Ask Tutor]         │
└─────────────────────────────────────┘
```

---

### 7. Mobile Optimization

**Responsive Breakpoints:**
- **Desktop (>1024px):** Sidebar visible, full dashboard
- **Tablet (768-1024px):** Collapsible sidebar, tutor as floating button
- **Phone (<768px):** Hamburger menu, vertical journey map, micro-lessons

**Micro-Learning on Phone:**
- Quick summary cards
- "Read Full Lesson" / "Take Quiz" / "Ask Tutor" buttons
- One-column layout
- Optimized for 2-minute sessions

---

### 8. Push Notifications (Simple)

**Browser notifications (no app needed):**
- Daily reminder if inactive >24 hours
- Weekly goal progress
- Module completion celebration
- Encouragement if struggling
- Certificate reminder (3 days before deadline)

**Example:** "👋 Dr. Smith, you're 67% through Module 2! Just 15 minutes today to finish it."


---

## Technical Enhancements

### 1. Provider-Specific AI Prompts

**Problem:** Groq (Llama 3.1 8B) is a smaller model than Gemini and needs more detailed prompts.

**Solution:** Create provider-specific prompt templates.

#### Groq Prompt Enhancements

**Additional Components for Groq:**
1. **Few-shot examples:** 2-3 example Q&A pairs
2. **Explicit medical terminology:** Define clinical terms
3. **Stricter output format:** More detailed structure constraints
4. **Detailed persona:** Longer role description
5. **Chain-of-thought:** Encourage step-by-step reasoning

**Example Groq System Prompt Structure:**
```
You are greybrain.ai, a specialized AI Tutor for healthcare 
professionals learning about AI in clinical practice.

[MEDICAL CONTEXT AWARENESS]
When discussing AI concepts, always relate them to healthcare:
- APIs → Lab requisition systems, EHR integrations
- Prompts → Clinical documentation templates
- Data → Patient records, medical imaging, lab results
- Privacy → HIPAA, PHI, de-identification

[CURRENT MODULE CONTEXT]
Module: "${module.title}"
Reference Material: ${moduleReference}

[BEHAVIORAL RULES]
1. STAY ON TOPIC: Only answer questions about curriculum
2. HANDLE CONFUSION: Provide 2-3 specific suggestions
3. SAFETY & ABUSE: Zero tolerance, redirect immediately
4. RESPONSE FORMAT: Start with empathy, use clinical analogies

[FEW-SHOT EXAMPLES]
Example 1:
User: "What is de-identification?"
You: "Great question! De-identification is like redacting 
a legal document before sharing it.

In healthcare, it means removing the 18 HIPAA identifiers 
(names, dates, MRNs, etc.) from patient data...

[Continue with detailed example]
```

**Implementation:**
- Create `getSystemPrompt(provider, module)` function
- Return provider-specific template
- Groq gets enhanced version, Gemini gets concise version


---

### 2. Technical Glossary Component

**Always-accessible sidebar widget:**

```typescript
interface TechTerm {
  term: string;
  definition: string;
  analogy: string;
  whyItMatters: string;
  relatedTerms: string[];
}

const TECH_GLOSSARY: TechTerm[] = [
  {
    term: "Token",
    definition: "Small chunks of text AI reads (≈0.75 words)",
    analogy: "Like medical abbreviations (HTN vs Hypertension)",
    whyItMatters: "AI charges by token, not word",
    relatedTerms: ["Context Window", "Model"]
  },
  {
    term: "Context Window",
    definition: "AI's 'working memory' - max text it can process at once",
    analogy: "Like remembering patients during rounds",
    whyItMatters: "Long documents may exceed limit",
    relatedTerms: ["Token", "Parameters"]
  },
  // ... 15+ terms
];
```

**Features:**
- Search functionality
- Click term to see full definition
- "Related Terms" links
- "Used in: Module X, Y" references

---

### 3. Module Ordering Fix

**BUG:** Module 9B appears between Module 1 and Module 2

**Root Cause:** `constants.tsx` CURRICULUM_MEDICAL array not in sequential order

**Fix:** Reorder modules in proper sequence (1, 2, 3, 4, 5, 6, 7)

---

### 4. Performance Tracking

**New Data Structure:**
```typescript
interface PerformanceMetrics {
  userId: string;
  quizScores: Record<string, number>; // moduleId -> score
  exerciseAttempts: Record<string, number>; // lessonId -> attempts
  tutorInteractions: number;
  timeSpentPerLesson: Record<string, number>; // lessonId -> minutes
  strugglingConcepts: string[]; // topics with low scores
  completionDate?: string;
  certificateEarned?: boolean;
}
```

**Storage:** Firestore collection `user_performance`

**Usage:**
- Adaptive hints based on quiz performance
- Proactive tutor outreach if struggling
- Admin analytics dashboard


---

## Admin Dashboard

### Architecture

**Route:** `/admin?key=[ADMIN_SECRET]`  
**Authentication:** Admin secret key + Firebase admin role  
**Components:** 3 main panels

---

### 1. User Management Panel

#### A. Whitelist Management

**Features:**
- Add individual users (email, name, role, institution)
- Bulk upload via CSV
- Remove users from whitelist
- User status: Active ✅ / Pending ⏳ / Inactive ❌

**Firestore Structure:**
```typescript
// Collection: whitelisted_users
{
  email: string;
  name: string;
  role: 'Physician' | 'Resident' | 'Nurse' | 'Admin';
  institution: string;
  addedDate: Timestamp;
  status: 'active' | 'pending' | 'inactive';
  addedBy: string; // admin email
}
```

**Firebase CLI Support:**
```bash
# Add user via CLI
firebase firestore:add whitelisted_users \
  --data '{"email":"dr.smith@hospital.com","name":"Dr. Smith","role":"Physician","status":"active"}'

# Bulk import
firebase firestore:import whitelisted_users --input users.csv
```

---

#### B. User Analytics

**Overview Metrics:**
- Total users
- Active users (logged in last 7 days)
- Completed course (%)
- In progress (%)
- Not started (%)
- Average completion time
- Average quiz score

**Module Completion Rates:**
- Visual bar chart showing % completion per module
- Identifies drop-off points

**Engagement Metrics:**
- Avg. AI Tutor questions per user
- Most asked topics
- Avg. time per lesson
- Quiz retry rate

**Individual User Details:**
- Search by email
- Full activity log
- Progress breakdown
- Quiz scores per module
- AI tutor interaction count
- Completion ETA
- Send reminder email button


---

### 2. System Health Panel

#### A. API Status Monitor

**Real-time health checks:**
- Gemini API: Status, latency, last error
- Groq API: Status, latency, last error
- Firebase Auth: Status, latency, last error
- Firestore: Status, latency, last error

**Status Indicators:**
- 🟢 Healthy (response time <2s, no errors in 24h)
- 🟡 Slow (response time >2s)
- 🔴 Error (failed requests)

**Actions:**
- [Test All APIs Now] button
- [View Detailed Logs] link

---

#### B. Error Logs

**Display last 100 errors:**
- Timestamp
- Severity (🔴 Error, ⚠️ Warning, ℹ️ Info)
- Component (Firestore, Gemini API, Quiz Component, etc.)
- Error message
- User affected (if applicable)

**Filters:**
- By severity
- By component
- By date range

**Export:** CSV download for analysis

---

#### C. Performance Metrics

**Uptime:**
- Last 7 days uptime percentage
- Downtime incidents with timestamps

**Average Response Times:**
- Page load time
- AI Tutor response time
- Quiz submission time
- Exercise evaluation time

**API Usage (Last 24h):**
- Gemini API calls
- Groq API calls
- Firebase reads
- Firebase writes
- Cost estimate per day

**Alerts & Notifications:**
- Configure thresholds (e.g., alert if uptime <99%)
- Email notifications to admin
- Slack webhook integration (optional)

---

### 3. Curriculum Management Panel

#### A. View Current Curriculum

**Display:**
- All 7 modules with lessons
- Estimated time per lesson
- Content type (content, quiz, exercise)
- Last updated timestamp

**Actions:**
- [Edit Module] button per module
- [Preview] button to see student view

---

#### B. Edit Module Content

**JSON Editor Interface:**
```typescript
// Visual editor with syntax highlighting
{
  "id": "module-2",
  "title": "How AI Thinks",
  "description": "...",
  "lessons": [
    {
      "id": "2-1",
      "title": "The AI Brain",
      "type": "content",
      "estimatedTimeMinutes": 4,
      "referenceText": "...",
      "content": "...",
      "learningObjectives": ["..."]
    }
  ]
}
```

**Features:**
- Syntax validation
- Preview changes before publishing
- Revert to previous version
- Duplicate module/lesson for templating

---

#### C. Publish Changes

**Hot Reload:**
- Changes take effect immediately for new sessions
- Existing sessions see changes on next lesson
- Version history maintained

**Validation:**
- Check for required fields
- Validate lesson IDs are unique
- Ensure estimated times are reasonable
- Preview rendering before publish

**Rollback:**
- Keep last 10 versions
- One-click rollback to previous version


---

## Implementation Plan

### Phase 1: Foundation (Week 1-2)

**Priority: Critical Fixes & Infrastructure**

#### 1.1 Bug Fixes
- [ ] Fix Module 9B ordering in `constants.tsx`
- [ ] Test and validate all existing modules render correctly
- [ ] Fix any TypeScript errors

#### 1.2 Data Structure Updates
- [ ] Create `PerformanceMetrics` interface in `types.ts`
- [ ] Create `TechTerm` interface for glossary
- [ ] Update `User` interface with new fields
- [ ] Create Firestore collections:
  - `whitelisted_users`
  - `user_performance`
  - `system_logs`
  - `curriculum_versions`

#### 1.3 Firebase Setup
- [ ] Configure Firestore security rules for admin access
- [ ] Set up Firebase Cloud Functions for:
  - User whitelist validation
  - Performance metrics aggregation
  - System health monitoring
- [ ] Configure Firebase Admin SDK

**Deliverables:**
- Clean codebase with no errors
- Database schema ready
- Firebase infrastructure configured

---

### Phase 2: UX Overhaul (Week 3-4)

**Priority: User Experience Improvements**

#### 2.1 Dashboard Home Screen
- [ ] Create `DashboardView.tsx` component
- [ ] Implement visual journey map
- [ ] Add progress overview cards
- [ ] Add quick access buttons (Syllabus, Glossary, Capstone)
- [ ] Add recent activity feed

#### 2.2 Sidebar Redesign
- [ ] Update `CurriculumView.tsx`:
  - Collapsible modules
  - Visual indicators (✅ 📍 🔒)
  - Progress per module
- [ ] Move AI Tutor to sidebar (always visible)
- [ ] Update `ChatbotModal` → `ChatbotSidebar`

#### 2.3 Header Navigation
- [ ] Create header component with:
  - Dashboard link
  - Syllabus modal trigger
  - Glossary modal trigger
  - Capstone modal trigger
  - Settings
  - User menu

#### 2.4 Lesson Content Redesign
- [ ] Update `LessonView.tsx`:
  - Add TL;DR component
  - Increase white space (CSS updates)
  - Improve typography
  - Add visual breaks

#### 2.5 Quiz Enhancements
- [ ] Update `QuizView.tsx`:
  - Add Study Mode / Test Mode toggle
  - Implement 3-tier adaptive hints
  - Show answers after completion
  - Add retry logic

#### 2.6 Exercise Improvements
- [ ] Update `ExerciseView.tsx`:
  - Implement 3-attempt system
  - Show example solution after 3 attempts
  - Add "Ask Tutor" button

**Deliverables:**
- Polished, professional UI
- Improved user flow
- Better engagement


---

### Phase 3: Curriculum Expansion (Week 5-7)

**Priority: Content Development**

#### 3.1 Module 1: AI in Your Practice Today
- [ ] Write Lesson 1.1: What AI Already Does for You
- [ ] Write Lesson 1.2: Your First AI Conversation (with sandbox)
- [ ] Write Lesson 1.3: The 3 Rules of Safe AI Use
- [ ] Write Lesson 1.4: Quick Wins - 5 Ways to Use AI Tomorrow
- [ ] Create quiz questions
- [ ] Test with sample users

#### 3.2 Module 2: How AI Thinks (Enhanced)
- [ ] Write Lesson 2.2: Understanding AI Models (NEW)
  - Open vs Closed models
  - Parameters analogy
  - GPU explanation
- [ ] Write Lesson 2.3: Tokens & Context (NEW)
  - Token explanation with examples
  - Context window limits
  - Practical workarounds
- [ ] Update existing lessons (2.1, 2.4, 2.5, 2.6)
- [ ] Create interactive exercises
- [ ] Create quiz questions

#### 3.3 Module 3: Protecting Patient Privacy
- [ ] Expand existing content
- [ ] Add hands-on de-identification exercise
- [ ] Create decision tree for tool selection
- [ ] Create quiz questions

#### 3.4 Module 4: Advanced Prompt Engineering
- [ ] Write Lesson 4.1: Documentation Workflows
- [ ] Write Lesson 4.2: Clinical Decision Support Prompts
- [ ] Write Lesson 4.3: Literature Search & Synthesis
- [ ] Write Lesson 4.4: Patient Communication
- [ ] Create hands-on exercises for each
- [ ] Create quiz questions

#### 3.5 Module 5: AI Safety & Bias
- [ ] Expand existing content
- [ ] Add real case studies
- [ ] Create bias identification exercises
- [ ] Create quiz questions

#### 3.6 Module 6: Building Workflows
- [ ] Write Lesson 6.1: Workflow Analysis
- [ ] Write Lesson 6.2: Designing HIPAA-Compliant Workflow
- [ ] Write Lesson 6.3: Choosing the Right AI Tools
- [ ] Write Lesson 6.4: Change Management
- [ ] Create hands-on workflow design exercise
- [ ] Create quiz questions

#### 3.7 Module 7: Capstone Project
- [ ] Design 30-question knowledge assessment
- [ ] Create 4 practical exercises
- [ ] Write case study scenarios
- [ ] Create reflective essay prompts
- [ ] Set up submission and evaluation system

#### 3.8 Technical Glossary
- [ ] Write definitions for 15+ technical terms
- [ ] Create medical analogies for each
- [ ] Build glossary component
- [ ] Integrate into lessons

**Deliverables:**
- Complete 7-module curriculum
- All lessons written and tested
- Quizzes and exercises functional
- Technical glossary integrated


---

### Phase 4: AI Enhancements (Week 8)

**Priority: Intelligent Features**

#### 4.1 Provider-Specific Prompts
- [ ] Create `getSystemPrompt(provider, module)` function
- [ ] Write Groq-enhanced prompt template with:
  - Few-shot examples
  - Medical terminology definitions
  - Detailed behavioral rules
- [ ] Write Gemini-optimized prompt (concise)
- [ ] Update `aiService.ts` to use provider-specific prompts
- [ ] Test both providers with same queries
- [ ] Compare response quality

#### 4.2 Performance Tracking
- [ ] Implement `PerformanceMetrics` tracking:
  - Quiz scores
  - Exercise attempts
  - Time spent per lesson
  - Tutor interactions
- [ ] Create Firestore write functions
- [ ] Update quiz/exercise components to log metrics
- [ ] Create analytics aggregation functions

#### 4.3 Adaptive Learning
- [ ] Implement adaptive hints based on quiz performance
- [ ] Proactive tutor outreach if user struggling
- [ ] Suggested review content based on weak areas
- [ ] Personalized "Next Steps" recommendations

**Deliverables:**
- Smarter AI tutor
- Performance tracking system
- Adaptive learning features

---

### Phase 5: Admin Dashboard (Week 9-10)

**Priority: Management Tools**

#### 5.1 Admin Authentication
- [ ] Create admin secret key system
- [ ] Implement admin role in Firebase
- [ ] Create `AdminApp.tsx` component
- [ ] Add route protection

#### 5.2 User Management Panel
- [ ] Create `UserManagementPanel.tsx`:
  - Whitelist management UI
  - Add/remove users
  - Bulk CSV upload
  - User list with search/filter
- [ ] Create `UserAnalyticsPanel.tsx`:
  - Overview metrics
  - Module completion rates
  - Engagement metrics
  - Individual user details
- [ ] Implement Firebase Cloud Functions:
  - `addUserToWhitelist`
  - `removeUserFromWhitelist`
  - `getUserAnalytics`

#### 5.3 System Health Panel
- [ ] Create `SystemHealthPanel.tsx`:
  - API status monitor
  - Error logs display
  - Performance metrics
- [ ] Implement health check functions:
  - `testGeminiAPI()`
  - `testGroqAPI()`
  - `testFirebase()`
- [ ] Create error logging system
- [ ] Set up alert thresholds

#### 5.4 Curriculum Management Panel
- [ ] Create `CurriculumManagementPanel.tsx`:
  - View current curriculum
  - JSON editor with syntax highlighting
  - Preview changes
  - Publish/rollback
- [ ] Implement version control:
  - Save curriculum versions to Firestore
  - Rollback functionality
- [ ] Add validation before publish

**Deliverables:**
- Fully functional admin dashboard
- User management system
- System monitoring tools
- Curriculum editing capability


---

### Phase 6: Polish & Launch (Week 11-12)

**Priority: Testing, Optimization, Deployment**

#### 6.1 Mobile Optimization
- [ ] Test on iOS Safari, Android Chrome
- [ ] Optimize responsive breakpoints
- [ ] Implement micro-learning cards for mobile
- [ ] Test touch interactions
- [ ] Optimize images and assets for mobile

#### 6.2 Push Notifications
- [ ] Implement browser notification API
- [ ] Create notification service:
  - Daily reminders
  - Weekly goals
  - Milestone celebrations
  - Encouragement messages
- [ ] Add user preference settings (enable/disable)
- [ ] Test notification delivery

#### 6.3 Performance Optimization
- [ ] Code splitting for faster initial load
- [ ] Lazy load modules
- [ ] Optimize images (WebP format)
- [ ] Implement caching strategies
- [ ] Minimize bundle size

#### 6.4 Testing
- [ ] Unit tests for critical components
- [ ] Integration tests for user flows
- [ ] E2E tests for complete journey
- [ ] Load testing (simulate 100+ concurrent users)
- [ ] Security audit
- [ ] Accessibility audit (WCAG 2.1 AA)

#### 6.5 Documentation
- [ ] User guide for students
- [ ] Admin guide for dashboard
- [ ] API documentation
- [ ] Deployment guide
- [ ] Troubleshooting guide

#### 6.6 IIHMRB Certification Integration
- [ ] Certificate template design
- [ ] Certificate generation system
- [ ] IIHMRB logo and branding
- [ ] Certificate verification system
- [ ] LinkedIn badge integration

#### 6.7 Deployment
- [ ] Set up production Firebase project
- [ ] Configure environment variables
- [ ] Deploy to Netlify/Vercel
- [ ] Set up custom domain
- [ ] Configure SSL/HTTPS
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Create backup strategy

**Deliverables:**
- Production-ready application
- Comprehensive documentation
- Monitoring and analytics in place
- IIHMRB certification system live


---

## Success Metrics

### User Engagement

**Primary Metrics:**
- **Enrollment Rate:** # of whitelisted users who start course
  - Target: >80%
- **Completion Rate:** # of users who finish all 7 modules
  - Target: >60%
- **Time to Completion:** Average days from start to certificate
  - Target: 5-7 days
- **Active Users:** % of enrolled users active in last 7 days
  - Target: >70%

**Engagement Metrics:**
- **AI Tutor Usage:** % of users who ask ≥1 question
  - Target: >75%
- **Quiz Performance:** Average score across all quizzes
  - Target: >75%
- **Exercise Completion:** % of exercises completed on first attempt
  - Target: >50%
- **Module Drop-off:** Identify where users quit
  - Target: <10% drop-off per module

---

### Learning Outcomes

**Knowledge Assessment:**
- **Pre-test vs Post-test:** Improvement in AI literacy
  - Target: >40% improvement
- **Capstone Score:** Average score on final assessment
  - Target: >80%
- **Certification Rate:** % of completers who pass capstone
  - Target: >90%

**Practical Application:**
- **Self-reported Usage:** % of graduates using AI in practice (3-month survey)
  - Target: >70%
- **Confidence Level:** Self-rated confidence in AI use (1-10 scale)
  - Target: Average >7

---

### System Performance

**Technical Metrics:**
- **Uptime:** System availability
  - Target: >99.5%
- **Page Load Time:** Average time to interactive
  - Target: <2 seconds
- **AI Response Time:** Average tutor response latency
  - Target: <3 seconds
- **Error Rate:** % of requests that fail
  - Target: <0.5%

**Cost Metrics:**
- **Cost per User:** Total infrastructure cost / # of users
  - Target: <$5 per user
- **API Costs:** Gemini + Groq usage costs
  - Monitor and optimize

---

### User Satisfaction

**Qualitative Metrics:**
- **NPS (Net Promoter Score):** Would you recommend this course?
  - Target: >50
- **Course Rating:** 5-star rating system
  - Target: >4.5 stars
- **Testimonials:** Collect success stories
  - Target: 10+ testimonials in first 3 months

**Feedback Collection:**
- Post-module surveys (optional)
- Post-completion survey (required)
- 3-month follow-up survey
- Open feedback form

---

### Business Metrics

**Certification:**
- **Certificates Issued:** Total # of IIHMRB certificates
  - Target: 100+ in first 6 months
- **Institutional Adoption:** # of hospitals/clinics using platform
  - Target: 10+ institutions

**Growth:**
- **Monthly Active Users (MAU):** Unique users per month
  - Target: 20% MoM growth
- **Referral Rate:** % of users who refer colleagues
  - Target: >30%


---

## Technical Stack

### Frontend
- **Framework:** React 19.2.0 with TypeScript 5.7.2
- **Build Tool:** Vite 6.2.0
- **Styling:** Tailwind CSS (utility-first)
- **State Management:** React hooks (useState, useEffect, useContext)
- **Routing:** React Router (to be added)
- **Testing:** Vitest + React Testing Library

### Backend
- **Authentication:** Firebase Auth
- **Database:** Firestore (NoSQL)
- **Cloud Functions:** Firebase Cloud Functions (Node.js)
- **Storage:** Firebase Storage (for certificates, assets)
- **Hosting:** Netlify or Vercel

### AI Services
- **Primary:** Google Gemini 2.0 Flash
- **Secondary:** Groq (Llama 3.1 8B)
- **Fallback:** Configurable provider switching

### DevOps
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry (error tracking), LogRocket (session replay)
- **Analytics:** Firebase Analytics + Custom dashboard

### Security
- **HTTPS:** Enforced via hosting platform
- **API Keys:** Environment variables, never committed
- **HIPAA Compliance:** De-identification enforced, BAA with providers
- **Rate Limiting:** Firebase security rules
- **Input Validation:** Client-side + server-side

---

## Risk Mitigation

### Technical Risks

**Risk 1: AI API Downtime**
- **Mitigation:** Dual provider support (Gemini + Groq)
- **Fallback:** Graceful degradation, cached responses
- **Monitoring:** Real-time health checks

**Risk 2: Cost Overruns (API Usage)**
- **Mitigation:** Rate limiting per user, caching common queries
- **Monitoring:** Daily cost alerts
- **Optimization:** Use smaller models for simple tasks

**Risk 3: Data Loss**
- **Mitigation:** Firestore automatic backups, version control
- **Recovery:** Point-in-time restore capability
- **Testing:** Regular backup/restore drills

**Risk 4: Security Breach**
- **Mitigation:** Firebase security rules, input sanitization
- **Monitoring:** Audit logs, anomaly detection
- **Response:** Incident response plan, user notification system

---

### Content Risks

**Risk 5: Outdated Medical Information**
- **Mitigation:** Regular content reviews (quarterly)
- **Monitoring:** Track AI model updates, medical guidelines
- **Update Process:** Version-controlled curriculum, hot reload

**Risk 6: AI Hallucinations in Tutor**
- **Mitigation:** Strict system prompts, reference text grounding
- **Monitoring:** Log all tutor responses, flag suspicious content
- **Escalation:** Human review of flagged responses

---

### User Risks

**Risk 7: Low Completion Rates**
- **Mitigation:** Engaging content, adaptive learning, push notifications
- **Monitoring:** Track drop-off points, user feedback
- **Intervention:** Proactive tutor outreach, personalized encouragement

**Risk 8: HIPAA Violations by Users**
- **Mitigation:** Clear warnings, de-identification training, safe sandbox
- **Monitoring:** Cannot monitor user behavior outside platform
- **Education:** Emphasize compliance throughout course


---

## Appendix A: Key Medical Analogies

### Technical Concepts → Clinical Analogies

| Technical Term | Medical Analogy | Why It Works |
|---------------|-----------------|--------------|
| **AI Model** | Medical textbook (Harrison's vs Pocket Medicine) | Doctors understand reference hierarchy |
| **Parameters** | Years of training (Student vs Resident vs Attending) | Directly maps to expertise levels |
| **Token** | Medical abbreviations (HTN vs Hypertension) | Familiar with text compression |
| **Context Window** | Working memory during rounds | Understand memory limitations |
| **GPU** | Hospital's central lab equipment | Shared, powerful, specialized resource |
| **Open Source** | Generic drugs | Familiar with generic vs brand-name |
| **Closed Source** | Brand-name drugs | Understand proprietary vs accessible |
| **API** | Lab requisition system | Order → Process → Results |
| **Prompt** | H&P template | Structured input for structured output |
| **Hallucination** | Confabulation in neurology | Confident but false information |
| **Training Data** | Medical school curriculum | What you learn shapes what you know |
| **Bias** | Selection bias in clinical trials | Understand systematic errors |
| **Fine-tuning** | Fellowship training | Specialization after general training |
| **De-identification** | Redacting legal documents | Familiar with privacy protection |
| **BAA** | HIPAA compliance agreement | Understand legal requirements |

---

## Appendix B: Sample Lesson (Full)

### Module 2, Lesson 2.2: Understanding AI Models

**[See detailed lesson content in main document, Section: Enhanced Curriculum]**

Key Features:
- TL;DR summary at top
- Medical analogies throughout
- Interactive exercises
- Visual callout boxes
- Generous white space
- Scannable structure
- Practical takeaways

---

## Appendix C: Firebase Schema

### Collections

#### `users`
```typescript
{
  uid: string;
  email: string;
  name: string;
  role: 'Physician' | 'Resident' | 'Nurse' | 'Admin';
  institution: string;
  createdAt: Timestamp;
  lastActive: Timestamp;
  isWhitelisted: boolean;
}
```

#### `whitelisted_users`
```typescript
{
  email: string;
  name: string;
  role: string;
  institution: string;
  addedDate: Timestamp;
  status: 'active' | 'pending' | 'inactive';
  addedBy: string;
}
```

#### `user_progress`
```typescript
{
  userId: string;
  completedLessons: string[];
  currentModuleIndex: number;
  currentLessonId: string;
  totalPoints: number;
  lastAccessed: Timestamp;
  certificateEarned: boolean;
}
```

#### `user_performance`
```typescript
{
  userId: string;
  quizScores: { [moduleId: string]: number };
  exerciseAttempts: { [lessonId: string]: number };
  tutorInteractions: number;
  timeSpentPerLesson: { [lessonId: string]: number };
  strugglingConcepts: string[];
  completionDate?: Timestamp;
}
```

#### `system_logs`
```typescript
{
  timestamp: Timestamp;
  severity: 'error' | 'warning' | 'info';
  component: string;
  message: string;
  userId?: string;
  metadata?: any;
}
```

#### `curriculum_versions`
```typescript
{
  version: number;
  publishedAt: Timestamp;
  publishedBy: string;
  curriculum: Module[];
  changeLog: string;
}
```

---

## Appendix D: Environment Variables

```bash
# .env file (never commit!)

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

# AI Providers (user-configurable in app)
# These are stored in localStorage, not env vars
# GEMINI_API_KEY=user_provided
# GROQ_API_KEY=user_provided

# Admin
VITE_ADMIN_SECRET_KEY=your_secure_admin_key

# Optional: Monitoring
VITE_SENTRY_DSN=your_sentry_dsn
VITE_LOGROCKET_APP_ID=your_logrocket_id
```

---

## Appendix E: Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] No console errors or warnings
- [ ] Environment variables configured
- [ ] Firebase security rules reviewed
- [ ] API rate limits configured
- [ ] Backup strategy tested
- [ ] Monitoring tools configured

### Deployment
- [ ] Build production bundle
- [ ] Deploy to staging environment
- [ ] Smoke test all critical paths
- [ ] Load test with simulated users
- [ ] Deploy to production
- [ ] Verify DNS and SSL
- [ ] Test from multiple devices/browsers

### Post-Deployment
- [ ] Monitor error rates
- [ ] Check API usage and costs
- [ ] Verify analytics tracking
- [ ] Test user registration flow
- [ ] Announce to beta users
- [ ] Collect initial feedback

---

## Document Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Nov 18, 2024 | AI Team | Initial comprehensive specs |

---

## Contact & Support

**Project Lead:** [Your Name]  
**Technical Lead:** [Tech Lead Name]  
**IIHMRB Liaison:** [Liaison Name]  

**Repository:** https://github.com/your-org/greywaken-medical  
**Documentation:** https://docs.greywaken.com  
**Support:** support@greywaken.com

---

**END OF SPECIFICATIONS**
