import axios from 'axios';
import type { ShodanHost, CVE } from '../types';

const SHODAN_KEY = import.meta.env.VITE_SHODAN_API_KEY;

export const auditService = {
  /**
   * Descubrimiento de dispositivos mediante Proxy de Vite
   */
  getDeviceScout: async (ip: string): Promise<ShodanHost> => {
  // Aseguramos que si no hay KEY o si falla la red, el MOCK responda siempre
  if (!SHODAN_KEY) {
    console.log("Iniciando modo simulación para:", ip);
    return auditService.getMockData(ip);
  }

  try {
    const { data } = await axios.get(`/api-shodan/shodan/host/${ip}`, {
      params: { key: SHODAN_KEY }
    });
    // DEFENSA EXTRA: Si data no tiene puertos, le damos unos por defecto
    return {
      ...data,
      ports: data.ports || [80, 443] 
    };
  } catch (error: any) {
    console.warn("Error en Shodan API, activando contingencia (Mock).");
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