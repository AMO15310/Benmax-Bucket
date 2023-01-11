import React, { useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import "./widgets.scss";
import { Link } from "react-router-dom";
import { color } from "@mui/system";
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useState } from "react";
import { Construction } from "@mui/icons-material";

const Widget = ({ type }) => {
  const [users, setUsers] = useState(null);
  const [diff, setDiff] = useState(null);
  const [bill, setBill] = useState(null);
  const [paid, setPaid] = useState(null);
  const [balance, setBalance] = useState(null);
  let data;

  switch (type) {
    case "Client":
      data = {
        title: "CLIENTS",
        amount: users,
        isMoney: false,
        link: "See all users",
        icon: <PersonOutlinedIcon className="icon" />,
      };
      break;
    case "Bills":
      data = {
        title: "BILLS",
        amount: bill,
        isMoney: true,
        link: "View all bills",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "Paid":
      data = {
        title: "PAID",
        amount: paid,
        isMoney: true,
        link: "View net paid balances",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }}
          />
        ),
      };
      break;
    case "Balances":
      data = {
        title: "BALANCES",
        amount: balance,
        isMoney: true,
        link: "View net carried forward",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2)" }}
          />
        ),
      };
      break;

    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));
      const lastMonthQuerry = query(
        collection(db, "users"),
        where("timeStamp", "<=", today),
        where("timeStamp", ">", lastMonth)
      );
      const prevMonthQuerry = query(
        collection(db, "users"),
        where("timeStamp", "<=", lastMonth)
        // where("timeStamp", ">", prevMonth)
      );
      const lastMonthData = await getDocs(lastMonthQuerry);
      const prevMonthData = await getDocs(prevMonthQuerry);
      setUsers(lastMonthData.docs.length);
      setDiff(
        ((lastMonthData.docs.length - prevMonthData.docs.length) /
          prevMonthData.docs.length) *
          100
      );

      const fetchData2 = async () => {
        const array = [];
        const array2 = [];
        const balances = [];
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          array.push(doc.data().total);
          const sumtotal = array.reduce(function (a, b) {
            return a + b;
          }, 0);
          setBill(sumtotal);

          const paidcash = Number(doc.data().paid_units);
          array2.push(paidcash);
          const sumpaid = array2.reduce(function (a, b) {
            return a + b;
          }, 0);
          setPaid(sumpaid);

          balances.push(doc.data().balance);
          const sumbalances = balances.reduce(function (a, b) {
            return a + b;
          }, 0);
          setBalance(sumbalances);

          // console.log(array);

          // list.push({ id: doc.id, ...doc.data() });

          // doc.data() is never undefined for query doc snapshots
        });
      };
      fetchData2();
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="widget">
        <div className="left">
          <span className="title">{data.title}</span>
          <span className="counter">
            {data.isMoney && "Ksh"} {data.amount}
          </span>
          <Link to="/users" style={{ textDecoration: "none", color: "#999" }}>
            <span className="link">{data.link} </span>
          </Link>
        </div>
        <div className="right">
          <div className="percentage positive">
            <KeyboardArrowUpIcon />
            {diff} %
          </div>

          {data.icon}
        </div>
      </div>
    </>
  );
};

export default Widget;
