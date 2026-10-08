import { UserProgress, QuizAttempt, GlossaryTerm } from '../types/atv';

const STORAGE_KEY = 'atv_estudio_progress_v1';

const defaultProgress: UserProgress = {
  completedLessonIds: [],
  attempts: [],
  favoriteTermIds: [],
  activeAlertIds: ['ised-oct-2025', 'cim-nov-2025'], // Initial helpful alerts activated by default
  customTerms: [],
  lastStudyDate: null,
  streakDays: 1
};

export function getStoredProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveProgress(defaultProgress);
      return defaultProgress;
    }
    const parsed = JSON.parse(raw) as UserProgress;
    return {
      ...defaultProgress,
      ...parsed,
      activeAlertIds: parsed.activeAlertIds || defaultProgress.activeAlertIds,
      customTerms: parsed.customTerms || []
    };
  } catch (err) {
    console.error('Error loading stored progress', err);
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Error saving progress', err);
  }
}

export function updateStudyStreak(progress: UserProgress): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  if (!progress.lastStudyDate) {
    return {
      ...progress,
      lastStudyDate: today,
      streakDays: 1
    };
  }

  if (progress.lastStudyDate === today) {
    return progress;
  }

  const lastDate = new Date(progress.lastStudyDate);
  const currDate = new Date(today);
  const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

  let newStreak = progress.streakDays;
  if (diffDays === 1) {
    newStreak += 1;
  } else if (diffDays > 1) {
    newStreak = 1;
  }

  return {
    ...progress,
    lastStudyDate: today,
    streakDays: newStreak
  };
}

export function recordQuizAttempt(attempt: QuizAttempt): UserProgress {
  const current = getStoredProgress();
  const updatedAttempts = [attempt, ...current.attempts];
  const updated = updateStudyStreak({
    ...current,
    attempts: updatedAttempts
  });
  saveProgress(updated);
  return updated;
}

export function toggleLessonCompletion(lessonId: string): UserProgress {
  const current = getStoredProgress();
  const exists = current.completedLessonIds.includes(lessonId);
  const nextIds = exists
    ? current.completedLessonIds.filter((id) => id !== lessonId)
    : [...current.completedLessonIds, lessonId];

  const updated = updateStudyStreak({
    ...current,
    completedLessonIds: nextIds
  });
  saveProgress(updated);
  return updated;
}

export function toggleTermFavorite(termId: string): UserProgress {
  const current = getStoredProgress();
  const exists = current.favoriteTermIds.includes(termId);
  const nextIds = exists
    ? current.favoriteTermIds.filter((id) => id !== termId)
    : [...current.favoriteTermIds, termId];

  const updated = {
    ...current,
    favoriteTermIds: nextIds
  };
  saveProgress(updated);
  return updated;
}

export function addCustomGlossaryTerm(term: GlossaryTerm): UserProgress {
  const current = getStoredProgress();
  const updated = {
    ...current,
    customTerms: [term, ...(current.customTerms || [])]
  };
  saveProgress(updated);
  return updated;
}

export function toggleDeadlineAlert(deadlineId: string): UserProgress {
  const current = getStoredProgress();
  const exists = current.activeAlertIds.includes(deadlineId);
  const nextIds = exists
    ? current.activeAlertIds.filter((id) => id !== deadlineId)
    : [...current.activeAlertIds, deadlineId];

  const updated = {
    ...current,
    activeAlertIds: nextIds
  };
  saveProgress(updated);
  return updated;
}

export function exportBackupData(): string {
  const progress = getStoredProgress();
  return JSON.stringify(progress, null, 2);
}

export function importBackupData(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString) as UserProgress;
    if (Array.isArray(parsed.completedLessonIds) && Array.isArray(parsed.attempts)) {
      saveProgress(parsed);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
