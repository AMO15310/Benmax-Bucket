import "./navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ModelTrainingOutlinedIcon from "@mui/icons-material/ModelTrainingOutlined";
function Navbar() {
  return (
    <div className="navigation">
      <div className="left">
        <input type="text" className="searchInput" placeholder="Search..." />
        <SearchOutlinedIcon className="icons" />
      </div>
      <div className="right">
        <SettingsSuggestOutlinedIcon className="icons" />
        <NotificationsActiveOutlinedIcon className="icons" />
        <ModelTrainingOutlinedIcon className="icons" />
      </div>
    </div>
  );
}

export default Navbar;
