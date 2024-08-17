import React, { useState, useEffect } from "react";
import AppListing from "../components/AppListing";
import SideDrawer from "../components/SideDrawer";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useApplications } from "../hooks/useApplications";
import { toTitleCase } from "../utils/helpers";
import SearchBar from "../components/SearchBar";

export default function Applications() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const detail = params.get("detail");

  // Fetch application data
  const { data, error, isLoading } = useApplications({ _id: id });

  useEffect(() => {
    setDrawerOpen(detail === "true");
  }, [location.search, detail]);

  const handleClose = () => {
    const params = new URLSearchParams(location.search);
    params.delete("detail");
    params.delete("id");
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    setDrawerOpen(false);
  };

  // Extract the first application from the data array
  const applicationData = data?.data?.[0] || {};

  // Format application data as key-value pairs
  const formatData = (data) => {
    return Object.entries(data)
      .filter(([key]) => key !== "_id") // Filter out `_id`
      .map(([key, value]) => {
        const formattedKey = toTitleCase(key); // Convert key to Title Case
        if (typeof value === "object" && value !== null) {
          return Object.entries(value).map(([subKey, subValue]) => ({
            key: `${formattedKey} ${toTitleCase(subKey)}`,
            value: subValue,
          }));
        }
        return { key: formattedKey, value };
      })
      .flat();
  };

  const formattedData = formatData(applicationData);

  return (
    <Box>
      <SearchBar placeholder="Search Application" />
      <AppListing />
      <SideDrawer
        title="Application Details"
        open={drawerOpen}
        onClose={handleClose}
        anchor="right"
        width={450}
      >
        {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">Error: {error.message}</Typography>}
        {formattedData.length === 0 ? (
          <Typography>No data available</Typography>
        ) : (
          formattedData.map(({ key, value }) => {
            if (!value) return null;
            return (
              <Box
                key={key}
                sx={{
                  padding: 2,
                  borderBottom: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: "text.primary",
                    flexShrink: 0,
                    width: "40%",
                  }}
                >
                  {key}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ margin: "0 8px", color: "text.primary", flexShrink: 0 }}
                >
                  :
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", flexGrow: 1 }}
                >
                  {value}
                </Typography>
              </Box>
            );
          })
        )}
      </SideDrawer>
    </Box>
  );
}
