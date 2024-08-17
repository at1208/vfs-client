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
        background: "01021a",
        border: "1px solid #2c2c2c",
        borderRadius: "4px",
      }}
    >
      <Card sx={{ boxShadow: 3 }}>
        <CardContent
          sx={{
            textAlign: "center",
            // height: "0px",
            width: 300,
            display: "grid",
            alignItems: "end",
            background: "#01021a",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              padding: "24px",
              gap: "12px",
            }}
          >
            <img src="logo.png" alt="Get your visa" height={35} />
            <Typography
              variant="h5"
              sx={{ fontSize: "24px", color: "#cad9ff", fontWeight: "800" }}
            >
              Get Your VISA
            </Typography>
          </Box>
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
              sx={{
                display: "flex",
                gap: 1,
                padding: "8px 16px",
                textTransform: "capitalize",
                background: "#061178",
              }}
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
