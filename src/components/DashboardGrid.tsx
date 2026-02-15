import { motion } from 'framer-motion';
import { Globe, Fingerprint, Database, ShieldAlert } from 'lucide-react';

const modules = [
  { id: 'scout', title: 'Device Scout', icon: Globe, desc: 'Análisis de puertos y servicios (Shodan)', color: 'emerald' },
  { id: 'identity', title: 'Identity Audit', icon: Fingerprint, desc: 'Brechas de seguridad de correos (HIBP)', color: 'purple' },
  { id: 'traffic', title: 'Traffic Monitor', icon: Database, desc: 'Reputación de IP y abuso (AbuseIPDB)', color: 'blue' },
  { id: 'cve', title: 'Threat Intelligence', icon: ShieldAlert, desc: 'Buscador de vulnerabilidades NIST', color: 'rose' },
];

export const DashboardGrid = ({ onSelect }: { onSelect: (id: string) => void }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {modules.map((m, i) => (
        <motion.div
          key={m.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => onSelect(m.id)}
          className="group cursor-pointer bg-cyber-card border border-emerald-900/20 p-6 rounded-3xl hover:border-emerald-500/50 transition-all shadow-xl hover:shadow-emerald-500/10"
        >
          <div className={`p-3 rounded-2xl bg-${m.color}-500/10 text-emerald-500 w-fit mb-4 group-hover:scale-110 transition-transform`}>
            <m.icon size={28} />
          </div>
          <h3 className="text-xl font-bold text-emerald-100 mb-2">{m.title}</h3>
          <p className="text-xs text-emerald-900/60 leading-relaxed uppercase tracking-wider">{m.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};