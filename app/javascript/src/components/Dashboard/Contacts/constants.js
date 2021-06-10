import * as yup from "yup";

export const newContactInitialValues = {
  name: "",
  email: "",
  contactNumber: "",
  department: "",
  addToBaseCamp: false,
};

export const newContactValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  contactNumber: yup.string().required("Contact Number is required"),
  department: yup.string().required("Department is required"),
});
