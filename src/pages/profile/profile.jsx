import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import "./profile.scss";
import List from "../../components/table/Table";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";

function Profile(props) {
  const [Name, setName] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Phone, setPhone] = useState(null);
  const [Meter, setMeter] = useState(null);
  const [Amount, setAmount] = useState(null);
  const [Paid, setPaid] = useState(null);
  const [Balance, setBalance] = useState(null);
  const [image, setImage] = useState(null);
  const newId = localStorage.getItem("id");
  const getData = async (id) => {
    try {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const list = [];
        // const values = Object.values(docSnap.data());
        // console.log(values);
        // list.push(values);
        // console.log(list["Name"]);
        list.push({ ...docSnap.data() });
        setName(list[0].name);
        setEmail(list[0].email);
        setPhone(list[0].contact);
        setMeter(list[0].meter_number);
        setAmount(list[0].total);
        setPaid(list[0].paid_units);
        setBalance(list[0].balance);
        setImage(list[0].image);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  getData(newId);

  //  const list = [];
  //       const fetchData = async () => {
  //         const querySnapshot = await getDocs(collection(db, "users"));
  //         querySnapshot.forEach((doc) => {
  //           list.push({ id: doc.id, ...doc.data() });
  //           // console.log(list);

  //           // doc.data() is never undefined for query doc snapshots
  //         });}

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
              <Link to="/users/view/update">
                <div className="editButton">Edit</div>
              </Link>
              <h1 className="title">Information</h1>
              <div className="item">
                <div className="mains">
                  {image ? (
                    <img src={image} alt="image" className="itemImg" />
                  ) : (
                    <PersonOutlinedIcon className="itemImg" />
                  )}
                  <h1 className="itemTitle">{Name}</h1>
                </div>
                <div className="details">
                  <div className="wrapper">
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{Email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone:</span>
                      <span className="itemValue">{Phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Meter number:</span>
                      <span className="itemValue">{Meter}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Amount:</span>
                      <span className="itemValue">{Amount}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Paid:</span>
                      <span className="itemValue">{Paid}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Balance:</span>
                      <span className="itemValue">{Balance}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <Chart aspect={3 / 1} title="Users revenue last 6 months" />
            </div>
          </div>
          {/* <div className="bottom">
            <h1 className="title">Last transactions</h1>
            <List />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
