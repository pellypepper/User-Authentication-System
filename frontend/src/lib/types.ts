export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  verified: boolean;
  createdAt: string;
}

export interface profile {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  verified: boolean;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface UpdateProfileRequest {
  firstname?: string;
  lastname?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}

export interface ApiResponse<T = unknown> {
  message: string;
  user?: T;
  error?: string;
}