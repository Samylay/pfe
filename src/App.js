import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocalState } from "./util/useLocalStorage";
import PrivateRoute from "./PrivateRoute";
import jwt_decode from "jwt-decode";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const [token] = useLocalState("", "token");
  const [role] = useState(getRoleFromToken());

  function getRoleFromToken() {
    if (token) {
      if (token.length > 50) {
        const decodeToken = jwt_decode(token);
        return decodeToken.authorities[0].authority;
      }
    }
  }

  return (
    <div className="bg-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/support" element={<Support />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/dashboard/*"
            element={
              role === "ROLE_ADMIN" ? (
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              ) : (
                <PrivateRoute>
                  {/* this should be the user dashboard */}
                  <UserDashboard />
                </PrivateRoute>
              )
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
