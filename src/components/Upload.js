import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Button,
  LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useLocation } from "react-router-dom";
import sampleXLSX from "../utils/sample.xlsx";
import { createApplication } from "../services/appService";

const keyMapping = {
  "MIGRIS No": "migris_number",
  "First Name": "first_name",
  "Last Name": "last_name",
  "Date Of Birth": "dob",
  "Passport Expiry": "passport_expiry",
  "Passport No": "passport_number",
  Nationality: "nationality",
  Gender: "gender",
  "Dial Code": "dial_code",
  "Mobile Number": "number",
  "Visa Category": "visa_category",
  "Visa Center": "visa_center",
  "Visa Sub Category": "visa_sub_category",
  "Destination Country": "destination_country",
  Email: "email",
  "Mode Of Payment": "mode_of_payment",
};

const batchSize = 10;

const Upload = ({ isOpen }) => {
  const [jsonData, setJsonData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // Assume first sheet is the one to be processed
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Parse sheet data to JSON
      const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (rawData.length < 2) {
        // Handle case where there's no data
        setJsonData([]);
        return;
      }

      // Extract headers and rows
      const headers = rawData[0];
      const rows = rawData.slice(1);

      // Filter out empty rows
      const filteredRows = rows.filter((row) =>
        row.some((cell) => cell !== undefined && cell !== null && cell !== "")
      );

      // Transform filtered rows into array of objects with headers as keys
      const formattedData = filteredRows.map((row) => {
        const rowObject = headers.reduce((acc, header, index) => {
          const actualKey = keyMapping[header] || header; // Use the mapped key or default to the original header
          acc[actualKey] = row[index] || ""; // Default to empty string if value is undefined
          return acc;
        }, {});

        // Nest dial_code and number inside phone
        if (rowObject.dial_code || rowObject.number) {
          rowObject.phone = {
            dial_code: rowObject.dial_code || "",
            number: rowObject.number || "",
          };
          // Remove the individual keys
          delete rowObject.dial_code;
          delete rowObject.number;
        }

        return rowObject;
      });

      handleUploadData(formattedData);
    };

    reader.readAsBinaryString(file);
  };

  const handleClose = () => {
    const params = new URLSearchParams(location.search);
    params.delete("bookNow"); // Remove the bookNow param from the URL
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger the file input's click event
  };

  const handleDownloadSample = () => {
    const link = document.createElement("a");
    link.href = sampleXLSX; // Path to your sample file
    link.download = "sample.xlsx"; // Filename for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUploadData = async (formattedData) => {
    setUploading(true);
    setProgress(0);

    try {
      for (let i = 0; i < formattedData.length; i += batchSize) {
        const batch = formattedData.slice(i, i + batchSize);
        await createApplication(batch);
        setProgress(((i + batchSize) / formattedData.length) * 100);
      }
    } catch (error) {
      console.error("Error uploading data:", error);
    } finally {
      handleClose();
      setUploading(false);
      window.location.reload();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="upload-modal-title"
      aria-describedby="upload-modal-description"
    >
      <Box
        sx={{
          border: "1px solid grey",
          width: 400,
          bgcolor: "#01021a",
          color: "#ffff",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" id="upload-modal-title">
          Upload an Excel File
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <img
            src="images/upload.svg"
            alt="Upload"
            height={108}
            style={{ cursor: "pointer", marginBottom: 20 }}
            onClick={handleImageClick}
          />
          <input
            accept=".xlsx, .xls"
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: "none" }} // Hide the input
          />
          <Button
            sx={{ marginTop: 4, textTransform: "capitalize" }}
            variant="contained"
            color="primary"
            onClick={handleDownloadSample}
          >
            Download Sample
          </Button>

          {uploading && (
            <Box sx={{ marginTop: 2 }}>
              <Typography>Uploading: {Math.round(progress)}%</Typography>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default Upload;
