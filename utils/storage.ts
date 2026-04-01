import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS: Record<string, string> = {
  SELECTED_MOOD: 'devmood_selected_mood',
  TOTAL_POINTS: 'devmood_total_points',
  LEVEL: 'devmood_level',
  STREAK: 'devmood_streak',
  ACHIEVEMENTS: 'devmood_achievements',
  HISTORY: 'devmood_history',
  LAST_USAGE_DATE: 'devmood_last_usage_date',
  DAILY_BONUS_DATE: 'devmood_daily_bonus_date',
  MOOD_COUNTS: 'devmood_mood_counts',
};

export const saveData = async (key: string, value: unknown): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS[key], JSON.stringify(value));
  } catch (e) {
    console.warn('Storage save error:', e);
  }
};

export const loadData = async <T>(key: string, defaultValue: T): Promise<T> => {
  try {
    const raw = await AsyncStorage.getItem(KEYS[key]);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn('Storage load error:', e);
    return defaultValue;
  }
};

export const clearAll = async (): Promise<void> => {
  try {
    const allKeys = Object.values(KEYS);
    await AsyncStorage.multiRemove(allKeys);
  } catch (e) {
    console.warn('Storage clear error:', e);
  }
};

export { KEYS };
