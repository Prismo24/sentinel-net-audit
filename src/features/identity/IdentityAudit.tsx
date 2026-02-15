import  { useState } from 'react';
import { Fingerprint, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Breach } from '../../types';

export const IdentityAudit = () => {
  const [email, setEmail] = useState('');
  const [results, setResults] = useState<Partial<Breach>[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAudit = async () => {
    if (!email) return;
    setLoading(true);

    setTimeout(() => {
      setResults([
        { Title: 'Adobe', BreachDate: '2013-10-04', DataClasses: ['Email', 'Passwords'], IsVerified: true },
        { Title: 'Canva', BreachDate: '2019-05-24', DataClasses: ['Email', 'Names'], IsVerified: true }
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Contenedor Principal con rounded-4xl (equivalente a 2rem) */}
      <div className="bg-cyber-card border border-emerald-900/20 p-8 rounded-4xl shadow-2xl relative overflow-hidden">
        
        {/* Gradiente actualizado a bg-linear-to-r */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />
        
        <h2 className="text-emerald-500 font-bold mb-6 flex items-center gap-2 tracking-widest uppercase text-xs">
          <Fingerprint size={18} /> Identity_Breach_Protocol
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="email" 
            placeholder="Introduce correo institucional..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-emerald-950/20 border border-emerald-500/10 rounded-2xl px-6 py-4 text-emerald-100 focus:border-emerald-500/40 outline-none transition-all font-mono"
          />
          <button 
            onClick={handleAudit}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <ShieldAlert className="animate-pulse" size={20} /> : null}
            {loading ? 'AUDITANDO...' : 'INICIAR AUDITORÍA'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {results && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="overflow-hidden rounded-4xl border border-emerald-900/20 bg-cyber-card shadow-2xl"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-emerald-500/5 text-emerald-500 text-[10px] uppercase tracking-[0.2em] font-black">
                    <th className="p-6">Plataforma</th>
                    <th className="p-6">Fecha del Incidente</th>
                    <th className="p-6">Datos Expuestos</th>
                    <th className="p-6">Estado</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-emerald-100/80">
                  {results.map((r, i) => (
                    <tr key={i} className="border-t border-emerald-900/10 hover:bg-emerald-500/5 transition-colors">
                      <td className="p-6 font-bold text-emerald-400">{r.Title}</td>
                      <td className="p-6 font-mono text-xs opacity-60">{r.BreachDate}</td>
                      <td className="p-6">
                        <div className="flex flex-wrap gap-2">
                          {r.DataClasses?.map((cls, idx) => (
                            <span key={idx} className="bg-emerald-900/30 text-[9px] px-2 py-0.5 rounded border border-emerald-500/10">
                              {cls}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black bg-rose-500/10 text-rose-500 uppercase tracking-tighter">
                          Comprometido
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};