// components/DataTable.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";

const DataTable = ({ columns, data, isLoading, error }) => {
  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "100vw",
        boxShadow: 3, // Add shadow to the container
        borderRadius: 2, // Rounded corners
        overflowY: "auto", // Add vertical scrollbar if content overflows
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  fontWeight: "bold", // Bold font for headers
                  padding: "10px",
                  whiteSpace: "nowrap", // Prevent text from wrapping
                  overflow: "hidden", // Hide overflow text
                  textOverflow: "ellipsis", // Add ellipsis for overflow text
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row._id}
              sx={{
                "&:nth-of-type(odd)": {
                  backgroundColor: "action.hover", // Alternate row color
                },
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    padding: "10px",
                    borderBottom: "1px solid #ddd",
                    whiteSpace: "nowrap", // Prevent text from wrapping
                    overflow: "hidden", // Hide overflow text
                    textOverflow: "ellipsis", // Add ellipsis for overflow text
                  }}
                >
                  {column.render ? column.render(row) : row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
