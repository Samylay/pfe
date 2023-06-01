import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocalState } from "./hooks/useLocalStorage";
import jwt_decode from "jwt-decode";

import AppRoutes from "./AppRoutes";

function App() {
  const [token] = useLocalState("", "token");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const userRole = decodedToken.authorities[0].authority;
        setRole(userRole);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  return (
    <div className=" bg-white ">
      <BrowserRouter>
        <AppRoutes role={role} />
      </BrowserRouter>
    </div>
  );
}

export default App;
