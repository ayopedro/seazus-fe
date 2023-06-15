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
