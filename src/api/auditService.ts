import axios from 'axios';
import type { ShodanHost, CVE } from '../types';

const SHODAN_KEY = import.meta.env.VITE_SHODAN_API_KEY;

export const auditService = {
  /**
   * Descubrimiento de dispositivos y puertos mediante Shodan
   * @param ip Dirección IP a auditar
   */
  getDeviceScout: async (ip: string): Promise<ShodanHost> => {
  if (!SHODAN_KEY) {
    return auditService.getMockData(ip);
  }

  try {
    const { data } = await axios.get(`https://api.shodan.io/shodan/host/${ip}`, {
      params: { key: SHODAN_KEY }
    });
    return data;
  } catch (error: any) {
    // Si Shodan nos da 403 o 401, activamos el modo de respaldo profesional
    if (error.response?.status === 403 || error.response?.status === 401) {
      console.warn("Acceso API restringido (403). Cargando modo de diagnóstico seguro...");
      return auditService.getMockData(ip);
    }
    console.error("Error en Shodan API:", error);
    throw error;
  }
},
  /**
   * Búsqueda de Vulnerabilidades NIST
   */
  getCVEData: async (keyword: string): Promise<CVE[]> => {
    const { data } = await axios.get(`https://services.nvd.nist.gov/rest/json/cves/2.0`, {
      params: { keywordSearch: keyword }
    });
    return data.vulnerabilities;
  },

  // Método auxiliar para no romper la UI si no hay internet o Key
  getMockData: (ip: string): Promise<ShodanHost> => {
    return new Promise((resolve) => setTimeout(() => resolve({
      ip_str: ip,
      organization: "Simulated Network",
      os: "Debian 12",
      ports: [22, 80, 443],
      isp: "Localhost Audit",
      country_name: "Ecuador",
      data: []
    }), 1000));
  }
};

export default auditService;