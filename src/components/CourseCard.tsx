import React from "react";
import type { Course } from "../types";

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <div
      className="border rounded-md p-4 shadow-sm cursor-pointer hover:shadow-md transition"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
    >
      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
      <p className="text-sm text-gray-600 mb-1">Category: {course.category}</p>
      <p className="text-sm text-gray-600 mb-1">
        Duration: {course.duration} {course.duration === 1 ? "hour" : "hours"}
      </p>
      <p
        className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
          course.isFree
            ? "bg-green-200 text-green-800"
            : "bg-yellow-200 text-yellow-800"
        }`}
      >
        {course.isFree ? "Free" : "Paid"}
      </p>
    </div>
  );
};

export default CourseCard;
