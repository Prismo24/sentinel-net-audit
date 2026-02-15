import  { useState } from 'react';
import { Database, ShieldAlert, Activity, AlertTriangle, Search } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

export const TrafficMonitor = () => {
  const [ip, setIp] = useState('');
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    setLoading(true);
    // Simulación de diagnóstico analítico 
    setTimeout(() => {
      setReport({
        score: 85,
        totalReports: 42,
        lastReport: '2026-02-14',
        history: [
          { day: 'Lun', reports: 5 }, { day: 'Mar', reports: 12 },
          { day: 'Mie', reports: 8 }, { day: 'Jue', reports: 15 },
          { day: 'Vie', reports: 2 }
        ]
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="bg-cyber-card border border-emerald-900/20 p-8 rounded-[2.5rem] shadow-2xl">
        <h2 className="text-emerald-500 font-bold mb-6 flex items-center gap-2 tracking-widest uppercase text-xs">
          <Database size={18} /> IP_Reputation_Analysis
        </h2>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Analizar IP sospechosa..."
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="flex-1 bg-emerald-950/20 border border-emerald-500/10 rounded-2xl px-6 py-4 text-emerald-100 focus:border-emerald-500/40 outline-none transition-all font-mono"
          />
          <button onClick={handleCheck} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg flex gap-2 items-center">
            {loading ? <Activity className="animate-spin" size={20} /> : <Search size={20} />}
            ANALIZAR
          </button>
        </div>
      </div>

      {report && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-cyber-card border border-emerald-900/20 p-8 rounded-[2.5rem] flex flex-col items-center relative overflow-hidden">
            {/* Uso de ShieldAlert como marca de agua decorativa */}
            <ShieldAlert className="absolute -right-4 -top-4 text-emerald-500/5" size={120} />
            
            <h3 className="text-emerald-500 text-[10px] uppercase font-black mb-4">Abuse Confidence Score</h3>
            
            <div className="h-48 w-full relative">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={[{ value: report.score }, { value: 100 - report.score }]} innerRadius={60} outerRadius={80} startAngle={180} endAngle={0} dataKey="value">
                    <Cell fill={report.score > 70 ? "#f43f5e" : "#10b981"} />
                    <Cell fill="#064e3b" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center -mt-12">
                <span className={`text-4xl font-black ${report.score > 70 ? 'text-rose-500' : 'text-emerald-500'}`}>{report.score}%</span>
              </div>
            </div>

            {/* Uso de AlertTriangle para avisos críticos */}
            {report.score > 50 && (
              <div className="mt-4 flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-xl text-rose-500 text-[10px] font-bold uppercase tracking-tighter">
                <AlertTriangle size={14} /> Critical_Risk_Detected
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-cyber-card border border-emerald-900/20 p-8 rounded-[2.5rem]">
            <h3 className="text-emerald-500 text-[10px] uppercase font-black mb-6">Attack History (Last 5 Days)</h3>
            <div className="h-40 w-full">
              <ResponsiveContainer>
                <BarChart data={report.history}>
                  <XAxis dataKey="day" stroke="#064e3b" fontSize={10} />
                  <Tooltip contentStyle={{ background: '#0b140d', border: '1px solid #10b981', color: '#ecfdf5' }} />
                  <Bar dataKey="reports" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Historial de Reportes */}
<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-cyber-card border border-emerald-900/20 p-8 rounded-[2.5rem]">
  <h3 className="text-emerald-500 text-[10px] uppercase font-black mb-6 tracking-widest">
    Attack History (Last 5 Days)
  </h3>
  <div className="h-40 w-full">
    <ResponsiveContainer>
      <BarChart data={report.history}>
        <XAxis 
          dataKey="day" 
          stroke="#064e3b" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false} 
        />
        {/* Usamos el YAxis para mostrar la cantidad de reportes */}
        <YAxis 
          stroke="#064e3b" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false} 
        />
        <Tooltip 
          cursor={{ fill: '#10b98110' }}
          contentStyle={{ 
            background: '#0b140d', 
            border: '1px solid #10b98130', 
            borderRadius: '12px',
            fontSize: '10px',
            color: '#ecfdf5' 
          }} 
        />
        <Bar 
          dataKey="reports" 
          fill="#10b981" 
          radius={[6, 6, 0, 0]} 
          barSize={30}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</motion.div>
        </div>
      )}
    </div>
  );
};