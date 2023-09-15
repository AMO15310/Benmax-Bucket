import React, { useState } from "react";
import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const Featured = () => {
  const [total, setTotal] = useState(null);
  const [perc, setPerc] = useState(0);
  const fetchData = async () => {
    const array = [];
    const array2 = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data().total);
      const sumtotal = array.reduce(function (a, b) {
        return a + b;
      }, 0);
      setTotal(sumtotal);
      const paidcash = Number(doc.data().paid_units);
      array2.push(paidcash);
      const sumpaid = array2.reduce(function (a, b) {
        return a + b;
      }, 0);
      const percPiad = Math.round((sumpaid / total) * 100);

      setPerc(percPiad);
    });
  };
  fetchData();

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total paid In Account</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={perc}
            text={perc + " %"}
            strokeWidth={3.5}
          />
        </div>
        <p className="title">Total sales made this month</p>
        <p className="amount">Ksh {total}</p>
        <p className="desc">
          Previous transactions maybe processing and not included...
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">Ksh {total + 10000}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">This Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpIcon fontSize="small" />
              <div className="resultAmount">Ksh {total}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpIcon fontSize="small" />
              <div className="resultAmount">Ksh 0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
