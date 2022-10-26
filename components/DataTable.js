import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";

export default function DataTable({ data }) {
  const adultSizes = ["XXXL","XXL","XL","L","M","S","XS"];
  const kidSizes = ["XL","L","M","S","XS", "YXXL", "YXL","YL","YM","YS","YXS", "YXXS"];
  const adultLevels = ["White","Blue","Purple", "Brown", "Black"]
  const kidLevels = ["White", "Grey-White","Grey","Grey-Black","Yellow-White", "Yellow", "Yellow-Black", "Orange", "Green"]
  
  // useEffect(()=> {
  //   console.log("in");
  //   populateTable();
  // }, [])

  let table = {};
  // table["XXXL"] = {hi:"hi"};
  // console.log(table)

  let populateTable = () => {

    adultLevels.forEach((level) => {
      table[level] = {};
      adultSizes.forEach(size => {
        table[level][size] = 0;
      })
    })

    data.forEach((row) => {
      table[row.Level][row.Size] = row.Quantity;
    });
    console.log(table);
  }

  
  
  populateTable();
  
  
  // let table = {
  //   White: {
  //     XXL: 0,
  //     XL: 0,
  //     L: 0,
  //     M: 0,
  //     S: 0,
  //     XS: 0,
  //   },
  //   Blue: {
  //     XXL: 0,
  //     XL: 0,
  //     L: 0,
  //     M: 0,
  //     S: 0,
  //     XS: 0,
  //   },
  //   Purple: {
  //     XXL: 0,
  //     XL: 0,
  //     L: 0,
  //     M: 0,
  //     S: 0,
  //     XS: 0,
  //   },
  //   Brown: {
  //     XXL: 0,
  //     XL: 0,
  //     L: 0,
  //     M: 0,
  //     S: 0,
  //     XS: 0,
  //   },
  //   Black: {
  //     XXL: 0,
  //     XL: 0,
  //     L: 0,
  //     M: 0,
  //     S: 0,
  //     XS: 0,
  //   },
  // };



  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{data[0].Item}</TableCell>
            {Object.keys(table.White).map((size) => (
              <TableCell align="right">{size}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(table).map((level) => (
            <TableRow
              key={level}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {level}
              </TableCell>
              {Object.keys(table[level]).map((size) => (
                <TableCell align="right">{table[level][size]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
