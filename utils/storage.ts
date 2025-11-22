import { AppData } from '../types';
import { INITIAL_DESTINATIONS, INITIAL_POSTS, INITIAL_CONFIG, INITIAL_STATS, STORAGE_KEY } from '../constants';

export const loadData = (): AppData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Initialize defaults
  const defaults: AppData = {
    destinations: INITIAL_DESTINATIONS,
    posts: INITIAL_POSTS,
    config: INITIAL_CONFIG,
    stats: INITIAL_STATS
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
  return defaults;
};

export const saveData = (data: AppData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};