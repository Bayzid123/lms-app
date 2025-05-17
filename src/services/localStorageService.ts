import type { LocalStorageData } from '../types';

const LOCAL_STORAGE_KEY = 'lms_data';

export function getLmsData(): LocalStorageData | null {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data) as LocalStorageData;
  } catch (error) {
    console.error('Failed to parse LMS data from localStorage:', error);
    return null;
  }
}

export function saveLmsData(data: LocalStorageData): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save LMS data to localStorage:', error);
  }
}

export function clearLmsData(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear LMS data from localStorage:', error);
  }
}
