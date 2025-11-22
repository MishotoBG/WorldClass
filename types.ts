export interface Destination {
  id: string;
  name: string;
  region: string;
  price: number;
  image: string;
  description: string;
  type: 'Luxury' | 'Adventure' | 'Relaxation' | 'Cultural';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

export interface SiteConfig {
  primaryColor: string; // Hex code for Ocean
  secondaryColor: string; // Hex code for Gold
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  missionText: string;
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