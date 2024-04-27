import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { QUERY_URL } from "../apis";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

// const data = {
//   answer:
//     "Claire Thompson has undergone a Right Breast Lumpectomy with Sentinel Lymph Node Biopsy.",
//   citations: [
//     {
//       quote:
//         "Surgery: Scheduled for a right breast lumpectomy with sentinel lymph node biopsy.",
//       source_id: 0,
//       source_path: "patient/Patient Lumpectomy Discharge.pdf",
//     },
//   ],
// };

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async () => {
    // Handle submission logic here, e.g., sending the question to a server
    console.log("Submitted question:", question);

    const formData = new FormData();
    formData.append("question", question);

    setLoading(true);
    try {
      const response = await axios.post(QUERY_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      if (response.status == 200) {
        console.log("Question sent successfully:", response.data);
        setAnswer(response.data);
      }
    } catch (error) {
      console.error("Error sending question:", error);
    }
    setLoading(false);
    // You can reset the input field after submission if needed
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      {loading ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Ask Curate
              </Typography>
              <TextField
                label="Question"
                variant="outlined"
                fullWidth
                value={question}
                onChange={handleQuestionChange}
                style={{ marginBottom: "1rem" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
              >
                Submit
              </Button>
            </Paper>
          </Grid>
          {answer !== "" && (
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Answer
                </Typography>
                <Grid container spacing={2}>
                  <Grid item>{answer?.answer}</Grid>
                  <Grid item>
                    Sources:
                    <List>
                      {answer?.citations.map((source) => (
                        <div>
                          <ListItemText
                            primary={source.source_path.split("/")[1]}
                          />

                          <Typography fontStyle="italic">
                            {source.quote}
                          </Typography>
                        </div>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
}
