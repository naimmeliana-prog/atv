import React, { useState, useMemo } from 'react';
import {
  Search,
  Bookmark,
  Plus,
  Star,
  Info,
  Sparkles,
  BookOpen,
  Filter,
  Check,
  Tag
} from 'lucide-react';
import { GlossaryTerm, ModuleId } from '../types/atv';
import { initialGlossaryTerms } from '../data/glossaryData';
import { studyModules } from '../data/modulesData';
import { AddTermModal } from './AddTermModal';

interface GlossaryViewProps {
  initialModuleFilter?: ModuleId | 'all';
  favoriteTermIds: string[];
  customTerms: GlossaryTerm[];
  onToggleFavorite: (termId: string) => void;
  onAddCustomTerm: (term: GlossaryTerm) => void;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({
  initialModuleFilter = 'all',
  favoriteTermIds,
  customTerms,
  onToggleFavorite,
  onAddCustomTerm
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<ModuleId | 'all'>(initialModuleFilter);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showStructureGuide, setShowStructureGuide] = useState(false);

  // Combine initial terms + custom user terms
  const allTerms: GlossaryTerm[] = useMemo(() => {
    return [...customTerms, ...initialGlossaryTerms];
  }, [customTerms]);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allTerms.filter((term) => {
      // Favorite filter
      const isFav = favoriteTermIds.includes(term.id);
      if (onlyFavorites && !isFav) return false;

      // Module filter
      if (selectedModule !== 'all' && term.moduleId !== selectedModule) return false;

      // Query filter
      if (!q) return true;
      const matchesName = term.term.toLowerCase().includes(q);
      const matchesCategory = term.category.toLowerCase().includes(q);
      const matchesDef = term.definition.toLowerCase().includes(q);
      const matchesSynonyms = term.synonyms.some((s) => s.toLowerCase().includes(q));
      const matchesExample = term.practicalExample.toLowerCase().includes(q);

      return matchesName || matchesCategory || matchesDef || matchesSynonyms || matchesExample;
    });
  }, [allTerms, searchQuery, selectedModule, onlyFavorites, favoriteTermIds]);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-teal-200">
              <Bookmark className="w-3.5 h-3.5 text-teal-700" />
              Diccionario Clínico ATV
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
              Glosario Técnico Veterinario Interactivo
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              Domina la jerga del hospital: términos quirúrgicos, farmacológicos y anatómicos con su definición clara y ejemplos reales de uso en consulta.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowStructureGuide(!showStructureGuide)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-stone-300 text-stone-700 hover:bg-stone-50 transition"
            >
              <Info className="w-4 h-4 text-teal-700" />
              <span>{showStructureGuide ? 'Ocultar Guía' : 'Estructura Recomendada'}</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Término</span>
            </button>
          </div>
        </div>

        {/* Structure Recommendation Box (Requested by User) */}
        {showStructureGuide && (
          <div className="mt-6 p-5 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3 animate-fade-in">
            <div className="flex items-center gap-2 text-teal-900 font-bold">
              <Sparkles className="w-4 h-4 text-teal-700" />
              <span>Estructura Óptima para Registrar Términos en Medicina Veterinaria (ATV)</span>
            </div>
            <p className="text-stone-600">
              Para que tu amiga o cualquier estudiante no se sienta abrumada, cada entrada del glosario debe organizarse en 5 bloques indispensables:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-white rounded-xl border border-teal-200">
                <strong className="text-teal-900 block mb-0.5">1. Término y Acrónimo</strong>
                <span className="text-stone-600">
                  Nombre técnico formal junto con su sigla clínica (ej. <em>TRC</em>, <em>EtCO2</em>, <em>PAM</em>).
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-teal-200">
                <strong className="text-teal-900 block mb-0.5">2. Módulo y Especialidad</strong>
                <span className="text-stone-600">
                  Encuadre clínico (Farmacología, Anestesia, Oftalmología, Triaje de Urgencias).
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-teal-200">
                <strong className="text-teal-900 block mb-0.5">3. Definición Didáctica</strong>
                <span className="text-stone-600">
                  Explicación en lenguaje accesible pero científicamente riguroso, sin dar nada por sabido.
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-teal-200">
                <strong className="text-teal-900 block mb-0.5">4. Sinónimos y Jerga</strong>
                <span className="text-stone-600">
                  Cómo lo nombra el cirujano en quirófano o el veterinario en consulta.
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-teal-200 sm:col-span-2">
                <strong className="text-teal-900 block mb-0.5">5. Ejemplo de Uso Práctico</strong>
                <span className="text-stone-600">
                  Situación clínica real con paciente concreto («En consulta al recibir un gato...») para fijar el concepto en la memoria a largo plazo.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Search & Filter Controls */}
        <div className="mt-6 pt-6 border-t border-stone-100 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Buscar término, sinónimo, definición o ejemplo clínico (ej. TRC, Metzenbaum, shock)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:bg-white focus:border-teal-600 focus:ring-teal-600 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Favorite Filter Toggle */}
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition shrink-0 ${
                onlyFavorites
                  ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-2xs'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
            >
              <Star
                className={`w-4 h-4 ${
                  onlyFavorites ? 'text-amber-500 fill-amber-500' : 'text-stone-400'
                }`}
              />
              <span>Mis Favoritos ({favoriteTermIds.length})</span>
            </button>
          </div>

          {/* Module Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedModule('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition shrink-0 ${
                selectedModule === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
              }`}
            >
              Todos ({allTerms.length})
            </button>
            {studyModules.map((m) => {
              const count = allTerms.filter((t) => t.moduleId === m.id).length;
              const isSelected = selectedModule === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedModule(m.id)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition shrink-0 ${
                    isSelected
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                  }`}
                >
                  {m.title.split(' ')[0]} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Terms Grid */}
      {filteredTerms.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-lg mx-auto space-y-3">
          <BookOpen className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="text-base font-bold text-stone-800">No se encontraron términos</h3>
          <p className="text-xs text-stone-600">
            Intenta con otra búsqueda o añade un nuevo término clínico personalizado con el botón superior.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedModule('all');
              setOnlyFavorites(false);
            }}
            className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700 transition"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.map((term) => {
            const isFav = favoriteTermIds.includes(term.id);
            const parentModule = studyModules.find((m) => m.id === term.moduleId);

            return (
              <div
                key={term.id}
                className="bg-white rounded-2xl border border-stone-200/80 p-5 hover:border-teal-300 hover:shadow-xs transition flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar of card */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-100">
                          {parentModule ? parentModule.title.split(' ')[0] : 'General'}
                        </span>
                        <span className="text-[11px] font-medium text-stone-600">
                          {term.category}
                        </span>
                        {term.isCustom && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-800">
                            Añadido por ti
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                        {term.term}
                      </h3>
                    </div>

                    <button
                      onClick={() => onToggleFavorite(term.id)}
                      title={isFav ? 'Quitar de favoritos' : 'Marcar como favorito'}
                      className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-300 hover:text-amber-500 transition shrink-0"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          isFav ? 'text-amber-500 fill-amber-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Definition */}
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-3">
                    {term.definition}
                  </p>

                  {/* Synonyms */}
                  {term.synonyms && term.synonyms.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-stone-600 mb-3">
                      <span className="font-semibold text-stone-600">Sinónimos:</span>
                      {term.synonyms.map((syn, synIdx) => (
                        <span
                          key={synIdx}
                          className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700"
                        >
                          {syn}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Practical Clinical Example Box */}
                <div className="mt-2 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed">
                  <strong className="text-teal-800 font-bold block mb-0.5">
                    Ejemplo Práctico en Clínica:
                  </strong>
                  <span>{term.practicalExample}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Term Modal */}
      <AddTermModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTerm={onAddCustomTerm}
      />
    </div>
  );
};
