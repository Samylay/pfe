import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import NavBar from "../components/NavBar";
import { Route, Routes } from "react-router-dom";

import Utilisateurs from "../components/Utilisateurs";
import Update from "../components/Update";
import Register from "../components/Register";
import DashBoard from "../components/DashBoard";
import Sidebar from "../components/Sidebar";
import PrivateRoute from "../PrivateRoute";
import ChatSystem from "../components/ChatSystem";
import KPI from "../components/KPI";

export default function AdminDashboard() {
  const { activeMenu } = useStateContext();
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  return (
    <div className="  w-full h-full">
      {activeMenu && <Sidebar />}
      <div
        className={
          activeMenu
            ? "min-h-screen md:ml-72 w-screen max-w-full"
            : "min-h-screen w-screen max-w-full"
        }
      >
        <ChatSystem />
        <div className="bg-[#FAFBFB]">
          <NavBar />
        </div>
        <div className={isMobile ?"hidden":""}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <DashBoard />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/Kpi"
              element={
                <PrivateRoute>
                  <KPI />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <Utilisateurs />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/register"
              element={
                <PrivateRoute>
                  <Register />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/update/:id"
              element={
                <PrivateRoute>
                  <Update />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
