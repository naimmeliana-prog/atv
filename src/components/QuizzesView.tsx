import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  Award,
  ChevronRight,
  BookOpen,
  Filter,
  ArrowRight,
  Sparkles,
  Trophy
} from 'lucide-react';
import { Question, ModuleId, QuizAttempt } from '../types/atv';
import { questionsBank } from '../data/questionsData';
import { studyModules } from '../data/modulesData';

interface QuizzesViewProps {
  initialModuleFilter?: ModuleId | 'global';
  onRecordAttempt: (attempt: QuizAttempt) => void;
  onNavigateToModule: (moduleId: ModuleId) => void;
}

export const QuizzesView: React.FC<QuizzesViewProps> = ({
  initialModuleFilter = 'global',
  onRecordAttempt,
  onNavigateToModule
}) => {
  const [selectedFilter, setSelectedFilter] = useState<ModuleId | 'global'>(initialModuleFilter);
  const [quizMode, setQuizMode] = useState<'study' | 'exam'>('study');
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false); // in study mode, for instant check
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(600); // 10 min default
  const [startTime, setStartTime] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter available questions for starting a test
  const filteredBank = useMemo(() => {
    if (selectedFilter === 'global') return questionsBank;
    return questionsBank.filter((q) => q.moduleId === selectedFilter);
  }, [selectedFilter]);

  // Start Quiz Handler
  const startQuiz = (mode: 'study' | 'exam', filter: ModuleId | 'global') => {
    let pool = filter === 'global' ? [...questionsBank] : questionsBank.filter((q) => q.moduleId === filter);
    // Shuffle pool
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const questionsToUse = mode === 'exam' ? shuffled.slice(0, Math.min(20, shuffled.length)) : shuffled;

    setQuizMode(mode);
    setCurrentQuestions(questionsToUse);
    setCurrentIndex(0);
    setUserAnswers({});
    setIsAnswerSubmitted(false);
    setQuizFinished(false);
    setIsQuizActive(true);
    setStartTime(Date.now());

    if (mode === 'exam') {
      const allottedSeconds = questionsToUse.length * 60; // 1 min per question
      setTimeRemainingSeconds(allottedSeconds);
    }
  };

  // Exam Countdown Timer
  useEffect(() => {
    if (isQuizActive && quizMode === 'exam' && !quizFinished) {
      timerRef.current = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            finishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isQuizActive, quizMode, quizFinished]);

  // Select an option
  const handleSelectOption = (optionIndex: number) => {
    if (quizMode === 'study' && isAnswerSubmitted) return; // locked after check
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  // Check answer in Study Mode
  const handleCheckStudyAnswer = () => {
    setIsAnswerSubmitted(true);
  };

  // Finish and compute results
  const finishQuiz = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setQuizFinished(true);

    const total = currentQuestions.length;
    let correct = 0;
    const failedIds: string[] = [];

    currentQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correct++;
      } else {
        failedIds.push(q.id);
      }
    });

    const scorePct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    const attempt: QuizAttempt = {
      id: 'attempt-' + Date.now(),
      timestamp: new Date().toISOString(),
      moduleId: selectedFilter,
      score: scorePct,
      correctCount: correct,
      totalQuestions: total,
      mode: quizMode === 'exam' ? 'exam_simulation' : 'module_test',
      timeSpentSeconds: timeSpent,
      failedQuestionIds: failedIds
    };

    onRecordAttempt(attempt);

    if (scorePct >= 75) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // silent fallback
      }
    }
  };

  // Current question object
  const currentQ = currentQuestions[currentIndex];

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* If NOT in active quiz: Selection Dashboard */}
      {!isQuizActive ? (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-teal-200">
                <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                Evaluación & Entrenamiento ATV
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
                Cuestionarios Tipo Test y Simulacros de Examen
              </h1>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                Comprueba tus conocimientos con preguntas redactadas con el mismo formato, vocabulario clínico y grado de exigencia que las pruebas oficiales de Auxiliar Técnico Veterinario.
              </p>
            </div>

            {/* Mode selection cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {/* Mode A: Test por Módulos (Modo Estudio) */}
              <div className="p-5 sm:p-6 rounded-2xl border-2 border-stone-200 hover:border-teal-400 bg-stone-50/50 flex flex-col justify-between transition">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-teal-100 text-teal-800">
                      <BookOpen className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-100/60 text-teal-800">
                      Recomendado para empezar
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-1">
                    Modo Estudio por Módulos
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    Responde pregunta a pregunta y obtén corrección inmediata con explicaciones clínicas de por qué es la respuesta correcta. Sin límite de tiempo.
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-stone-200">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-stone-400" />
                    <span className="text-xs font-semibold text-stone-600">Elegir tema:</span>
                  </div>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value as ModuleId | 'global')}
                    className="w-full text-xs font-medium rounded-xl border-stone-300 bg-white py-2 px-3 text-stone-800 shadow-2xs focus:border-teal-500 focus:ring-teal-500"
                  >
                    <option value="global">Todos los módulos (Preguntas mixtas)</option>
                    {studyModules.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => startQuiz('study', selectedFilter)}
                    className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>Iniciar Modo Estudio ({filteredBank.length} preguntas)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mode B: Simulacro Oficial ATV Cronometrado */}
              <div className="p-5 sm:p-6 rounded-2xl border-2 border-stone-200 hover:border-amber-400 bg-stone-50/50 flex flex-col justify-between transition">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                      <Clock className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100/60 text-amber-800">
                      Simulación real
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-1">
                    Simulacro Oficial ATV Cronometrado
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    Examen global cronometrado con preguntas aleatorias de todos los temas. Sin ver las soluciones hasta el final para evaluar tu preparación real ante un examen de academia.
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-stone-200">
                  <div className="flex items-center justify-between text-xs text-stone-600">
                    <span>• 20 preguntas aleatorias</span>
                    <span>• 20 minutos de tiempo</span>
                  </div>

                  <button
                    onClick={() => startQuiz('exam', 'global')}
                    className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Iniciar Simulacro Cronometrado</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : quizFinished ? (
        /* Results Screen */
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 md:p-10 shadow-xs max-w-3xl mx-auto space-y-6">
          {(() => {
            const total = currentQuestions.length;
            const correct = currentQuestions.filter((q, idx) => userAnswers[idx] === q.correctIndex).length;
            const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
            const isPassed = pct >= 70;

            return (
              <>
                <div className="text-center space-y-3">
                  <div className="inline-flex p-4 rounded-3xl bg-teal-50 text-teal-800 border border-teal-200">
                    {isPassed ? (
                      <Trophy className="w-12 h-12 text-teal-700" />
                    ) : (
                      <Award className="w-12 h-12 text-amber-600" />
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                    {isPassed ? '¡Excelente Trabajo!' : 'Buen Intento — Sigue Practicando'}
                  </h2>
                  <p className="text-sm text-stone-600">
                    {isPassed
                      ? 'Has superado con soltura la prueba. Tienes una base técnica sólida en estos conceptos.'
                      : 'El temario de veterinaria requiere repetición. Revisa las explicaciones de abajo para afianzar cada fallo.'}
                  </p>

                  <div className="inline-flex items-baseline gap-2 px-6 py-3 rounded-2xl bg-stone-100 border border-stone-200">
                    <span className="text-4xl font-black text-stone-900">{pct}%</span>
                    <span className="text-sm font-semibold text-stone-600">
                      ({correct} de {total} correctas)
                    </span>
                  </div>
                </div>

                {/* Review Questions Breakdown */}
                <div className="pt-6 border-t border-stone-200 space-y-4">
                  <h3 className="text-base font-bold text-stone-900">
                    Revisión de Preguntas y Explicaciones
                  </h3>

                  <div className="space-y-4">
                    {currentQuestions.map((q, idx) => {
                      const userChoice = userAnswers[idx];
                      const isCorrect = userChoice === q.correctIndex;

                      return (
                        <div
                          key={q.id}
                          className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm ${
                            isCorrect
                              ? 'bg-emerald-50/40 border-emerald-200'
                              : 'bg-rose-50/40 border-rose-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <span className="font-bold text-stone-800">
                              Pregunta {idx + 1}: {q.question}
                            </span>
                            {isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                            ) : (
                              <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                            )}
                          </div>

                          <div className="space-y-1.5 my-3 pl-2">
                            {q.options.map((opt, oIdx) => {
                              const isTargetCorrect = oIdx === q.correctIndex;
                              const isUserPick = oIdx === userChoice;

                              let optClass = 'text-stone-600';
                              if (isTargetCorrect) optClass = 'text-emerald-800 font-bold';
                              if (isUserPick && !isTargetCorrect) optClass = 'text-rose-700 line-through';

                              return (
                                <div key={oIdx} className={`flex items-center gap-2 ${optClass}`}>
                                  <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0">
                                    {String.fromCharCode(65 + oIdx)}
                                  </span>
                                  <span>{opt}</span>
                                </div>
                              );
                            })}
                          </div>

                          <div className="p-3 rounded-xl bg-white/80 border border-stone-200/80 text-xs text-stone-700 leading-relaxed mt-2">
                            <strong className="text-teal-800 block mb-0.5">
                              Explicación Clínica:
                            </strong>
                            {q.explanation}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-stone-200">
                  <button
                    onClick={() => setIsQuizActive(false)}
                    className="px-5 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold transition"
                  >
                    Volver a Menú de Tests
                  </button>
                  <button
                    onClick={() => startQuiz(quizMode, selectedFilter)}
                    className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Repetir este Examen</span>
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      ) : (
        /* Active Quiz Question Interface */
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-6">
          {/* Quiz Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700">
                Pregunta {currentIndex + 1} de {currentQuestions.length}
              </span>
              <span className="hidden sm:inline-block text-xs text-stone-600 font-medium capitalize">
                {currentQ.difficulty ? `Dificultad: ${currentQ.difficulty}` : ''}
              </span>
            </div>

            {quizMode === 'exam' ? (
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
                  timeRemainingSeconds <= 120
                    ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse'
                    : 'bg-stone-100 text-stone-800'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{formatTimer(timeRemainingSeconds)}</span>
              </div>
            ) : (
              <button
                onClick={() => setIsQuizActive(false)}
                className="text-xs font-medium text-stone-600 hover:text-stone-800"
              >
                Salir del test
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-teal-700 h-1.5 transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / currentQuestions.length) * 100}%`
              }}
            />
          </div>

          {/* Question text */}
          <div className="space-y-2">
            {currentQ.clinicalContext && (
              <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100 inline-block">
                Contexto: {currentQ.clinicalContext}
              </span>
            )}
            <h2 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* 4 Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = userAnswers[currentIndex] === optIdx;
              const isCorrectAnswer = optIdx === currentQ.correctIndex;
              const isRevealed = quizMode === 'study' && isAnswerSubmitted;

              let btnStyle = 'border-stone-200 bg-white hover:border-stone-400 text-stone-800';
              if (isSelected) {
                btnStyle = 'border-teal-700 bg-teal-50/70 text-teal-950 font-semibold';
              }
              if (isRevealed) {
                if (isCorrectAnswer) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                } else if (isSelected) {
                  btnStyle = 'border-rose-400 bg-rose-50 text-rose-950 line-through';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isRevealed}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm transition flex items-start gap-3 select-none ${btnStyle}`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isSelected
                        ? 'border-teal-700 bg-teal-700 text-white'
                        : 'border-stone-300 text-stone-600'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Immediate Study Mode Explanation Box */}
          {quizMode === 'study' && isAnswerSubmitted && (
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs sm:text-sm animate-fade-in">
              <div className="flex items-center gap-2 font-bold">
                {userAnswers[currentIndex] === currentQ.correctIndex ? (
                  <span className="text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> ¡Respuesta Correcta!
                  </span>
                ) : (
                  <span className="text-rose-700 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Respuesta Incorrecta
                  </span>
                )}
              </div>
              <p className="text-stone-700 leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              onClick={() => {
                if (currentIndex > 0) {
                  setCurrentIndex((prev) => prev - 1);
                  setIsAnswerSubmitted(false);
                }
              }}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 disabled:opacity-30 hover:bg-stone-100 transition"
            >
              ← Anterior
            </button>

            {quizMode === 'study' && !isAnswerSubmitted ? (
              <button
                onClick={handleCheckStudyAnswer}
                disabled={userAnswers[currentIndex] === undefined}
                className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white text-xs font-bold transition shadow-xs"
              >
                Comprobar Respuesta
              </button>
            ) : currentIndex + 1 < currentQuestions.length ? (
              <button
                onClick={() => {
                  setCurrentIndex((prev) => prev + 1);
                  setIsAnswerSubmitted(false);
                }}
                disabled={userAnswers[currentIndex] === undefined}
                className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={finishQuiz}
                disabled={userAnswers[currentIndex] === undefined}
                className="px-6 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white text-xs font-bold transition shadow-xs"
              >
                Finalizar Examen y Ver Nota
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
