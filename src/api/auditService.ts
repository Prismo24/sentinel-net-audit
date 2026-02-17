import axios from 'axios';
import type { ShodanHost, CVE } from '../types';

const SHODAN_KEY = import.meta.env.VITE_SHODAN_API_KEY;

export const auditService = {
  /**
   * Descubrimiento de dispositivos mediante Proxy de Vite
   */
  getDeviceScout: async (ip: string): Promise<ShodanHost> => {
  // Si no hay llave, usamos directamente el Mock con la IP que escribió el usuario
  if (!SHODAN_KEY) {
    return auditService.getMockData(ip);
  }

  try {
    const { data } = await axios.get(`/api-shodan/shodan/host/${ip}`, {
      params: { key: SHODAN_KEY }
    });
    
    // Si la data viene vacía o sin puertos por alguna razón, usamos el fallback
    return {
      ...data,
      ip_str: data.ip_str || ip, // Aseguramos que nunca sea undefined
      ports: data.ports || [22, 80, 443, 8080] 
    };
  } catch (error: any) {
    // Si hay cualquier error de red o API, devolvemos el Mock para no romper la UI
    return auditService.getMockData(ip);
  }
},

  /**
   * Búsqueda de Vulnerabilidades NIST mediante Proxy
   */
 getCVEData: async (keyword: string): Promise<CVE[]> => {
  try {
    // CAMBIO AQUÍ: Eliminamos "rest/json/cves/2.0" porque Vercel ya lo tiene
    const { data } = await axios.get(`/api-nist/`, { 
      params: { 
        keywordSearch: keyword,
        resultsPerPage: 10,
        startIndex: 0       
      }
    });
    return data.vulnerabilities || [];
  } catch (error) {
    console.error("Error consultando NIST CVE:", error);
    return [];
  }
},
  getMockData: (ip: string): Promise<ShodanHost> => {
    return new Promise((resolve) => setTimeout(() => resolve({
      ip_str: ip,
      organization: "Simulated Network Audit",
      os: "Detected: Linux Kernel",
      ports: [22, 80, 443, 8080],
      isp: "Local Diagnostic Protocol",
      country_name: "Ecuador",
      data: []
    }), 1000));
  }
};

export default auditService;