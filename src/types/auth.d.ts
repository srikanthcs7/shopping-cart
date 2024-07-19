interface LoginSuccessResponse {
  code: number;
  id: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

interface LoginFailedResponse {
  code: number;
  type: string;
  message: string;
}

export type LoginResponse = LoginSuccessResponse | LoginFailedResponse;
