import React from "react";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-[#2c3947] text-white p-4 shadow">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <NavLink to="/" className="text-inherit">
            Learning Management System
          </NavLink>
        </h1>

        <nav className="flex items-center gap-4">
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold" : ""}`
            }
          >
            Course Catalog
          </NavLink>
          <NavLink
            to="/my-learning"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold" : ""}`
            }
          >
            My Learning
          </NavLink>
          <NavLink
            to="/learning-history"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold" : ""}`
            }
          >
            Learning History
          </NavLink>

          <NavLink
            to="/my-profile"
            className="relative ml-4 flex items-center justify-center w-10 h-10 bg-white text-blue-600 rounded-full hover:shadow-md group"
          >
            <span className="font-bold">P</span>
            <div className="absolute top-full mt-2 hidden w-max px-2 py-1 text-sm text-white bg-gray-800 rounded shadow-md group-hover:block">
              My Profile
            </div>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
