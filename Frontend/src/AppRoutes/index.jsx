import React from "react";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
