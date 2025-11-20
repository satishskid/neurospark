import React, { useState } from 'react';
import { BookOpenIcon, UserGroupIcon, WrenchScrewdriverIcon, UserPlusIcon, DocumentTextIcon } from './Icons';

const HelpPanel: React.FC = () => {
  const [activeManual, setActiveManual] = useState<string | null>(null);

  const manuals = [
    {
      id: 'admin',
      title: 'Admin User Manual',
      icon: WrenchScrewdriverIcon,
      description: 'Complete guide for admin dashboard features',
      color: 'cyan',
      sections: [
        {
          title: 'Overview',
          content: `The Admin Dashboard provides comprehensive tools for managing the GreyWaken learning platform. You can monitor user activity, manage content, handle issues, and control access.`
        },
        {
          title: 'Dashboard Overview',
          content: `
• Total Users: View all registered users
• Active Users: Currently logged-in users
• Completion Rate: Percentage of users completing courses
• System Alerts: Important notifications and warnings

The dashboard updates in real-time to show current system status.`
        },
        {
          title: 'User Management',
          content: `
**View Users:**
• See all registered users in a table
• Search by name or email
• View user details (registration date, progress, etc.)

**User Actions:**
• View detailed user profile
• Check course progress
• Monitor activity logs
• Manage user permissions`
        },
        {
          title: 'Whitelist Management',
          content: `
**Add Single User:**
1. Click "Add User" button
2. Enter email (required)
3. Add name, role, institution (optional)
4. Click "Add to Whitelist"

**Bulk Add Users:**
1. Click "Bulk Add" button
2. Paste emails (one per line or comma-separated)
3. Click "Add All to Whitelist"
4. System adds all valid emails

**Remove Users:**
1. Find user in table
2. Click trash icon
3. Confirm removal
4. User status changes to "inactive"

**Search & Filter:**
• Type in search box to filter by email, name, or institution
• Results update in real-time`
        },
        {
          title: 'Issues Management',
          content: `
**View Issues:**
• All reported issues appear in the Issues tab
• Filter by status: Open, In Progress, Resolved, Closed
• Filter by severity: Low, Medium, High, Critical
• Filter by type: Bug, Feature, Content, Technical, Other

**Handle Issues:**
1. Click on an issue to view details
2. Update status as you work on it
3. Add admin notes
4. Mark as resolved when complete

**Issue Details:**
• Reporter information
• Issue description
• Current page/location
• Browser information
• Timestamps`
        },
        {
          title: 'Curriculum Management',
          content: `
**View Curriculum:**
• See all courses and modules
• Check content status
• Monitor completion rates

**Manage Content:**
• Update course materials
• Add new modules
• Modify quizzes and exercises
• Update visual elements`
        },
        {
          title: 'Promotional Content',
          content: `
**Manage Banners:**
• Create promotional banners
• Set display duration
• Target specific user groups
• Schedule campaigns

**Content Types:**
• Announcements
• Feature highlights
• Event promotions
• System updates`
        }
      ]
    },
    {
      id: 'bd-team',
      title: 'BD Team Manual',
      icon: UserGroupIcon,
      description: 'Guide for Business Development team to onboard users',
      color: 'blue',
      sections: [
        {
          title: 'Welcome BD Team!',
          content: `This manual will help you onboard new users independently without needing technical support. You have full control over the whitelist system.`
        },
        {
          title: 'Quick Start',
          content: `
**To Add a Single User:**
1. Log in to Admin Dashboard
2. Click "Whitelist" tab
3. Click "Add User" button
4. Fill in user details
5. Click "Add to Whitelist"

**To Add Multiple Users:**
1. Go to "Whitelist" tab
2. Click "Bulk Add" button
3. Paste email list
4. Click "Add All to Whitelist"

That's it! Users can now register.`
        },
        {
          title: 'Adding Single Users',
          content: `
**Step-by-Step:**

1. **Navigate to Whitelist**
   • Click "Admin" in top navigation
   • Select "Whitelist" tab

2. **Click "Add User"**
   • Modal form will open

3. **Fill in Details:**
   • Email: user@example.com (required)
   • Name: John Doe (optional)
   • Role: Student/Instructor (optional)
   • Institution: University Name (optional)

4. **Submit**
   • Click "Add to Whitelist"
   • Success message appears
   • User appears in table

**Tips:**
• Email is the only required field
• Adding name/institution helps with tracking
• User can register immediately after adding`
        },
        {
          title: 'Bulk Adding Users',
          content: `
**Perfect for Partner Onboarding:**

1. **Prepare Your List**
   • Get email list from partner
   • Can be from Excel, CSV, or any format

2. **Open Bulk Add**
   • Click "Bulk Add" button in Whitelist tab

3. **Paste Emails**
   • One email per line:
     user1@example.com
     user2@example.com
     user3@example.com
   
   • Or comma-separated:
     user1@example.com, user2@example.com

4. **Submit**
   • Click "Add All to Whitelist"
   • System processes all emails
   • Success message shows count

**Tips:**
• Copy directly from Excel (one column)
• System validates email format
• Invalid emails are skipped
• No limit on number of users`
        },
        {
          title: 'Managing Users',
          content: `
**Search for Users:**
• Type in search box
• Searches email, name, institution
• Results filter in real-time

**View Stats:**
• Active Users: Currently whitelisted
• Removed Users: Previously removed
• Total: All entries

**Remove Users:**
• Click trash icon next to user
• Confirm removal
• User status becomes "inactive"
• User can no longer register

**Why Remove?**
• Partnership ended
• User no longer needs access
• Mistake in adding
• Security reasons`
        },
        {
          title: 'Common Scenarios',
          content: `
**Scenario 1: New Partner University**
1. Get email list from university
2. Use Bulk Add to add all students
3. Notify university that registration is open
4. Monitor registrations in Users tab

**Scenario 2: Individual Request**
1. Receive email request
2. Add single user with their details
3. Reply that they can now register
4. Track their registration

**Scenario 3: Partnership Ends**
1. Go to Whitelist tab
2. Search for institution name
3. Remove all users from that institution
4. They can no longer register

**Scenario 4: Mistake in Email**
1. Remove incorrect email
2. Add correct email
3. Notify user of the change`
        },
        {
          title: 'Best Practices',
          content: `
**Do:**
✅ Add institution name for tracking
✅ Use bulk add for large lists
✅ Double-check emails before adding
✅ Keep records of who you added
✅ Remove users when partnerships end

**Don't:**
❌ Add personal emails without permission
❌ Share admin credentials
❌ Remove users without reason
❌ Add duplicate emails (system allows but unnecessary)

**Tips:**
• Add users before announcing to partners
• Test with your own email first
• Keep a backup of email lists
• Document partnership agreements`
        },
        {
          title: 'Troubleshooting',
          content: `
**Problem: User says they can't register**
Solution:
1. Check if email is in whitelist
2. Verify email spelling is exact
3. Check if user was removed
4. Re-add if necessary

**Problem: Bulk add didn't work**
Solution:
1. Check email format
2. Ensure one email per line
3. Remove any extra spaces
4. Try smaller batches

**Problem: Can't find a user**
Solution:
1. Use search box
2. Check spelling
3. Try searching by institution
4. Check if user was removed

**Problem: Need to update user info**
Solution:
1. Remove old entry
2. Add new entry with correct info
3. User can still register`
        }
      ]
    },
    {
      id: 'whitelist',
      title: 'Whitelist System Guide',
      icon: UserPlusIcon,
      description: 'Detailed guide for whitelist management',
      color: 'green',
      sections: [
        {
          title: 'What is the Whitelist?',
          content: `The whitelist is a security feature that controls who can register on the platform. Only users whose emails are on the whitelist can create accounts.

**Benefits:**
• Control access to the platform
• Partner with specific institutions
• Prevent unauthorized registrations
• Track user sources
• Manage partnerships effectively`
        },
        {
          title: 'How It Works',
          content: `
**Registration Flow:**

1. User visits registration page
2. Enters email address
3. System checks whitelist
4. If email is whitelisted → Registration proceeds
5. If email is NOT whitelisted → Registration blocked

**Whitelist Entry:**
• Email (required): user@example.com
• Name (optional): John Doe
• Role (optional): Student/Instructor
• Institution (optional): University Name
• Added Date: Automatic timestamp
• Added By: Your admin email
• Status: active/inactive`
        },
        {
          title: 'Adding Users',
          content: `
**Single User:**
• Best for individual requests
• Allows adding detailed information
• Immediate effect

**Bulk Add:**
• Best for partner onboarding
• Fast for large lists
• Processes multiple emails at once

**Both methods:**
• Update whitelist immediately
• User can register right away
• No delay or approval needed`
        },
        {
          title: 'Removing Users',
          content: `
**Soft Delete:**
• User entry remains in database
• Status changes to "inactive"
• Preserves audit trail
• Can see who removed and when

**Why Soft Delete?**
• Maintain history
• Track partnerships
• Audit compliance
• Can restore if needed

**Effect:**
• User cannot register
• Existing accounts unaffected
• Can be re-added later`
        },
        {
          title: 'Search & Filter',
          content: `
**Search Capabilities:**
• Email: Find exact user
• Name: Search by person
• Institution: Find all from partner

**Real-Time:**
• Results update as you type
• No need to press enter
• Clear search to see all

**Use Cases:**
• Find specific user
• Check if email exists
• View all from institution
• Verify additions`
        },
        {
          title: 'Stats & Monitoring',
          content: `
**Active Users:**
• Currently whitelisted
• Can register now
• Status = "active"

**Removed Users:**
• Previously whitelisted
• Cannot register
• Status = "inactive"

**Total:**
• All entries ever added
• Active + Removed

**Use Stats To:**
• Track growth
• Monitor partnerships
• Report to management
• Plan capacity`
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Manual',
      icon: WrenchScrewdriverIcon,
      description: 'Technical documentation for developers',
      color: 'purple',
      sections: [
        {
          title: 'System Architecture',
          content: `
**Frontend:**
• React + TypeScript
• Tailwind CSS for styling
• Vite for build tooling

**Backend:**
• Firebase Firestore database
• Firebase Authentication
• Cloud Functions (future)

**Admin Dashboard:**
• Separate admin app
• Role-based access control
• Real-time data updates`
        },
        {
          title: 'Database Structure',
          content: `
**Collections:**

1. users
   • User accounts and profiles
   • Course progress
   • Achievements

2. whitelist
   • Whitelisted emails
   • User metadata
   • Status tracking

3. issues
   • Reported problems
   • Admin notes
   • Resolution status

4. curriculum
   • Course content
   • Modules and lessons
   • Quizzes and exercises`
        },
        {
          title: 'Whitelist Schema',
          content: `
**Document Structure:**
{
  email: string (required, lowercase),
  name: string (optional),
  role: string (optional),
  institution: string (optional),
  addedDate: ISO timestamp,
  addedBy: admin email,
  status: "active" | "inactive",
  removedDate: ISO timestamp (if removed),
  removedBy: admin email (if removed)
}

**Indexes:**
• email (for quick lookup)
• status (for filtering)
• institution (for grouping)`
        },
        {
          title: 'API Functions',
          content: `
**dbService.ts:**

• addToWhitelist(data)
  - Adds single user
  - Returns: Promise<void>

• bulkAddToWhitelist(emails, addedBy)
  - Adds multiple users
  - Returns: Promise<void>

• getWhitelistedUsers()
  - Fetches all entries
  - Returns: Promise<Array>

• removeFromWhitelist(id)
  - Soft deletes user
  - Returns: Promise<void>

• isUserWhitelisted(email)
  - Checks if email exists
  - Returns: Promise<boolean>`
        },
        {
          title: 'Security',
          content: `
**Authentication:**
• Admin login required
• JWT tokens for sessions
• Role-based permissions

**Firestore Rules:**
• Read: Admin only
• Write: Admin only
• Validate: Email format

**Best Practices:**
• Never expose admin credentials
• Use environment variables
• Implement rate limiting
• Log all admin actions`
        },
        {
          title: 'Deployment',
          content: `
**Build:**
npm run build

**Deploy:**
• Netlify (current)
• Firebase Hosting (alternative)
• Vercel (alternative)

**Environment Variables:**
• VITE_FIREBASE_API_KEY
• VITE_FIREBASE_AUTH_DOMAIN
• VITE_FIREBASE_PROJECT_ID
• VITE_FIREBASE_STORAGE_BUCKET
• VITE_FIREBASE_MESSAGING_SENDER_ID
• VITE_FIREBASE_APP_ID

**Post-Deployment:**
• Verify admin access
• Test whitelist functionality
• Check database connections
• Monitor error logs`
        }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: 'from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600',
      blue: 'from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600',
      green: 'from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
      purple: 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  if (activeManual) {
    const manual = manuals.find(m => m.id === activeManual);
    if (!manual) return null;

    return (
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => setActiveManual(null)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <span>←</span>
          <span>Back to Manuals</span>
        </button>

        {/* Manual Header */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getColorClasses(manual.color)} flex items-center justify-center`}>
              <manual.icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{manual.title}</h2>
              <p className="text-slate-400">{manual.description}</p>
            </div>
          </div>
        </div>

        {/* Manual Sections */}
        <div className="space-y-4">
          {manual.sections.map((section, index) => (
            <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
              <div className="text-slate-300 whitespace-pre-line leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-2xl font-bold text-white mb-2">Help & Manuals</h2>
        <p className="text-slate-400">
          Comprehensive guides and documentation for using the admin dashboard
        </p>
      </div>

      {/* Manual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {manuals.map((manual) => (
          <button
            key={manual.id}
            onClick={() => setActiveManual(manual.id)}
            className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all text-left group"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getColorClasses(manual.color)} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <manual.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {manual.title}
                </h3>
                <p className="text-slate-400 text-sm mb-3">
                  {manual.description}
                </p>
                <div className="flex items-center gap-2 text-cyan-400 text-sm">
                  <span>Read Manual</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/test-whitelist-ui.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
          >
            <DocumentTextIcon className="w-5 h-5 text-cyan-400" />
            <span className="text-slate-300">Test Whitelist System</span>
          </a>
          <button
            onClick={() => setActiveManual('whitelist')}
            className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors text-left"
          >
            <UserPlusIcon className="w-5 h-5 text-green-400" />
            <span className="text-slate-300">Whitelist Guide</span>
          </button>
          <button
            onClick={() => setActiveManual('bd-team')}
            className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors text-left"
          >
            <UserGroupIcon className="w-5 h-5 text-blue-400" />
            <span className="text-slate-300">BD Team Guide</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpPanel;
