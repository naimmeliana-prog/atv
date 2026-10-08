import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  MapPin,
  Clock,
  Euro,
  Bell,
  BellRing,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Phone,
  Mail,
  Info,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  AlertTriangle,
  Download,
  Copy,
  Check
} from 'lucide-react';
import { Academy, RegistrationDeadline } from '../types/atv';
import { valenciaAcademies } from '../data/academiesData';
import { CountdownBadge } from './CountdownBadge';

interface AcademiesViewProps {
  activeAlertIds: string[];
  onToggleAlert: (deadlineId: string) => void;
}

export const AcademiesView: React.FC<AcademiesViewProps> = ({
  activeAlertIds,
  onToggleAlert
}) => {
  const [selectedModality, setSelectedModality] = useState<string>('all');
  const [expandedBreakdownId, setExpandedBreakdownId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter academies by modality
  const filteredAcademies = useMemo(() => {
    if (selectedModality === 'all') return valenciaAcademies;
    return valenciaAcademies.filter((ac) => ac.modality === selectedModality);
  }, [selectedModality]);

  // Export .ics calendar file for a deadline
  const handleDownloadCalendarEvent = (academy: Academy, deadline: RegistrationDeadline) => {
    const d = new Date(deadline.deadlineDate);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateFormatted = `${year}${month}${day}`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ATV Estudio Pro//Valencia Academias//ES',
      'BEGIN:VEVENT',
      `UID:${deadline.id}@atvestudio.app`,
      `DTSTAMP:${dateFormatted}T090000Z`,
      `DTSTART;VALUE=DATE:${dateFormatted}`,
      `SUMMARY:Cierre Matrícula ATV: ${academy.name.split('—')[0].trim()}`,
      `DESCRIPTION:Plazo límite de matrícula para el curso de Auxiliar Técnico Veterinario en ${academy.name}. Convocatoria: ${deadline.name}. Contacto: ${academy.contact.phone}`,
      `LOCATION:${academy.location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `matricula_${academy.id}_${deadline.deadlineDate}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyAlertInfo = (academy: Academy, deadline: RegistrationDeadline) => {
    const text = `Recordatorio Matrícula ATV: ${academy.name} (${academy.location}). Convocatoria: ${deadline.name}. Plazo límite: ${deadline.deadlineDate}. Tel: ${academy.contact.phone}`;
    navigator.clipboard.writeText(text);
    setCopiedId(deadline.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Card */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-teal-200">
            <GraduationCap className="w-3.5 h-3.5 text-teal-700" />
            Guía Oficial de Centros Formativos
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
            Academias de Auxiliar de Veterinaria en la Provincia de Valencia
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            Compara precios reales con el desglose detallado de todos los conceptos (matrícula, mensualidades, uniforme, seguro clínico y tasas), horas de prácticas hospitalarias en centros de Valencia y activa alertas para no perder los plazos de matriculación.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-stone-100 text-xs">
          <span className="font-semibold text-stone-500 mr-1">Modalidad:</span>
          <button
            onClick={() => setSelectedModality('all')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition ${
              selectedModality === 'all'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            Todas ({valenciaAcademies.length})
          </button>
          <button
            onClick={() => setSelectedModality('Presencial')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition ${
              selectedModality === 'Presencial'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            Presencial
          </button>
          <button
            onClick={() => setSelectedModality('Semipresencial')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition ${
              selectedModality === 'Semipresencial'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            Semipresencial
          </button>
          <button
            onClick={() => setSelectedModality('Flexible + Prácticas')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition ${
              selectedModality === 'Flexible + Prácticas'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            Flexible + Prácticas
          </button>
        </div>
      </div>

      {/* Active Alerts Banner if user saved any */}
      {activeAlertIds.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-3.5 shadow-xs">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
            <BellRing className="w-5 h-5 text-amber-700" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Sistema de Alertas Activo
              </span>
              <span className="text-xs text-amber-700">
                ({activeAlertIds.length} convocatorias monitorizadas)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Tienes recordatorios activos guardados en tu dispositivo. Puedes exportar la cita directa a tu calendario para recibir la notificación en el móvil.
            </p>
          </div>
        </div>
      )}

      {/* Academies Directory Cards */}
      <div className="space-y-6">
        {filteredAcademies.map((academy) => {
          const isBreakdownOpen = expandedBreakdownId === academy.id;

          return (
            <div
              key={academy.id}
              className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs hover:border-stone-300 transition space-y-6"
            >
              {/* Card Top: Header & Price Badge */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                      {academy.zone}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
                      {academy.modality}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                    {academy.name}
                  </h2>
                  <p className="text-xs text-stone-600 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{academy.location}</span>
                  </p>
                </div>

                {/* Price Summary Badge */}
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-right shrink-0">
                  <span className="text-[11px] font-semibold text-stone-500 uppercase block">
                    Precio Total Formación
                  </span>
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="text-2xl sm:text-3xl font-black text-stone-900">
                      {academy.priceTotal.toLocaleString('es-ES')}
                    </span>
                    <span className="text-sm font-bold text-stone-600">€</span>
                  </div>
                  <span className="text-[10px] text-stone-600 block mt-0.5">
                    (Todos los conceptos incluidos)
                  </span>
                </div>
              </div>

              {/* Hours & Practical breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] text-stone-500 font-semibold block">Horas Totales</span>
                  <span className="text-base font-bold text-stone-900">{academy.totalHours} horas</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] text-stone-500 font-semibold block">Teoría y Talleres</span>
                  <span className="text-base font-bold text-stone-900">{academy.theoryHours} horas</span>
                </div>
                <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200">
                  <span className="text-[11px] text-teal-900 font-semibold block">Prácticas en Clínicas</span>
                  <span className="text-base font-bold text-teal-950">{academy.practiceHours} horas garantizadas</span>
                </div>
              </div>

              {/* Clinic partners description */}
              <p className="text-xs text-stone-600 leading-relaxed">
                <strong>Centros de prácticas en Valencia:</strong> {academy.clinicPartnersDescription}
              </p>

              {/* Registration Deadlines & Alert System Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                      Plazos de Matriculación y Convocatorias
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-600 hidden sm:inline">
                    Alertas sincronizables con tu calendario
                  </span>
                </div>

                <div className="space-y-2.5">
                  {academy.deadlines.map((dl) => {
                    const isAlertActive = activeAlertIds.includes(dl.id);

                    return (
                      <div
                        key={dl.id}
                        className="p-3.5 rounded-xl bg-white border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-stone-900">{dl.name}</span>
                          </div>
                          <CountdownBadge
                            deadlineDate={dl.deadlineDate}
                            status={dl.status}
                            seatsLeft={dl.seatsLeft}
                          />
                          {dl.note && <p className="text-[11px] text-stone-600">{dl.note}</p>}
                        </div>

                        {/* Alert action buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => onToggleAlert(dl.id)}
                            title={isAlertActive ? 'Desactivar alerta' : 'Activar recordatorio'}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${
                              isAlertActive
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                            }`}
                          >
                            <Bell className={`w-3.5 h-3.5 ${isAlertActive ? 'fill-amber-600 text-amber-700' : ''}`} />
                            <span>{isAlertActive ? 'Alerta Activa' : 'Activar Alerta'}</span>
                          </button>

                          <button
                            onClick={() => handleDownloadCalendarEvent(academy, dl)}
                            title="Descargar evento para Google Calendar o Apple Calendar (.ics)"
                            className="p-1.5 rounded-lg border border-stone-300 text-stone-600 hover:bg-stone-100 transition"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleCopyAlertInfo(academy, dl)}
                            title="Copiar detalles de la convocatoria al portapapeles"
                            className="p-1.5 rounded-lg border border-stone-300 text-stone-600 hover:bg-stone-100 transition"
                          >
                            {copiedId === dl.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price Breakdown Accordion / Detailed concepts */}
              <div className="pt-2">
                <button
                  onClick={() =>
                    setExpandedBreakdownId(isBreakdownOpen ? null : academy.id)
                  }
                  className="flex items-center justify-between w-full p-3.5 rounded-xl bg-stone-100/70 hover:bg-stone-100 border border-stone-200 text-xs font-bold text-stone-800 transition"
                >
                  <div className="flex items-center gap-2">
                    <Euro className="w-4 h-4 text-teal-700" />
                    <span>
                      {isBreakdownOpen
                        ? 'Ocultar Desglose Detallado de Conceptos'
                        : 'Ver Desglose Detallado de Todos los Conceptos de Precio'}
                    </span>
                  </div>
                  {isBreakdownOpen ? (
                    <ChevronUp className="w-4 h-4 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  )}
                </button>

                {isBreakdownOpen && (
                  <div className="mt-3 p-4 rounded-xl border border-stone-200 bg-white space-y-3 text-xs animate-fade-in">
                    <h4 className="font-bold text-stone-900 border-b pb-2 border-stone-100">
                      Desglose Económico Completo
                    </h4>
                    <div className="space-y-2">
                      {academy.breakdown.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between gap-4 py-1.5 border-b border-stone-50"
                        >
                          <div>
                            <span className="font-semibold text-stone-800">{item.concept}</span>
                            {item.note && (
                              <p className="text-[11px] text-stone-600 mt-0.5">{item.note}</p>
                            )}
                          </div>
                          <span className="font-bold text-stone-900 shrink-0">
                            {item.amount > 0 ? `${item.amount} €` : 'Incluido'}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-2 font-bold text-stone-900 text-sm">
                        <span>Total Presupuestado:</span>
                        <span className="text-teal-800 text-base">
                          {academy.priceTotal.toLocaleString('es-ES')} €
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Academy Key Features list */}
              <div className="space-y-1.5 text-xs text-stone-700">
                <span className="font-bold text-stone-900 block mb-1">
                  Aspectos destacados de esta formación:
                </span>
                {academy.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Academy Contact Bar */}
              <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4 text-stone-600 flex-wrap">
                  <a
                    href={`tel:${academy.contact.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-1.5 font-semibold text-stone-800 hover:text-teal-700"
                  >
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>{academy.contact.phone}</span>
                  </a>
                  <a
                    href={`mailto:${academy.contact.email}`}
                    className="flex items-center gap-1.5 text-stone-600 hover:text-teal-700"
                  >
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    <span>{academy.contact.email}</span>
                  </a>
                </div>

                <a
                  href={academy.contact.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold transition"
                >
                  <span>Web Oficial Academia</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
