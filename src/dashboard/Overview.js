import * as React from "react";
import { useTheme } from "@mui/material/styles";

import Title from "./Title";

export default function Overview(props) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Overview</Title>
      <div
        style={{
          width: "100%",
          flexGrow: 1,
          overflow: "visible",
          fontSize: 16,
          textAlign: "left",
        }}
      >
        {props?.text}
      </div>
    </React.Fragment>
  );
}
