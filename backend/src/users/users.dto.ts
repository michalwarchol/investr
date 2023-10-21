export interface IUserResponse {
  id: string;
  email: string;
  name: string;
}

export interface IUserCreateProps {
  email: string;
  name: string;
  password: string;
}
