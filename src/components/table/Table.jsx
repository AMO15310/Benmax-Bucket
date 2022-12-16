import React from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      Id: 4204,
      Name: "Amos Wachira",
      Phone: "0746546513",
      Meter: "012558",
      Initial: 200,
      Final: 250,
      Consumed: 50,
      UnitCost: 120,
      Total: 6000,
      Payed: 0,
      Balance: 6000,
      Status: "Unsettled",
    },
    {
      Id: 4285,
      Name: "Kate Mueni",
      Phone: "07562546510",
      Meter: "015568",
      Initial: 200,
      Final: 200,
      Consumed: 0,
      UnitCost: 120,
      Total: 0,
      Payed: 0,
      Balance: 0,
      Status: "Settled",
    },
    {
      Id: 3514,
      Name: "Susan Mukami",
      Phone: "0798256513",
      Meter: "0185558",
      Initial: 200,
      Final: 350,
      Consumed: 150,
      UnitCost: 120,
      Total: 7200,
      Payed: 7200,
      Balance: 0,
      Status: "Settled",
    },
  ];

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Id</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Phone</TableCell>
            <TableCell className="tableCell">Meter</TableCell>
            <TableCell className="tableCell">Initial Readings</TableCell>
            <TableCell className="tableCell">Final Readings</TableCell>
            <TableCell className="tableCell">Consumed Units</TableCell>
            <TableCell className="tableCell">Unit Cost</TableCell>
            <TableCell className="tableCell">Amounting</TableCell>
            <TableCell className="tableCell">Paid</TableCell>
            <TableCell className="tableCell">Balance</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.Id}>
              <TableCell>{row.Id}</TableCell>
              <TableCell className="tableCell">{row.Name}</TableCell>
              <TableCell className="tableCell">{row.Phone}</TableCell>
              <TableCell className="tableCell">{row.Meter}</TableCell>
              <TableCell className="tableCell">{row.Initial}</TableCell>
              <TableCell className="tableCell">{row.Final}</TableCell>
              <TableCell className="tableCell">{row.Consumed}</TableCell>
              <TableCell className="tableCell">{row.UnitCost}</TableCell>
              <TableCell className="tableCell">{row.Total}</TableCell>
              <TableCell className="tableCell">{row.Payed}</TableCell>
              <TableCell className="tableCell">{row.Balance}</TableCell>
              <TableCell className="tableCell">
                {" "}
                <span className={`status ${row.Status}`}>
                  {row.Status}
                </span>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
