import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./PrivateRoute";
import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

const AppRoutes = ({ role }) => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/support" element={<Support />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgotpassword" element={<ForgotPassword />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/dashboard/*"
      element={
        role === "ROLE_ADMIN" ? (
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        ) : (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        )
      }
    />
    {/* <Route path="*" element={<NotFound />} /> */}
  </Routes>
);

export default AppRoutes;
