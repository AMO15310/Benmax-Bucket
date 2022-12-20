import Home from "./pages/home/Home";
import "./App.css";
import React, { useContext, useState } from "react";

import Users from "./pages/users/users";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/profile/profile";
import New from "./pages/new/new";
import "./style/dark.scss";
import { darkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(darkModeContext);
  return (
    <div className={darkMode ? "content dark" : "content"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<Profile />} />
          <Route path="/new" element={<New />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
