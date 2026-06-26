export interface APIResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}

export interface RegisterRequest {
  email?: string;
  phone?: string;
  linkedinId?: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginRequest {
  userId: string;
  password: string;
}

export interface ForgotPasswordRequest {
  userId: string;
  email?: string;
  phone?: string;
}

export interface ForgotUserIdRequest {
  email?: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  user: {
    id: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  };
}
