# Quick Test Guide - 15 Minutes

## 🚀 Dev Server Running
**URL:** http://localhost:7773/

---

## ✅ Quick Smoke Test (5 minutes)

### 1. Initial Load
- [ ] App loads without errors
- [ ] Dashboard displays
- [ ] No console errors

### 2. Navigation Test
- [ ] Click "Start Learning" or first module
- [ ] Module 1 opens
- [ ] Lesson 1.1 displays content
- [ ] Sidebar shows all modules
- [ ] Progress bar visible

### 3. Content Display Test
- [ ] Lesson content renders (text, formatting)
- [ ] TL;DR box displays
- [ ] Medical analogies visible
- [ ] "Next" button works
- [ ] Navigate to Lesson 1.2

### 4. Quiz Test
- [ ] Navigate to Module 1 Quiz
- [ ] Quiz displays 5 questions
- [ ] Can select answers
- [ ] Submit button works
- [ ] Results display
- [ ] Can retry

### 5. AI Tutor Test
- [ ] Click AI Tutor icon (chat bubble)
- [ ] Tutor opens
- [ ] Type "What is AI?"
- [ ] Response generates
- [ ] Response is relevant

---

## 🔍 Detailed Test (10 minutes)

### Module 2 Test
- [ ] Navigate to Module 2
- [ ] Lesson 2.1 displays
- [ ] Callout boxes render correctly
- [ ] Medical analogies show
- [ ] Quiz works

### Module 3 Test
- [ ] Navigate to Module 3
- [ ] HIPAA content displays
- [ ] De-identification exercise opens
- [ ] Can type in text area
- [ ] Submit works
- [ ] AI evaluation provides feedback

### Module 7 Capstone Test
- [ ] Navigate to Module 7
- [ ] Instructions display
- [ ] Knowledge assessment (15 questions) loads
- [ ] Can answer questions
- [ ] Submit works
- [ ] Exercises display

### Progress Tracking Test
- [ ] Complete a lesson
- [ ] Check mark appears
- [ ] Dashboard updates progress
- [ ] Refresh page
- [ ] Progress persists

### Mobile Test (if possible)
- [ ] Open on mobile device or resize browser
- [ ] Sidebar collapses to hamburger menu
- [ ] Content is readable
- [ ] Buttons are tappable
- [ ] Navigation works

---

## 🐛 Common Issues to Check

### If App Doesn't Load
1. Check console for errors
2. Verify dev server is running
3. Try hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

### If AI Tutor Doesn't Work
1. Check if API key is set
2. Go to Settings (gear icon)
3. Enter Gemini or Groq API key
4. See API_KEY_SETUP.md for details

### If Content Doesn't Display
1. Check browser console
2. Look for TypeScript errors
3. Verify module imports in constants.tsx

### If Progress Doesn't Save
1. Check localStorage in browser DevTools
2. Look for 'greybrain-ai-journey-progress' key
3. Verify no localStorage errors in console

---

## ✅ Success Criteria

**App is working if:**
- ✅ Loads without errors
- ✅ All 7 modules visible
- ✅ Lessons display content
- ✅ Quizzes function
- ✅ Exercises accept input
- ✅ AI Tutor responds (with API key)
- ✅ Progress saves

**Ready for deployment if:**
- ✅ All above criteria met
- ✅ No console errors
- ✅ Mobile responsive
- ✅ Performance is good (< 2s load)

---

## 📊 Test Results Template

```
Date: ___________
Tester: ___________

✅ Initial Load: PASS / FAIL
✅ Navigation: PASS / FAIL
✅ Content Display: PASS / FAIL
✅ Quiz: PASS / FAIL
✅ AI Tutor: PASS / FAIL
✅ Progress Tracking: PASS / FAIL
✅ Mobile: PASS / FAIL

Issues Found:
1. ___________
2. ___________
3. ___________

Overall Status: READY / NEEDS FIXES
```

---

## 🚀 Next Steps After Testing

### If All Tests Pass
1. Run production build: `npm run build`
2. Test production build: `npm run preview`
3. Deploy to staging
4. Final verification
5. Deploy to production

### If Issues Found
1. Document issues
2. Prioritize (critical/major/minor)
3. Fix critical issues
4. Re-test
5. Proceed when stable

---

**Current Status:** Dev server running, ready for testing  
**Estimated Test Time:** 15 minutes  
**Confidence:** High - All features implemented
