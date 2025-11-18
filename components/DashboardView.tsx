import { Module, UserProgress } from '../types';

interface DashboardViewProps {
  userName: string;
  progress: UserProgress;
  modules: Module[];
  currentLessonId: string | null;
  onContinueLearning: () => void;
  onOpenSyllabus: () => void;
  onOpenGlossary: () => void;
  onOpenCapstone: () => void;
}

const DashboardView = ({
  userName,
  progress,
  modules,
  currentLessonId,
  onContinueLearning,
  onOpenSyllabus,
  onOpenGlossary,
  onOpenCapstone
}: DashboardViewProps) => {
  
  // Calculate progress metrics
  const allLessons = modules.flatMap(m => m.lessons);
  const completedCount = progress.completedLessons.size;
  const totalCount = allLessons.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  // Calculate remaining time
  const remainingTime = allLessons
    .filter(l => !progress.completedLessons.has(l.id))
    .reduce((sum, l) => sum + (l.estimatedTimeMinutes || 0), 0);
  
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${Math.round(minutes)} min`;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  // Find current lesson
  const currentLesson = allLessons.find(l => l.id === currentLessonId);
  const currentModule = modules.find(m => m.lessons.some(l => l.id === currentLessonId));

  // Calculate module completion status
  const moduleStatus = modules.map(module => {
    const moduleLessons = module.lessons;
    const completed = moduleLessons.filter(l => progress.completedLessons.has(l.id)).length;
    const total = moduleLessons.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    let status: 'completed' | 'current' | 'locked' = 'locked';
    if (percentage === 100) status = 'completed';
    else if (percentage > 0) status = 'current';
    else {
      // Check if previous module is complete
      const moduleIndex = modules.indexOf(module);
      if (moduleIndex === 0) status = 'current';
      else {
        const prevModule = modules[moduleIndex - 1];
        const prevCompleted = prevModule.lessons.every(l => progress.completedLessons.has(l.id));
        if (prevCompleted) status = 'current';
      }
    }
    
    return { module, completed, total, percentage, status };
  });

  // Calculate this week's goal (complete current module)
  const currentModuleStatus = moduleStatus.find(m => m.status === 'current');
  const weekGoalProgress = currentModuleStatus 
    ? Math.round((currentModuleStatus.completed / currentModuleStatus.total) * 100)
    : 0;

  // Time invested (rough estimate based on completed lessons)
  const timeInvested = allLessons
    .filter(l => progress.completedLessons.has(l.id))
    .reduce((sum, l) => sum + (l.estimatedTimeMinutes || 0), 0);

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-slate-300 text-lg">
            Ready to continue your AI learning journey?
          </p>
        </div>

        {/* Visual Journey Map */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">📊 Your Learning Journey</h2>
          
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-4">
            {moduleStatus.map((ms, index) => (
              <div key={ms.module.id} className="flex items-center">
                <div className="flex flex-col items-center min-w-[120px]">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 ${
                    ms.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    ms.status === 'current' ? 'bg-cyan-500/20 text-cyan-400 ring-4 ring-cyan-500/30' :
                    'bg-slate-700 text-slate-500'
                  }`}>
                    {ms.status === 'completed' ? '✅' : 
                     ms.status === 'current' ? '📍' : '🔒'}
                  </div>
                  <p className={`text-xs text-center font-semibold ${
                    ms.status === 'completed' ? 'text-green-400' :
                    ms.status === 'current' ? 'text-cyan-400' :
                    'text-slate-500'
                  }`}>
                    Module {index + 1}
                  </p>
                  <p className="text-xs text-slate-400 text-center mt-1">
                    {ms.completed}/{ms.total} lessons
                  </p>
                  <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
                    <div 
                      className={`h-1.5 rounded-full ${
                        ms.status === 'completed' ? 'bg-green-400' :
                        ms.status === 'current' ? 'bg-cyan-400' :
                        'bg-slate-600'
                      }`}
                      style={{ width: `${ms.percentage}%` }}
                    />
                  </div>
                </div>
                {index < moduleStatus.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    ms.status === 'completed' ? 'bg-green-400' : 'bg-slate-700'
                  }`} />
                )}
              </div>
            ))}
            <div className="flex flex-col items-center min-w-[120px]">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 bg-yellow-500/20 text-yellow-400">
                🏆
              </div>
              <p className="text-xs text-center font-semibold text-yellow-400">
                Certificate
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Progress</p>
              <p className="text-2xl font-bold text-white">{progressPercentage}%</p>
              <p className="text-slate-400 text-xs mt-1">{completedCount} of {totalCount} lessons</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Time Remaining</p>
              <p className="text-2xl font-bold text-white">{formatTime(remainingTime)}</p>
              <p className="text-slate-400 text-xs mt-1">Estimated completion time</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Time Invested</p>
              <p className="text-2xl font-bold text-white">{formatTime(timeInvested)}</p>
              <p className="text-slate-400 text-xs mt-1">Learning time so far</p>
            </div>
          </div>
        </div>

        {/* Current Lesson */}
        {currentLesson && currentModule && (
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-cyan-400 text-sm font-semibold mb-2">📍 CONTINUE LEARNING</p>
                <h3 className="text-xl font-bold text-white mb-2">{currentModule.title}</h3>
                <p className="text-slate-300 mb-1">{currentLesson.title}</p>
                <p className="text-slate-400 text-sm">⏱️ {currentLesson.estimatedTimeMinutes} minutes</p>
              </div>
              <button
                onClick={onContinueLearning}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* This Week's Goal */}
        {currentModuleStatus && (
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">📅 This Week's Goal</h2>
            <p className="text-slate-300 mb-3">
              Complete {currentModuleStatus.module.title}
            </p>
            <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${weekGoalProgress}%` }}
              />
            </div>
            <p className="text-slate-400 text-sm">
              {currentModuleStatus.completed} of {currentModuleStatus.total} lessons complete ({weekGoalProgress}%)
            </p>
          </div>
        )}

        {/* Quick Access */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">📚 Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={onOpenSyllabus}
              className="bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-xl p-6 text-left transition-all group"
            >
              <div className="text-3xl mb-3">📖</div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                Syllabus
              </h3>
              <p className="text-slate-400 text-sm">
                View all modules and lessons
              </p>
            </button>

            <button
              onClick={onOpenGlossary}
              className="bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-xl p-6 text-left transition-all group"
            >
              <div className="text-3xl mb-3">📝</div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                Glossary
              </h3>
              <p className="text-slate-400 text-sm">
                {completedCount > 0 ? `${completedCount} terms learned` : 'Technical terms & definitions'}
              </p>
            </button>

            <button
              onClick={onOpenCapstone}
              className="bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-xl p-6 text-left transition-all group"
            >
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                Capstone
              </h3>
              <p className="text-slate-400 text-sm">
                {progressPercentage === 100 ? 'Ready to start!' : 'Track your final project'}
              </p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        {completedCount > 0 && (
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">💡 Recent Activity</h2>
            <div className="space-y-3">
              {allLessons
                .filter(l => progress.completedLessons.has(l.id))
                .slice(-3)
                .reverse()
                .map(lesson => {
                  const module = modules.find(m => m.lessons.some(l => l.id === lesson.id));
                  return (
                    <div key={lesson.id} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-green-400 text-xl">✅</div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{lesson.title}</p>
                        <p className="text-slate-400 text-sm">{module?.title}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DashboardView;
