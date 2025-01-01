import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  
  const handleSubmit = async (event)=>{
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        { name, email, password } // Ensure these keys match the backend's expectations
      );
      if(response.data.success){
        navigate('/')
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data); // Server error message
      } else {
        console.error('Error:', error.message);
      }
    }
    
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <div className="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter Name"
              required
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 "
            />
          </div>
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
              className="w-full px-4 py-2 text-sm  border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white text-center text-sm py-2 rounded-md hover:bg-teal-700 transition"
          >
            Signup
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already Have Account?{" "}
          <Link to="/login">Login</Link>
          {/* <a href="/login" className="text-teal-600 hover:underline">
            Login 
          </a> */}
        </p>
      </div>
    </div>
  );
};

export default Signup;
