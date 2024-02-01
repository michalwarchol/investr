import { Role } from "./Role";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
}
