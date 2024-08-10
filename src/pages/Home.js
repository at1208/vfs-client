import * as React from "react";
import Login from "../components/Login";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <Box
      sx={{
        background: "lightgrey",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Login />
    </Box>
  );
}
