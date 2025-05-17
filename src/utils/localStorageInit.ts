import { sampleUser, sampleCourses, sampleEnrollments } from "../sample-data/sample-learning-platform-data";
import type { Course, Enrollment, LocalStorageData, User } from "../types";

const LOCAL_STORAGE_KEY = "lms_data";


export function initializeLocalStorage(): void {
  try {
    const existingData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!existingData) {
      const initialData: LocalStorageData = {
        user: sampleUser,
        courses: sampleCourses,
        enrollments: sampleEnrollments,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
    } else {
      console.log("LocalStorage already initialized:", JSON.parse(existingData));
    }
  } catch (error) {
    console.error("Failed to initialize localStorage:", error);
  }
}


export function getLocalStorageData(): LocalStorageData | null {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      return JSON.parse(data) as LocalStorageData;
    }
  } catch (error) {
    console.error("Error reading localStorage data:", error);
  }
  return null;
}

export function saveLocalStorageData(data: LocalStorageData): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving localStorage data:", error);
  }
}

export function saveUserToLocalStorage(user: User): void {
  try {
    const data = getLocalStorageData();
    if (data) {
      data.user = user;
      saveLocalStorageData(data);
    } else {
      console.error("Failed to save user: LocalStorage data is missing.");
    }
  } catch (error) {
    console.error("Error saving user to localStorage:", error);
  }
}

export function saveCoursesToLocalStorage(courses: Course[]): void {
  try {
    const data = getLocalStorageData();
    if (data) {
      data.courses = courses;
      saveLocalStorageData(data);
    } else {
      console.error("Failed to save courses: LocalStorage data is missing.");
    }
  } catch (error) {
    console.error("Error saving courses to localStorage:", error);
  }
}

export function saveEnrollmentsToLocalStorage(enrollments: Enrollment[]): void {
  try {
    const data = getLocalStorageData();
    if (data) {
      data.enrollments = enrollments;
      saveLocalStorageData(data);
    } else {
      console.error("Failed to save enrollments: LocalStorage data is missing.");
    }
  } catch (error) {
    console.error("Error saving enrollments to localStorage:", error);
  }
}


export function clearLocalStorage(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    console.log("LocalStorage cleared successfully.");
  } catch (error) {
    console.error("Failed to clear localStorage:", error);
  }
}

export function resetLocalStorage(): void {
  try {
    clearLocalStorage();
    initializeLocalStorage();
  } catch (error) {
    console.error("Failed to reset localStorage:", error);
  }
}