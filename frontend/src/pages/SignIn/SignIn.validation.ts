import { object, string } from "yup";

export const validationSchema = object({
  email: string().email().required("This field is required"),
  password: string().required("This field is required"),
});
