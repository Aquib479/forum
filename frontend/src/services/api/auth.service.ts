import { post } from "../utils/apiHelper";

interface AuthResponse {
  success: boolean;
  token: string;
  data: {
    userId: string;
  };
}

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

interface LoginUserData {
  email: string;
  password: string;
}

// method : "POST" => register new user
export const registerUser = async (data: RegisterUserData) => {
  const response = await post<AuthResponse>("/api/auth/register", data);
  return response;
};

// method : "POST" => login registered user
export const loginUser = async (data: LoginUserData) => {
  const response = await post<AuthResponse>("/api/auth/login", data);
  return response;
};
