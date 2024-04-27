import React, { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { DOCUMENT_URL, DOC_SUM_URL } from "../apis";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function Document() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchPdf = async () => {
      setLoading(true);
      try {
        let file_name = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1,
          location.pathname.length
        );
        console.log(file_name);
        const response = await axios.get(DOCUMENT_URL + file_name, {
          responseType: "blob", // Set responseType to 'blob' to receive binary data
        });
        const url = URL.createObjectURL(response.data);

        const savedData = sessionStorage.getItem(file_name);
        if (savedData) {
          setSummaryData(JSON.parse(savedData));
          console.log("Retrieved Cached Data:", JSON.parse(savedData));
        } else {
          const response2 = await axios.get(DOC_SUM_URL + file_name);
          if (response2.status == 200) {
            console.log("Retrieved data: ", response2.data);
            setSummaryData(response2.data);
            setPdfUrl(url);
            setFileName(file_name);
            sessionStorage.setItem(file_name, JSON.stringify(response2.data));
          }
        }
      } catch (error) {
        console.error("Error fetching PDF file:", error);
      }
      setLoading(false);
    };

    fetchPdf();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      {loading ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={6}>
            <Grid item>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  {fileName.replaceAll("%20", " ")}
                </Typography>
                <Grid container spacing={2}>
                  {/* <div
                  style={{
                    width: "100%",
                    flexGrow: 1,
                    overflow: "visible",
                    fontSize: 16,
                    textAlign: "left",
                  }}
                  > */}
                  <Grid item>{summaryData?.summary}</Grid>
                  {/* </div> */}
                  <Grid item>Author: {summaryData?.author}</Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                width="100%"
                height="600px"
                title="PDF Viewer"
                frameBorder="0"
              ></iframe>
            ) : (
              <p>Loading PDF...</p>
            )}
          </Grid>
        </Grid>
      )}
    </div>
  );
}
