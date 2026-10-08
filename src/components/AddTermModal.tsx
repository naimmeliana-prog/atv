import React, { useState } from 'react';
import { X, Plus, Sparkles, BookOpen } from 'lucide-react';
import { GlossaryTerm, ModuleId } from '../types/atv';
import { studyModules } from '../data/modulesData';

interface AddTermModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTerm: (term: GlossaryTerm) => void;
}

export const AddTermModal: React.FC<AddTermModalProps> = ({ isOpen, onClose, onAddTerm }) => {
  const [term, setTerm] = useState('');
  const [moduleId, setModuleId] = useState<ModuleId>('anatomia');
  const [category, setCategory] = useState('');
  const [definition, setDefinition] = useState('');
  const [synonymsInput, setSynonymsInput] = useState('');
  const [practicalExample, setPracticalExample] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim() || !definition.trim()) return;

    const synonyms = synonymsInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const newTerm: GlossaryTerm = {
      id: 'custom-' + Date.now(),
      term: term.trim(),
      moduleId,
      category: category.trim() || 'Concepto Clínico',
      definition: definition.trim(),
      synonyms: synonyms.length > 0 ? synonyms : ['No definidos'],
      practicalExample: practicalExample.trim() || 'Uso habitual en consulta y hospitalización veterinaria.',
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    onAddTerm(newTerm);
    onClose();
    // Reset form
    setTerm('');
    setCategory('');
    setDefinition('');
    setSynonymsInput('');
    setPracticalExample('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-stone-200 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-800 border border-teal-200">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">Añadir Término al Glosario</h3>
              <p className="text-xs text-stone-600">Estructura clínica recomendada para ATV</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Término Técnico *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Anisocoria, Tubo endotraqueal, Cefálica..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full text-xs rounded-xl border border-stone-300 p-2.5 focus:border-teal-600 focus:ring-teal-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Módulo Temático
              </label>
              <select
                value={moduleId}
                onChange={(e) => setModuleId(e.target.value as ModuleId)}
                className="w-full text-xs rounded-xl border border-stone-300 p-2.5 bg-white focus:border-teal-600 focus:ring-teal-600"
              >
                {studyModules.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Subcategoría o Área
              </label>
              <input
                type="text"
                placeholder="Ej. Oftalmología, Anestesia..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs rounded-xl border border-stone-300 p-2.5 focus:border-teal-600 focus:ring-teal-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Definición Clara y Rigurosa *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Explica qué es con vocabulario técnico pero comprensible desde cero..."
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              className="w-full text-xs rounded-xl border border-stone-300 p-2.5 focus:border-teal-600 focus:ring-teal-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Sinónimos o Términos Relacionados (separados por coma)
            </label>
            <input
              type="text"
              placeholder="Ej. Asimetría pupilar, desigualdad de pupilas"
              value={synonymsInput}
              onChange={(e) => setSynonymsInput(e.target.value)}
              className="w-full text-xs rounded-xl border border-stone-300 p-2.5 focus:border-teal-600 focus:ring-teal-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Ejemplo de Uso Práctico en el Contexto Veterinario *
            </label>
            <textarea
              required
              rows={2}
              placeholder="Ej. En urgencias: Al explorar a un perro atropellado, alumbramos con una linterna los ojos..."
              value={practicalExample}
              onChange={(e) => setPracticalExample(e.target.value)}
              className="w-full text-xs rounded-xl border border-stone-300 p-2.5 focus:border-teal-600 focus:ring-teal-600"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-xs"
            >
              Guardar Término
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
