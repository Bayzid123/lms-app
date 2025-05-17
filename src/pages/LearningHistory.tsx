import React, { useEffect, useState } from "react";
import { getLmsData } from "../services/localStorageService";
import type { Course, Enrollment } from "../types";

const LearningHistory: React.FC = () => {
  const [completedEnrollments, setCompletedEnrollments] = useState<
    Enrollment[]
  >([]);
  const [coursesMap, setCoursesMap] = useState<Record<string, Course>>({});

  useEffect(() => {
    const lmsData = getLmsData();

    if (!lmsData) return;

    const { courses, enrollments } = lmsData;

    // Create a map for quick course lookup
    const map: Record<string, Course> = {};
    courses.forEach((course) => {
      map[course.id] = course;
    });
    setCoursesMap(map);

    // Filter only completed enrollments
    const completed = enrollments.filter((e) => e.status === "completed");
    setCompletedEnrollments(completed);
  }, []);

  // Calculate totals
  const totalCompleted = completedEnrollments.length;
  const totalHours = completedEnrollments.reduce((sum, enrollment) => {
    const course = coursesMap[enrollment.courseId];
    return course ? sum + course.duration : sum;
  }, 0);

  if (completedEnrollments.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Learning History</h1>
        <p>You have not completed any courses yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Learning History</h1>

      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">
              Course Title
            </th>
            <th className="border border-gray-300 p-2 text-left">Category</th>
            <th className="border border-gray-300 p-2 text-left">
              Completed At
            </th>
          </tr>
        </thead>
        <tbody>
          {completedEnrollments.map((enrollment) => {
            const course = coursesMap[enrollment.courseId];
            if (!course) return null;
            return (
              <tr key={enrollment.courseId}>
                <td className="border border-gray-300 p-2">{course.title}</td>
                <td className="border border-gray-300 p-2">
                  {course.category}
                </td>
                <td className="border border-gray-300 p-2">
                  {enrollment.completedAt
                    ? new Date(enrollment.completedAt).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="text-lg font-semibold">
        Total Courses Completed: {totalCompleted}
      </div>
      <div className="text-lg font-semibold">
        Total Learning Hours: {totalHours} hrs
      </div>
    </div>
  );
};

export default LearningHistory;
