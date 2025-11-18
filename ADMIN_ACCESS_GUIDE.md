# Admin Dashboard Access Guide

## How to Access Admin Dashboard

### Method 1: Direct URL (Recommended)
Navigate to: `https://your-app-url.com/?admin=true`

This will enable admin mode for any logged-in user.

### Method 2: Admin Email Auto-Detection
If you're logged in with an admin email, the system will automatically show admin options.

**Admin Emails:**
- satish@skids.health ✅
- drsatish@skids.health ✅
- admin@skids.health ✅

### Method 3: Admin Button in Dashboard
Once logged in as an admin user, look for the "Admin Dashboard" button in the main navigation.

## Admin Dashboard Features

### 1. Overview Tab
- System health metrics
- User statistics
- API usage analytics
- Recent activity logs

### 2. Users Tab
- User management
- Whitelist management
- User progress tracking
- Access control

### 3. API Health Tab
- API endpoint monitoring
- Response time tracking
- Error rate analysis
- Provider status

### 4. Payments Tab
- Subscription management
- Payment plans
- Revenue analytics
- Billing history

### 5. Curriculum Tab
- Content management
- Module editing
- Lesson organization
- Version control

### 6. Promotional Tab
- Marketing content
- Announcements
- Feature highlights
- User communications

### 7. Settings Tab
- System configuration
- Feature flags
- Maintenance mode
- Security settings

## Troubleshooting

### Can't See Admin Dashboard?
1. **Check your email**: Ensure you're logged in with satish@skids.health
2. **Try URL parameter**: Add `?admin=true` to the URL
3. **Clear cache**: Clear browser cache and reload
4. **Check console**: Open browser console (F12) for any errors

### Admin Features Not Working?
1. **Verify authentication**: Check that you're fully logged in
2. **Check permissions**: Ensure your email is in the admin list
3. **Refresh the page**: Sometimes a simple refresh helps
4. **Check Firebase**: Verify Firebase authentication is working

## Security Notes

- Admin access is restricted to whitelisted emails only
- All admin actions are logged
- Sensitive operations require confirmation
- Session timeout after 24 hours of inactivity

## Quick Access Links

- **Main App**: `/`
- **Admin Dashboard**: `/?admin=true`
- **User Management**: `/?admin=true` (then click Users tab)
- **Curriculum Editor**: `/?admin=true` (then click Curriculum tab)

## Support

If you're still unable to access the admin dashboard:
1. Check that satish@skids.health is properly authenticated in Firebase
2. Verify the email is in the admin whitelist
3. Check browser console for JavaScript errors
4. Contact technical support with error details
