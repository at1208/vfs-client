import React from "react";
import { Drawer, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SideDrawer = ({
  open,
  onClose,
  anchor = "left",
  title = "", // Add a title prop
  children,
  width = 250,
}) => {
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width,
          // background: "#01021a"
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            // borderBottom: "1px solid #ddd",
            // backgroundColor: "#01021a",
            boxShadow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                //   color: "#ffff"
              }}
            >
              {title}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon
              //   sx={{ color: "#ffff" }}
              />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1, padding: 2 }}>{children}</Box>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
