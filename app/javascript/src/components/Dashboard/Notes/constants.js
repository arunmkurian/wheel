import * as yup from "yup";

export const newNoteInitialValues = {
  title: "",
  tag: "",
  description: "",
  assignedContact: "",
  dueDate: new Date(),
};

export const newNoteValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});
