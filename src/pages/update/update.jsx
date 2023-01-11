import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

const Update = ({ clients }) => {
  useEffect(() => {
    const getData = async () => {
      try {
        const newId = localStorage.getItem("id");

        const docRef = doc(db, "users", newId);
        const docSnap = await getDoc(docRef);

        const clients = docSnap.data();

        // const newclients = Object.entries(clients);
        localStorage.setItem("unit", clients["unit_cost"]);
        localStorage.setItem("initial", clients["initial_units"]);
        localStorage.setItem("img", clients["image"]);
        localStorage.setItem("meter", clients["meter_number"]);
        localStorage.setItem("name", clients["name"]);
        localStorage.setItem("paid", clients["paid_units"]);
        localStorage.setItem("final", clients["final_units"]);
        localStorage.setItem("contact", clients["contact"]);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const name = localStorage.getItem("name");
  const img = localStorage.getItem("img");
  const meter = localStorage.getItem("meter");
  const initial = localStorage.getItem("initial");
  const paid = localStorage.getItem("paid");
  const final = localStorage.getItem("final");
  const contact = localStorage.getItem("contact");
  const unit = localStorage.getItem("unit");
  const [file, setFile] = useState("");
  const [Name, setName] = useState(name);
  const [Contact, setContact] = useState(contact);
  const [Meter, setMeter] = useState(meter);
  const [Email, setEmail] = useState(unit);
  const [Initial, setInitial] = useState(initial);
  const [Final, setFinal] = useState(final);
  const [Paid, setPaid] = useState(paid);
  const [sent, setSent] = useState(false);
  const [Error, setError] = useState(false);

  const newId = localStorage.getItem("id");
  const navigate = useNavigate();
  // const getData = async (id) => {
  //   console.log(id);
  //   try {
  //     const docRef = doc(db, "users", id);
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       const list = [];
  //       // const values = Object.values(docSnap.data());
  //       // console.log(values);
  //       // list.push(values);
  //       list.push({ ...docSnap.data() });
  //       // setName(list[0].name);
  //       // setEmail(list[0].email);
  //       // setContact(list[0].contact);
  //       // setMeter(list[0].meter_number);
  //       // setPaid(list[0].paid_units);
  //       // setFile(list[0].image);
  //       // setInitial(list[0].initial_units);
  //       // setFinal(list[0].final_units);
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const sendData = async (e) => {
    e.preventDefault();
    console.log(newId);
    const data = {};

    try {
      await setDoc(doc(db, "users", newId), {
        name: Name,
        contact: Contact,
        image: file || null,
        final_units: Final,
        initial_units: Initial,
        paid_units: Paid,
        meter_number: Meter,
        consumed_units: Final - Initial,
        unit_cost: Email,
        total: (Final - Initial) * Email,
        balance: (Final - Initial) * Email - Paid,
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
      console.log(error);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  };
  // getData(newId);
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
              <form action="" onSubmit={(e) => sendData(e)}>
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
                  <input
                    type="text"
                    // placeholder={Name}
                    value={Name}
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
                    value={Contact}
                    onChange={(e) => setContact(e.target.value)}
                    // placeholder={Contact}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="meternumber">Meter Number</label>
                  <input
                    onChange={(e) => setMeter(e.target.value)}
                    type="text"
                    value={Meter}
                    // placeholder={Meter}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="email">Unit cost</label>
                  <input
                    type="number"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    // placeholder={Email}
                  />
                </div>

                <div className="formInput">
                  <label htmlFor="initialunits">Initial Units</label>
                  <input
                    type="number"
                    value={Initial}
                    onChange={(e) => setInitial(e.target.value)}
                    // placeholder={Initial}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="finalunits">Final Units</label>
                  <input
                    type="number"
                    value={Final}
                    onChange={(e) => setFinal(e.target.value)}
                    // placeholder={Final}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="paid">Paid</label>
                  <input
                    type="number"
                    value={Paid}
                    onChange={(e) => setPaid(e.target.value)}
                    // placeholder={Paid}
                  />
                </div>
                <button
                  //   disabled={percentage !== null && percentage < 100}
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Update;
