
import { AppData, SiteConfig, Destination, BlogPost } from '../types';
import { INITIAL_DESTINATIONS, INITIAL_POSTS, INITIAL_CONFIG, INITIAL_STATS, STORAGE_KEY } from '../constants';

export const loadData = (): AppData => {
  // Initialize defaults
  const defaults: AppData = {
    destinations: INITIAL_DESTINATIONS,
    posts: INITIAL_POSTS,
    config: INITIAL_CONFIG,
    stats: INITIAL_STATS
  };

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      
      // Check if parsed is actually an object and not null or array
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        
        // --- Config Validation ---
        const parsedConfig = (parsed.config && typeof parsed.config === 'object') ? parsed.config : {};
        
        // Validate supportedLanguages: Ensure it is an array and items have a 'code'
        let safeLanguages = defaults.config.supportedLanguages;
        if (Array.isArray(parsedConfig.supportedLanguages) && parsedConfig.supportedLanguages.length > 0) {
          const filtered = parsedConfig.supportedLanguages.filter((l: any) => l && typeof l === 'object' && typeof l.code === 'string');
          if (filtered.length > 0) {
             // Merge with default language data to ensure label/flagCode exist if missing in storage
             safeLanguages = filtered.map((l: any) => {
               const defaultLang = defaults.config.supportedLanguages.find(dl => dl.code === l.code);
               return {
                 code: l.code,
                 label: typeof l.label === 'string' ? l.label : (defaultLang?.label || l.code.toUpperCase()),
                 flagCode: typeof l.flagCode === 'string' ? l.flagCode : (defaultLang?.flagCode || l.code)
               };
             });
          }
        }

        const safeConfig: SiteConfig = {
          ...defaults.config,
          ...parsedConfig,
          supportedLanguages: safeLanguages,
          translations: (parsedConfig.translations && typeof parsedConfig.translations === 'object') 
            ? parsedConfig.translations 
            : defaults.config.translations
        };

        // --- Destinations Validation ---
        const safeDestinations: Destination[] = Array.isArray(parsed.destinations)
          ? parsed.destinations
              .filter((d: any) => d && typeof d === 'object' && typeof d.id === 'string')
              .map((d: any) => ({ ...d })) // Shallow copy to ensure we have a clean object
          : defaults.destinations;

        // --- Posts Validation ---
        const safePosts: BlogPost[] = Array.isArray(parsed.posts)
          ? parsed.posts
              .filter((p: any) => p && typeof p === 'object' && typeof p.id === 'string')
              .map((p: any) => ({ ...p }))
          : defaults.posts;

        // --- Stats Validation ---
        const safeStats = (parsed.stats && typeof parsed.stats === 'object') 
          ? { ...defaults.stats, ...parsed.stats } 
          : defaults.stats;

        // Explicitly construct AppData to avoid pollution from ...parsed
        return {
          destinations: safeDestinations.length > 0 ? safeDestinations : defaults.destinations,
          posts: safePosts.length > 0 ? safePosts : defaults.posts,
          config: safeConfig,
          stats: safeStats
        };
      }
    }
  } catch (error) {
    console.warn("Failed to load or parse data from storage, resetting to defaults.", error);
    // If parsing fails, clear the bad data
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) { /* ignore */ }
  }
  
  // Return defaults if anything failed
  return defaults;
};

export const saveData = (data: AppData) => {
  try {
    if (!data) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save data to storage", error);
  }
};
