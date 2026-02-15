import axios from 'axios';
import type { ShodanHost, CVE } from '../types'; 
// Eliminamos AbuseReport y Breach porque no hay funciones usándolos aquí ahora

const SHODAN_KEY = 'TU_KEY_AQUI'; 

export const auditService = {
  // 1. Shodan: Device & Port Discovery
  getDeviceScout: async (ip: string): Promise<ShodanHost> => {
    // Para las pruebas de hoy, usamos un mock si no tienes la KEY a mano
    if (SHODAN_KEY === 'TU_KEY_AQUI') {
      return new Promise((resolve) => setTimeout(() => resolve({
        ip_str: ip,
        organization: "Local Network Audit",
        os: "Detected: Linux/Unix",
        ports: [80, 443, 8080, 22],
        isp: "Cloudflare / ISP",
        country_name: "Ecuador",
        data: []
      }), 800));
    }
    
    const { data } = await axios.get(`https://api.shodan.io/shodan/host/${ip}?key=${SHODAN_KEY}`);
    return data;
  },

  // 2. NIST: CVE Vulnerability Search (Usado en el módulo Threat Intel)
  getCVEData: async (keyword: string): Promise<CVE[]> => {
    const { data } = await axios.get(`https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${keyword}`);
    return data.vulnerabilities;
  }
};