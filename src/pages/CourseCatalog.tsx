import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import CourseFilter from "../components/CourseFilter";
import SearchBar from "../components/SearchBar";
import type { Course } from "../types";
import { getLmsData } from "../services/localStorageService";

const CourseCatalog: React.FC = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{ category: string; isFree: string }>({
    category: "All",
    isFree: "All",
  });
  const [sortOption, setSortOption] = useState<"title" | "duration">("title");

  useEffect(() => {
    const lmsData = getLmsData();
    const allCourses = lmsData?.courses ?? [];
    setCourses(allCourses);
    setFilteredCourses(allCourses);
  }, []);

  useEffect(() => {
    let result = courses;

    if (filters.category !== "All") {
      result = result.filter((course) => course.category === filters.category);
    }

    if (filters.isFree === "Free") {
      result = result.filter((course) => course.isFree);
    } else if (filters.isFree === "Paid") {
      result = result.filter((course) => !course.isFree);
    }

    if (searchQuery) {
      result = result.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    result = [...result].sort((a, b) =>
      sortOption === "title"
        ? a.title.localeCompare(b.title)
        : a.duration - b.duration
    );

    setFilteredCourses(result);
  }, [filters, searchQuery, courses, sortOption]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Course Catalog</h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
        <div className="flex items-center gap-4">
          <CourseFilter
            categories={["Programming", "Design", "Marketing", "Business"]}
            onFilterChange={setFilters}
          />
          <div className="mb-4">
            <label htmlFor="sort" className="mr-2 font-medium">
              Sort By:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value as "title" | "duration")
              }
              className="border rounded px-2 py-1"
            >
              <option value="title">Title</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => navigate(`/courses/${course.id}`)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          No courses found matching your criteria.
        </p>
      )}
    </div>
  );
};

export default CourseCatalog;
