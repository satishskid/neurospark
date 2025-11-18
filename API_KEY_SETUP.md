# API Key Setup Guide

## 🔑 Getting Your AI API Keys

GreyWaken Medical supports two AI providers. You need at least one API key to use the platform.

### Option 1: Google Gemini (Recommended)

**Why Gemini?**
- Free tier: 15 requests/minute
- Fast and accurate
- Good for most users

**How to Get:**

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Get API Key"
4. Click "Create API key in new project"
5. Copy the key (starts with `AIza...`)

**Cost:**
- Free tier: 15 RPM, 1500 RPD
- Paid: $0.00025 per 1K characters

### Option 2: Groq (Alternative)

**Why Groq?**
- Very fast responses
- Free tier available
- Good for high-volume use

**How to Get:**

1. Go to [Groq Console](https://console.groq.com)
2. Sign up for free account
3. Navigate to API Keys
4. Click "Create API Key"
5. Copy the key (starts with `gsk_...`)

**Cost:**
- Free tier: 30 RPM, 14,400 RPD
- Paid: Contact Groq for pricing

## ⚙️ Configuring in GreyWaken

### For Users

1. Click the **Settings** icon (⚙️) in the header
2. Select your preferred provider (Gemini or Groq)
3. Paste your API key
4. Click "Test Connection"
5. If successful, click "Save"

Your API key is stored locally in your browser and never sent to our servers.

### For Developers

Add to `.env` file:

```bash
# Gemini
VITE_GEMINI_API_KEY=AIza...your_key_here

# Groq
VITE_GROQ_API_KEY=gsk_...your_key_here
```

Or set via environment variables in your deployment platform.

## 🔒 Security Best Practices

### DO:
✅ Store keys in environment variables  
✅ Use different keys for dev/prod  
✅ Rotate keys regularly  
✅ Monitor usage in provider dashboard  
✅ Set up usage alerts

### DON'T:
❌ Commit keys to Git  
❌ Share keys publicly  
❌ Use production keys in development  
❌ Hardcode keys in source code  
❌ Share keys between projects

## 🚨 Troubleshooting

### "Invalid API Key" Error

**Gemini:**
- Verify key starts with `AIza`
- Check key is enabled in Google Cloud Console
- Ensure Gemini API is enabled for your project

**Groq:**
- Verify key starts with `gsk_`
- Check key hasn't been revoked
- Ensure you're within rate limits

### "Rate Limit Exceeded" Error

**Solution:**
- Wait a few minutes and try again
- Upgrade to paid tier
- Switch to alternative provider

### "Network Error"

**Solution:**
- Check internet connection
- Verify firewall isn't blocking API calls
- Try alternative provider

## 📊 Monitoring Usage

### Gemini
- Dashboard: [Google Cloud Console](https://console.cloud.google.com)
- View: API & Services → Credentials → Usage

### Groq
- Dashboard: [Groq Console](https://console.groq.com)
- View: Usage tab

## 💰 Cost Estimation

### Typical Course Usage

**Per User (Complete Course):**
- ~500 AI interactions
- ~50,000 tokens
- **Gemini Cost:** ~$0.01
- **Groq Cost:** Free (within limits)

**For 100 Users:**
- **Gemini:** ~$1.00
- **Groq:** Free (within limits)

### Cost Optimization Tips

1. Use Groq for high-volume (free tier is generous)
2. Use Gemini for better quality responses
3. Cache common responses
4. Implement rate limiting
5. Monitor usage regularly

## 🆘 Support

Need help?
- Email: support@greywaken.com
- Documentation: docs.greywaken.com
- Community: forum.greywaken.com

## 🔄 Updating Keys

To change your API key:

1. Go to Settings
2. Select provider
3. Enter new key
4. Test connection
5. Save

Old key will be replaced immediately.

## 📝 Notes

- API keys are stored in browser localStorage
- Keys are never sent to GreyWaken servers
- Each user manages their own keys
- Admin can't see user API keys
- Keys persist across sessions

---

**Last Updated:** November 2024  
**Version:** 2.0
