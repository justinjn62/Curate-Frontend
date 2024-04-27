import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Welcome to Curate
      </Typography>
      Get started by clicking the 'Upload' tab on the left
    </Paper>
  );
}
