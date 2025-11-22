import { UI_DICTIONARY } from '../constants';
import { AppData } from '../types';

// Translate UI Key
export const t = (key: string, lang: string): string => {
  const dict = UI_DICTIONARY[lang] || UI_DICTIONARY['en'];
  return dict[key] || key;
};

// Localize Object Fields (Data Content)
export const l = (obj: any, field: string, lang: string): string => {
  if (!obj) return '';
  
  // 1. Check object's translations array/map
  if (obj.translations && obj.translations[lang] && obj.translations[lang][field]) {
    return obj.translations[lang][field];
  }
  
  // 2. Fallback to default field
  return obj[field];
};

// Localize Config Fields (Hero text, About text)
export const c = (data: AppData, field: string, lang: string): string => {
  // 1. Check Config Overrides
  if (data.config.translations && data.config.translations[lang] && data.config.translations[lang][field]) {
    return data.config.translations[lang][field];
  }
  // 2. Fallback
  return (data.config as any)[field];
};