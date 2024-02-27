import React, { useState } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import { combinedSchema, firstPartSchema } from "../validation/FormValidation";

type FormValues = {
  name: string;
  sex: string;
  age: number;
  mobile: string;
  idType:string;
  idNumber:string;
};

const sexType = ["Male", "Female"];
const idType = ["Aadhar", "PAN"];

export const FormComponent: React.FC = () => {
  const [showSecondPart,setShowSecondPart]= useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(firstPartSchema) as any,
  });


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('idNumber', event.target.value.toUpperCase());
  };

  const onSubmitFirstPart: SubmitHandler<FormValues> = (data) => {
    // // Do any additional logic for the first part submission
    // // Set values for the second part fields based on the first part
    // setValue("address", ""); // Set default value for the address field
    // setValue("state", "");
    // setValue("city", "");
    // setValue("pincode", "");

    console.log("Form submitted successfully:", data);

    // if(Object.keys(errors).length === 0 && watch('name') && watch('sex') && watch('age') && watch('mobile')){
    //     setShowSecondPart(true)
    // }
  };

  const onSubmitSecondPart: SubmitHandler<FormValues> = (data) => {
    // Handle the final form submission
    console.log("Form submitted successfully:", data);
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    console.error("Form validation failed:", errors);
  };

//   const showSecondPart =
//     Object.keys(errors).length === 0 &&
//     watch("name") &&
//     watch("sex") &&
//     watch("age") &&
//     watch("mobile");

  return (
    <Container>
      {!showSecondPart?<form
        onSubmit={handleSubmit(
           onSubmitFirstPart,
          onError
        )}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textDecoration: "underline" }}
        >
          Personal Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              label="Enter Name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              label="Age"
              type="number"
              {...register("age")}
              error={!!errors.age}
              helperText={errors.age?.message}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              fullWidth
              label="Sex"
              select
              {...register("sex")}
              error={!!errors.sex}
              helperText={errors.sex?.message}
            >
              {sexType.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Mobile"
              {...register("mobile")}
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth select label="Govt Issued ID Type" {...register("idType")} error={!!errors.idType}
              helperText={errors.idType?.message}>
              {idType.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField  fullWidth label="ID Number" {...register("idNumber")} error={!!errors.idNumber}
              helperText={errors.idNumber?.message} />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </Box>
      </form>:
      <form>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textDecoration: "underline" }}
        >
          Address Details
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={6} >
                <TextField fullWidth label="Address"/>

            </Grid>
            <Grid item xs={3}>
             <TextField fullWidth label="State"/>
            </Grid>
            <Grid item xs={3}>
                <TextField fullWidth label="City"/>

            </Grid>
            <Grid item xs={5}>
                

            </Grid>

        </Grid>

        </form>}

      
    </Container>
  );
};
