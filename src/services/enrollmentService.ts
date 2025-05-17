import type { Enrollment, Course } from '../types';
import { getLmsData, saveLmsData } from './localStorageService';

export function isUserEnrolledInCourse(userId: string, courseId: string): boolean {
  const data = getLmsData();
  if (!data) return false;

  return data.enrollments.some(
    (enrollment) => enrollment.userId === userId && enrollment.courseId === courseId
  );
}

export function canEnroll(userId: string, course: Course): { canEnroll: boolean; missingPrereqs: string[] } {
  const data = getLmsData();
  if (!data) return { canEnroll: false, missingPrereqs: [] };

  const completedCourseIds = data.enrollments
    .filter((e) => e.userId === userId && e.status === 'completed')
    .map((e) => e.courseId);

  const missingPrereqs = course.prerequisites.filter((prereqId) => !completedCourseIds.includes(prereqId));

  return {
    canEnroll: missingPrereqs.length === 0,
    missingPrereqs,
  };
}

export function enrollUserInCourse(userId: string, courseId: string): boolean {
  const data = getLmsData();
  if (!data) return false;

  // Prevent duplicate enrollments
  const alreadyEnrolled = isUserEnrolledInCourse(userId, courseId);
  if (alreadyEnrolled) return false;

  const newEnrollment: Enrollment = {
    userId,
    courseId,
    status: 'enrolled',
    progress: 0,
    enrolledAt: new Date().toISOString(),
  };

  data.enrollments.push(newEnrollment);
  saveLmsData(data);

  return true;
}

export function updateEnrollmentProgress(userId: string, courseId: string, progress: number): boolean {
  const data = getLmsData();
  if (!data) return false;

  const enrollment = data.enrollments.find(
    (e) => e.userId === userId && e.courseId === courseId
  );

  if (!enrollment) return false;

  enrollment.progress = progress;

  if (progress === 100) {
    enrollment.status = 'completed';
    enrollment.completedAt = new Date().toISOString();
  } else {
    enrollment.status = 'enrolled';
    delete enrollment.completedAt;
  }

  saveLmsData(data);

  return true;
}
