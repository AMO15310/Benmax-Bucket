import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import "./widgets.scss";
import { Link } from "react-router-dom";
import { color } from "@mui/system";

const Widget = ({ type }) => {
  let data;

  const balance = 6000;
  const users = 120;
  const bill = 13200;
  const paid = 7200;
  const diff = 25;

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
