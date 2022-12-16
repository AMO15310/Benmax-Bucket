import Home from "./pages/home/Home";
import "./App.css";
import Users from "./pages/users/users";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/profile/profile";

function App() {
  return (
    <div className="content">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
