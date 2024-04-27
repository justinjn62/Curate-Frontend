import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

export default function Particulars(props) {
  return (
    <React.Fragment>
      <Title>Patient</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Date of Birth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.particulars.map((row) => (
            <TableRow>
              <TableCell>{row?.name}</TableCell>
              <TableCell>{row?.gender}</TableCell>
              <TableCell>{row?.age}</TableCell>
              <TableCell>{row?.dob}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
