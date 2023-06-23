import { TokenResponse, CredentialResponse } from '@react-oauth/google';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  verified: boolean;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: 'idle' | 'pending';
  error: string | null | unknown;
};

export interface ResponseUser extends User {
  googleAuth: boolean;
  createdAt: string;
  updatedAt: string;
}

export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type ForgotPassword = {
  email: string;
};

export type ResetPassword = {
  token: string;
  newPassword: string;
};

export type ChangePasswordType = {
  currentPassword: string;
  newPassword: string;
};

export type GoogleResponse = TokenResponse | CredentialResponse;
