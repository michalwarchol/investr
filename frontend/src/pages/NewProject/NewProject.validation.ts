import { object, string, number } from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const validationSchema = object({
  name: string().required("This field is required"),
  description: string().required("This field is required"),
  goal: number().min(0).required("This field is required"),
  url: string()
    .url("This field must be an url")
    .required("This field is required"),
  contact_email: string()
    .email("This field must be an email")
    .required("This field is required"),
  contact_phone: string()
    .matches(phoneRegExp, "This field must be a phone number")
    .required("This field is required"),
});
