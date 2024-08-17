import React, { useState } from "react";
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
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DataTable = ({ columns, data, isLoading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate(); // Hook for navigation

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  const handleRowClick = (id) => {
    navigate(`?id=${id}&detail=true`); // Update the URL with the row ID
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "calc(100vw - 40px)", // Adjust max-width based on padding
          overflowX: "auto",
          boxShadow: 3,
          borderRadius: 2,
          padding: 2,
        }}
      >
        {data && data.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ padding: 2 }}>
            No data available
          </Typography>
        ) : (
          <Table stickyHeader sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      fontWeight: "bold",
                      padding: "10px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "action.hover",
                      },
                      cursor: "pointer", // Add cursor pointer to indicate row is clickable
                    }}
                    onClick={() => handleRowClick(row._id)} // Handle row click
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        sx={{
                          padding: "10px",
                          borderBottom: "1px solid #ddd",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {column.render ? column.render(row) : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default DataTable;
