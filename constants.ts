import { AppData, Destination, BlogPost, SiteConfig, Stats } from './types';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Santorini, Greece',
    region: 'Europe',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2929&auto=format&fit=crop',
    description: 'Experience the iconic white-washed buildings and stunning sunsets of the Aegean Sea.',
    type: 'Luxury'
  },
  {
    id: '2',
    name: 'Kyoto, Japan',
    region: 'Asia',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop',
    description: 'Immerse yourself in ancient traditions, tea ceremonies, and breathtaking cherry blossoms.',
    type: 'Cultural'
  },
  {
    id: '3',
    name: 'Patagonia, Chile',
    region: 'South America',
    price: 4100,
    image: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?q=80&w=2787&auto=format&fit=crop',
    description: 'Adventure awaits in the rugged landscapes of mountains, glaciers, and fjords.',
    type: 'Adventure'
  },
  {
    id: '4',
    name: 'Maldives',
    region: 'Asia',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1514282401047-d77a71838aa1?q=80&w=2940&auto=format&fit=crop',
    description: 'The ultimate relaxation destination with private overwater bungalows and crystal clear waters.',
    type: 'Relaxation'
  }
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Hidden Gems in Europe',
    excerpt: 'Discover the secret spots that tourists often miss when visiting the old continent.',
    date: 'Oct 12, 2023',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2940&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'How to Pack for a Safari',
    excerpt: 'Essential gear and clothing tips for your first African adventure.',
    date: 'Sep 28, 2023',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2948&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'The Rise of Eco-Tourism',
    excerpt: 'Why sustainable travel is becoming the new standard for luxury explorers.',
    date: 'Nov 05, 2023',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2940&auto=format&fit=crop'
  }
];

export const INITIAL_CONFIG: SiteConfig = {
  primaryColor: '#0f172a',
  secondaryColor: '#d4af37',
  heroTitle: 'Journey Beyond the Ordinary',
  heroSubtitle: 'Curated experiences for the modern explorer.',
  aboutText: 'WorldClass was founded on the belief that travel is the only thing you buy that makes you richer. With over 20 years of experience, we curate bespoke journeys that blend luxury with authenticity.',
  missionText: 'Our mission is to connect people with the world\'s most extraordinary places while promoting sustainable and respectful tourism.'
};

export const INITIAL_STATS: Stats = {
  visitors: 12450,
  bookings: 342
};

export const STORAGE_KEY = 'worldclass_data';