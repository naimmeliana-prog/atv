export type ModuleId = 'anatomia' | 'farmacologia' | 'quirofano' | 'razas' | 'patologias';

export interface LessonSection {
  title: string;
  content: string[];
  keyPoints?: string[];
  clinicalTip?: string; // "En consulta de urgencias...", "Ojo al dato..."
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface Lesson {
  id: string;
  moduleId: ModuleId;
  title: string;
  durationMinutes: number;
  summary: string;
  sections: LessonSection[];
}

export interface StudyModule {
  id: ModuleId;
  title: string;
  subtitle: string;
  iconName: string; // lucide icon identifier
  color: string;
  description: string;
  lessons: Lesson[];
  recommendedOrder: number;
}

export interface Question {
  id: string;
  moduleId: ModuleId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  clinicalContext?: string;
  difficulty?: 'básica' | 'intermedia' | 'avanzada';
}

export interface GlossaryTerm {
  id: string;
  term: string;
  moduleId: ModuleId;
  category: string;
  definition: string;
  synonyms: string[];
  practicalExample: string; // "Ejemplo de uso práctico en el contexto veterinario"
  isFavorite?: boolean;
  isCustom?: boolean;
  createdAt?: string;
}

export interface QuizAttempt {
  id: string;
  timestamp: string;
  moduleId: ModuleId | 'global';
  score: number; // percentage 0-100
  correctCount: number;
  totalQuestions: number;
  mode: 'module_test' | 'exam_simulation';
  timeSpentSeconds: number;
  failedQuestionIds: string[];
}

export interface AcademyBreakdownItem {
  concept: string;
  amount: number;
  note?: string;
}

export interface RegistrationDeadline {
  id: string;
  name: string;
  deadlineDate: string; // ISO string or YYYY-MM-DD
  status: 'open' | 'closing_soon' | 'next_call';
  seatsLeft?: number;
  note?: string;
}

export interface Academy {
  id: string;
  name: string;
  location: string;
  zone: string; // "Valencia Centro", "Gran Vía", "C/ Colón", etc.
  modality: 'Presencial' | 'Semipresencial' | 'Flexible + Prácticas';
  totalHours: number;
  theoryHours: number;
  practiceHours: number;
  clinicPartnersDescription: string;
  priceTotal: number;
  breakdown: AcademyBreakdownItem[];
  deadlines: RegistrationDeadline[];
  features: string[];
  contact: {
    phone: string;
    email: string;
    address: string;
    websiteUrl: string;
  };
}

export interface UserProgress {
  completedLessonIds: string[];
  attempts: QuizAttempt[];
  favoriteTermIds: string[];
  activeAlertIds: string[]; // IDs of deadlines user saved alert for
  customTerms: GlossaryTerm[];
  lastStudyDate: string | null;
  streakDays: number;
}
