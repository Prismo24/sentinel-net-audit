// --- 1. SHODAN: Device Scout ---
export interface ShodanHost {
  ip_str: string;
  organization: string;
  os: string | null;
  ports: number[];
  isp: string;
  country_name: string;
  data: Array<{
    port: number;
    transport: string;
    product?: string;
    version?: string;
  }>;
}

// --- 2. HIBP: Identity Audit ---
export interface Breach {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  Description: string;
  DataClasses: string[];
  IsVerified: boolean;
}

// --- 3. ABUSEIPDB: Traffic Monitor ---
export interface AbuseReport {
  ipAddress: string;
  abuseConfidenceScore: number;
  countryCode: string;
  usageType: string;
  isp: string;
  totalReports: number;
  lastReportedAt: string | null;
}

// --- 4. NIST: CVE Feed ---
export interface CVE {
  id: string;
  sourceIdentifier: string;
  published: string;
  lastModified: string;
  vulnStatus: string;
  descriptions: Array<{ lang: string; value: string }>;
  metrics?: {
    cvssMetricV31?: Array<{
      cvssData: { baseScore: number; baseSeverity: string };
    }>;
  };
}