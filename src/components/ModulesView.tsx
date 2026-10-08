import React, { useState } from 'react';
import {
  HeartPulse,
  Pill,
  Scissors,
  Dog,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Sparkles,
  Bookmark,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { StudyModule, ModuleId, Lesson } from '../types/atv';
import { studyModules } from '../data/modulesData';
import { NavTab } from './Header';

interface ModulesViewProps {
  initialSelectedModuleId?: ModuleId;
  completedLessonIds: string[];
  onToggleLesson: (lessonId: string) => void;
  onNavigateToQuiz: (moduleId: ModuleId) => void;
  onNavigateToGlossary: (moduleId: ModuleId) => void;
  onNavigate: (tab: NavTab) => void;
}

export const ModulesView: React.FC<ModulesViewProps> = ({
  initialSelectedModuleId = 'anatomia',
  completedLessonIds,
  onToggleLesson,
  onNavigateToQuiz,
  onNavigateToGlossary
}) => {
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>(initialSelectedModuleId);
  const [openLessonId, setOpenLessonId] = useState<string | null>(null);

  const activeModule = studyModules.find((m) => m.id === activeModuleId) || studyModules[0];

  const moduleIconMap: Record<string, React.ElementType> = {
    Activity: HeartPulse,
    Pill: Pill,
    Scissors: Scissors,
    Dog: Dog,
    ShieldAlert: ShieldAlert
  };

  const toggleLesson = (id: string) => {
    setOpenLessonId(openLessonId === id ? null : id);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Overview header */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            Estructura Modular Oficial ATV
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
            Módulos Formativos de Auxiliar Técnico Veterinario
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            El temario de ATV es denso y abarca desde fisiología celular hasta urgencias quirúrgicas. Para facilitarte el estudio desde cero, cada módulo agrupa sus lecciones teóricas desglosadas, sus cuestionarios de autoevaluación y sus términos de glosario correspondientes.
          </p>
        </div>

        {/* Module Selection Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-6 pt-6 border-t border-stone-100">
          {studyModules.map((mod) => {
            const Icon = moduleIconMap[mod.iconName] || HeartPulse;
            const isSelected = activeModuleId === mod.id;
            const completedCount = mod.lessons.filter((l) =>
              completedLessonIds.includes(l.id)
            ).length;

            return (
              <button
                key={mod.id}
                onClick={() => {
                  setActiveModuleId(mod.id);
                  setOpenLessonId(null);
                }}
                className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white text-teal-800 shadow-2xs'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-stone-200/60 text-stone-600'
                    }`}
                  >
                    {completedCount}/{mod.lessons.length}
                  </span>
                </div>
                <span className="text-xs font-bold leading-snug line-clamp-2">
                  {mod.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Module Detail */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                Módulo Activo
              </span>
              <span className="text-xs text-stone-600 font-medium">
                {activeModule.lessons.length} Lecciones estructuradas
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              {activeModule.title}
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl font-normal">
              {activeModule.description}
            </p>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigateToQuiz(activeModule.id)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs transition"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Hacer Test de este Módulo</span>
            </button>
            <button
              onClick={() => onNavigateToGlossary(activeModule.id)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition"
            >
              <Bookmark className="w-4 h-4" />
              <span>Glosario del Módulo</span>
            </button>
          </div>
        </div>

        {/* Lessons List Accordion */}
        <div className="space-y-4 mt-6">
          {activeModule.lessons.map((lesson: Lesson) => {
            const isCompleted = completedLessonIds.includes(lesson.id);
            const isOpen = openLessonId === lesson.id;

            return (
              <div
                key={lesson.id}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'border-teal-300 bg-stone-50/50 shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                {/* Lesson Header Accordion Toggle */}
                <div
                  onClick={() => toggleLesson(lesson.id)}
                  className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLesson(lesson.id);
                      }}
                      title={isCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}
                      className={`mt-0.5 p-1 rounded-lg transition shrink-0 ${
                        isCompleted
                          ? 'text-emerald-700 hover:text-emerald-800'
                          : 'text-stone-300 hover:text-stone-400'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-5 h-5 ${isCompleted ? 'fill-emerald-100' : ''}`}
                      />
                    </button>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-sm sm:text-base font-bold text-stone-900">
                          {lesson.title}
                        </h3>
                        {isCompleted && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            Completada
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-600 line-clamp-1">{lesson.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-2">
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs text-stone-600 font-medium">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {lesson.durationMinutes} min
                    </span>
                    <div className="p-1 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Lesson Body */}
                {isOpen && (
                  <div className="px-4 pb-6 sm:px-6 pt-2 border-t border-stone-200/60 space-y-6">
                    {lesson.sections.map((sec, secIdx) => (
                      <div key={secIdx} className="space-y-3">
                        <h4 className="text-sm sm:text-base font-bold text-stone-900 border-l-3 border-teal-700 pl-3">
                          {sec.title}
                        </h4>

                        <div className="space-y-2 text-xs sm:text-sm text-stone-700 leading-relaxed pl-3 font-normal">
                          {sec.content.map((p, pIdx) => (
                            <p key={pIdx}>{p}</p>
                          ))}
                        </div>

                        {/* Interactive Table if present */}
                        {sec.table && (
                          <div className="overflow-x-auto rounded-xl border border-stone-200 mt-4 my-2">
                            <table className="w-full text-left text-xs text-stone-700">
                              <thead className="bg-stone-100 text-stone-800 font-semibold uppercase text-[11px] border-b border-stone-200">
                                <tr>
                                  {sec.table.headers.map((h, hIdx) => (
                                    <th key={hIdx} className="px-3.5 py-2.5">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-stone-200">
                                {sec.table.rows.map((row, rIdx) => (
                                  <tr
                                    key={rIdx}
                                    className={rIdx % 2 === 0 ? 'bg-white' : 'bg-stone-50/70'}
                                  >
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="px-3.5 py-2.5 align-top">
                                        {cIdx === 0 ? (
                                          <strong className="text-stone-900">{cell}</strong>
                                        ) : (
                                          cell
                                        )}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Key Points */}
                        {sec.keyPoints && sec.keyPoints.length > 0 && (
                          <div className="bg-stone-100/70 rounded-xl p-3.5 border border-stone-200 text-xs space-y-1.5 ml-3">
                            <span className="font-bold text-stone-900 block mb-1">
                              Puntos clave a recordar:
                            </span>
                            {sec.keyPoints.map((kp, kpIdx) => (
                              <div key={kpIdx} className="flex items-start gap-2 text-stone-700">
                                <span className="text-teal-700 font-bold shrink-0">•</span>
                                <span>{kp}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Clinical Tip Box */}
                        {sec.clinicalTip && (
                          <div className="bg-teal-50/70 rounded-xl p-3.5 border border-teal-200 text-xs text-stone-700 ml-3 flex items-start gap-2.5">
                            <AlertCircle className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-teal-900 font-bold block mb-0.5">
                                Práctica Clínica:
                              </strong>
                              <span>{sec.clinicalTip}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Lesson Bottom Action */}
                    <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => onToggleLesson(lesson.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
                          isCompleted
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                            : 'bg-teal-700 hover:bg-teal-800 text-white'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          {isCompleted ? 'Lección Completada ✓' : 'Marcar como Completada'}
                        </span>
                      </button>

                      <button
                        onClick={() => onNavigateToQuiz(activeModule.id)}
                        className="text-xs font-bold text-teal-700 hover:text-teal-800"
                      >
                        Hacer test del tema →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
