import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocalState } from "./util/useLocalStorage";
import PrivateRoute from "./PrivateRoute";
import jwt_decode from "jwt-decode";

import Login from "./pages/Login";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";


function App() {
  const [token] = useLocalState("", "token");
  const [role ] = useState(getRoleFromToken());

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
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
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
