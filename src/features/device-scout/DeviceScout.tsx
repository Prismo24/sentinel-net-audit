import { useState } from 'react';
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
import { useAppStore } from '../../store/useAppStore';

export const DeviceScout = () => {
  const [ip, setIp] = useState('');

  // Inicializamos con el tipo correcto para evitar el error de 'never[]'
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [loading, setLoading] = useState(false);

  const { isDarkMode } = useAppStore();

  const getInputTextColor = () => {
    return isDarkMode ? 'text-[#00ff41]' : 'text-emerald-950';
  };

  // ... resto del código

  const handleScan = async () => {
    setLoading(true);
    try {
      const data = await auditService.getDeviceScout(ip);

      const centralNode: Node = {
        id: 'root',
        data: { label: `📡 ${data.ip_str}` },
        position: { x: 250, y: 5 },
        // Añadimos zIndex para que el nodo principal siempre esté arriba
        zIndex: 1000,
        style: {
          background: '#10b981', // Verde esmeralda brillante
          color: '#022c22',      // Texto verde casi negro para contraste máximo
          borderRadius: '12px',
          fontWeight: '900',
          border: 'none',
          boxShadow: '0 0 25px rgba(16,185,129,0.5)', // Efecto de brillo (Glow)
          padding: '10px'
        },
      };

      const portNodes: Node[] = data.ports.map((port, index) => ({
        id: `port-${port}`,
        data: { label: `PORT: ${port}` },
        position: { x: 100 + index * 150, y: 150 },
        // Eliminamos className y usamos style para control total del contraste
        style: {
          background: '#064e3b', // Fondo verde muy oscuro (Emerald 950)
          color: '#34d399',      // Texto verde neón (Emerald 400)
          border: '1px solid #10b981',
          borderRadius: '10px',
          fontSize: '11px',
          fontWeight: 'bold',
          width: 100,
          textAlign: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
        },
      }));

      const portEdges: Edge[] = data.ports.map((port) => ({
        id: `edge-${port}`,
        source: 'root',
        target: `port-${port}`,
        animated: true,
        style: { stroke: '#10b981', strokeWidth: 2 },
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
      {/* Barra de Búsqueda Original - Restaurada */}
      <div className="flex flex-col md:flex-row gap-4 bg-cyber-card/80 backdrop-blur-md p-6 rounded-3xl border border-emerald-900/20 shadow-2xl transition-all">
        
        <div className="flex-1 relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 opacity-50" size={20} />
         <input 
  type="text" 
  placeholder="Introduce IP para escaneo de red (ej. 8.8.8.8)..."
  value={ip}
  onChange={(e) => setIp(e.target.value)}
  className={`w-full py-4 pl-12 pr-4 rounded-2xl border transition-all font-mono text-lg font-black
    /* USAMOS TU FUNCION AQUI */
    ${getInputTextColor()} 
    
    /* FONDOS DINAMICOS */
    bg-emerald-950/5 dark:bg-black/40 
    border-emerald-500/10 dark:border-emerald-500/20
    
    /* OTROS ESTILOS */
    placeholder:opacity-40 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10
  `}
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

      {/* Visualización de Nodos Original - Restaurada */}
      <div className="h-125 w-full bg-cyber-card/40 backdrop-blur-sm border border-emerald-900/20 rounded-[3rem] overflow-hidden relative shadow-inner transition-all">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          {/* Fondo de red original */}
          <Background color="#064e3b" gap={20} />
          <Controls className="bg-emerald-900 border-none fill-emerald-500 rounded-xl" />
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