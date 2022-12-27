import Home from "./pages/home/Home";
import "./App.css";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Users from "./pages/users/users";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/profile/profile";
import New from "./pages/new/new";
import "./style/dark.scss";
import { darkModeContext } from "./context/darkModeContext";
import Inputs from "./components/signup/inputs1";
import LoginForm from "./components/login/login";
import { AuthContext } from "./context/authContext";

function App() {
  const { darkMode } = useContext(darkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <div className={darkMode ? "content dark" : "content"}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<Inputs />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/users"
            element={
              <RequireAuth>
                <Users />
              </RequireAuth>
            }
          />
          <Route
            path="/users/:id"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/new"
            element={
              <RequireAuth>
                <New />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
