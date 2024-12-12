import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./componenets/Login";
import Navbar from "./componenets/Navbar";
import Register from "./componenets/Register";
import AdminLogin from "./componenets/AdminLogin";
import Aboutus from "./componenets/Aboutus";
import Home from "./componenets/Home";
import EmployeeDashboard from "./componenets/EmployeeDashboard";
import ProtectedRoute from "./componenets/ProtectedRoute";
import AdminDashboard from "./componenets/AdminDashboard";
import AdminProtectedRoute from "./componenets/AdminProtectedRoute";
import Leave from "./componenets/Leave";
import Footer from "./componenets/Footer";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin-login" element={<AdminLogin />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/aboutus" element={<Aboutus />}></Route>
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin-dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        ></Route>
        <Route
          path="/apply-leave"
          element={
            <ProtectedRoute>
              <Leave />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
