import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Modal from "@mui/material/Modal";

export default function BookingModal() {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  const initialValues = {
    nationality: "",
    visa_country: "",
    visa_center: "",
    visa_category: "",
    visa_sub_category: "",
    first_name: "",
    last_name: "",
    migris_number: "",
    passport_number: "",
    passport_expiry: "",
    dob: "",
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const onSubmit = (data) => {
    console.log(data);
    handleClose(); // Close the modal on form submission
  };

  const formValues = watch();

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            maxWidth: "600px",
            maxHeight: "700px",
            overflow: "scroll",
            mx: "auto",
            mt: 5,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "white",
            outline: "none",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Booking Form
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.nationality)}>
                  <InputLabel size="small">Nationality</InputLabel>
                  <Select
                    size="small"
                    label="Nationality"
                    value={formValues.nationality}
                    {...register("nationality", {
                      required: "Nationality is required",
                      onChange: (e) => setValue("nationality", e.target.value),
                    })}
                  >
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="UK">UK</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                  <Typography variant="caption" color="error">
                    {errors.nationality?.message}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.visa_center)}>
                  <InputLabel size="small">Visa Center</InputLabel>
                  <Select
                    size="small"
                    label="Visa Center"
                    value={formValues.visa_center}
                    {...register("visa_center", {
                      required: "Visa center is required",
                      onChange: (e) => setValue("visa_center", e.target.value),
                    })}
                  >
                    <MenuItem value="Bangkok">Bangkok</MenuItem>
                  </Select>
                  <Typography variant="caption" color="error">
                    {errors.visa_center?.message}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.visa_category)}>
                  <InputLabel size="small">Visa Category</InputLabel>
                  <Select
                    size="small"
                    label="Visa Category"
                    value={formValues.visa_category}
                    {...register("visa_category", {
                      required: "Visa category is required",
                      onChange: (e) =>
                        setValue("visa_category", e.target.value),
                    })}
                  >
                    <MenuItem value="Temporary Residence Permit">
                      Temporary Residence Permit
                    </MenuItem>
                  </Select>
                  <Typography variant="caption" color="error">
                    {errors.visa_category?.message}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(errors.visa_sub_category)}
                >
                  <InputLabel size="small">Visa Sub-Category</InputLabel>
                  <Select
                    size="small"
                    label="Visa Sub-Category"
                    value={formValues.visa_sub_category}
                    {...register("visa_sub_category", {
                      required: "Visa sub-category is required",
                      onChange: (e) =>
                        setValue("visa_sub_category", e.target.value),
                    })}
                  >
                    <MenuItem value="work">Work</MenuItem>
                  </Select>
                  <Typography variant="caption" color="error">
                    {errors.visa_sub_category?.message}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  label="First Name"
                  fullWidth
                  value={formValues.first_name}
                  {...register("first_name", {
                    required: "First name is required",
                    onChange: (e) => setValue("first_name", e.target.value),
                  })}
                  error={Boolean(errors.first_name)}
                  helperText={errors.first_name?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  label="Last Name"
                  fullWidth
                  value={formValues.last_name}
                  {...register("last_name", {
                    required: "Last name is required",
                    onChange: (e) => setValue("last_name", e.target.value),
                  })}
                  error={Boolean(errors.last_name)}
                  helperText={errors.last_name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  label="Migris Number"
                  fullWidth
                  value={formValues.migris_number}
                  {...register("migris_number", {
                    required: "Migris number is required",
                    onChange: (e) => setValue("migris_number", e.target.value),
                  })}
                  error={Boolean(errors.migris_number)}
                  helperText={errors.migris_number?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  label="Passport Number"
                  fullWidth
                  value={formValues.passport_number}
                  {...register("passport_number", {
                    required: "Passport number is required",
                    onChange: (e) =>
                      setValue("passport_number", e.target.value),
                  })}
                  error={Boolean(errors.passport_number)}
                  helperText={errors.passport_number?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  label="Passport Expiry Date"
                  fullWidth
                  type="date"
                  value={formValues.passport_expiry}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("passport_expiry", {
                    required: "Passport expiry date is required",
                    onChange: (e) =>
                      setValue("passport_expiry", e.target.value),
                  })}
                  error={Boolean(errors.passport_expiry)}
                  helperText={errors.passport_expiry?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  label="Date of Birth"
                  fullWidth
                  type="date"
                  value={formValues.dob}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("dob", {
                    required: "Date of birth is required",
                    onChange: (e) => setValue("dob", e.target.value),
                  })}
                  error={Boolean(errors.dob)}
                  helperText={errors.dob?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
