# Troubleshooting Guide

## 🔧 Common Issues & Solutions

### 1. AI Tutor Not Responding

**Symptoms:**
- Loading spinner never stops
- "Error generating response" message
- Blank responses

**Solutions:**

✅ **Check API Key**
- Go to Settings → Verify API key is entered
- Test connection
- Try alternative provider

✅ **Check Rate Limits**
- Wait 1-2 minutes
- Check provider dashboard for limits
- Switch to alternative provider

✅ **Check Internet Connection**
- Verify you're online
- Try refreshing page
- Check firewall settings

### 2. Progress Not Saving

**Symptoms:**
- Completed lessons show as incomplete
- Quiz scores not recorded
- Have to restart modules

**Solutions:**

✅ **Check Browser Storage**
- Ensure cookies/localStorage enabled
- Clear browser cache and reload
- Try different browser

✅ **Check Login Status**
- Verify you're logged in
- Re-login if session expired
- Check email verification

✅ **Export Progress**
- Use "Export Progress" in settings
- Save backup locally
- Import if needed

### 3. Quiz Not Submitting

**Symptoms:**
- Submit button doesn't work
- Answers not being recorded
- Stuck on quiz screen

**Solutions:**

✅ **Answer All Questions**
- Ensure all questions answered
- Check for required fields
- Scroll to see all questions

✅ **Refresh Page**
- Save answers if possible
- Refresh browser
- Re-attempt quiz

✅ **Try Different Browser**
- Test in Chrome/Firefox/Safari
- Disable browser extensions
- Use incognito mode

### 4. Exercise Evaluation Failing

**Symptoms:**
- "Evaluation failed" error
- No feedback provided
- Stuck on "Evaluating..."

**Solutions:**

✅ **Check Response Length**
- Ensure answer is substantial (50+ words)
- Provide specific details
- Answer all parts of question

✅ **Check API Connection**
- Verify API key working
- Test with AI tutor first
- Switch providers if needed

✅ **Retry Submission**
- Wait 30 seconds
- Click "Submit" again
- Try alternative provider

### 5. Login Issues

**Symptoms:**
- Can't log in
- "Invalid credentials" error
- Email not recognized

**Solutions:**

✅ **Verify Email**
- Check spam folder for verification email
- Resend verification email
- Use correct email address

✅ **Reset Password**
- Click "Forgot Password"
- Check email for reset link
- Create new password

✅ **Check Whitelist**
- Contact admin if institutional access
- Verify email is whitelisted
- Request access if needed

### 6. Admin Dashboard Not Loading

**Symptoms:**
- Blank admin screen
- "Unauthorized" error
- Can't access admin features

**Solutions:**

✅ **Verify Admin Credentials**
- Use correct admin email/password
- Contact system admin
- Check admin token validity

✅ **Clear Browser Cache**
- Clear cache and cookies
- Hard refresh (Ctrl+Shift+R)
- Try incognito mode

✅ **Check Permissions**
- Verify admin role assigned
- Check Firebase security rules
- Contact system administrator

### 7. Mobile Display Issues

**Symptoms:**
- Content cut off
- Buttons not clickable
- Layout broken

**Solutions:**

✅ **Update Browser**
- Use latest browser version
- Try Chrome or Safari
- Enable JavaScript

✅ **Adjust Zoom**
- Reset zoom to 100%
- Try landscape orientation
- Use responsive mode

✅ **Clear Cache**
- Clear mobile browser cache
- Restart browser app
- Restart device

### 8. Slow Performance

**Symptoms:**
- Pages load slowly
- AI responses delayed
- Laggy navigation

**Solutions:**

✅ **Check Internet Speed**
- Test connection speed
- Use WiFi instead of cellular
- Close other bandwidth-heavy apps

✅ **Clear Browser Data**
- Clear cache and cookies
- Close unused tabs
- Restart browser

✅ **Optimize Settings**
- Disable animations in settings
- Use Groq for faster responses
- Close background apps

## 🚨 Error Messages

### "API Key Invalid"
**Cause:** Incorrect or expired API key  
**Fix:** Go to Settings → Re-enter API key → Test connection

### "Rate Limit Exceeded"
**Cause:** Too many requests to AI provider  
**Fix:** Wait 2-3 minutes → Try again → Consider upgrading plan

### "Network Error"
**Cause:** Internet connection issue  
**Fix:** Check connection → Refresh page → Try again

### "Session Expired"
**Cause:** Logged out due to inactivity  
**Fix:** Log in again → Progress should be saved

### "Evaluation Failed"
**Cause:** AI couldn't evaluate response  
**Fix:** Ensure answer is detailed → Try again → Contact support if persists

## 📱 Browser Compatibility

### Recommended Browsers
✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+

### Not Supported
❌ Internet Explorer  
❌ Opera Mini  
❌ UC Browser

## 🔍 Debug Mode

Enable debug mode for detailed error logs:

1. Open browser console (F12)
2. Type: `localStorage.setItem('debug', 'true')`
3. Refresh page
4. Check console for detailed logs

## 📞 Getting Help

### Self-Service
1. Check this troubleshooting guide
2. Search community forum
3. Review documentation

### Contact Support
- **Email:** support@greywaken.com
- **Response Time:** 24-48 hours
- **Include:** 
  - Screenshot of error
  - Browser/device info
  - Steps to reproduce

### Emergency Issues
- **Critical bugs:** emergency@greywaken.com
- **Security issues:** security@greywaken.com
- **Response Time:** 2-4 hours

## 🔄 Known Issues

### Current Known Issues
1. Safari sometimes requires page refresh after quiz
2. Mobile keyboard may cover input fields
3. Very long AI responses may be truncated

### Workarounds
1. Refresh page after completing quiz
2. Scroll up to see input field
3. Ask AI to summarize if response too long

## 📊 System Status

Check system status: status.greywaken.com

- 🟢 All systems operational
- 🟡 Degraded performance
- 🔴 System outage

## 🆘 Still Need Help?

If you've tried everything:

1. **Export your progress** (Settings → Export)
2. **Take screenshots** of the issue
3. **Note exact steps** to reproduce
4. **Contact support** with details

We're here to help! 💙

---

**Last Updated:** November 2024  
**Version:** 2.0
