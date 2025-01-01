import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";
import {toast} from 'react-toastify'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login", // Change to the correct endpoint
        { email, password }
      );
      console.log(response.data); // Check the response structure
      if (response.data.success) {
        login(response.data.user)
        localStorage.setItem("token", response.data.token);
        navigate("/");
        
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data); // Server error
      } else if (error.request) {
        console.error("Error request:", error.request); // No response from server
      } else {
        console.error("Error:", error.message); // Other errors
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-xl">
      <div className="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter Email"
              required
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="*****"
              required
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white text-center text-sm py-2 rounded-md hover:bg-teal-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don't Have an Account?{" "}
          <Link to="/register" className="text-teal-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
