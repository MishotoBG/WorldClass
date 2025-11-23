
export interface Language {
  code: string; // 'en', 'bg'
  label: string; // 'English', 'Български'
  flagCode?: string; // 'gb', 'bg' - ISO country code for flagcdn
}

export interface LocalizedContent {
  [langCode: string]: {
    [key: string]: string;
  };
}

export type ContentStatus = 'published' | 'draft';

export interface Destination {
  id: string;
  slug: string; // For URL: 'santorini-greece'
  status: ContentStatus;
  name: string; // Default (fallback)
  region: string;
  price: number;
  image: string;
  description: string; // Default (fallback)
  type: 'Luxury' | 'Adventure' | 'Relaxation' | 'Cultural';
  translations?: LocalizedContent; // Stores fields like { bg: { name: '...', description: '...' } }
}

export interface BlogPost {
  id: string;
  slug: string;
  status: ContentStatus;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  translations?: LocalizedContent;
}

export interface SiteConfig {
  primaryColor: string; 
  secondaryColor: string; 
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  missionText: string;
  logoUrl?: string;     // New
  faviconUrl?: string;  // New
  seoTitle?: string;    // New
  seoDescription?: string; // New
  supportedLanguages: Language[];
  defaultLanguage: string;
  translations?: LocalizedContent; // Overrides for UI strings
}

export interface Stats {
  visitors: number;
  bookings: number;
}

export type PageView = 'HOME' | 'ABOUT' | 'DESTINATIONS' | 'SERVICES' | 'BLOG' | 'CONTACT' | 'ADMIN' | 'TERMS';

export interface AppData {
  destinations: Destination[];
  posts: BlogPost[];
  config: SiteConfig;
  stats: Stats;
}
