import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BasicModal from "./BasicModal";
import { useEffect } from "react";

export default function DataTable({ data, sizeData, colorData}) {
  
  // useEffect(()=> {
  //   console.log("in");
  //   populateTable();
  // }, [])

  let table = {};

  let populateTable = () => {

    colorData.forEach((color) => {
      table[color] = {};
      sizeData.forEach(size => {
        table[color][size] = 0;
      })
    })

    data.forEach((row) => {
      table[row.Color][row.Size] = row.Quantity;
    });
    console.log(table);
  }
  
  
  console.log(colorData);
  console.log(data);
  populateTable();
  


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{data[0].Item}</TableCell>
            {Object.keys(table[Object.keys(table)[0]]).map((size) => (
              <TableCell align="right">{size}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(table).map((color) => (
            <TableRow
              key={color}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {color}
              </TableCell>
              {Object.keys(table[color]).map((size) => (
                <TableCell align="right"> <BasicModal value={table[color][size]} color={color} size={size} item={data[0].Item}></BasicModal></TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
