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
