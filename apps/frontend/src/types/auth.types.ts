export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  role?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: RegisterData;
}
