import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const handleGoogleLogin = () => {
  window.location.href = "http://localhost:8080/api/google";
};

export default function SimplePaper() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h5" component="div" gutterBottom>
              Welcome!
            </Typography>
            <Box
              sx={{
                padding: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button variant="contained" onClick={handleGoogleLogin}>
                Login with Google
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
