import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Box, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash/debounce";

const SearchBar = ({ placeholder }) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Debounce the function to update the URL
  const debouncedUpdateURL = useCallback(
    debounce((value) => {
      const params = new URLSearchParams(location.search);
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }, 300), // Adjust debounce delay as needed
    [location.search, location.pathname, navigate]
  );

  useEffect(() => {
    // Call debounced function to update the URL
    debouncedUpdateURL(searchValue);

    // Cleanup debounce on component unmount
    return () => {
      debouncedUpdateURL.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
      <TextField
        variant="outlined"
        size="large"
        value={searchValue}
        placeholder={placeholder}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon
                //     sx={{ color: "white" }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          width: "100%",
          borderRadius: "25px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "25px",
            "& fieldset": {
              //   borderColor: "#595959", // Border color
              //   borderColor: "primary.main", // Border color when not focused
            },
            "&:hover fieldset": {
              borderColor: "primary.dark", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main", // Border color when focused
            },
          },
          "& .MuiInputBase-input": {
            // color: "#ffff", // Input text color
          },
          "& .MuiInputBase-input::placeholder": {
            // color: "white", // Placeholder color
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
