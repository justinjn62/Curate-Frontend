import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Link } from "react-router-dom";

export default function Problems(props) {
  return (
    <React.Fragment>
      <Title>Problems</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.problems?.map((row, index) => (
            <TableRow>
              <TableCell>
                <Link to={`../problems/${index}`}>{row?.name}</Link>
              </TableCell>
              <TableCell>{row?.active ? "Active" : "Complete"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
