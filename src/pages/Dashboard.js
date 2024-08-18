import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import SideDrawer from "../components/SideDrawer";
import { useLocation, useNavigate } from "react-router-dom";
import { useApplications } from "../hooks/useApplications";
import { toTitleCase } from "../utils/helpers";
import SearchBar from "../components/SearchBar";
import Upload from "../components/Upload";
import { useVisas } from "../hooks/useVisas";
import AppListing from "../components/AppListing";
import dayjs from "dayjs";

export default function Applications() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const detail = params.get("detail");
  const bookNow = params.get("bookNow");

  const { data, error, isLoading } = useApplications({ _id: id });
  const {
    data: visas,
    error: visasError,
    isLoading: isVisasLoading,
  } = useVisas();

  const visaList = visas?.data;

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
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on desktop
      }}
    >
      {/* First Container */}
      <Box
        sx={{
          flex: 1,
          width: { xs: "100%", md: "34%" }, // Full width on mobile, 34% on desktop
          padding: { xs: "12px", md: "48px 12px 12px 12px" }, // Adjust padding for mobile
          maxHeight: "100vh",
          overflow: "scroll",
        }}
      >
        {isVisasLoading && <Typography>Loading visas...</Typography>}
        {visasError && (
          <Typography color="error">Error: {visasError.message}</Typography>
        )}
        {!isVisasLoading &&
          !visasError &&
          visaList &&
          visaList.length === 0 && <Typography>No visas available</Typography>}
        {visaList &&
          visaList.map((visa) => (
            <Card key={visa.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                {Object.entries(visa)
                  .filter(
                    ([key]) =>
                      key !== "_id" && key !== "createdAt" && key !== "__v"
                  ) // Exclude unnecessary fields
                  .map(([key, value]) => {
                    var val = value;
                    if (key === "updatedAt") {
                      val = dayjs(value).format("DD MMM YYYY hh:mm:ss A");
                    }

                    return (
                      <Box
                        key={key}
                        sx={{
                          display: "flex",
                          padding: 1,
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                            flexShrink: 0,
                            width: "40%",
                          }}
                        >
                          {toTitleCase(key)}:
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            flexGrow: 1,
                          }}
                        >
                          {val}
                        </Typography>
                      </Box>
                    );
                  })}
              </CardContent>
            </Card>
          ))}
      </Box>

      {/* Second Container */}
      <Box
        sx={{
          flex: 1,
          padding: 2,
          width: { xs: "100%", md: "66%" }, // Full width on mobile, 66% on desktop
        }}
      >
        <Upload isOpen={bookNow === "bulkUpload"} />
        <SearchBar placeholder="Search Application" />
        <AppListing />
        <SideDrawer
          title="Application Details"
          open={drawerOpen}
          onClose={handleClose}
          anchor="right"
          width={{ xs: "100%", md: 450 }} // Full width on mobile, fixed width on desktop
        >
          {isLoading && <Typography>Loading...</Typography>}
          {error && (
            <Typography color="error">Error: {error.message}</Typography>
          )}
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
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      flexShrink: 0,
                      width: "40%",
                    }}
                  >
                    {key}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              );
            })
          )}
        </SideDrawer>
      </Box>
    </Box>
  );
}
