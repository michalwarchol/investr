export interface IValues {
  name: string;
  description: string;
  goal: string | number;
  url: string;
  contact_email: string;
  contact_phone: string;
  tags: string[];
  file: File | null;
}

export const initialValues: IValues = {
  name: "",
  description: "",
  goal: "",
  url: "",
  contact_email: "",
  contact_phone: "",
  tags: [],
  file: null,
};
