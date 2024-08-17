// components/ApplicationsTable.js
import React from "react";
import DataTable from "./DataTable";
import { useApplications } from "../hooks/useApplications";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

const ApplicationsTable = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const searchParams = params.get("search");

  const {
    data: applications,
    error,
    isLoading,
  } = useApplications({ search: searchParams });

  const columns = [
    { id: "nationality", label: "Nationality" },
    { id: "visa_center", label: "Visa Center" },
    { id: "visa_category", label: "Visa Category" },

    { id: "first_name", label: "First Name" },
    { id: "last_name", label: "Last Name" },
    { id: "slot", label: "Slot" },
    {
      id: "payable",
      label: "Payable",
      render: (row) => `${row.payable.currency} ${row.payable.amount}`,
    },
    //     { id: "passport_expiry", label: "Passport Expiry" },
    //     { id: "dob", label: "Date of Birth" },
    //     { id: "passport_number", label: "Passport Number" },
    //     { id: "migris_number", label: "Migris Number" },
    //     { id: "gender", label: "Gender" },
    //     { id: "email", label: "Email" },

    //     {
    //       id: "phone",
    //       label: "Phone Number",
    //       render: (row) => `${row.phone.dial_code} ${row.phone.number}`,
    //     },
  ];

  return (
    <Box sx={{ padding: "20px", overflowX: "auto" }}>
      <DataTable
        columns={columns}
        data={applications?.data}
        isLoading={isLoading}
        error={error}
      />
    </Box>
  );
};

export default ApplicationsTable;
