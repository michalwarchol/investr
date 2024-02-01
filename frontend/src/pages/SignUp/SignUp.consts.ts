export interface IValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export const initialValues: IValues = {
  name: "",
  email: "",
  role: "",
  password: "",
  confirmPassword: "",
};
