import React, { useMemo, useState } from 'react';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Download,
  Upload,
  Sparkles,
  BarChart3,
  Calendar,
  Flame,
  Clock
} from 'lucide-react';
import { UserProgress, ModuleId } from '../types/atv';
import { studyModules } from '../data/modulesData';
import { questionsBank } from '../data/questionsData';
import { exportBackupData, importBackupData } from '../utils/storage';

interface ProgressViewProps {
  progress: UserProgress;
  onRefreshProgress: () => void;
  onNavigateToModule: (moduleId: ModuleId) => void;
  onNavigateToQuiz: (moduleId?: ModuleId) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  progress,
  onRefreshProgress,
  onNavigateToModule,
  onNavigateToQuiz
}) => {
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Statistics
  const totalLessons = useMemo(() => {
    return studyModules.reduce((acc, m) => acc + m.lessons.length, 0);
  }, []);
  const completedLessons = progress.completedLessonIds.length;
  const lessonsProgressPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const totalAttempts = progress.attempts.length;
  const averageScore = useMemo(() => {
    if (totalAttempts === 0) return 0;
    const sum = progress.attempts.reduce((acc, a) => acc + a.score, 0);
    return Math.round(sum / totalAttempts);
  }, [progress.attempts, totalAttempts]);

  // Module Mastery Breakdown
  const moduleMastery = useMemo(() => {
    return studyModules.map((mod) => {
      // Lessons in this module completed
      const modLessonsCompleted = mod.lessons.filter((l) =>
        progress.completedLessonIds.includes(l.id)
      ).length;
      const lessonPct = Math.round((modLessonsCompleted / mod.lessons.length) * 100);

      // Quiz attempts for this module
      const modAttempts = progress.attempts.filter(
        (a) => a.moduleId === mod.id || a.moduleId === 'global'
      );
      const quizAvg =
        modAttempts.length > 0
          ? Math.round(modAttempts.reduce((acc, a) => acc + a.score, 0) / modAttempts.length)
          : 0;

      // Combined mastery
      const combinedMastery = Math.round(lessonPct * 0.4 + (quizAvg || 0) * 0.6);

      return {
        id: mod.id,
        title: mod.title,
        lessonPct,
        quizAvg,
        combinedMastery
      };
    });
  }, [progress]);

  // Weak questions identification
  const failedQuestionsList = useMemo(() => {
    const failedIdsCount: Record<string, number> = {};
    progress.attempts.forEach((a) => {
      a.failedQuestionIds.forEach((id) => {
        failedIdsCount[id] = (failedIdsCount[id] || 0) + 1;
      });
    });

    const entries = Object.entries(failedIdsCount)
      .map(([id, count]) => {
        const q = questionsBank.find((item) => item.id === id);
        return { question: q, count };
      })
      .filter((item) => item.question !== undefined);

    entries.sort((a, b) => b.count - a.count);
    return entries.slice(0, 5);
  }, [progress.attempts]);

  // Export Progress JSON
  const handleExportBackup = () => {
    const jsonStr = exportBackupData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atv_progreso_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import Progress JSON
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const ok = importBackupData(content);
      if (ok) {
        setImportStatus('¡Datos importados con éxito!');
        onRefreshProgress();
      } else {
        setImportStatus('Error: Archivo de copia no válido');
      }
      setTimeout(() => setImportStatus(null), 4000);
    };
    reader.readAsText(file);
  };

  // Recent attempts for chart (last 8)
  const recentAttempts = useMemo(() => {
    return [...progress.attempts].reverse().slice(-8);
  }, [progress.attempts]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Card */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-teal-200">
            <TrendingUp className="w-3.5 h-3.5 text-teal-700" />
            Evolución y Analítica de Estudio
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
            Seguimiento de Progreso Personalizado
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            Gráficos interactivos de dominio por módulo, evolución de notas en simulacros y detección automática de puntos débiles para enfocar el repaso.
          </p>
        </div>

        {/* Global KPI Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-stone-100">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-semibold text-stone-600 block mb-1">
              Temario Completado
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-stone-900">{lessonsProgressPct}%</span>
              <span className="text-xs text-stone-600">
                ({completedLessons}/{totalLessons})
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-semibold text-stone-600 block mb-1">
              Nota Media en Tests
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-stone-900">
                {totalAttempts > 0 ? `${averageScore}%` : '—'}
              </span>
              <span className="text-xs text-stone-600">
                {totalAttempts > 0 ? `${totalAttempts} tests` : 'Sin datos'}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-semibold text-stone-600 block mb-1">
              Racha de Estudio
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-stone-900">{progress.streakDays}</span>
              <span className="text-xs text-stone-600">días activos</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-semibold text-stone-600 block mb-1">
              Términos Guardados
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-stone-900">
                {progress.favoriteTermIds.length + progress.customTerms.length}
              </span>
              <span className="text-xs text-stone-600">favoritos</span>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Chart 1: Module Mastery Level Bar Chart */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900">
            Dominio Estimado por Módulo del Temario
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            Calculado en base a lecciones leídas (40%) y porcentaje de aciertos en cuestionarios (60%).
          </p>
        </div>

        <div className="space-y-4">
          {moduleMastery.map((m) => (
            <div key={m.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800">{m.title}</span>
                <span className="font-extrabold text-teal-800">{m.combinedMastery}%</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-700 ${
                    m.combinedMastery >= 75
                      ? 'bg-emerald-600'
                      : m.combinedMastery >= 40
                      ? 'bg-teal-600'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.max(4, m.combinedMastery)}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-stone-600">
                <span>Lecciones: {m.lessonPct}%</span>
                <span>Aciertos en test: {m.quizAvg}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Chart 2: Recent Score Evolution (Trend Curve) */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">
              Evolución de Notas en Simulacros
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Tus últimos {recentAttempts.length} exámenes realizados
            </p>
          </div>
          {recentAttempts.length === 0 && (
            <button
              onClick={() => onNavigateToQuiz()}
              className="text-xs font-bold text-teal-700 hover:text-teal-800"
            >
              Hacer primer test →
            </button>
          )}
        </div>

        {recentAttempts.length === 0 ? (
          <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-stone-600 text-xs">
            Aún no has completado tests para generar la curva de evolución. Realiza tu primer cuestionario en la pestaña «Tests y Exámenes».
          </div>
        ) : (
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
            {/* Custom SVG Line & Point Chart */}
            <div className="h-44 w-full">
              <svg viewBox="0 0 500 160" className="w-full h-full overflow-visible">
                {/* Horizontal guide lines */}
                <line x1="0" y1="20" x2="500" y2="20" stroke="#e7e5e4" strokeDasharray="4 4" />
                <text x="5" y="18" fill="#a8a29e" fontSize="10">100%</text>

                <line x1="0" y1="65" x2="500" y2="65" stroke="#e7e5e4" strokeDasharray="4 4" />
                <text x="5" y="63" fill="#a8a29e" fontSize="10">70% (Aprobado)</text>

                <line x1="0" y1="130" x2="500" y2="130" stroke="#e7e5e4" />
                <text x="5" y="128" fill="#a8a29e" fontSize="10">0%</text>

                {/* Calculate coordinates */}
                {(() => {
                  const pts = recentAttempts.map((att, i) => {
                    const x = recentAttempts.length > 1
                      ? 50 + (i * (420 / (recentAttempts.length - 1)))
                      : 250;
                    // y between 20 (100%) and 130 (0%)
                    const y = 130 - (att.score / 100) * 110;
                    return { x, y, score: att.score };
                  });

                  const pathD = pts.reduce((acc, curr, i) => {
                    return i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
                  }, '');

                  return (
                    <>
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#0d9488"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {pts.map((pt, idx) => (
                        <g key={idx}>
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="5"
                            fill="#0d9488"
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                          <text
                            x={pt.x}
                            y={pt.y - 10}
                            textAnchor="middle"
                            fill="#1c1917"
                            fontSize="11"
                            fontWeight="bold"
                          >
                            {pt.score}%
                          </text>
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Weak Topics Diagnostic */}
      {failedQuestionsList.length > 0 && (
        <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">Puntos Débiles Detectados</h2>
              <p className="text-xs text-stone-600">
                Preguntas que has fallado más de una vez. Repasa sus conceptos clave:
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {failedQuestionsList.map((item, idx) => {
              if (!item.question) return null;
              const q = item.question;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-stone-900">{q.question}</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 shrink-0">
                      Fallada {item.count} vez{item.count > 1 ? 'es' : ''}
                    </span>
                  </div>
                  <p className="text-stone-700 text-xs bg-white p-2.5 rounded-xl border border-stone-200">
                    <strong className="text-teal-800">Respuesta Correcta:</strong>{' '}
                    {q.options[q.correctIndex]}
                  </p>
                  <p className="text-[11px] text-stone-600 leading-relaxed">{q.explanation}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Backup & Portability Options (For Mobile/PC Sync) */}
      <div className="bg-stone-100 rounded-3xl p-6 sm:p-7 border border-stone-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              Copia de Seguridad y Portabilidad
            </h3>
            <p className="text-xs text-stone-600">
              Exporta tu progreso para estudiarlo en el móvil sin perder las estadísticas.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportBackup}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-50 transition shadow-2xs"
          >
            <Download className="w-4 h-4 text-teal-700" />
            <span>Descargar Copia de Progreso (.json)</span>
          </button>

          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-50 transition shadow-2xs cursor-pointer">
            <Upload className="w-4 h-4 text-teal-700" />
            <span>Restaurar Copia</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="hidden"
            />
          </label>
        </div>

        {importStatus && (
          <p className="text-xs font-bold text-teal-800 bg-teal-50 p-2.5 rounded-xl border border-teal-200">
            {importStatus}
          </p>
        )}
      </div>
    </div>
  );
};
