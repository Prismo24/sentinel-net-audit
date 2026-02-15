import  { useState } from 'react';
// Usamos 'type' para las importaciones de tipos de React Flow
import { 
  ReactFlow, 
  Background, 
  Controls, 
  type Edge, 
  type Node, 
  useNodesState, 
  useEdgesState 
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Globe, ShieldCheck, Activity } from 'lucide-react';
import { auditService } from '../../api/auditService';

export const DeviceScout = () => {
  const [ip, setIp] = useState('');
  
  // Inicializamos con el tipo correcto para evitar el error de 'never[]'
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [loading, setLoading] = useState(false);
  
  // ... resto del código

  const handleScan = async () => {
    setLoading(true);
    try {
      // Simulación de auditoría para tu perfil analítico 
      const data = await auditService.getDeviceScout(ip);
      
      const centralNode: Node = {
        id: 'root',
        data: { label: `📡 ${data.ip_str}` },
        position: { x: 250, y: 5 },
        style: { background: '#10b981', color: '#fff', borderRadius: '15px', fontWeight: 'bold' },
      };

      const portNodes: Node[] = data.ports.map((port, index) => ({
        id: `port-${port}`,
        data: { label: `Port: ${port}` },
        position: { x: 100 + index * 150, y: 150 },
        className: 'bg-emerald-950 border border-emerald-500 text-emerald-400 p-2 rounded-lg text-xs',
      }));

      const portEdges: Edge[] = data.ports.map((port) => ({
        id: `edge-${port}`,
        source: 'root',
        target: `port-${port}`,
        animated: true,
        style: { stroke: '#10b981' },
      }));

      setNodes([centralNode, ...portNodes]);
      setEdges(portEdges);
    } catch (error) {
      console.error("Audit Fail:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Barra de Búsqueda de Ciberseguridad */}
      <div className="flex flex-col md:flex-row gap-4 bg-cyber-card p-6 rounded-3xl border border-emerald-900/20 shadow-2xl">
        <div className="flex-1 relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 opacity-50" size={20} />
          <input 
            type="text" 
            placeholder="Introduce IP para escaneo de red (ej. 8.8.8.8)..."
            className="w-full bg-emerald-950/20 border border-emerald-500/10 rounded-2xl py-4 pl-12 pr-4 text-emerald-100 placeholder:text-emerald-900/40 focus:outline-none focus:border-emerald-500/50 transition-all font-mono"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
        </div>
        <button 
          onClick={handleScan}
          disabled={loading}
          className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Activity className="animate-spin" /> : <ShieldCheck />}
          {loading ? 'AUDITANDO...' : 'INICIAR ESCANEO'}
        </button>
      </div>

      {/* Visualización de Nodos Interactiva */}
      <div className="h-125 w-full bg-cyber-card border border-emerald-900/20 rounded-[3rem] overflow-hidden relative shadow-inner">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background color="#064e3b" gap={20} />
          <Controls className="bg-emerald-900 border-none fill-emerald-500" />
        </ReactFlow>
        {!nodes.length && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
            <Globe size={80} className="text-emerald-500 mb-4" />
            <p className="font-mono text-sm uppercase tracking-widest text-emerald-500">Esperando Handshake de Red...</p>
          </div>
        )}
      </div>
    </div>
  );
};