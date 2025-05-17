import React, { useState, useEffect } from "react";

interface CourseFilterProps {
  categories: string[];
  onFilterChange: (filters: { category: string; isFree: string }) => void;
}

const CourseFilter: React.FC<CourseFilterProps> = ({
  categories,
  onFilterChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedFreeStatus, setSelectedFreeStatus] = useState<string>("All");

  useEffect(() => {
    onFilterChange({ category: selectedCategory, isFree: selectedFreeStatus });
  }, [selectedCategory, selectedFreeStatus, onFilterChange]);

  return (
    <div className="flex flex-wrap gap-4 mb-4 items-center">
      <div>
        <label htmlFor="category" className="mr-2 font-medium">
          Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="All">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="freeStatus" className="mr-2 font-medium">
          Status:
        </label>
        <select
          id="freeStatus"
          value={selectedFreeStatus}
          onChange={(e) => setSelectedFreeStatus(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="All">All</option>
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>
      </div>
    </div>
  );
};

export default CourseFilter;
