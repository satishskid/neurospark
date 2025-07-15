# 🧠 GreyWaken - AI Learning Platform

> **Awaken Your AI Potential**

An interactive educational platform that transforms how students learn AI through engaging lessons, quizzes, and hands-on exercises. Built with React, TypeScript, and powered by Google's Gemini AI.

*A product by greybrain.ai*

---

## 🚀 **DEVELOPER QUICK START**

### **Prerequisites**
- Node.js 18+ installed
- Git installed
- GitHub account
- Netlify account (free)
- Gemini API key (free from Google AI Studio)

### **⚡ 5-Minute Deployment**

#### **Step 1: Clone & Setup**
```bash
# Navigate to your project directory
cd Downloads/greybrain.ai

# Install dependencies (if not already done)
npm install

# Test the build
npm run build
```

#### **Step 2: Push to GitHub**
```bash
# Create a new repository on GitHub named "greywaken"
# Then run these commands:

git remote add origin https://github.com/YOUR_USERNAME/greywaken.git
git branch -M main
git push -u origin main
```

#### **Step 3: Deploy to Netlify**
1. **Go to [Netlify.com](https://netlify.com)**
2. **Click "New site from Git"**
3. **Connect GitHub** and select your `greywaken` repository
4. **Build settings** (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Click "Deploy site"**

#### **Step 4: Configure Environment Variables**
In Netlify Dashboard → Site Settings → Environment Variables:

**Required:**
```
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your Gemini API key: [Google AI Studio](https://makersuite.google.com/app/apikey)

#### **Step 5: Test Your Live Site**
- **Main App**: `https://your-site.netlify.app`
- **Admin Panel**: `https://your-site.netlify.app/?admin=true`
- **Admin Login**: `admin@greywaken.ai` / `admin123`

### **🎯 That's It! Your AI Learning Platform is Live!**

---

## ✨ **WHAT YOU'RE DEPLOYING**

### **🎓 Student Experience**
- **Interactive AI Curriculum**: 5 comprehensive modules from basics to advanced
- **Multiple Learning Formats**: Lessons, quizzes, hands-on coding exercises
- **AI-Powered Feedback**: Real-time evaluation using Google Gemini AI
- **Progress Tracking**: Automatic save/resume with streak tracking
- **Mobile-First Design**: Beautiful, responsive interface

### **👨‍💼 Admin Dashboard**
- **User Analytics**: Real-time metrics, growth tracking, engagement data
- **API Health Monitoring**: Live status, response times, quota tracking
- **Payment Management**: Freemium model with Pro ($19.99) & Enterprise ($99.99) tiers
- **User Management**: Search, profiles, progress tracking, subscription status
- **Revenue Analytics**: MRR, conversion rates, churn analysis

### **🔧 Technical Features**
- **Production-Ready**: Clerk auth & Stripe payment integration points
- **Scalable Architecture**: Modular services, TypeScript safety
- **Modern Stack**: React 19, Vite, Tailwind CSS
- **Admin Access**: Secure admin panel via `/?admin=true`

---

## 📋 **DETAILED DEVELOPER GUIDE**

### **Prerequisites**
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **GitHub Account** ([Sign up](https://github.com/))
- **Netlify Account** ([Sign up](https://netlify.com/))
- **Gemini API Key** ([Get free key](https://makersuite.google.com/app/apikey))

### **🔧 Local Development Setup**

1. **Verify Prerequisites**
   ```bash
   node --version    # Should be 18+
   git --version     # Should be installed
   npm --version     # Should be installed
   ```

2. **Install Dependencies**
   ```bash
   cd Downloads/greybrain.ai
   npm install
   ```

3. **Configure Environment**
   ```bash
   # Copy environment template
   cp .env.example .env.local

   # Edit .env.local and add your Gemini API key:
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Test Local Development**
   ```bash
   npm run dev
   ```
   - **Main App**: `http://localhost:5393/`
   - **Admin Panel**: `http://localhost:5393/?admin=true`

5. **Test Production Build**
   ```bash
   npm run build
   npm run preview
   ```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

## 🏗️ Project Structure

```
greybrain.ai/
├── components/           # React components
│   ├── CurriculumView.tsx   # Sidebar curriculum navigation
│   ├── LessonView.tsx       # Main lesson content display
│   ├── QuizView.tsx         # Interactive quiz component
│   ├── ExerciseView.tsx     # Coding exercise component
│   ├── OnboardingScreen.tsx # Welcome screen
│   └── Icons.tsx            # SVG icon components
├── services/            # External service integrations
│   └── geminiService.ts     # Google Gemini AI integration
├── constants.tsx        # Curriculum data and content
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
└── index.css           # Global styles
```

## 🧠 How It Works

### Learning Journey
1. **Onboarding**: Enter your name to start your personalized journey
2. **Tutorial**: Interactive walkthrough of the interface
3. **Modules**: Progress through structured learning modules
4. **Lessons**: Read content, take quizzes, complete exercises
5. **Progress Tracking**: Your progress is automatically saved

### AI Integration
- **Exercise Evaluation**: Submit code/answers for AI-powered feedback
- **Chatbot Tutor**: Ask questions about current module content
- **Adaptive Learning**: Personalized feedback based on your responses

## 🔧 Configuration

### Environment Variables
- `GEMINI_API_KEY`: Your Google Gemini API key for AI features

### Customization
- **Curriculum**: Edit `constants.tsx` to modify learning content
- **Styling**: Update `index.css` or component styles
- **AI Prompts**: Modify prompts in `services/geminiService.ts`

## 🚨 Troubleshooting

### Common Issues

**App won't start:**
- Ensure Node.js is installed (`node --version`)
- Run `npm install` to install dependencies
- Check for port conflicts (default: 5393)

**AI features not working:**
- Verify your Gemini API key is correctly set in `.env.local`
- Check browser console for API errors
- Ensure you have API quota remaining

**Tests failing:**
- Run `npm install` to ensure all test dependencies are installed
- Some tests may need API key configuration

### Development Tips
- Use browser dev tools to inspect component state
- Check the console for helpful error messages
- The app gracefully handles API failures with fallback responses

## 🧪 Testing

The project includes comprehensive tests for:
- Component rendering and interactions
- API service integration
- User journey flows
- Error handling

Run tests with:
```bash
npm run test        # Run all tests
npm run test:ui     # Interactive test UI
npm run test:coverage # Coverage report
```

## 🚀 Deployment

### Quick Deploy to Netlify

#### Option 1: Git-based Deployment (Recommended)
1. **Push to Git repository**:
   ```bash
   git add .
   git commit -m "Initial commit: GreyWaken AI Learning Platform"
   git remote add origin https://github.com/yourusername/greywaken.git
   git push -u origin main
   ```

2. **Deploy on Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Build settings are automatically detected from `netlify.toml`
   - Click "Deploy site"

#### Option 2: Manual Deployment
1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `dist/` folder to deploy

### Environment Variables Setup

#### For Netlify Dashboard:
1. Go to Site Settings → Environment Variables
2. Add the following variables:

**Required for basic functionality:**
```
GEMINI_API_KEY=your_gemini_api_key
```

**For production with authentication:**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
DATABASE_URL=your_production_database_url
```

#### Build Settings (Auto-configured via netlify.toml):
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18`

### Custom Domain Setup
1. In Netlify dashboard: Site Settings → Domain Management
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate is automatically provisioned

### Other Deployment Options
- **Vercel**: Connect your repository for automatic deployments
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Railway**: Connect Git repository for full-stack deployment
- **Any static host**: Upload the `dist` folder contents

## 📝 License

This project is part of the greybrain.ai educational platform.

## 🤝 Contributing

This is an educational project. Feel free to:
- Report bugs or issues
- Suggest improvements
- Fork and experiment with the code
- Share your learning experience

---

## 🔧 Production Integration

This application is designed for easy integration with production services:

### 🚧 Current Status: Mock Data
- **Authentication**: Mock admin login (replace with Clerk)
- **Payments**: Mock subscription data (replace with Stripe)
- **Database**: In-memory mock data (replace with PostgreSQL/MongoDB)
- **User Management**: Simulated users (replace with Clerk users)

### 🎯 Integration Roadmap

1. **Clerk Authentication** - Replace mock auth with real user management
2. **Stripe Payments** - Implement real subscription billing
3. **Database** - Set up persistent data storage
4. **Analytics** - Add real user tracking and metrics

### 📚 Developer Resources

- **Integration Guide**: See `INTEGRATION_GUIDE.md` for detailed setup instructions
- **Service Files**: Check `services/` directory for integration points
- **Environment**: Configure `.env.local` with your API keys
- **TODOs**: Search for `🚧 TODO:` comments in the codebase

### 🔑 Required API Keys

```env
# AI Service
GEMINI_API_KEY=your_gemini_key

# Authentication (Production)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Payments (Production)
STRIPE_SECRET_KEY=your_stripe_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key

# Database (Production)
DATABASE_URL=your_database_connection_string
```

**Happy Learning! 🧠✨**

*GreyWaken - Awaken your AI learning journey*
