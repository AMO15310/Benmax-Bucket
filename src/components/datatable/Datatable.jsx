import React from "react";
import "./datatable.scss";

import { DataGrid } from "@mui/x-data-grid";

import { userRows, userColumns, rows } from "../../datasource";

const Datatable = () => {
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      Width: 200,
      renderCell: () => {
        return (
          <div className="cellAction">
            <div className="viewButton">View</div>
            <div className="deleteButton">Delete</div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <DataGrid
        rows={rows}
        columns={userColumns.concat(actionColumn)}
        pageSize={7}
        rowsPerPageOptions={[7]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
