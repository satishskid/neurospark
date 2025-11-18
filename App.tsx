

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { CURRICULUM, CURRICULUM_MEDICAL } from './constants';
import { AppView, Lesson, Module, UserProgress } from './types';
import OnboardingScreen from './components/OnboardingScreen';
import CurriculumView from './components/CurriculumView';
import LessonView from './components/LessonView';
import NextStepsView from './components/NextStepsView';
import { LogoIcon, ArrowPathIcon, Cog6ToothIcon } from './components/Icons';
import CertificateView from './components/CertificateView';
import { TutorialView } from './components/TutorialView';
import AdminApp from './AdminApp';
import { authService } from './services/firebaseService';
import LoginScreen from './components/LoginScreen';
import SettingsView from './components/SettingsView';
import ApiKeyWarning from './components/ApiKeyWarning';
import { hasValidApiKey } from './services/aiService';
import SyllabusView from './components/SyllabusView';
import GlossaryView from './components/GlossaryView';
import CapstoneTracker from './components/CapstoneTracker';
import CapstoneTutor from './components/CapstoneTutor';
import SessionTracker from './components/SessionTracker';
import DashboardView from './components/DashboardView';


const APP_STORAGE_KEY = 'greybrain-ai-journey-progress';

const formatTime = (minutes: number) => {
  if (minutes < 1) return '<1m';
  if (minutes < 60) return `${Math.round(minutes)}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
}

const JourneyHeader = ({ allLessonsCount, completedLessonsCount, moduleRemainingTime, totalRemainingTime, onReload, onOpenSettings, onOpenSyllabus, onOpenGlossary, onOpenCapstone, onOpenSessions, onOpenDashboard }: { allLessonsCount: number, completedLessonsCount: number, moduleRemainingTime: number, totalRemainingTime: number, onReload: () => void, onOpenSettings: () => void, onOpenSyllabus: () => void, onOpenGlossary: () => void, onOpenCapstone: () => void, onOpenSessions: () => void, onOpenDashboard: () => void }) => {
  const progressPercentage = allLessonsCount > 0 ? (completedLessonsCount / allLessonsCount) * 100 : 0;
  
  return (
    <div className="p-4 md:p-6 border-b border-slate-700/50">
        <div className="flex justify-between items-center mb-2">
             <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Your Journey
                 <button onClick={onReload} title="Stuck? Reload Journey" className="p-1 rounded-full hover:bg-slate-700 transition-colors">
                    <ArrowPathIcon className="w-4 h-4 text-slate-400" />
                </button>
            </h2>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-sm text-white font-bold">{formatTime(moduleRemainingTime)} <span className="text-slate-400 font-normal">in module</span></p>
                    <p className="text-xs text-slate-400">About {formatTime(totalRemainingTime)} total</p>
                </div>
                <button 
                    onClick={onOpenDashboard} 
                    title="Dashboard" 
                    className="p-2 rounded-full hover:bg-slate-700 transition-colors"
                >
                    <span className="text-slate-400 text-sm">Dashboard</span>
                </button>
                <button 
                    onClick={onOpenSyllabus} 
                    title="Syllabus" 
                    className="p-2 rounded-full hover:bg-slate-700 transition-colors"
                >
                    <span className="text-slate-400 text-sm">Syllabus</span>
                </button>
                <button 
                    onClick={onOpenGlossary} 
                    title="Glossary" 
                    className="p-2 rounded-full hover:bg-slate-700 transition-colors"
                >
                    <span className="text-slate-400 text-sm">Glossary</span>
                </button>
                <button 
                    onClick={onOpenCapstone} 
                    title="Capstone" 
                    className="p-2 rounded-full hover:bg-slate-700 transition-colors"
                >
                    <span className="text-slate-400 text-sm">Capstone</span>
                </button>
                <button 
                    onClick={onOpenSessions} 
                    title="Sessions" 
                    className="p-2 rounded-full hover:bg-slate-700 transition-colors"
                >
                    <span className="text-slate-400 text-sm">Sessions</span>
                </button>
                <button 
                    onClick={onOpenSettings} 
                    title="Settings" 
                    className="p-2 rounded-full hover:bg-slate-700 transition-colors"
                >
                    <Cog6ToothIcon className="w-5 h-5 text-slate-400" />
                </button>
            </div>
        </div>
      <div className="w-full bg-slate-700 rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${progressPercentage}%` }}>
        </div>
      </div>
       <p className="text-right text-sm text-slate-400 mt-1">{Math.round(progressPercentage)}% Complete</p>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<AppView>('onboarding');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isDemoAdmin, setIsDemoAdmin] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [showCapstone, setShowCapstone] = useState(false);
  const [showCapstoneTutor, setShowCapstoneTutor] = useState(false);
  const [capstoneInitialQuery, setCapstoneInitialQuery] = useState<string | undefined>(undefined);
  const [showSessionTracker, setShowSessionTracker] = useState(false);
  const [activeCourseLabel, setActiveCourseLabel] = useState<'General' | 'Medical'>('Medical');
  const [activeCurriculum, setActiveCurriculum] = useState(CURRICULUM_MEDICAL);

  const [progress, setProgress] = useState<UserProgress>({ 
    completedLessons: new Set(), 
    userName: null,
    tutorialCompleted: false
  });

  const [currentLessonId, setCurrentLessonId] = useState<string | null>(CURRICULUM_MEDICAL[0].lessons[0].id);

  // Load from localStorage on initial mount
  useEffect(() => {
    // Check for admin access via URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setIsAdminMode(true);
      return;
    }

    const courseParam = urlParams.get('course');
    // Force medical curriculum (ignore old localStorage)
    const chosen = courseParam === 'general' ? 'general' : 'medical';
    
    if (chosen === 'general') {
      setActiveCurriculum(CURRICULUM);
      setActiveCourseLabel('General');
    } else {
      setActiveCurriculum(CURRICULUM_MEDICAL);
      setActiveCourseLabel('Medical');
    }
    localStorage.setItem('active_course', chosen);

    // Check for API key
    setHasApiKey(hasValidApiKey());

    try {
        const savedData = localStorage.getItem(APP_STORAGE_KEY);
        if (savedData) {
            const parsed = JSON.parse(savedData);
            
            setProgress({
                completedLessons: new Set(parsed.completedLessons || []),
                userName: parsed.userName || null,
                tutorialCompleted: parsed.tutorialCompleted || false
            });

            // Ensure the saved lesson ID is valid
            const lessonExists = activeCurriculum.flatMap(m => m.lessons).some(l => l.id === parsed.currentLessonId);
            if (lessonExists) {
                setCurrentLessonId(parsed.currentLessonId);
            }

            if(parsed.userName && !parsed.tutorialCompleted) {
                setView('tutorial');
            } else if (parsed.userName) {
                setView('journey');
            }

        }
    } catch (e) { console.error("Failed to parse progress from localStorage", e); }
  }, []);

  useEffect(() => {
    const exists = activeCurriculum.flatMap(m => m.lessons).some(l => l.id === currentLessonId || currentLessonId === null);
    if (!exists) {
      setCurrentLessonId(activeCurriculum[0]?.lessons[0]?.id || null);
    }
  }, [activeCurriculum]);


  // Save to localStorage whenever progress changes
  useEffect(() => {
    if (progress.userName) { // Only save if the user has started
        const dataToSave = {
            completedLessons: Array.from(progress.completedLessons),
            userName: progress.userName,
            tutorialCompleted: progress.tutorialCompleted,
            currentLessonId: currentLessonId,
        };
        localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [progress, currentLessonId]);

  const allLessons = useMemo(() => activeCurriculum.flatMap(m => m.lessons), [activeCurriculum]);
  const currentLessonIndex = useMemo(() => allLessons.findIndex(l => l.id === currentLessonId), [allLessons, currentLessonId]);
  const currentLesson = useMemo(() => allLessons[currentLessonIndex], [allLessons, currentLessonIndex]);

  const totalTime = useMemo(() => allLessons.reduce((sum, lesson) => sum + (lesson.estimatedTimeMinutes || 3), 0), [allLessons]);

  const remainingTime = useMemo(() => {
    const completedTime = allLessons
        .filter(lesson => progress.completedLessons.has(lesson.id))
        .reduce((sum, lesson) => sum + (lesson.estimatedTimeMinutes || 3), 0);
    return totalTime - completedTime;
  }, [allLessons, progress.completedLessons, totalTime]);

  const moduleRemainingTime = useMemo(() => {
    const currentModule = activeCurriculum.find(m => m.lessons.some(l => l.id === currentLessonId));
    if (!currentModule) return 0;

    return currentModule.lessons
        .filter(lesson => !progress.completedLessons.has(lesson.id))
        .reduce((sum, lesson) => sum + (lesson.estimatedTimeMinutes || 3), 0);
  }, [currentLessonId, progress.completedLessons]);

  const isLessonUnlocked = useCallback((lessonId: string) => {
    // Demo admin can access all lessons without prerequisites
    console.log('Checking lesson unlock for:', lessonId, 'isDemoAdmin:', isDemoAdmin);
    if (isDemoAdmin) {
      console.log('Demo admin detected - lesson unlocked');
      return true;
    }
    
    const lessonIndex = allLessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === 0) return true;
    const previousLesson = allLessons[lessonIndex - 1];
    return progress.completedLessons.has(previousLesson.id);
  }, [allLessons, progress.completedLessons, isDemoAdmin]);

  const handleStartJourney = (name: string) => {
    setProgress({ completedLessons: new Set(), userName: name, tutorialCompleted: false });
    setCurrentLessonId(activeCurriculum[0].lessons[0].id);
    setView('tutorial');
  };

  const handleCompleteTutorial = () => {
    setProgress(p => ({...p, tutorialCompleted: true}));
    setView('journey');
  };

  const handleSelectLesson = (lessonId: string) => {
    if (isLessonUnlocked(lessonId)) {
      setCurrentLessonId(lessonId);
    }
  };

  const handleCompleteLesson = (lessonId: string) => {
    setProgress(prev => {
      const newCompleted = new Set(prev.completedLessons);
      newCompleted.add(lessonId);
      return { ...prev, completedLessons: newCompleted };
    });

    const nextLessonIndex = allLessons.findIndex(l => l.id === lessonId) + 1;
    if (nextLessonIndex < allLessons.length) {
      setCurrentLessonId(allLessons[nextLessonIndex].id);
    } else {
      setCurrentLessonId(null); // Course finished
    }
  };
  
  const handleReset = () => {
    localStorage.removeItem(APP_STORAGE_KEY);
    setView('onboarding');
    setProgress({ completedLessons: new Set(), userName: null, tutorialCompleted: false });
    setCurrentLessonId(activeCurriculum[0].lessons[0].id);
  }

  const handleLogout = () => {
    authService.signOut();
    handleReset();
  }

  const handleOpenSettings = () => {
    setShowSettings(true);
  }

  const handleOpenDashboard = () => {
    setView('dashboard');
  }

  const handleOpenSyllabus = () => {
    setView('syllabus');
  }

  const handleOpenGlossary = () => {
    setShowGlossary(true);
  }

  const handleOpenCapstone = () => {
    setShowCapstone(true);
  }

  const handleOpenSessions = () => {
    setShowSessionTracker(true);
  }

  const handleCloseSettings = () => {
    setShowSettings(false);
  }

  const handleApiKeyChange = (keyExists: boolean) => {
    setHasApiKey(keyExists);
  }
  
  const JourneyView = (
     <div className="flex h-screen bg-slate-900 font-sans">
      <aside className="w-80 flex-shrink-0 bg-slate-900 border-r border-slate-700/50 p-6 hidden md:flex flex-col">
        <a href="./landing.html" title="Back to Homepage" className="flex items-center gap-3 mb-8">
            <LogoIcon className="w-10 h-10 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">AI Journey</h1>
        </a>
        <CurriculumView
          curriculum={activeCurriculum}
          progress={progress}
          currentLessonId={currentLessonId}
          onSelectLesson={handleSelectLesson}
          isLessonUnlocked={isLessonUnlocked}
        />
        <footer className="mt-auto text-center text-xs text-slate-600 pt-4">
          <button onClick={handleLogout} className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-2 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/20 sm:w-auto flex-shrink-0"
          >Sign Out</button>
        </footer>
      </aside>
      
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-800/50">
          <JourneyHeader 
            allLessonsCount={allLessons.length}
            completedLessonsCount={progress.completedLessons.size}
            moduleRemainingTime={moduleRemainingTime}
            totalRemainingTime={remainingTime}
            onReload={() => window.location.reload()}
            onOpenSettings={handleOpenSettings}
            onOpenSyllabus={handleOpenSyllabus}
            onOpenGlossary={handleOpenGlossary}
            onOpenCapstone={handleOpenCapstone}
            onOpenSessions={handleOpenSessions}
            onOpenDashboard={handleOpenDashboard}
          />
         <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12 relative">
            {!hasApiKey && (
              <ApiKeyWarning onOpenSettings={handleOpenSettings} />
            )}
            {currentLesson ? (
              <LessonView
                key={currentLesson.id}
                lesson={currentLesson}
                onComplete={() => handleCompleteLesson(currentLesson.id)}
              />
            ) : (
              <NextStepsView onReset={handleReset} onClaimCertificate={() => setView('certificate')} />
            )}
         </div>
      </main>
    </div>
  );

  // Admin mode check
  if (isAdminMode) {
    return <AdminApp />;
  }

  // When the browser is restarted we need to restore to previous state
  // So it checks if the user is logged into firebase
  // If so redirect to the appropriate screen
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log('Auth state changed:', user);
      if (user && user.isLoggedIn) {
        // Check if user is demo admin
        console.log('User email:', user.email);
        console.log('Is demo admin check:', authService.isDemoAdmin && authService.isDemoAdmin(user));
        if (authService.isDemoAdmin && authService.isDemoAdmin(user)) {
          console.log('Setting demo admin to true');
          setIsDemoAdmin(true);
        } else {
          console.log('Setting demo admin to false');
          setIsDemoAdmin(false);
        }
        setView('journey');
      } else {
        setView('onboarding');
        setIsDemoAdmin(false);
      }
    });
  }, []);

  if (view === 'onboarding') {
    return <OnboardingScreen onStart={() => setView('login')} />;
  }

  if (view === 'login') {
    return <LoginScreen onStart={handleStartJourney} />;
  }

  if (view === 'dashboard') {
    return (
      <DashboardView
        userName={progress.userName || "Learner"}
        progress={progress}
        modules={activeCurriculum}
        currentLessonId={currentLessonId}
        onContinueLearning={() => setView('journey')}
        onOpenSyllabus={handleOpenSyllabus}
        onOpenGlossary={handleOpenGlossary}
        onOpenCapstone={handleOpenCapstone}
      />
    );
  }
  
  if (view === 'certificate') {
    return <CertificateView userName={progress.userName || "Valued Learner"} onReset={handleReset} />
  }
  
  if (view === 'tutorial') {
    return (
        <div className="relative">
            {JourneyView}
            <TutorialView onComplete={handleCompleteTutorial} />
            {showSettings && (
              <SettingsView 
                onClose={handleCloseSettings}
                onApiKeyChange={handleApiKeyChange}
              />
            )}
            {view === 'syllabus' && (
              <SyllabusView onClose={() => setView('journey')} />
            )}
        </div>
    );
  }

  return (
    <>
      {JourneyView}
      {showSettings && (
        <SettingsView 
          onClose={handleCloseSettings}
          onApiKeyChange={handleApiKeyChange}
        />
      )}
      {showGlossary && (
        <GlossaryView onClose={() => setShowGlossary(false)} />
      )}
      {showCapstone && (
        <CapstoneTracker onClose={() => setShowCapstone(false)} onAskTutor={(prompt) => { setCapstoneInitialQuery(prompt); setShowCapstoneTutor(true); }} />
      )}
      {showCapstoneTutor && (
        <CapstoneTutor onClose={() => setShowCapstoneTutor(false)} initialQuery={capstoneInitialQuery} />
      )}
      {view === 'syllabus' && (
        <SyllabusView onClose={() => setView('journey')} onStartSession={(lessonId) => { setCurrentLessonId(lessonId); setView('journey'); }} activeCourseLabel={activeCourseLabel} />
      )}
      {showSessionTracker && (
        <SessionTracker modules={activeCurriculum} onClose={() => setShowSessionTracker(false)} onStartSession={(lessonId) => { setCurrentLessonId(lessonId); setShowSessionTracker(false); }} />
      )}
    </>
  );
}