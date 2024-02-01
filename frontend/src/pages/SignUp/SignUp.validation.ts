import { object, string, ref } from "yup";

export const validationSchema = object({
  name: string().min(6).required("This field is required"),
  email: string().email().required("This field is required"),
  role: string()
    .oneOf(["investor", "company"])
    .required("This field is required"),
  password: string().min(8).required("This field is required"),
  confirmPassword: string().oneOf([ref("password")], "Passwords must match"),
});
