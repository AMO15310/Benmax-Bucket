import "./navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ModelTrainingOutlinedIcon from "@mui/icons-material/ModelTrainingOutlined";
import { useContext, useState } from "react";
import { darkModeContext } from "../../context/darkModeContext";
function Navbar() {
  const { dispatch } = useContext(darkModeContext);
  const [searchTerm, setSearchTerm] = useState("");
  localStorage.setItem("search", searchTerm);
  return (
    <div className="navigation">
      <div className="left">
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchInput"
          placeholder="Search..."
        />
        <SearchOutlinedIcon className="icons" />
      </div>
      <div className="right">
        <SettingsSuggestOutlinedIcon className="icons" />
        <NotificationsActiveOutlinedIcon className="icons" />
        <ModelTrainingOutlinedIcon
          className="icons"
          onClick={() => dispatch({ type: "TOGGLE" })}
        />
      </div>
    </div>
  );
}

export default Navbar;
