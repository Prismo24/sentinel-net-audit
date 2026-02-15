import type { ShodanHost } from '../types';

export const mockNetworkNode: ShodanHost = {
  ip_str: "190.152.148.22", // Una IP de ejemplo en Ecuador
  organization: "Corporación Nacional de Telecomunicaciones",
  os: "Linux 4.x",
  ports: [80, 443, 8080],
  isp: "CNT EP",
  country_name: "Ecuador",
  data: [
    { port: 80, transport: "tcp", product: "nginx", version: "1.18.0" },
    { port: 443, transport: "tcp", product: "OpenSSL", version: "1.1.1f" }
  ]
};