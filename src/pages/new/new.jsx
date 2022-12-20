import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";

function New() {
  const [file, setFile] = useState("");
  return (
    <div className="new">
      <div className="common">
        <Sidebar />
      </div>
      <div className="TopandDown">
        <div className="nav">
          <Navbar />
        </div>
        <div className="others">
          <div className="top">
            <h1 className="title">Add new user</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="no image"
              />
            </div>
            <div className="right">
              <form action="">
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="username">Username</label>
                  <input type="text" placeholder="Name" />
                </div>
                <div className="formInput">
                  <label htmlFor="phone">Contact</label>
                  <input type="number" placeholder="07 xx xx xx xx" />
                </div>
                <div className="formInput">
                  <label htmlFor="meternumber">Meter Number</label>
                  <input type="text" placeholder="meter no" />
                </div>
                <div className="formInput">
                  <label htmlFor="email">Email</label>
                  <input type="email" placeholder="...@example.com" />
                </div>

                <div className="formInput">
                  <label htmlFor="initialunits">Initial Units</label>
                  <input type="number" placeholder="initial units" />
                </div>
                <div className="formInput">
                  <label htmlFor="finalunits">Final Units</label>
                  <input type="number" placeholder="final units" />
                </div>
                <div className="formInput">
                  <label htmlFor="paid">Paid</label>
                  <input type="number" placeholder="paid amount" />
                </div>
                <button>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
