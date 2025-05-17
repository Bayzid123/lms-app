import React from "react";

interface SearchBarProps {
  query: string;
  onQueryChange: (newQuery: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  placeholder = "Search courses...",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search courses"
      />
    </div>
  );
};

export default SearchBar;
