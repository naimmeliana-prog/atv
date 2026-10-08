import React, { useMemo } from 'react';
import {
  BookOpen,
  CheckCircle,
  GraduationCap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Bell,
  HeartPulse,
  Pill,
  Scissors,
  Dog,
  ShieldAlert,
  Flame,
  CheckSquare
} from 'lucide-react';
import { StudyModule, UserProgress, ModuleId } from '../types/atv';
import { studyModules } from '../data/modulesData';
import { initialGlossaryTerms } from '../data/glossaryData';
import { valenciaAcademies } from '../data/academiesData';
import { NavTab } from './Header';
import { CountdownBadge } from './CountdownBadge';

interface DashboardViewProps {
  progress: UserProgress;
  onNavigate: (tab: NavTab, targetModuleId?: ModuleId) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ progress, onNavigate }) => {
  // Module icons map
  const moduleIconMap: Record<string, React.ElementType> = {
    Activity: HeartPulse,
    Pill: Pill,
    Scissors: Scissors,
    Dog: Dog,
    ShieldAlert: ShieldAlert
  };

  // Calculate completed lessons overall
  const totalLessons = useMemo(() => {
    return studyModules.reduce((acc, m) => acc + m.lessons.length, 0);
  }, []);

  const completedLessonsCount = progress.completedLessonIds.length;
  const overallProgressPct = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  // Recent attempts
  const totalTestsTaken = progress.attempts.length;
  const averageScore = useMemo(() => {
    if (totalTestsTaken === 0) return 0;
    const sum = progress.attempts.reduce((acc, a) => acc + a.score, 0);
    return Math.round(sum / totalTestsTaken);
  }, [progress.attempts, totalTestsTaken]);

  // Term of the day (cycles daily based on day of year)
  const termOfTheDay = useMemo(() => {
    const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % initialGlossaryTerms.length;
    return initialGlossaryTerms[dayIndex] || initialGlossaryTerms[0];
  }, []);

  // Nearest Valencia Academy Deadline
  const nearestDeadline = useMemo(() => {
    const allDeadlines: { academyName: string; deadlineDate: string; name: string; seatsLeft?: number; status: 'open' | 'closing_soon' | 'next_call' }[] = [];
    valenciaAcademies.forEach((ac) => {
      ac.deadlines.forEach((d) => {
        allDeadlines.push({
          academyName: ac.name.split('—')[0].trim(),
          deadlineDate: d.deadlineDate,
          name: d.name,
          seatsLeft: d.seatsLeft,
          status: d.status
        });
      });
    });

    const now = new Date().getTime();
    const upcoming = allDeadlines.filter((d) => new Date(d.deadlineDate).getTime() > now);
    upcoming.sort((a, b) => new Date(a.deadlineDate).getTime() - new Date(b.deadlineDate).getTime());
    return upcoming[0] || null;
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-stone-900 via-stone-800 to-teal-950 text-white p-6 sm:p-8 md:p-10 shadow-xl border border-stone-800">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Método de Estudio Adaptado para ATV Principiante
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
            El temario de Auxiliar Técnico Veterinario, simplificado y sin rodeos.
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            No importa si empiezas desde cero: aquí tienes los 5 módulos troncales explicados con lenguaje claro, tests interactivos con corrección razonada, simulacros cronometrados y modo sin conexión.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('modulos')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-500 active:scale-95 transition shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explorar Módulos de Estudio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('tests')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-700/80 hover:bg-stone-700 text-stone-100 text-sm font-semibold border border-stone-600 transition"
            >
              <CheckSquare className="w-4 h-4 text-teal-400" />
              <span>Hacer Simulacro de Examen</span>
            </button>
          </div>
        </div>

        {/* Ambient Decorative element */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Valencia Academy Deadline Alert Bar */}
      {nearestDeadline && (
        <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
              <Bell className="w-5 h-5 text-amber-700 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded">
                  Alerta Matrícula Valencia
                </span>
                <span className="text-sm font-bold text-stone-900">
                  {nearestDeadline.academyName}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                {nearestDeadline.name}. Revisa el desglose de precios y reserva antes del cierre.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <CountdownBadge
              deadlineDate={nearestDeadline.deadlineDate}
              status={nearestDeadline.status}
              seatsLeft={nearestDeadline.seatsLeft}
            />
            <button
              onClick={() => onNavigate('academias')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition shrink-0"
            >
              Ver Academias
            </button>
          </div>
        </div>
      )}

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/70 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-500 uppercase">Lecciones Vistas</span>
            <BookOpen className="w-4 h-4 text-teal-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-stone-900">{completedLessonsCount}</span>
            <span className="text-xs text-stone-600">/ {totalLessons}</span>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-teal-700 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${overallProgressPct}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/70 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-500 uppercase">Tests Realizados</span>
            <CheckCircle className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-stone-900">{totalTestsTaken}</span>
            <span className="text-xs text-stone-600">intentos</span>
          </div>
          <p className="text-[11px] text-stone-600 mt-2">
            {totalTestsTaken > 0 ? 'Registro de progreso activo' : 'Aún sin tests completados'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/70 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-500 uppercase">Media de Aciertos</span>
            <TrendingUp className="w-4 h-4 text-sky-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-stone-900">
              {totalTestsTaken > 0 ? `${averageScore}%` : '—'}
            </span>
            {totalTestsTaken > 0 && (
              <span className="text-xs text-stone-600">
                ({averageScore >= 70 ? 'Aprobado sólido' : 'En progreso'})
              </span>
            )}
          </div>
          <p className="text-[11px] text-stone-600 mt-2">
            {totalTestsTaken > 0 ? 'Puntuación sobre tests y simulacros' : 'Haz tu primer test para calcular'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/70 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-500 uppercase">Racha de Estudio</span>
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-stone-900">{progress.streakDays}</span>
            <span className="text-xs text-stone-600">días seguidos</span>
          </div>
          <p className="text-[11px] text-stone-600 mt-2">
            ¡La constancia de 15 min al día marca la diferencia!
          </p>
        </div>
      </div>

      {/* Daily Practical Clinical Term Highlight */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
              Término Clínico del Día
            </span>
            <span className="text-xs text-stone-600">• Glosario ATV</span>
          </div>
          <button
            onClick={() => onNavigate('glosario')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
          >
            Ver todos ({initialGlossaryTerms.length + progress.customTerms.length})
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <h3 className="text-lg font-bold text-stone-900 mb-1">{termOfTheDay.term}</h3>
        <p className="text-xs font-medium text-stone-600 mb-3">{termOfTheDay.category}</p>

        <p className="text-sm text-stone-700 leading-relaxed mb-4">{termOfTheDay.definition}</p>

        <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed">
          <strong className="text-teal-800 block mb-1">Ejemplo práctico en clínica veterinaria:</strong>
          {termOfTheDay.practicalExample}
        </div>
      </div>

      {/* 5 Core Study Modules Quick Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">
              Módulos del Temario de Auxiliar Técnico Veterinario
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Estructura curricular estándar recomendada para superar con éxito la formación ATV.
            </p>
          </div>
          <button
            onClick={() => onNavigate('modulos')}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-800"
          >
            Ver temario completo <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studyModules.map((mod, index) => {
            const Icon = moduleIconMap[mod.iconName] || BookOpen;
            const completedInModule = mod.lessons.filter((l) =>
              progress.completedLessonIds.includes(l.id)
            ).length;
            const moduleProgressPct = Math.round((completedInModule / mod.lessons.length) * 100);

            return (
              <div
                key={mod.id}
                className="bg-white rounded-2xl border border-stone-200/80 p-5 hover:border-teal-300 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                      Módulo 0{index + 1}
                    </span>
                    <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                      {mod.lessons.length} lecciones
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 border border-teal-100">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 leading-snug">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                        {mod.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 mb-4">
                    {mod.description}
                  </p>
                </div>

                <div>
                  {/* Progress bar */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-[11px] font-semibold text-stone-500">
                      <span>Progreso de estudio</span>
                      <span>{moduleProgressPct}%</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-teal-700 h-1.5 rounded-full transition-all"
                        style={{ width: `${moduleProgressPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('modulos', mod.id)}
                      className="flex-1 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition text-center"
                    >
                      Estudiar
                    </button>
                    <button
                      onClick={() => onNavigate('tests', mod.id)}
                      className="px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold border border-teal-200 transition"
                      title="Hacer test de este módulo"
                    >
                      Test
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
