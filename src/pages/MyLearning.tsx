import React, { useEffect, useState } from "react";
import { getLmsData, saveLmsData } from "../services/localStorageService";
import type { Course, Enrollment } from "../types";

const MyLearning: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [coursesMap, setCoursesMap] = useState<Record<string, Course>>({});

  useEffect(() => {
    const lmsData = getLmsData();

    if (!lmsData) return;

    const { courses, enrollments } = lmsData;

    // Create a map for quick course lookup
    const courseLookup: Record<string, Course> = {};
    courses.forEach((course) => {
      courseLookup[course.id] = course;
    });

    setCoursesMap(courseLookup);
    setEnrollments(enrollments);
  }, []);

  const handleProgressChange = (courseId: string, newProgress: number) => {
    if (newProgress < 0) newProgress = 0;
    if (newProgress > 100) newProgress = 100;

    const lmsData = getLmsData();
    if (!lmsData) return;

    const enrollmentIndex = lmsData.enrollments.findIndex(
      (e) => e.courseId === courseId
    );

    if (enrollmentIndex === -1) return;

    // Update the enrollment progress
    const updatedEnrollment: Enrollment = {
      ...lmsData.enrollments[enrollmentIndex],
      progress: newProgress,
      status: newProgress === 100 ? "completed" : "enrolled",
      completedAt: newProgress === 100 ? new Date().toISOString() : undefined,
    };

    // Update LMS data
    lmsData.enrollments[enrollmentIndex] = updatedEnrollment;
    saveLmsData(lmsData);

    // Update local state
    setEnrollments((prev) =>
      prev.map((e) => (e.courseId === courseId ? updatedEnrollment : e))
    );
  };

  if (enrollments.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Learning</h1>
        <p className="text-gray-500">
          You are not enrolled in any courses yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Learning</h1>
      <div className="space-y-6">
        {enrollments.map((enrollment) => {
          const course = coursesMap[enrollment.courseId];
          if (!course) return null;

          return (
            <div
              key={enrollment.courseId}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="mb-2">
                <strong>Status:</strong> {enrollment.status}
              </p>
              <p className="mb-2">
                <strong>Progress:</strong> {enrollment.progress}%
              </p>
              <input
                type="range"
                min={0}
                max={100}
                value={enrollment.progress}
                onChange={(e) =>
                  handleProgressChange(
                    enrollment.courseId,
                    Number(e.target.value)
                  )
                }
                className="w-full"
              />
              {enrollment.status === "completed" && (
                <p className="text-green-600 font-medium mt-2">
                  Completed on{" "}
                  {new Date(enrollment.completedAt!).toLocaleDateString()}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyLearning;
