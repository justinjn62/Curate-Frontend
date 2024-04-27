import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Overview from "../dashboard/Overview";
import Particulars from "../dashboard/Particulars";
import Medications from "../dashboard/Medications";
import Problems from "../dashboard/Problems";
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
