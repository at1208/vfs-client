import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { BASE_API } from "../environment";
import { googleURL } from "../utils/apiUrls";

const handleGoogleLogin = () => {
  window.location.href = `${BASE_API}${googleURL}`;
};

export default function Login() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ boxShadow: 3 }}>
        {" "}
        {/* Added box shadow here */}
        <CardContent
          sx={{
            textAlign: "center",
            height: "150px",
            width: 300,
            display: "grid",
            alignItems: "end",
          }}
        >
          <Typography variant="h5" component="div">
            Member Login!
          </Typography>
          <Box
            sx={{
              padding: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleGoogleLogin}
              sx={{ display: "flex", gap: 1, padding: "8px 16px" }}
            >
              <GoogleIcon fontSize="medium" />
              Login with Google
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
