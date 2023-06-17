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
  access_token?: string | null;
  refresh_token?: string | null;
};

interface ResponseUser extends User {
  googleAuth: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AuthResponse = {
  user: ResponseUser;
  accessToken: string;
  refreshToken: string;
};

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
