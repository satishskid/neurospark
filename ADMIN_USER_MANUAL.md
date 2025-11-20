# GreyWaken Admin Portal - User Manual

## 📋 Table of Contents
1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [User Management](#user-management)
4. [Issue Tracking](#issue-tracking)
5. [Curriculum Management](#curriculum-management)
6. [Promotional Content](#promotional-content)
7. [Common Tasks](#common-tasks)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### Accessing the Admin Portal

1. **Login to GreyWaken**
   - Go to: `https://greywaken.greybrain.in`
   - Click "Begin Learning"
   - Select your curriculum (Medical AI or Basics of AI)
   - Sign in with your admin credentials

2. **Identify Admin Access**
   - After logging in, look for the **"Admin"** button in the header
   - It appears next to: Dashboard | Syllabus | **Admin** | Glossary
   - If you don't see it, you may not have admin privileges

3. **Open Admin Dashboard**
   - Click the **"Admin"** button
   - The admin portal will open with full dashboard access

### Admin Credentials
**Authorized Admin Emails:**
- satish@skids.health
- drsatish@skids.health
- admin@skids.health
- admin@greywaken.ai

---

## 📊 Dashboard Overview

### Main Metrics (Overview Tab)

**Key Statistics:**
- **Total Users** - All registered users in the system
- **Active Users** - Users who have logged in recently
- **Completion Rate** - Percentage of users completing courses
- **New Users Today** - Fresh registrations

**What You Can Do:**
- Monitor platform growth
- Track user engagement
- Identify trends in user activity

---

## 👥 User Management

### Viewing All Users

1. Click **"Users"** tab in admin sidebar
2. You'll see a grid of user cards showing:
   - User name and email
   - Join date
   - Last active date
   - Progress (lessons completed)
   - Current streak

### Searching for Users

1. Use the search bar at the top
2. Type user name or email
3. Click **"Search"** button
4. Results filter in real-time

**Search Tips:**
- Search is case-insensitive
- Partial matches work (e.g., "john" finds "John Doe")
- Clear search to see all users again

### Viewing User Details

1. Click the **eye icon** on any user card
2. A detailed modal opens showing:
   - **User Stats:**
     - Completed lessons count
     - Total time spent (hours)
     - Number of sessions
     - Current streak (days)
   
   - **Learning Progress:**
     - Current module
     - Quizzes completed
     - Exercises completed
     - AI queries used

3. Click **X** to close the modal

### Understanding User Status

**Subscription Status:**
- **Free** - Basic access (gray badge)
- **Active** - Paid subscription (green badge)

**Progress Indicators:**
- Lessons completed count
- Time spent in hours
- Last active date

---

## 🐛 Issue Tracking

### Viewing Reported Issues

1. Click **"Issues"** tab in admin sidebar
2. You'll see all user-reported problems

### Issue Information

Each issue card shows:
- **Title** - Brief description
- **Description** - Detailed explanation
- **Severity Badge:**
  - 🔵 Low (blue)
  - 🟡 Medium (yellow)
  - 🟠 High (orange)
  - 🔴 Critical (red)
- **Status Badge:**
  - 🟡 Open (yellow)
  - 🔵 In Progress (blue)
  - 🟢 Resolved (green)
  - ⚫ Closed (gray)
- **User Info** - Who reported it
- **Date** - When it was reported
- **Issue Type** - Bug, Technical, Content, Feature, Other
- **Page** - Where the issue occurred

### Managing Issues

**Workflow:**
1. **New Issue Arrives** → Status: Open
2. **Start Working** → Click "Start" → Status: In Progress
3. **Problem Fixed** → Click "Resolve" → Status: Resolved
4. **Confirm Closed** → Click "Close" → Status: Closed

**Filtering Issues:**
- Click filter buttons: **All | Open | In Progress | Resolved**
- Stats show counts for each status

### Issue Priority Guidelines

**Critical** 🔴
- Platform down or unusable
- Data loss or security issues
- **Action:** Address immediately

**High** 🟠
- Major features broken
- Blocking user progress
- **Action:** Address within 24 hours

**Medium** 🟡
- Minor bugs or inconveniences
- Workarounds available
- **Action:** Address within 1 week

**Low** 🔵
- Cosmetic issues
- Feature requests
- **Action:** Address when possible

---

## 📚 Curriculum Management

### Viewing Curriculum

1. Click **"Curriculum"** tab
2. See all modules and lessons
3. View content structure

### What You Can See

- Module titles and descriptions
- Lesson count per module
- Estimated time for each module
- Learning objectives

**Note:** Content editing requires technical access. Contact tech team for curriculum updates.

---

## 🎯 Promotional Content

### Managing Promotional Banners

1. Click **"Promotional"** tab
2. View active promotional content
3. See what users see on the platform

**Use Cases:**
- Announce new features
- Promote special events
- Share important updates
- Highlight success stories

**Note:** Creating/editing promotional content requires technical access.

---

## ✅ Common Tasks

### Daily Admin Tasks

**Morning Check (5 minutes):**
1. Open Admin Dashboard
2. Check **Overview** tab:
   - New users today
   - Active users count
3. Check **Issues** tab:
   - Any critical issues?
   - New reports overnight?

**Weekly Review (15 minutes):**
1. **User Management:**
   - Review user growth trend
   - Check completion rates
   - Identify inactive users

2. **Issue Management:**
   - Close resolved issues
   - Follow up on in-progress items
   - Prioritize open issues

### Responding to User Issues

**Step-by-Step:**

1. **Review the Issue**
   - Read title and description carefully
   - Note the severity level
   - Check which page it occurred on
   - Review browser info if technical

2. **Assess Priority**
   - Critical → Immediate action
   - High → Same day
   - Medium → This week
   - Low → When possible

3. **Update Status**
   - Click **"Start"** to show you're working on it
   - This changes status to "In Progress"

4. **Investigate & Fix**
   - Reproduce the issue if possible
   - Contact tech team if needed
   - Test the fix

5. **Mark as Resolved**
   - Click **"Resolve"** when fixed
   - Issue moves to Resolved status

6. **Close After Verification**
   - Wait for user confirmation or test period
   - Click **"Close"** to archive

### Adding New Whitelisted Users

**Current Process:**
1. Collect user email addresses
2. Contact tech team with list
3. Tech team adds to Firebase whitelist
4. Users can then register

**Future:** Self-service whitelist management coming soon.

---

## 🔧 Troubleshooting

### "I don't see the Admin button"

**Possible Causes:**
1. Not logged in with admin email
2. Using wrong email address
3. Browser cache issue

**Solutions:**
1. Verify you're using an admin email (see Getting Started)
2. Log out and log back in
3. Clear browser cache and refresh
4. Try incognito/private browsing mode

### "Users panel shows no data"

**Possible Causes:**
1. No users registered yet
2. Firebase connection issue
3. Loading in progress

**Solutions:**
1. Wait for loading spinner to finish
2. Refresh the page
3. Check browser console for errors (F12)
4. Contact tech team if persists

### "Can't update issue status"

**Possible Causes:**
1. Network connection issue
2. Firebase permissions problem

**Solutions:**
1. Check internet connection
2. Refresh the page and try again
3. Log out and log back in
4. Contact tech team if persists

### "Search not working"

**Solutions:**
1. Make sure you clicked the "Search" button
2. Try clearing the search and searching again
3. Refresh the page
4. Check spelling of search term

---

## 📞 Getting Help

### Contact Information

**Technical Issues:**
- Email: tech@greybrain.ai
- Include: Screenshot, error message, what you were trying to do

**User Management Questions:**
- Email: admin@greybrain.ai

**Urgent Issues:**
- Contact: Dr. Satish Rath
- Email: satish@skids.health

### Reporting Admin Portal Bugs

If you find a bug in the admin portal itself:

1. Note what you were doing
2. Take a screenshot
3. Check browser console (F12) for errors
4. Email tech team with details

---

## 🎓 Best Practices

### User Privacy
- ✅ Only access user data when necessary
- ✅ Don't share user information externally
- ✅ Respect user privacy at all times

### Issue Management
- ✅ Respond to critical issues within 1 hour
- ✅ Update issue status as you work
- ✅ Add notes for context (coming soon)
- ✅ Close issues only after verification

### Regular Monitoring
- ✅ Check dashboard daily
- ✅ Review new issues twice daily
- ✅ Monitor user growth weekly
- ✅ Track completion rates monthly

---

## 📈 Understanding Metrics

### User Metrics

**Total Users**
- All registered accounts
- Includes active and inactive

**Active Users**
- Logged in within last 7 days
- Indicator of platform engagement

**New Users Today**
- Fresh registrations
- Track growth rate

**Completion Rate**
- % of users who finish courses
- Quality indicator

### Issue Metrics

**Open Issues**
- Newly reported, not yet addressed
- Should be reviewed daily

**In Progress**
- Currently being worked on
- Shows active problem-solving

**Resolved**
- Fixed but not yet closed
- Awaiting verification

**Closed**
- Fully resolved and archived
- Historical record

---

## 🔐 Security Notes

### Admin Access
- Keep your admin credentials secure
- Don't share your admin account
- Log out when done
- Use strong passwords

### Data Handling
- User data is confidential
- Follow HIPAA guidelines for medical data
- Don't export user data without authorization
- Report any security concerns immediately

---

## 📝 Quick Reference

### Navigation
- **Overview** - Dashboard and metrics
- **Users** - User management and search
- **Issues** - Problem tracking
- **Curriculum** - Course content view
- **Promotional** - Marketing content
- **← Back to Learning** - Return to your course

### Keyboard Shortcuts
- **Esc** - Close modals
- **Ctrl/Cmd + F** - Browser search (works in tables)

### Status Colors
- 🟢 Green - Good/Resolved
- 🔵 Blue - In Progress
- 🟡 Yellow - Warning/Open
- 🔴 Red - Critical/Error
- ⚫ Gray - Inactive/Closed

---

## 📅 Version History

**Version 1.0** - November 2024
- Initial admin portal release
- User management
- Issue tracking
- Real-time Firebase integration

---

**Need more help?** Contact the tech team or refer to the Technical Manual for advanced features.
