"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const UserProfile = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Load username from localStorage (if logged in)
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username"); // Remove username from storage
    setUsername(null); // Reset state
    setIsDropdownOpen(false); // Close dropdown
    window.location.reload(); // Reload to reflect changes
  };

  return (
    <div className="relative">
      {/* Profile Icon & Username */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Image
          src="/assets/icons/user.svg"
          alt="Profile"
          width={28}
          height={28}
          className="object-contain"
        />
        {username && <span className="text-sm font-medium">{username}</span>}
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md p-2">
          <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100">Welcome, <span className="text-red-500">{username}!</span></button>
          <button
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
