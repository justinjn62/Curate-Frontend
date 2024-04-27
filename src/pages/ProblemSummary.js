import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { DOCUMENTS_URL } from "../apis";
import CircularProgress from "@mui/material/CircularProgress";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link as RLink } from "react-router-dom";

// const data = [
//   {
//     problem: "Invasive Ductal Carcinoma",
//     source_path: [
//       "patient/Biopsy Report.pdf",
//       "patient/Chemotherapy Treatment Medical Report.pdf",
//       "patient/Follow-up Consultation Doctor's Note.pdf",
//       "patient/Mammography Report.pdf",
//       "patient/Patient Lumpectomy Discharge.pdf",
//     ],
//     summary:
//       "Claire Thompson was diagnosed with invasive ductal carcinoma of the breast, grade 3, which was estrogen receptor positive and HER2 negative. She underwent lumpectomy with sentinel lymph node biopsy and is on a treatment plan including chemotherapy, radiation therapy, and hormonal therapy. Follow-up appointments are scheduled for ongoing monitoring and surveillance.",
//   },
//   {
//     problem: "Hypertension",
//     source_path: ["patient/Hypertension Treatment Medical Report.pdf"],
//     summary:
//       "Claire Thompson has a history of hypertension for the past five years, managed with amlodipine and hydrochlorothiazide. Her blood pressure is controlled, and adherence to medications and lifestyle modifications is emphasized for long-term management. Regular follow-up appointments are scheduled every 3 months for monitoring.",
//   },
// ];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function ProblemTabs(props) {
  return (
    <div>
      <Tabs
        value={props.value}
        onChange={props.handleChange}
        aria-label="basic tabs example"
      >
        {props?.problems?.map((problem) => (
          <Tab label={problem.problem} />
        ))}
      </Tabs>
      {props?.problems?.map((problem, index) => (
        <CustomTabPanel value={props.value} index={index}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              {problem.summary}
            </Grid>
            <Divider />
            <Grid item xs={12}>
              Sources:
              <List>
                {problem.source_path.map((source) => (
                  <RLink to={"../document/".concat(source.split("/")[1])}>
                    <ListItemButton>
                      <ListItemText primary={source.split("/")[1]} />
                    </ListItemButton>
                  </RLink>
                ))}
              </List>
            </Grid>
          </Grid>
        </CustomTabPanel>
      ))}
    </div>
  );
}

export default function ProblemSummary(props) {
  const [documentsData, setDocumentsData] = useState();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const savedData = sessionStorage.getItem("documents_data");
      if (savedData) {
        setDocumentsData(JSON.parse(savedData));
        console.log("Retrieved Cached Data:", JSON.parse(savedData));
      } else {
        try {
          const response = await axios.get(DOCUMENTS_URL);
          if (response.status == 200) {
            console.log("Retrieved data: ", response.data);
            setDocumentsData(response.data);
            sessionStorage.setItem(
              "documents_data",
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
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Problems
              </Typography>

              <ProblemTabs
                value={value}
                handleChange={handleChange}
                problems={documentsData}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
