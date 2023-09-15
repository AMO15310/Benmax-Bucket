import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";

function New() {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [Name, setName] = useState("");
  const [Contact, setContact] = useState("");
  const [Email, setEmail] = useState("null");
  const [Final, setFinal] = useState("");
  const [Initial, setInitial] = useState("");
  const [Paid, setPaid] = useState("");
  const [Meter, setMeter] = useState("");
  const [Error1, setError1] = useState(false);
  const [Error2, setError2] = useState(false);
  const [Sent, setSent] = useState(false);
  const [percentage, setPercentage] = useState(null);
  const [uploadingText, setuploadingText] = useState("");

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
          setuploadingText("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              setuploadingText("Upload is Paused");

              break;
            case "running":
              // setuploadingText("Upload is Running");

              break;
            default:
              break;
          }
        },
        (error) => {
          setuploadingText("Upload Failed");
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // setData((prev) => ({ ...prev, img:downloadURL }));
            setImage(downloadURL);
            // setFile(downloadURL);
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Name || !Contact || !Final || !Initial || !Meter) {
      setError1(true);
      setTimeout(() => {
        setError1(false);
      }, 4000);
      return;
    } else {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          name: Name,
          contact: Contact,
          email: Email,
          image: image || null,
          final_units: Final,
          initial_units: Initial,
          paid_units: Paid,
          meter_number: Meter,
          consumed_units: Final - Initial,
          unit_cost: 120,
          total: (Final - Initial) * 120,
          balance: (Final - Initial) * 120 - Paid,
          timeStamp: new Date(),
        });
        setSent(true);
        setTimeout(() => {
          setSent(false);
        }, 4000);
      } catch (error) {
        console.log(error);
        setError2(true);
        setTimeout(() => {
          setError2(false);
        }, 4000);
      }
    }
  };

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
            <div className="messErr1">
              {Error1 && "Please Fill all Fields.."}
            </div>
            <div className="messErr2">
              {Error2 && "Something Went wrong try again Later..."}
            </div>
            <div className="messSucc">{Sent && "User Added Succesfully"}</div>
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
              <form action="" onSubmit={handleSubmit}>
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none", paddingBottom: "1rem" }}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <div className="messSucc">{uploadingText}</div>
                </div>
                <div className="formInput">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    placeholder="Name"
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
                <div className="formInput">
                  <label htmlFor="phone">Contact</label>
                  <input
                    type="number"
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="07 xx xx xx xx"
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="meternumber">Meter Number</label>
                  <input
                    onChange={(e) => setMeter(e.target.value)}
                    type="text"
                    placeholder="meter no"
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="...@example.com"
                  />
                </div>

                <div className="formInput">
                  <label htmlFor="initialunits">Initial Units</label>
                  <input
                    type="number"
                    onChange={(e) => setInitial(e.target.value)}
                    placeholder="initial units"
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="finalunits">Final Units</label>
                  <input
                    type="number"
                    onChange={(e) => setFinal(e.target.value)}
                    placeholder="final units"
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="paid">Paid</label>
                  <input
                    type="number"
                    onChange={(e) => setPaid(e.target.value)}
                    placeholder="paid amount"
                  />
                </div>
                <button
                  disabled={percentage !== null && percentage < 100}
                  type="submit"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
