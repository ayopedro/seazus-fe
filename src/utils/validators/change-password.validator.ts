import validator from 'validator';

export const changePasswordValidator = (
  values: Record<string, string>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (
    Object.prototype.hasOwnProperty.call(values, 'current_password') &&
    validator.isEmpty(values.current_password)
  ) {
    errors.current_password = 'Kindly enter your current password';
  }

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

  if (values.new_password !== values.confirm_password) {
    errors.confirm_password = 'Passwords do not match';
  }

  return errors;
};
