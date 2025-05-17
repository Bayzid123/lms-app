import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLmsData, saveLmsData } from "../services/localStorageService";
import { toast } from "react-toastify";
import type { Course, Enrollment } from "../types";

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [prerequisitesMet, setPrerequisitesMet] = useState(true);
  const [prerequisiteTitles, setPrerequisiteTitles] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const lmsData = getLmsData();

    if (!lmsData) {
      setCourse(null);
      return;
    }

    const allCourses = lmsData.courses ?? [];
    const foundCourse = allCourses.find((c) => c.id === id) ?? null;
    setCourse(foundCourse);

    const enrollments = lmsData.enrollments ?? [];

    if (foundCourse) {
      const enrolled = enrollments.some(
        (enrollment) => enrollment.courseId === foundCourse.id
      );
      setIsEnrolled(enrolled);

      if (foundCourse.prerequisites.length > 0) {
        const unmetPrerequisites = foundCourse.prerequisites.some(
          (prereqId) =>
            !enrollments.some(
              (enrollment) =>
                enrollment.courseId === prereqId &&
                enrollment.status === "completed"
            )
        );
        setPrerequisitesMet(!unmetPrerequisites);

        const titles = foundCourse.prerequisites
          .map((prereqId) => {
            const prereqCourse = allCourses.find((c) => c.id === prereqId);
            return prereqCourse ? prereqCourse.title : null;
          })
          .filter((title): title is string => title !== null);
        setPrerequisiteTitles(titles);
      } else {
        setPrerequisitesMet(true);
        setPrerequisiteTitles([]);
      }
    }
  }, [id]);

  const enrollInCourse = (courseId: string) => {
    const lmsData = getLmsData();
    if (!lmsData) return;

    const { user, enrollments } = lmsData;

    const existingEnrollment = enrollments.find((e) => e.courseId === courseId);

    if (existingEnrollment) return;

    const newEnrollment: Enrollment = {
      userId: user.userId,
      courseId,
      status: "enrolled",
      progress: 0,
      enrolledAt: new Date().toISOString(),
    };

    const updatedEnrollments = [...enrollments, newEnrollment];

    saveLmsData({ ...lmsData, enrollments: updatedEnrollments });
  };

  const handleEnroll = () => {
    if (!prerequisitesMet) {
      toast.error("You have not completed the prerequisites for this course.");
      return;
    }
    if (isEnrolled) {
      toast.warn("You are already enrolled in this course.");
      return;
    }

    if (course) {
      enrollInCourse(course.id);
      toast.success("Successfully enrolled in the course!");
      setIsEnrolled(true);
    }
  };

  if (!course) {
    return <p>Course not found.</p>;
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back to Courses
      </button>
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-2">{course.description}</p>
      <p className="mb-2">
        <strong>Category:</strong> {course.category}
      </p>
      <p className="mb-2">
        <strong>Duration:</strong> {course.duration} hours
      </p>
      <p className="mb-2">
        <strong>Status:</strong> {course.isFree ? "Free" : "Paid"}
      </p>
      {prerequisiteTitles.length > 0 && (
        <p className="mb-2">
          <strong>Prerequisites:</strong> {prerequisiteTitles.join(", ")}
        </p>
      )}
      <button
        onClick={handleEnroll}
        className={`mt-4 p-2 text-white ${
          isEnrolled ? "bg-gray-500 cursor-not-allowed" : "bg-green-500"
        }`}
        disabled={isEnrolled}
      >
        {isEnrolled ? "Already Enrolled" : "Enroll"}
      </button>
    </div>
  );
};

export default CourseDetails;
