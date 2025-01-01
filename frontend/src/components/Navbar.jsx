import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";
const Navbar = ({setQuery}) => {
  const { user, logout} = useAuth(); // Fetch user state
  
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      {/* Logo or App Name */}
      <div className="text-xl font-bold">
        <Link to="/">NotesApp</Link>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search notes..."
        className="bg-gray-600 px-4 py-2 rounded text-xl"
        onChange={(e)=> setQuery(e.target.value)}
      />

      {/* Links and Logout Button */}
      <div>
        {!user ? (
          <>
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded mr-4 text-xl">
              Login
            </Link>
            <Link to="/signup" className="bg-green-500 px-4 py-2 rounded mr-4 text-xl">
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="mr-4 text-xl">{user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded text-xl"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
