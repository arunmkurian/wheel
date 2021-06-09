import * as yup from "yup";


export const createNoteInitialValues = {
  title: "",
  tag: "",
  description: "",
  assignedContact: "",
  dueDate: new Date(),
};

export const createNoteValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});