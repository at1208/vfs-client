import React from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";

import { logout } from "../services/authService";
import {
  BOOK_BULK_VISA_PATH,
  BOOK_VISA_PATH,
  HOME_PATH,
} from "../constants/path";

export default function Layout({ children }) {
  const location = useLocation();
  const { session } = useSelector((state) => state.session) || {};
  const { avatar, name } = session?.user || {};

  // Separate state for each dropdown menu
  const [anchorElBookNow, setAnchorElBookNow] = React.useState(null);
  const [anchorElLogout, setAnchorElLogout] = React.useState(null);

  const openBookNow = Boolean(anchorElBookNow);
  const openLogout = Boolean(anchorElLogout);

  // Handlers for Book Now dropdown
  const handleClickBookNow = (event) => {
    setAnchorElBookNow(event.currentTarget);
    setAnchorElLogout(null); // Close Logout menu if open
  };

  const handleCloseBookNow = () => {
    setAnchorElBookNow(null);
  };

  // Handlers for Logout dropdown
  const handleClickLogout = (event) => {
    setAnchorElLogout(event.currentTarget);
    setAnchorElBookNow(null); // Close Book Now menu if open
  };

  const handleCloseLogout = async (type) => {
    setAnchorElLogout(null);
    if (type === "logout") {
      handleLogout();
    }
  };

  async function handleLogout() {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      window.location.href = "/";
    }
  }

  const excludedPaths = [HOME_PATH];
  const shouldRenderLayout = !excludedPaths.includes(location.pathname);

  return shouldRenderLayout ? (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <AppBar position="static" sx={{ pl: 1, pr: 1, background: "#ffff" }}>
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>

              {/* Book Now Button and Dropdown */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="contained"
                  onClick={handleClickBookNow}
                  size="medium"
                >
                  Book Now
                </Button>
                <Menu
                  anchorEl={anchorElBookNow}
                  id="book-now-menu"
                  open={openBookNow}
                  onClose={handleCloseBookNow}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    onClick={() => (window.location.href = BOOK_VISA_PATH)}
                  >
                    Single Booking
                  </MenuItem>
                  <MenuItem
                    onClick={() => (window.location.href = BOOK_BULK_VISA_PATH)}
                  >
                    Bulk Booking
                  </MenuItem>
                </Menu>
              </Box>

              {/* Logout Button and Dropdown */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {session && (
                  <Box
                    onClick={handleClickLogout}
                    size="small"
                    sx={{ ml: 2, display: "flex", cursor: "pointer" }}
                    aria-controls={openLogout ? "account-menu" : undefined}
                    aria-haspopup="true"
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mr: 2,
                        color: "black",
                        fontSize: "18px",
                        alignItems: "center",
                      }}
                    >
                      {name ?? null}
                    </Typography>
                    <Avatar
                      alt={name}
                      src={avatar}
                      sx={{ width: 32, height: 32 }}
                    >
                      {!avatar ? name?.charAt(0) : null}
                    </Avatar>
                  </Box>
                )}
                <Menu
                  anchorEl={anchorElLogout}
                  id="account-menu"
                  open={openLogout}
                  onClose={handleCloseLogout}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={() => handleCloseLogout("logout")}>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        {children}
      </Box>
    </Box>
  ) : (
    children
  );
}
