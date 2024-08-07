import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { logout } from "../services/authService";

export default function SimplePaper({ children }) {
  const { session } = useSelector((state) => state.session) || {};
  const { avatar, name } = session?.user || {};

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (type) => {
    setAnchorEl(null);
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

  return (
    <>
      <Container
        maxWidth={false}
        sx={{ maxWidth: "100%", margin: "0 0", padding: 0 }}
      >
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Admin Panel
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                {session && (
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                  >
                    <Avatar
                      alt={name}
                      src={avatar}
                      sx={{ width: 32, height: 32 }}
                    >
                      {!avatar ? name?.charAt(0) : null}
                    </Avatar>
                    <Typography variant="h6" sx={{ ml: 2 }}>
                      {name ? name : "ADMIN PANEL"}
                    </Typography>
                  </IconButton>
                )}

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
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
                  <MenuItem onClick={() => handleClose("logout")}>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        {children}
      </Container>
    </>
  );
}
