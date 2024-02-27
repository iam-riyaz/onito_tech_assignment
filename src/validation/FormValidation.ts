import { schema } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import * as yup from "yup";
// Define Yup schema for the first part of the form
export const firstPartSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(3),
  sex: yup.string().required("Sex is required"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be positive"),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Invalid mobile number"),
  idType: yup.string().required("Govt ID Type is required"),
  idNumber: yup.string().required("Govt ID Number is required").when('idType', {
    is:(val:string)=>val === 'PAN' ,
    then: (schema)=> schema.matches(/^[A-Za-z0-9]{10}$/, 'Invalid PAN number').required('PAN number is required'),
    otherwise: (schema)=>schema.matches(/^[2-9]\d{11}$/, 'Invalid Aadhar number').required('Aadhar number is required'),
  }),
});

// Define Yup schema for the second part of the form
export const secondPartSchema = yup.object().shape({
  address: yup.string().required("Address is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Invalid pincode"),
});

// Define combined Yup schema for both parts of the form
export const combinedSchema = yup.object().shape({
  ...firstPartSchema.fields,
  ...secondPartSchema.fields,
});
