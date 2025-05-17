import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Header from "./components/Header";
import CourseCatalog from "./pages/CourseCatalog";
import CourseDetails from "./pages/CourseDetails";
import LearningHistory from "./pages/LearningHistory";
import MyLearning from "./pages/MyLearning";
import MyProfile from "./pages/MyProfile";
import NotFound from "./pages/NotFound";
import type { User } from "./types";
import {
  getLocalStorageData,
  initializeLocalStorage,
  saveUserToLocalStorage,
} from "./utils/localStorageInit";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    initializeLocalStorage();
    const data = getLocalStorageData();
    if (data) {
      setUser(data.user);
    }
  }, []);

  const handleUserSave = (updatedUser: User) => {
    setUser(updatedUser);
    saveUserToLocalStorage(updatedUser);
  };

  if (!user) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="p-4 max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/courses" replace />} />
            <Route path="/courses" element={<CourseCatalog />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/my-learning" element={<MyLearning />} />
            <Route
              path="/my-profile"
              element={<MyProfile user={user} onSave={handleUserSave} />}
            />
            <Route path="/learning-history" element={<LearningHistory />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="bg-gray-200 text-center p-4 mt-8">
          &copy; 2025 LMS App. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;
