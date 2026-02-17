import { useEffect, useState } from 'react';
import { useAppStore } from './store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Globe, Fingerprint, Database, Sun, Moon, ShieldAlert, ChevronRight } from 'lucide-react';

import { DeviceScout } from './features/device-scout/DeviceScout';
import { IdentityAudit } from './features/identity/IdentityAudit';
import { TrafficMonitor } from './features/traffic/TrafficMonitor';
import { ThreatIntel } from './features/cve-feed/ThreatIntel';

function App() {
  const { isDarkMode, toggleDarkMode, activeModule, setActiveModule } = useAppStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { id: 'scout', icon: Globe, color: 'text-emerald-400', label: 'Network Scout' },
    { id: 'identity', icon: Fingerprint, color: 'text-emerald-500', label: 'Identity Audit' },
    { id: 'traffic', icon: Database, color: 'text-emerald-600', label: 'Traffic Monitor' },
    { id: 'cve', icon: ShieldAlert, color: 'text-emerald-600', label: 'Threat Intel' },
  ];

// En tu App.tsx
useEffect(() => {
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [isDarkMode]); // <--- Agregamos isDarkMode aquí

  return (
    <div className="min-h-screen bg-cyber-bg font-mono transition-colors duration-300 flex">
      
      {/* Sidebar Profesional Expandible */}
      <motion.nav 
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
        animate={{ width: isExpanded ? '240px' : '80px' }}
        className="fixed left-0 top-0 h-full bg-cyber-card/80 backdrop-blur-xl border-r border-emerald-900/20 z-50 hidden md:flex flex-col items-center py-6 transition-all shadow-2xl shadow-black"
      >
        {/* Logo / Shield Icon */}
        <div className={`p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 mb-10 shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all ${isExpanded ? 'scale-110' : ''}`}>
          <ShieldCheck size={28} />
        </div>

        {/* Navigation Items */}
        <div className="flex-1 w-full px-3 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center p-3 rounded-2xl transition-all duration-300 group relative
                ${activeModule === item.id 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'text-emerald-900/40 hover:bg-emerald-500/5 hover:text-emerald-400'}`}
            >
              <item.icon size={24} className="min-w-6" />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-4 font-bold text-xs uppercase tracking-widest whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {/* Indicador de activo (puntos) */}
              {activeModule === item.id && (
                <motion.div layoutId="activeDot" className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full" />
              )}
            </button>
          ))}
        </div>

        {/* Toggle Theme & Expand Hint */}
        <div className="w-full px-3 space-y-4 mt-auto">
          <button 
            onClick={toggleDarkMode}
            className="w-full flex items-center p-3 text-emerald-400 hover:bg-emerald-500/5 rounded-2xl transition-all group"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            {isExpanded && <span className="ml-4 text-[10px] font-black uppercase tracking-widest">{isDarkMode ? 'Light_Mode' : 'Dark_Mode'}</span>}
          </button>
          
          <div className="flex justify-center text-emerald-900/20 py-2">
            <ChevronRight className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} size={16} />
          </div>
        </div>
      </motion.nav>

      {/* Navegación Móvil (Bottom Bar) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-cyber-card/90 backdrop-blur-md border-t border-emerald-900/20 flex justify-around items-center px-4 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            className={`p-2 rounded-xl transition-all ${activeModule === item.id ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-900/40'}`}
          >
            <item.icon size={24} />
          </button>
        ))}
      </nav>

      {/* Contenido Principal con margen dinámico */}
      <main className={`flex-1 min-h-screen transition-all duration-300 pb-20 md:pb-0 ${isExpanded ? 'md:pl-60' : 'md:pl-20'}`}>
        <header className="p-6 md:p-10 border-b border-emerald-900/5 flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-cyber-bg/50 backdrop-blur-sm sticky top-0 z-40">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-cyber-primary uppercase">
              Sentinel <span className="opacity-30 font-light text-cyber-text">Audit_v4</span>
            </h1>
            <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-[0.3em] mt-1">
              Brgo Cyber-Ops Division
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-emerald-950/20 px-4 py-2 rounded-full border border-emerald-500/10 shadow-inner">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
            <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase">Live_Audit_Stream</span>
          </div>
        </header>

        <section className="p-6 md:p-12 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 gap-6"
            >
              {activeModule === 'scout' && <DeviceScout />}
              {activeModule === 'identity' && <IdentityAudit />}
              {activeModule === 'traffic' && <TrafficMonitor />}
              {activeModule === 'cve' && <ThreatIntel />}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}

export default App;