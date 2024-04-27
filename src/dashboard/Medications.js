import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

export default function Medications(props) {
  return (
    <React.Fragment>
      <Title>Medications</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Drug</TableCell>
            <TableCell>Dosage</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.medications?.map((row) => (
            <TableRow>
              <TableCell>{row?.name}</TableCell>
              <TableCell>{row?.dosage}</TableCell>
              <TableCell>{row?.active ? "Active" : "Complete"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
