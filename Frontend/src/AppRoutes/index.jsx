import React from "react";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";
import { Routes, Route } from "react-router-dom";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
