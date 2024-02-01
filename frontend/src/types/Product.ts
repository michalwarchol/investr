import { Tag } from "./Tag";
import { User } from "./User";

export type Product = {
  id: string;
  name: string;
  description: string;
  goal: number;
  image: string;
  url: string | null;
  contact_email: string;
  contact_phone: string;
  tags: Tag[];
  owner: User;
};
