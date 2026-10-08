import React, { useMemo } from 'react';
import { Clock, AlertTriangle, CheckCircle2, Calendar } from 'lucide-react';

interface CountdownBadgeProps {
  deadlineDate: string;
  status: 'open' | 'closing_soon' | 'next_call';
  seatsLeft?: number;
}

export const CountdownBadge: React.FC<CountdownBadgeProps> = ({ deadlineDate, status, seatsLeft }) => {
  const timeData = useMemo(() => {
    const target = new Date(deadlineDate).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, isExpired: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return { days, hours, isExpired: false };
  }, [deadlineDate]);

  const formattedDate = useMemo(() => {
    try {
      const d = new Date(deadlineDate);
      return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return deadlineDate;
    }
  }, [deadlineDate]);

  if (timeData.isExpired) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200">
        <Clock className="w-3.5 h-3.5 text-stone-400" />
        Convocatoria cerrada ({formattedDate})
      </span>
    );
  }

  const isUrgent = timeData.days <= 14 || status === 'closing_soon';

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium border ${
          isUrgent
            ? 'bg-amber-50 text-amber-800 border-amber-200 shadow-xs'
            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
        }`}
      >
        {isUrgent ? (
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
        ) : (
          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
        )}
        <span>
          Cierre: <strong>{formattedDate}</strong>
        </span>
        <span className="opacity-40">•</span>
        <span>
          {timeData.days > 0 ? (
            <>
              Quedan <strong>{timeData.days}d</strong> {timeData.hours}h
            </>
          ) : (
            <>
              ¡Últimas <strong>{timeData.hours} horas</strong>!
            </>
          )}
        </span>
      </span>

      {seatsLeft !== undefined && (
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
            seatsLeft <= 5 ? 'bg-rose-100 text-rose-800' : 'bg-stone-100 text-stone-700'
          }`}
        >
          {seatsLeft <= 5 ? `¡Solo ${seatsLeft} plazas!` : `${seatsLeft} plazas`}
        </span>
      )}
    </div>
  );
};
