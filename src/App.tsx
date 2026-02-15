import { useAppStore } from './store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Globe, Fingerprint, Database, Sun, Moon, ShieldAlert } from 'lucide-react';

// Importaciones de módulos
import { DeviceScout } from './features/device-scout/DeviceScout';
import { IdentityAudit } from './features/identity/IdentityAudit';
import { TrafficMonitor } from './features/traffic/TrafficMonitor';
import { ThreatIntel } from './features/cve-feed/ThreatIntel';

function App() {
  const { isDarkMode, toggleDarkMode, activeModule, setActiveModule } = useAppStore();

  const navItems = [
    { id: 'scout', icon: Globe, color: 'text-emerald-400', label: 'Network' },
    { id: 'identity', icon: Fingerprint, color: 'text-emerald-500', label: 'Identity' },
    { id: 'traffic', icon: Database, color: 'text-emerald-600', label: 'Traffic' },
    { id: 'cve', icon: ShieldAlert, color: 'text-emerald-600', label: 'CVE' },

  ];

  return (
    <div className="min-h-screen font-mono selection:bg-emerald-500/30 transition-colors duration-300">
      {/* Navegación Responsiva */}
      <nav className="fixed bottom-0 left-0 w-full h-16 bg-cyber-card/80 backdrop-blur-md border-t border-emerald-900/20 flex justify-around items-center px-4 z-50 
                      md:top-0 md:left-0 md:w-20 md:h-full md:flex-col md:border-r md:border-t-0">
        
        <div className="hidden md:flex p-3 rounded-xl bg-emerald-500/10 text-emerald-500 mb-8 mt-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <ShieldCheck size={24} />
        </div>

        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            className={`p-3 rounded-xl transition-all duration-300 ${activeModule === item.id ? 'bg-emerald-500/20 ' + item.color : 'text-emerald-900/40 hover:text-emerald-400'}`}
          >
            <item.icon size={24} />
          </button>
        ))}

        <button 
          onClick={toggleDarkMode}
          className="p-3 text-emerald-400 hover:rotate-12 transition-transform md:mt-auto md:mb-8"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </nav>

      <main className="pb-20 md:pb-0 md:pl-20 min-h-screen">
        <header className="p-6 md:p-10 border-b border-emerald-900/10 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-cyber-primary uppercase">
              Sentinel <span className="opacity-50 font-light text-cyber-text">Audit_v4</span>
            </h1>
            <p className="text-[10px] md:text-xs text-emerald-700 font-bold uppercase tracking-[0.3em] mt-1">
              Saint Leo University // Cyber-Ops Division
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-emerald-950/20 px-4 py-2 rounded-full border border-emerald-500/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase">Live_Audit_Stream</span>
          </div>
        </header>

        <section className="p-6 md:p-12 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="grid grid-cols-1 gap-6"
            >
              {/* Lógica de Renderizado Dinámico */}
              {activeModule === 'scout' && <DeviceScout />}
              {activeModule === 'identity' && <IdentityAudit />}
              {activeModule === 'traffic' && <TrafficMonitor />}
              {activeModule === 'cve' && <ThreatIntel />}
              
              {/* Fallback para módulos no definidos */}
              {!['scout', 'identity', 'traffic'].includes(activeModule) && (
                <div className="bg-cyber-card border border-emerald-900/20 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden text-center">
                  <p className="text-emerald-500 font-bold uppercase animate-pulse tracking-widest">
                    Initializing {activeModule}_protocol...
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}

export default App;