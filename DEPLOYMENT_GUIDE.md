# GreyWaken Medical - Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Firebase account (for backend)
- AI API keys (Gemini or Groq)

### Installation

```bash
# Clone repository
git clone https://github.com/satishskid/neurospark.git
cd neurospark

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start development server
npm run dev
```

### Environment Variables

Create `.env` file:
```
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_GEMINI_API_KEY=your_gemini_key (optional)
VITE_GROQ_API_KEY=your_groq_key (optional)
```

### Build for Production

```bash
npm run build
# Output in dist/ folder
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

## 📋 Configuration

### AI Provider Setup

Users can configure their AI provider in Settings:
1. Click Settings icon in header
2. Choose provider (Gemini or Groq)
3. Enter API key
4. Test connection

### Admin Access

Default admin credentials (change in production):
- Email: admin@greywaken.com
- Password: admin123

## 🔒 Security Checklist

- [ ] Change default admin credentials
- [ ] Enable Firebase security rules
- [ ] Set up CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS in production

## 📊 Monitoring

Check admin dashboard for:
- User progress analytics
- API health status
- System performance
- Error logs
