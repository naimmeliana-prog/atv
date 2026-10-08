import React, { useState, useEffect } from 'react';
import { Header, NavTab } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { ModulesView } from './components/ModulesView';
import { QuizzesView } from './components/QuizzesView';
import { GlossaryView } from './components/GlossaryView';
import { ProgressView } from './components/ProgressView';
import { AcademiesView } from './components/AcademiesView';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ModuleId, GlossaryTerm, QuizAttempt, UserProgress } from './types/atv';
import {
  getStoredProgress,
  toggleLessonCompletion,
  toggleTermFavorite,
  addCustomGlossaryTerm,
  toggleDeadlineAlert,
  recordQuizAttempt
} from './utils/storage';
import { Github, Heart, Sparkles, BookOpen, UploadCloud } from 'lucide-react';
import { GitHubDeployModal } from './components/GitHubDeployModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('inicio');
  const [selectedModuleForStudy, setSelectedModuleForStudy] = useState<ModuleId>('anatomia');
  const [selectedModuleForQuiz, setSelectedModuleForQuiz] = useState<ModuleId | 'global'>('global');
  const [progress, setProgress] = useState<UserProgress>(getStoredProgress);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  // Sync stored progress whenever changes happen
  const refreshProgress = () => {
    setProgress(getStoredProgress());
  };

  useEffect(() => {
    refreshProgress();
  }, []);

  // Handlers
  const handleToggleLesson = (lessonId: string) => {
    const updated = toggleLessonCompletion(lessonId);
    setProgress(updated);
  };

  const handleToggleFavoriteTerm = (termId: string) => {
    const updated = toggleTermFavorite(termId);
    setProgress(updated);
  };

  const handleAddCustomTerm = (term: GlossaryTerm) => {
    const updated = addCustomGlossaryTerm(term);
    setProgress(updated);
  };

  const handleToggleAlert = (deadlineId: string) => {
    const updated = toggleDeadlineAlert(deadlineId);
    setProgress(updated);
  };

  const handleRecordQuizAttempt = (attempt: QuizAttempt) => {
    const updated = recordQuizAttempt(attempt);
    setProgress(updated);
  };

  // Cross-view navigations
  const handleNavigateFromDashboard = (tab: NavTab, targetModuleId?: ModuleId) => {
    if (targetModuleId) {
      setSelectedModuleForStudy(targetModuleId);
      setSelectedModuleForQuiz(targetModuleId);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToQuizFromModule = (moduleId: ModuleId) => {
    setSelectedModuleForQuiz(moduleId);
    setCurrentTab('tests');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToGlossaryFromModule = (moduleId: ModuleId) => {
    setSelectedModuleForStudy(moduleId);
    setCurrentTab('glosario');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans selection:bg-teal-200 selection:text-teal-900 pb-16 md:pb-0">
      {/* Top Sticky Navigation */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        streakDays={progress.streakDays}
        activeAlertsCount={progress.activeAlertIds.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentTab === 'inicio' && (
          <DashboardView
            progress={progress}
            onNavigate={handleNavigateFromDashboard}
          />
        )}

        {currentTab === 'modulos' && (
          <ModulesView
            initialSelectedModuleId={selectedModuleForStudy}
            completedLessonIds={progress.completedLessonIds}
            onToggleLesson={handleToggleLesson}
            onNavigateToQuiz={handleNavigateToQuizFromModule}
            onNavigateToGlossary={handleNavigateToGlossaryFromModule}
            onNavigate={setCurrentTab}
          />
        )}

        {currentTab === 'tests' && (
          <QuizzesView
            initialModuleFilter={selectedModuleForQuiz}
            onRecordAttempt={handleRecordQuizAttempt}
            onNavigateToModule={(modId) => {
              setSelectedModuleForStudy(modId);
              setCurrentTab('modulos');
            }}
          />
        )}

        {currentTab === 'glosario' && (
          <GlossaryView
            initialModuleFilter="all"
            favoriteTermIds={progress.favoriteTermIds}
            customTerms={progress.customTerms}
            onToggleFavorite={handleToggleFavoriteTerm}
            onAddCustomTerm={handleAddCustomTerm}
          />
        )}

        {currentTab === 'progreso' && (
          <ProgressView
            progress={progress}
            onRefreshProgress={refreshProgress}
            onNavigateToModule={(modId) => {
              setSelectedModuleForStudy(modId);
              setCurrentTab('modulos');
            }}
            onNavigateToQuiz={(modId) => {
              if (modId) setSelectedModuleForQuiz(modId);
              setCurrentTab('tests');
            }}
          />
        )}

        {currentTab === 'academias' && (
          <AcademiesView
            activeAlertIds={progress.activeAlertIds}
            onToggleAlert={handleToggleAlert}
          />
        )}
      </main>

      {/* Offline Status Toast */}
      <OfflineIndicator />

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200 bg-stone-100/70 text-xs text-stone-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-teal-800/10 p-1 flex items-center justify-center">
              <img src="/favicon.svg" alt="ATV" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-bold text-stone-800">ATV Estudio Pro</span>
              <p className="text-[11px] text-stone-500">
                Creado para aprender el temario de Auxiliar Técnico Veterinario desde cero.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium flex-wrap">
            <button
              onClick={() => setIsDeployModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold transition shadow-xs"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Subir a GitHub / Vercel</span>
            </button>
            <span className="text-stone-300">•</span>
            <a
              href="https://github.com/naimmeliana-prog/atv.git"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-stone-700 hover:text-stone-900 transition"
            >
              <Github className="w-4 h-4" />
              <span>GitHub (naimmeliana-prog/atv)</span>
            </a>
          </div>
        </div>
      </footer>

      {/* GitHub & Vercel deployment modal */}
      <GitHubDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />
    </div>
  );
}
