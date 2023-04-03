import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import NavBar from "./NavBar";
import { Route, Routes } from "react-router-dom";

import Utilisateurs from "./Utilisateurs";
import Update from "./Update";
import Register from "./Register";
import DashBoard from "./DashBoard";
import Sidebar from "./Sidebar";
import PrivateRoute from "../PrivateRoute";
import ChatSystem from "./ChatSystem";

export default function AdminDashboard() {
  const { activeMenu } = useStateContext();

  return (
    <div className="flex relative w-full bg-red-300">
        {activeMenu && <Sidebar />}
        <ChatSystem />
        <div
          className={
            activeMenu
              ? "min-h-screen md:ml-72 w-screen max-w-full"
              : "min-h-screen w-screen max-w-full"
          }
        >
          <div className="bg-[#FAFBFB]">
            <NavBar />
          </div>
          <div>
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
            ;
          </div>
        </div>
    </div>
  );
}
