import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import "./admin.scss";

const Admin = () => {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [Name, setName] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [sent, setSent] = useState(false);
  const [Error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storage = getStorage();
      console.log(name);
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentage(progress);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImage(downloadURL);
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const sendData = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "admin", "vTPLdTF0igKNdwFiYu5f"), {
        name: Name,
        image: image || null,
        timeStamp: new Date(),
      });
      console.log("updated");
      setSent(true);
      navigate(-1);
      setTimeout(() => {
        setSent(false);
      }, 4000);
    } catch (error) {
      console.log(error);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  };
  return (
    <>
      <div className="new">
        <div className="common">
          <Sidebar />
        </div>
        <div className="ToppandDown">
          <div className="nav">
            <Navbar />
          </div>
          <div className="others">
            <div className="messages">
              <div className="messErr2">
                {Error && "Something Went wrong try again Later..."}
              </div>
              <div className="messSucc">{sent && " Succesfully Updated"}</div>
            </div>
            <div className="form">
              <form
                action=""
                onSubmit={(e) => {
                  sendData(e);
                }}
              >
                <div className="formInput">
                  <label
                    htmlFor="file"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                    <img
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt="no image"
                    />
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
                  <input
                    type="text"
                    placeholder={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* <div className="formInput">
                  <label htmlFor="unitcost">Unit Cost</label>
                  <input
                    type="number"
                    value="120"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div> */}

                <button
                  type="submit"
                  disabled={percentage !== null && percentage < 100}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
