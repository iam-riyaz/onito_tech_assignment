import * as yup from "yup";

export const firstPartSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(3),
  sex: yup.string().required("Sex is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .positive("Age must be positive"),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Invalid mobile number"),
  idType: yup.string().required("Govt ID Type is required"),
  idNumber: yup
    .string()
    .required("Govt ID Number is required")
    .when("idType", {
      is: (val: string) => val === "PAN",
      then: (schema) =>
        schema
          .transform((value) => value.toUpperCase())
          .matches(/^[A-Za-z0-9]{10}$/, "Invalid PAN number")
          .required("PAN number is required"),
      otherwise: (schema) =>
        schema
          .matches(/^[2-9]\d{11}$/, "Invalid Aadhar number")
          .required("Aadhar number is required"),
    }),
});

export const secondPartSchema = yup.object().shape({
  address: yup.string().required("Address is required").min(5).max(30),
  state: yup.string().required("State is required").min(3).max(20),
  city: yup.string().required("City is required").min(3).max(20),
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Invalid pincode"),
});
