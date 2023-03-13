import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocalState } from "./util/useLocalStorage";
import PrivateRoute from "./PrivateRoute";
import jwt_decode from "jwt-decode";

import Login from "./components/Login";
import Home from "./components/Home";
import Test from "./components/Test";
import NavBar from "./components/NavBar";

function App() {
  const [token, setToken] = useLocalState("", "token");
  const [role, setRole] = useState(getRoleFromToken());

  function getRoleFromToken() {
    if (token) {
      if (token.length > 50) {
        const decodeToken = jwt_decode(token);
        return decodeToken.authorities[0].authority;
      }
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/test/*"
            element={
              role === "ROLE_ADMIN" ? (
                <PrivateRoute>
                  <Test />
                </PrivateRoute>
              ) : (
                <PrivateRoute>
                  <NavBar />
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
