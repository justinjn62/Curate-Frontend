import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { UPLOAD_URL, INIT_URL } from "../apis";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const PdfUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    try {
      const response = await axios.post(UPLOAD_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", response.data);

      if (response.status == 200) {
        const response = await axios.post(INIT_URL);

        if (response.status == 200) {
          console.log("Initiated Database: ", response.data);
          sessionStorage.clear();
          navigate("../overview");
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="upload-pdf"
          />
          <label htmlFor="upload-pdf">
            <Button variant="contained" component="span">
              Choose PDF File
            </Button>
          </label>
          {selectedFile ? (
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Selected File: {selectedFile.name}
            </Typography>
          ) : (
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              No File Selected
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!selectedFile}
            sx={{ marginTop: 2 }}
          >
            Upload
          </Button>
        </div>
      )}
    </Box>
  );
};

export default PdfUploader;
