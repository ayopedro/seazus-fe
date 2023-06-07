import { ProtectedProps } from '../types';
import { Login } from '../pages/Login';

export const Protected = ({
  isLoggedIn,
  component: Component,
}: ProtectedProps) => {
  return isLoggedIn ? <Component /> : <Login />;
};
