# NeuroSpark - AI Learning Platform

An interactive educational platform that ignites your AI learning journey through engaging lessons, quizzes, and hands-on exercises. Built with React, TypeScript, and powered by Google's Gemini AI.

*A product by greybrain.ai*

## 🚀 Features

- **Interactive Learning Path**: Structured curriculum with modules covering AI fundamentals
- **Multiple Learning Formats**: Content lessons, interactive quizzes, and coding exercises
- **AI-Powered Feedback**: Real-time evaluation of exercises using Gemini AI
- **Progress Tracking**: Save and resume your learning journey
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful, accessible interface with smooth animations

## 📋 Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Google Gemini API Key** (for AI features)

## 🛠️ Installation & Setup

1. **Clone or download the project**
   ```bash
   cd greybrain.ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   - Open `.env.local` file
   - Replace `PLACEHOLDER_API_KEY` with your actual Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

   To get a Gemini API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy and paste it into your `.env.local` file

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5393/`
   - Start your AI learning journey!

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
   git commit -m "Initial commit: NeuroSpark AI Learning Platform"
   git remote add origin https://github.com/yourusername/neurospark.git
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

*NeuroSpark - Ignite your AI learning journey*
