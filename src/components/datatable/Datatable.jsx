import React, { useState, useEffect } from "react";
import "./datatable.scss";

import { DataGrid } from "@mui/x-data-grid";

import { userRows, userColumns, rows } from "../../datasource";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";

const Datatable = () => {
  const [data, setData] = useState([]);
  const searchTerm = localStorage.getItem("search");
  console.log(searchTerm);
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // const [users, setUsers] = useState([]);
  useEffect(() => {
    try {
      const list = [];
      const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          // console.log(list);

          // doc.data() is never undefined for query doc snapshots
        });
        setData(list);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  // const handleEdit = async(id)=>{
  //   try {
  //     await setDoc(doc(db, "users", id)), {
  //       Name: "Los Angeles",
  //       Contact: "CA",
  //       Meter: "USA",
  //     };
  //     setData(data.filter((item) => item.id !== id));
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }

  const handleEdit = (id) => {
    localStorage.setItem("id", id);
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      Width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/view" style={{ textDecoration: "none" }}>
              <div
                className="viewButton"
                onClick={() => {
                  handleEdit(params.row.id);
                }}
              >
                View
              </div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => {
                handleDelete(params.row.id);
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/new" className="link" style={{ textDecoration: "none" }}>
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={filteredData}
        columns={userColumns.concat(actionColumn)}
        pageSize={7}
        rowsPerPageOptions={[7]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
