import React, { useState, useEffect } from "react";
import type { User } from "../types";
import { validateEmail } from "../utils/validation";

interface MyProfileProps {
  user: User;
  onSave: (updatedUser: User) => void;
}

const MyProfile: React.FC<MyProfileProps> = ({ user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [preferredCategories, setPreferredCategories] = useState<string[]>(
    user.preferences.preferredCategories
  );
  const [notifications, setNotifications] = useState(
    user.preferences.notifications
  );
  const [error, setError] = useState("");

  useEffect(() => {
    // Update local state if the user prop changes
    setName(user.name);
    setEmail(user.email);
    setPreferredCategories(user.preferences.preferredCategories);
    setNotifications(user.preferences.notifications);
  }, [user]);

  const allCategories = ["Programming", "Business", "Marketing", "Design"];

  const toggleCategory = (category: string) => {
    if (preferredCategories.includes(category)) {
      setPreferredCategories(preferredCategories.filter((c) => c !== category));
    } else {
      setPreferredCategories([...preferredCategories, category]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    if (preferredCategories.length === 0) {
      setError("Select at least one preferred category");
      return;
    }

    const updatedUser: User = {
      ...user,
      name: name.trim(),
      email: email.trim(),
      preferences: {
        preferredCategories,
        notifications,
      },
    };
    onSave(updatedUser);
    setError("");
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Preferred Categories</label>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => (
              <label
                key={category}
                className="inline-flex items-center space-x-1"
              >
                <input
                  type="checkbox"
                  checked={preferredCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <span>Receive email notifications</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
