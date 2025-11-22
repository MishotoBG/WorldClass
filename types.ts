export interface Language {
  code: string; // 'en', 'bg'
  label: string; // 'English', 'Български'
}

export interface LocalizedContent {
  [langCode: string]: {
    [key: string]: string;
  };
}

export interface Destination {
  id: string;
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
  supportedLanguages: Language[];
  defaultLanguage: string;
  translations?: LocalizedContent; // Overrides for UI strings
}

export interface Stats {
  visitors: number;
  bookings: number;
}

export type PageView = 'HOME' | 'ABOUT' | 'DESTINATIONS' | 'SERVICES' | 'BLOG' | 'CONTACT' | 'ADMIN';

export interface AppData {
  destinations: Destination[];
  posts: BlogPost[];
  config: SiteConfig;
  stats: Stats;
}