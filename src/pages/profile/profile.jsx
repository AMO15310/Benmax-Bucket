import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./profile.scss";

function Profile() {
  return (
    <div className="single">
      <div className="common">
        <Sidebar />
      </div>
      <div className="TopandDown">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="profile"></div>
      </div>
    </div>
  );
}

export default Profile;
