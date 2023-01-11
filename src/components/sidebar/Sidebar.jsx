import "./side.scss";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { useState } from "react";

function Sidebar() {
  const [data, setData] = useState("");
  try {
  } catch (error) {}
  const handleLogout = () => {
    localStorage.clear();
    // localStorage.removeItem("id");
  };
  useEffect(() => {
    try {
      const list = [];
      const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "admin"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          // console.log(list[0]);

          // doc.data() is never undefined for query doc snapshots
        });
        setData(list[0]);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <div className="container">
        <div className="identity">
          <Link to="/" style={{ textDecoration: "none" }}>
            <p className="logo1">{data.name}</p>
          </Link>
          <img
            src={
              data.image
                ? data.image
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt="profile"
          />
          <p className="logo2">Admin</p>
        </div>
        <hr />

        <ul>
          <p className="titles">HOME</p>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <li>
              <DashboardOutlinedIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="titles">CLIENTS</p>
          <Link to="/new" style={{ textDecoration: "none", color: "black" }}>
            <li>
              <PersonAddOutlinedIcon className="icon" />
              <span>New</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none", color: "black" }}>
            <li>
              <GroupOutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <li>
            <ContactsOutlinedIcon className="icon" />
            <span>Contacts</span>
          </li>
          <p className="titles">USEFUL</p>

          <li>
            <NotificationAddOutlinedIcon className="icon" />
            <span>Notify</span>
          </li>
          <li>
            <QueryStatsOutlinedIcon className="icon" />
            <span>Stats</span>
          </li>
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
            <li>
              <LogoutOutlinedIcon className="icon" />

              <span onClick={() => handleLogout()}>Log out</span>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
