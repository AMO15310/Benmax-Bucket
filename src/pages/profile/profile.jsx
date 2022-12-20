import React from "react";
import Navbar from "../../components/navbar/Navbar";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import "./profile.scss";
import List from "../../components/table/Table";

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
        <div className="profile">
          <div className="top">
            <div className="left">
              <div className="editButton">Edit</div>
              <h1 className="title">Information</h1>
              <div className="item">
                <div className="mains">
                  <PersonOutlinedIcon className="itemImg" />
                  <h1 className="itemTitle">Jane cole</h1>
                </div>
                <div className="details">
                  <div className="wrapper">
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">janecole@gmail.com</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone:</span>
                      <span className="itemValue">0746546513</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Meter number:</span>
                      <span className="itemValue">222456</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Amount:</span>
                      <span className="itemValue">6000</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Paid:</span>
                      <span className="itemValue">4000</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Balance:</span>
                      <span className="itemValue">2000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <Chart aspect={3 / 1} title="Users revenue last 6 months" />
            </div>
          </div>
          <div className="bottom">
            <h1 className="title">Last transactions</h1>
            <List />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
