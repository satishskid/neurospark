# Groq API Troubleshooting Guide

## Common Issues with Groq API Integration

### 1. **Invalid API Key Format**
- **Issue**: Groq API keys must start with `gsk_`
- **Solution**: Verify your key format at [Groq Console](https://console.groq.com/keys)

### 2. **Model Availability Issues**
- **Issue**: Some Groq models may not be available in all regions or accounts
- **Our Solution**: The app now tries multiple models in order:
  1. `mixtral-8x7b-32768`
  2. `llama3-8b-8192`
  3. `llama-3.1-8b-instant`
  4. `gemma-7b-it`

### 3. **Browser CORS Issues**
- **Issue**: Groq API calls from browser may face CORS restrictions
- **Our Solution**: Using `dangerouslyAllowBrowser: true` in Groq SDK config

### 4. **Rate Limiting**
- **Issue**: Free tier has usage limits
- **Solution**: Wait and try again, or upgrade your Groq account

### 5. **Network/Connectivity Issues**
- **Issue**: API endpoint unreachable
- **Solution**: Check internet connection and try again

## Debugging Steps

1. **Check Browser Console**: Look for detailed error messages
2. **Verify API Key**: Ensure it starts with `gsk_` and is from Groq Console
3. **Test Different Times**: Rate limits may cause temporary failures
4. **Check Groq Status**: Visit [Groq Status Page](https://status.groq.com/)

## Manual Testing

You can test your Groq API key manually:

```bash
curl -X POST "https://api.groq.com/openai/v1/chat/completions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello"}],
    "model": "mixtral-8x7b-32768",
    "max_tokens": 10
  }'
```

Replace `YOUR_API_KEY` with your actual Groq API key.

## Getting Help

- **Groq Documentation**: https://console.groq.com/docs
- **Groq Discord**: https://discord.gg/groq
- **Check this app's console logs** for specific error details
