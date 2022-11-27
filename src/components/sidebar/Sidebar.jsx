import "./side.css";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function Sidebar() {
  return (
    <>
      <div className="container">
        <div className="identity">
          <p className="logo1">Amos W</p>
          <img
            src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="profile img"
          />
          <p className="logo2">Admin</p>
        </div>
        <hr />

        <ul>
          <p className="titles">HOME</p>
          <li>
            <DashboardOutlinedIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="titles">CLIENTS</p>

          <li>
            <PersonAddOutlinedIcon className="icon" />
            <span>New</span>
          </li>
          <li>
            <GroupOutlinedIcon className="icon" />
            <span>Users</span>
          </li>
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
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <LogoutOutlinedIcon className="icon" />
            <span>Log out</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
