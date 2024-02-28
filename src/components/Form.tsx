import React, { useEffect, useState } from "react";


import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,

  MenuItem,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import {  firstPartSchema, secondPartSchema } from "../validation/FormValidation";

import { useDispatch } from "react-redux";
import { addUser } from "../redux/slice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type FormValues = {
  name: string;
  sex: string;
  age: number;
  mobile: string;
  idType:string;
  idNumber:string;
};

type FormValues2={
  address:string;
  state:string;
  city:string;
  country:string;
  pincode:number;
}

const sexType = ["Male", "Female"];
const idType = ["Aadhar", "PAN"];

export const FormComponent: React.FC = () => {
  const [showSecondPart,setShowSecondPart]= useState(false)

  const [activeStep, setActiveStep] = useState(0);
  const [userData,setUserData]= useState({})
  const [completeFlag,setCompleteFlag] = useState(false)
  const dispatch = useDispatch()
  const users= useSelector((state:RootState)=>state.data.usersData)

  const steps = ['Personal Details', 'Address Details',];

  const {
    register: registerFirstPart,
    handleSubmit: handleSubmitFirstPart,
    formState: { errors: errorsFirstPart },
    reset: resetFirstPart
  } = useForm<FormValues>({
    resolver: yupResolver(firstPartSchema) as any,
    mode: "all",
  });

  const {
    register: registerSecondPart,
    handleSubmit: handleSubmitSecondPart,
    formState: { errors: errorsSecondPart },
    reset: resetSecondPart
  } = useForm<FormValues2>({
    resolver: yupResolver(secondPartSchema) as any,
    mode: "all",
  });

 




  const onSubmitFirstPart: SubmitHandler<FormValues> = (data) => {

    setActiveStep((pre)=>pre+1)
    setShowSecondPart(true)
    setUserData(data)
    resetFirstPart()

  };

  const onSubmitSecondPart: SubmitHandler<FormValues2> = (data) => {

     setUserData((preData)=>({...preData,...data}))
    resetSecondPart()
    setCompleteFlag(true)
    setShowSecondPart(false)
    setActiveStep(0)
    const newUser:any={...userData, ...data}
    dispatch(addUser(newUser))

    alert("User Created successfully")
    
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    console.error("Form validation failed:", errors);
  };

  const onError2: SubmitErrorHandler<FormValues2> = (errors) => {
    console.error("Form validation failed:", errors);
  };


  useEffect(() => {
    if(completeFlag)
    {
      console.log({userData})
      setCompleteFlag(false)
      console.log({users})
    }
  },[completeFlag])





  return (
    <div>
      
    <Container sx={{backgroundColor:"white", padding:"20px", borderRadius:"10px"}}>

      <div>
      <Stepper sx={{ height:"90px"}} activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step  key={index}>
            <StepLabel >{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {!showSecondPart?
      <form
        onSubmit={handleSubmitFirstPart(
           onSubmitFirstPart,
          onError
        )}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ textDecoration: "underline" ,paddingBottom:"10px" }}
        >
          Personal Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              label="Enter Name"
              {...registerFirstPart("name")}
              error={!!errorsFirstPart.name}
              helperText={errorsFirstPart.name?.message}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              label="Age"
              type="Number"
              
              {...registerFirstPart("age")}
              error={!!errorsFirstPart.age}
              helperText={errorsFirstPart.age?.message}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              fullWidth
              label="Sex"
              select
              {...registerFirstPart("sex")}
              error={!!errorsFirstPart.sex}
              helperText={errorsFirstPart.sex?.message}
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
              type="number"
              {...registerFirstPart("mobile")}
              error={!!errorsFirstPart.mobile}
              helperText={errorsFirstPart.mobile?.message}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth select label="Govt Issued ID Type" {...registerFirstPart("idType")} error={!!errorsFirstPart.idType}
              helperText={errorsFirstPart.idType?.message}>
              {idType.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField  fullWidth label="ID Number" {...registerFirstPart("idNumber")} error={!!errorsFirstPart.idNumber}
              helperText={errorsFirstPart.idNumber?.message} />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </Box>
      </form>:
      <form onSubmit={handleSubmitSecondPart(onSubmitSecondPart,onError2)} >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ textDecoration: "underline",paddingBottom:"10px" }}
        >
          Address Details
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={6} >
                <TextField
                {...registerSecondPart("address")}
                error={!!errorsSecondPart.address}
              helperText={errorsSecondPart.address?.message}
                
                fullWidth label="Address"/>

            </Grid>
            <Grid item xs={3}>
             <TextField
              {...registerSecondPart("state")}
              error={!!errorsSecondPart.state}
            helperText={errorsSecondPart.state?.message}
             fullWidth label="State"/>
            </Grid>
            <Grid item xs={3}>
                <TextField
                 {...registerSecondPart("city")}
                 error={!!errorsSecondPart.city}
               helperText={errorsSecondPart.city?.message}
                fullWidth label="City"/>

            </Grid>
            <Grid item xs={5}>
                <TextField
                 {...registerSecondPart("country")}
                 error={!!errorsSecondPart.country}
               helperText={errorsSecondPart.country?.message}
                fullWidth label="Country"/>

            </Grid>
            <Grid item xs={3}>
              <TextField
               {...registerSecondPart("pincode")}
               error={!!errorsSecondPart.pincode}
             helperText={errorsSecondPart.pincode?.message}
              fullWidth label="pincode" type="number"/>
            </Grid>

        </Grid>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>

        </form>}

        </div>
    </Container>
    </div>
  );
};
