
import { UI_DICTIONARY } from '../constants';
import { AppData } from '../types';

// Translate UI Key
export const t = (key: string, lang: string): string => {
  if (!key || !lang) return key || '';
  if (!UI_DICTIONARY) return key;
  
  const dict = UI_DICTIONARY[lang] || UI_DICTIONARY['en'];
  if (!dict) return key;
  
  const val = dict[key];
  return typeof val === 'string' ? val : key;
};

// Localize Object Fields (Data Content)
export const l = (obj: any, field: string, lang: string): string => {
  if (!obj || typeof obj !== 'object') return '';
  if (!field) return '';
  
  // 1. Check object's translations array/map
  if (obj.translations && typeof obj.translations === 'object') {
    const trans = obj.translations[lang];
    if (trans && typeof trans === 'object' && trans[field]) {
      return String(trans[field]);
    }
  }
  
  // 2. Fallback to default field
  return obj[field] ? String(obj[field]) : '';
};

// Localize Config Fields (Hero text, About text)
export const c = (data: AppData, field: string, lang: string): string => {
  if (!data || !data.config) return '';
  if (!field) return '';

  // 1. Check Config Overrides
  if (data.config.translations && typeof data.config.translations === 'object') {
    const trans = data.config.translations[lang];
    if (trans && typeof trans === 'object' && trans[field]) {
      return String(trans[field]);
    }
  }

  // 2. Fallback
  const val = (data.config as any)[field];
  return val ? String(val) : '';
};
