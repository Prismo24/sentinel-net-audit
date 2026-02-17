import axios from 'axios';
import type { ShodanHost, CVE } from '../types';

const SHODAN_KEY = import.meta.env.VITE_SHODAN_API_KEY;

export const auditService = {
  /**
   * Descubrimiento de dispositivos mediante Proxy de Vite
   */
  getDeviceScout: async (ip: string): Promise<ShodanHost> => {
    if (!SHODAN_KEY) return auditService.getMockData(ip);

    try {
      // USAMOS EL PROXY: /api-shodan mapea a https://api.shodan.io
      const { data } = await axios.get(`/api-shodan/shodan/host/${ip}`, {
        params: { key: SHODAN_KEY }
      });
      return data;
    } catch (error: any) {
      if (error.response?.status === 403 || error.response?.status === 401) {
        console.warn("Acceso Shodan restringido. Usando modo simulación.");
        return auditService.getMockData(ip);
      }
      throw error;
    }
  },

  /**
   * Búsqueda de Vulnerabilidades NIST mediante Proxy
   */
  getCVEData: async (keyword: string): Promise<CVE[]> => {
  try {
    const { data } = await axios.get(`/api-nist/rest/json/cves/2.0`, {
      params: { 
        keywordSearch: keyword,
        resultsPerPage: 10, // Limitamos a 10 resultados desde el servidor
        startIndex: 0       // Empezamos desde el primero
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