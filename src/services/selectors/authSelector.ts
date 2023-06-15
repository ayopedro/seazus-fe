import type { RootState } from '../store';

export const user = (state: RootState) => state.auth.user;
export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const loading = (state: RootState) => state.auth.loading;
export const error = (state: RootState) => state.auth.error;
