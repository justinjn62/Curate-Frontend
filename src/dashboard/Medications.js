import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Link } from "react-router-dom";

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
              <TableCell>
                <Link
                  to={"../document/".concat(row?.source_path?.split("/")[1])}
                >
                  {row?.name}
                </Link>
              </TableCell>
              <TableCell>{row?.dosage}</TableCell>
              <TableCell>{row?.active ? "Active" : "Complete"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
