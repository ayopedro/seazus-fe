import validator from 'validator';

export const resetValidator = (
  values: Record<string, string>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (
    Object.prototype.hasOwnProperty.call(values, 'new_password') &&
    validator.isEmpty(values.new_password)
  ) {
    errors.new_password = 'Password must not be empty';
  }

  if (
    Object.prototype.hasOwnProperty.call(values, 'confirm_password') &&
    validator.isEmpty(values.confirm_password)
  ) {
    errors.confirm_password = 'Confirm password must not be empty';
  }

  if (
    Object.prototype.hasOwnProperty.call(values, 'token') &&
    validator.isEmpty(values.token)
  ) {
    errors.token = 'Kindly provide the one time password';
  }

  if (values.new_password !== values.confirm_password) {
    errors.confirm_password = 'Passwords do not match';
  }

  return errors;
};
