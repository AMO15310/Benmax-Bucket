import React, { useState, useEffect } from "react";
import "./datatable.scss";

import { DataGrid } from "@mui/x-data-grid";

import { userColumns } from "../../datasource";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";

const Datatable = () => {
  const [data, setData] = useState([]);
  const searchTerm = localStorage.getItem("search");
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    try {
      const list = [];
      const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
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
          <div className="cellAction ">
            {/* <Link
              to=""
              style={{
                textDecoration: "none",
                border: "1px dotted solid yellow",
              }}
            >
              <div
                className="notifyButton"
                onClick={() => {
                  handleEdit(params.row.id);
                }}
              >
                Notify
              </div>
            </Link> */}
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
