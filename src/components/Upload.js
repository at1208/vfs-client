import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Button,
  LinearProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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

const batchSize = 20;

const Upload = ({ isOpen }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [uploadedApplications, setUploadedApplications] = useState([]);
  const [errors, setErrors] = useState([]);
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

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (rawData.length < 2) return;

      const headers = rawData[0];
      const rows = rawData.slice(1);

      const filteredRows = rows.filter((row) =>
        row.some((cell) => cell !== undefined && cell !== null && cell !== "")
      );

      const formattedData = filteredRows.map((row) => {
        const rowObject = headers.reduce((acc, header, index) => {
          const actualKey = keyMapping[header] || header;
          acc[actualKey] = row[index] || "";
          return acc;
        }, {});

        if (rowObject.dial_code || rowObject.number) {
          rowObject.phone = {
            dial_code: rowObject.dial_code || "",
            number: rowObject.number || "",
          };
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
    params.delete("bookNow");
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleDownloadSample = () => {
    const link = document.createElement("a");
    link.href = sampleXLSX;
    link.download = "sample.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUploadData = async (formattedData) => {
    setUploading(true);
    setProgress(0);

    let successfulUploads = [];
    let uploadErrors = [];

    try {
      for (let i = 0; i < formattedData.length; i += batchSize) {
        const batch = formattedData.slice(i, i + batchSize);
        try {
          const response = await createApplication(batch);

          if (response.data && response.data.length > 0) {
            successfulUploads = [...successfulUploads, ...response.data];
          }

          if (response.errors && response.errors.length > 0) {
            uploadErrors = [...uploadErrors, ...response.errors];
          }
        } catch (error) {
          console.error("Error uploading batch:", error);
        }
        setProgress(((i + batchSize) / formattedData.length) * 100);
      }
    } catch (error) {
      console.error("Error uploading data:", error);
    } finally {
      setUploadedApplications(successfulUploads);
      setErrors(uploadErrors);
      setUploading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
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
          maxHeight: "80%",
          overflowY: "auto",
          border: "1px solid grey",
          width: 500,

          bgcolor: "#ffff",
          //     color: "#ffff",
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

        {!uploading &&
          uploadedApplications.length === 0 &&
          errors.length === 0 && (
            <>
              <Typography variant="h6" id="upload-modal-title">
                Upload an Excel File
              </Typography>
              <Button
                size="small"
                sx={{
                  textTransform: "capitalize",
                  // background: "#061178",
                  marginTop: "4px",
                }}
                variant="contained"
                color="primary"
                onClick={handleDownloadSample}
              >
                Download Sample
              </Button>

              <Box sx={{ mt: 4 }}>
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
                  style={{ display: "none" }}
                />
              </Box>
            </>
          )}

        {uploading && (
          <Box sx={{ marginTop: 2 }}>
            <Typography>Uploading: {Math.round(progress)}%</Typography>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        )}

        {!uploading &&
          (uploadedApplications.length > 0 || errors.length > 0) && (
            <Box sx={{ mt: 4 }}>
              <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab
                  label={`Uploaded Applications (${uploadedApplications?.length})`}
                  sx={{
                    //   color: "#ffff",
                    fontSize: "15px",
                    opacity: ".8",
                    textTransform: "capitalize",
                  }}
                />
                <Tab
                  label={`Errors (${errors?.length})`}
                  sx={{
                    //   color: "#ffff",
                    fontSize: "15px",
                    opacity: ".8",
                    textTransform: "capitalize",
                  }}
                />
              </Tabs>

              <Box sx={{ mt: 2, padding: "10px 6px 6px 6px" }}>
                {tabIndex === 0 && (
                  <TableContainer
                    component={Paper}
                    sx={
                      {
                        //     background: "#01021a",
                        //     color: "#ffff",
                      }
                    }
                  >
                    <Table aria-label="uploaded applications table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              // color: "grey",
                              // opacity: ".7",
                              borderBottom: "none",
                            }}
                          >
                            MIGRIS No
                          </TableCell>
                          <TableCell
                            sx={{
                              // color: "grey",
                              // opacity: ".7",
                              borderBottom: "none",
                            }}
                          >
                            First Name
                          </TableCell>
                          <TableCell
                            sx={{
                              // color: "grey",
                              // opacity: ".7",
                              borderBottom: "none",
                            }}
                          >
                            Last Name
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {uploadedApplications.map((app, index) => (
                          <TableRow key={index}>
                            <TableCell
                              sx={{
                                //   color: "#ffff",
                                opacity: ".7",
                                borderBottom: "none",
                              }}
                            >
                              {app.migris_number}
                            </TableCell>
                            <TableCell
                              sx={{
                                //   color: "#ffff",
                                opacity: ".7",
                                borderBottom: "none",
                              }}
                            >
                              {app.first_name}
                            </TableCell>
                            <TableCell
                              sx={{
                                //   color: "#ffff",
                                opacity: ".7",
                                borderBottom: "none",
                              }}
                            >
                              {app.last_name}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}

                {tabIndex === 1 &&
                  (errors?.length ? (
                    <TableContainer
                      component={Paper}
                      sx={
                        {
                          // background: "#01021a",
                          // color: "#ffff",
                        }
                      }
                    >
                      <Table aria-label="errors table">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                //   color: "grey",
                                // opacity: ".7",
                                borderBottom: "none",
                              }}
                            >
                              MIGRIS No
                            </TableCell>
                            <TableCell
                              sx={{
                                //   color: "grey",
                                // opacity: ".7",
                                borderBottom: "none",
                              }}
                            >
                              Error Message
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {errors.map((error, index) => (
                            <TableRow key={index}>
                              <TableCell
                                sx={{
                                  //     color: "#ffff",
                                  opacity: ".7",
                                  borderBottom: "none",
                                }}
                              >
                                {error.application.migris_number}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "red",
                                  opacity: ".7",
                                  borderBottom: "none",
                                }}
                              >
                                {error.error.join(", ")}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Typography
                      sx={{
                        // color: "#ffff",
                        opacity: ".7",
                      }}
                    >
                      No Error founds
                    </Typography>
                  ))}
              </Box>
            </Box>
          )}
      </Box>
    </Modal>
  );
};

export default Upload;
