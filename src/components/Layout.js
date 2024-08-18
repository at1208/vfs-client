import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { logout } from "../services/authService";
import { HOME_PATH } from "../constants/path";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = useSelector((state) => state.session) || {};
  const { avatar, name } = session?.user || {};

  const [anchorEl, setAnchorEl] = useState({
    bookNow: null,
    logout: null,
  });

  const openMenu = (menu) => Boolean(anchorEl[menu]);

  const handleMenuClick = (event, menu) => {
    setAnchorEl((prev) => ({
      ...prev,
      [menu]: event.currentTarget,
      [menu === "bookNow" ? "logout" : "bookNow"]: null, // Close the other menu
    }));
  };

  const handleMenuClose = (menu, action) => {
    setAnchorEl((prev) => ({
      ...prev,
      [menu]: null,
    }));

    if (action === "logout") {
      handleLogout();
    }
  };

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      window.location.href = "/";
    }
  }

  const handleBookNow = () => {
    const params = new URLSearchParams(location.search);
    params.set("bookNow", "bulkUpload");
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    handleMenuClose("bookNow");
  };

  const excludedPaths = [HOME_PATH];
  const shouldRenderLayout = !excludedPaths.includes(location.pathname);

  return shouldRenderLayout ? (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ pl: 1, pr: 1, background: "#ffff" }}>
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                  gap: 2,
                }}
              >
                <img src="logo.png" alt="Get your visa" height={35} />
                <Typography
                  sx={{ fontSize: 24, color: "black", fontWeight: 900 }}
                >
                  Get Your VISA
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="contained"
                  sx={{ textTransform: "capitalize" }}
                  onClick={(e) => handleMenuClick(e, "bookNow")}
                >
                  Add Application
                </Button>
                <Menu
                  anchorEl={anchorEl.bookNow}
                  open={openMenu("bookNow")}
                  onClose={() => handleMenuClose("bookNow")}
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
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleBookNow}>Bulk Upload</MenuItem>
                </Menu>
              </Box>

              {session && (
                <Box
                  onClick={(e) => handleMenuClick(e, "logout")}
                  sx={{ ml: 2, display: "flex", cursor: "pointer" }}
                  aria-controls={
                    openMenu("logout") ? "account-menu" : undefined
                  }
                  aria-haspopup="true"
                >
                  <Typography
                    variant="h6"
                    sx={{ mr: 2, color: "black", fontSize: 18 }}
                  >
                    {name}
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
                anchorEl={anchorEl.logout}
                open={openMenu("logout")}
                onClose={() => handleMenuClose("logout")}
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
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => handleMenuClose("logout", "logout")}>
                  Logout
                </MenuItem>
              </Menu>
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
