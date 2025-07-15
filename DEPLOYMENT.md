# 🚀 NeuroSpark Deployment Guide

## Quick Start: Deploy to Netlify in 5 Minutes

### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `neurospark` or `neurospark-ai-platform`
3. Keep it public or private (your choice)
4. Don't initialize with README (we already have one)

### Step 2: Push Code to GitHub
```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Netlify
1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Choose "GitHub" and authorize Netlify
4. Select your repository
5. Build settings are auto-detected from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

### Step 4: Configure Environment Variables
In your Netlify site dashboard:

1. Go to **Site Settings** → **Environment Variables**
2. Add these variables:

**Minimum Required:**
```
GEMINI_API_KEY=your_actual_gemini_api_key
```

**For Production (when ready):**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Step 5: Test Your Deployment
1. Your site will be available at: `https://random-name-123456.netlify.app`
2. Test the main app: `https://your-site.netlify.app`
3. Test the admin panel: `https://your-site.netlify.app/?admin=true`
4. Login with: `admin@neurospark.ai` / `admin123`

## Custom Domain Setup (Optional)

### Step 1: Add Custom Domain
1. In Netlify: **Site Settings** → **Domain Management**
2. Click "Add custom domain"
3. Enter your domain (e.g., `neurospark.com`)

### Step 2: Configure DNS
Point your domain to Netlify:
- **A Record**: `75.2.60.5`
- **AAAA Record**: `2600:1f14:e22:d200::1`
- **Or CNAME**: `your-site.netlify.app`

### Step 3: SSL Certificate
- Automatically provisioned by Netlify
- Usually takes 1-24 hours to activate

## Environment-Specific Deployments

### Production Environment
```bash
# Set production environment variables in Netlify
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://neurospark.com
```

### Staging Environment
```bash
# Create a staging branch
git checkout -b staging
git push origin staging

# Deploy staging branch to separate Netlify site
# Use staging environment variables
NODE_ENV=staging
NEXT_PUBLIC_APP_URL=https://staging--neurospark.netlify.app
```

## Monitoring and Analytics

### Build Monitoring
- Check build logs in Netlify dashboard
- Set up build notifications via email/Slack

### Performance Monitoring
- Use Netlify Analytics (paid feature)
- Or integrate Google Analytics with your `GOOGLE_ANALYTICS_ID`

### Error Monitoring
- Consider adding Sentry for error tracking
- Monitor API usage and quotas

## Troubleshooting

### Common Issues

**Build Fails:**
- Check Node.js version (should be 18+)
- Verify all dependencies are in `package.json`
- Check for TypeScript errors

**Environment Variables Not Working:**
- Ensure variables are set in Netlify dashboard
- Restart deployment after adding variables
- Check variable names match exactly

**Admin Panel Not Loading:**
- Verify redirect rules in `netlify.toml`
- Check `public/_redirects` file
- Test URL: `https://your-site.netlify.app/?admin=true`

**API Calls Failing:**
- Check CORS settings
- Verify API keys are correctly set
- Check browser console for errors

### Getting Help
1. Check Netlify build logs
2. Review browser console errors
3. Test locally with `npm run build && npm run preview`
4. Check the integration guide: `INTEGRATION_GUIDE.md`

## Next Steps After Deployment

### 1. Set Up Real Authentication (Clerk)
- Follow `INTEGRATION_GUIDE.md`
- Replace mock authentication
- Configure user management

### 2. Add Payment Processing (Stripe)
- Set up Stripe products and pricing
- Configure webhooks
- Test subscription flows

### 3. Add Database Persistence
- Choose database provider (Supabase, PlanetScale, etc.)
- Set up user data storage
- Migrate from mock data

### 4. Monitor and Optimize
- Set up analytics and monitoring
- Optimize performance
- Scale based on usage

## Security Checklist

- [ ] Environment variables are secure
- [ ] API keys are not exposed in client code
- [ ] HTTPS is enabled (automatic with Netlify)
- [ ] Security headers are configured (in `netlify.toml`)
- [ ] Admin access is properly secured

## Support

For deployment issues:
- Check Netlify documentation
- Review build logs
- Test locally first
- Ensure all environment variables are set correctly

**Happy Deploying! 🚀**
