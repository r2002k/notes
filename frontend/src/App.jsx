import React from "react";
import Signup from "./pages/signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <div className="text-4xl">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Signup />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login/>}></Route>
          </Routes>
          <ToastContainer className='text-sm' />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
