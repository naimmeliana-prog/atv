import React from 'react';
import {
  BookOpen,
  CheckSquare,
  Bookmark,
  GraduationCap,
  TrendingUp,
  Home,
  Flame,
  Bell,
  Wifi,
  WifiOff
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export type NavTab = 'inicio' | 'modulos' | 'tests' | 'glosario' | 'progreso' | 'academias';

interface HeaderProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  streakDays: number;
  activeAlertsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  streakDays,
  activeAlertsCount
}) => {
  const isOnline = useOnlineStatus();

  const navItems: { id: NavTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'modulos', label: 'Módulos ATV', icon: BookOpen },
    { id: 'tests', label: 'Tests y Exámenes', icon: CheckSquare },
    { id: 'glosario', label: 'Glosario Técnico', icon: Bookmark },
    { id: 'progreso', label: 'Mi Progreso', icon: TrendingUp },
    { id: 'academias', label: 'Academias Valencia', icon: GraduationCap, badge: activeAlertsCount }
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and App Title */}
            <div
              onClick={() => onTabChange('inicio')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              {/* Favicon / Brand Logo - edge-to-edge transparent vector */}
              <div className="w-10 h-10 rounded-xl bg-teal-700/10 p-1.5 flex items-center justify-center transition-transform group-hover:scale-105">
                <img
                  src="/favicon.svg"
                  alt="ATV Estudio Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-stone-900 tracking-tight text-lg">
                    ATV<span className="text-teal-700">Estudio</span>
                  </span>
                  <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-200/70 text-stone-700">
                    Pro
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 hidden sm:block font-medium">
                  Auxiliar Técnico Veterinario • Temario Completo
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`ml-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                          isActive
                            ? 'bg-white text-teal-800'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Quick Actions: Streak, Online status, PWA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Streak Badge */}
              <div
                title={`Llevas ${streakDays} día${streakDays === 1 ? '' : 's'} seguidos de estudio activo`}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold"
              >
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                <span>{streakDays}d racha</span>
              </div>

              {/* Online/Offline status pill */}
              <div
                title={isOnline ? 'Conexión activa' : 'Sin conexión — Datos en caché local'}
                className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-medium bg-stone-100 text-stone-600 border border-stone-200"
              >
                {isOnline ? (
                  <>
                    <Wifi className="w-3.5 h-3.5 text-teal-600" />
                    <span>Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-amber-800 font-semibold">Offline</span>
                  </>
                )}
              </div>

              {/* Install PWA Button */}
              <PWAInstallButton />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Accessible & Ergonomic) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-50/95 backdrop-blur-md border-t border-stone-200 px-2 py-1 shadow-lg">
        <div className="grid grid-cols-6 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg transition text-[10px] font-medium relative ${
                  isActive ? 'text-teal-800 font-bold' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <div
                  className={`p-1 rounded-lg mb-0.5 transition ${
                    isActive ? 'bg-teal-100 text-teal-800' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="truncate max-w-[50px] leading-tight">
                  {item.id === 'academias'
                    ? 'Valencia'
                    : item.id === 'glosario'
                    ? 'Glosario'
                    : item.id === 'modulos'
                    ? 'Módulos'
                    : item.label}
                </span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-amber-500" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
