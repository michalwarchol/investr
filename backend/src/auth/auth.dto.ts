export interface ISignInResponse {
  accessToken: string;
}

export interface ISignInBody {
  email: string;
  password: string;
}

export interface ISignUpBody {
  email: string;
  name: string;
  password: string;
}
