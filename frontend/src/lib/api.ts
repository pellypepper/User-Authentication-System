import axios from 'axios';
import {
  LoginRequest,
  RegisterRequest,
  VerifyEmailRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ApiResponse,
  User
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  // Register
  register: async (data: RegisterRequest): Promise<ApiResponse<User>> => {
    const response = await api.post<ApiResponse<User>>('/register', data);
    return response.data;
  },

  // Verify Email
  verifyEmail: async (data: VerifyEmailRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/register/verify', data);
    return response.data;
  },

  // Login
  login: async (data: LoginRequest): Promise<ApiResponse<User>> => {
    const response = await api.post<ApiResponse<User>>('/login', data);
    return response.data;
  },

  // Google Login (redirect)
  googleLogin: () => {
    window.location.href = `${API_BASE_URL}/login/google`;
  },

  // Logout
  logout: async (): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/login/logout');
    return response.data;
  },

  // Get Profile
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>('/profile');
    return response.data;
  },

  // Update Profile
  updateProfile: async (data: UpdateProfileRequest): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>('/profile', data);
    return response.data;
  },

  // Change Password
  changePassword: async (data: ChangePasswordRequest): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>('/profile/change-password', data);
    return response.data;
  },

  // Forgot Password
  forgotPassword: async (data: ForgotPasswordRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/profile/forget-password', data);
    return response.data;
  },

  // Reset Password
  resetPassword: async (data: ResetPasswordRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/profile/reset-password', data);
    return response.data;
  },
};

export default api;