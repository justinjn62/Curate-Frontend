import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "../dashboard/listItems";
import Overview from "../dashboard/Overview";
import Particulars from "../dashboard/Particulars";
import Medications from "../dashboard/Medications";
import Problems from "../dashboard/Problems";
import { HashRouter as Router, Routes, Route, RLink } from "react-router-dom";
import axios from "axios";
import { OVERVIEW_URL } from "../apis";
import CircularProgress from "@mui/material/CircularProgress";

export default function Summary() {
  const [overviewData, setOverviewData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const savedData = sessionStorage.getItem("overview_data");
      if (savedData) {
        setOverviewData(JSON.parse(savedData));
        console.log("Retrieved Cached Data:", JSON.parse(savedData));
      } else {
        try {
          const response = await axios.get(OVERVIEW_URL);
          if (response.status == 200) {
            console.log("Retrieved data: ", response.data);
            setOverviewData(response.data);
            sessionStorage.setItem(
              "overview_data",
              JSON.stringify(response.data)
            );
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Particulars */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Particulars particulars={[overviewData?.particulars]} />
            </Paper>
          </Grid>

          {/* Overview */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                // height: 240,
              }}
            >
              <Overview text={overviewData?.overview} />
            </Paper>
          </Grid>

          {/* Problems */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Problems problems={overviewData?.problems} />
            </Paper>
          </Grid>

          {/* Medications */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Medications medications={overviewData?.medications} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
