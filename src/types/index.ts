export interface Course {
    id: string;
    title: string;
    description: string;
    category: string; // e.g., "Programming", "Design"
    isFree: boolean;
    prerequisites: string[]; // List of course IDs required
    duration: number; // Duration in hours
  }
  
  export interface Enrollment {
    userId: string;
    courseId: string;
    status: 'enrolled' | 'completed';
    progress: number; // Percentage completed (0–100)
    enrolledAt: string; // ISO date string
    completedAt?: string; // ISO date string, if completed
  }
  
  export interface User {
    userId: string;
    name: string;
    email: string;
    preferences: {
      preferredCategories: string[]; // e.g., ["Programming", "Design"]
      notifications: boolean; // Receive email notifications
    };
  }
  
  export interface LocalStorageData {
    courses: Course[];
    enrollments: Enrollment[];
    user: User;
  }
  