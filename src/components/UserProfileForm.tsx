import React, { useState, useEffect } from "react";
import { validateEmail } from "../utils/validation";
import type { User } from "../types";

interface UserProfileFormProps {
  user: User;
  onSave: (updatedUser: User) => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [preferredCategories, setPreferredCategories] = useState<string[]>(
    user.preferences.preferredCategories
  );
  const [notifications, setNotifications] = useState(
    user.preferences.notifications
  );
  const [error, setError] = useState<string | null>(null);

  const categories = ["Programming", "Business", "Design", "Marketing"];

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPreferredCategories(user.preferences.preferredCategories);
    setNotifications(user.preferences.notifications);
  }, [user]);

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
      setError("Name cannot be empty.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (preferredCategories.length === 0) {
      setError("Select at least one preferred category.");
      return;
    }
    setError(null);
    onSave({
      ...user,
      name: name.trim(),
      email: email.trim(),
      preferences: {
        preferredCategories,
        notifications,
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <fieldset className="mb-4">
        <legend className="font-medium mb-2">Preferred Categories</legend>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <label
              key={category}
              className="inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={preferredCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mb-4">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="mr-2"
          />
          Receive email notifications
        </label>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Save Changes
      </button>
    </form>
  );
};

export default UserProfileForm;
