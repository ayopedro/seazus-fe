import validator from 'validator';

export const registerValidator = (
  values: Record<string, string>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (
    Object.prototype.hasOwnProperty.call(values, 'first_name') &&
    validator.isEmpty(values.first_name)
  ) {
    errors.first_name = 'First Name must not be empty';
  }

  if (
    Object.prototype.hasOwnProperty.call(values, 'last_name') &&
    validator.isEmpty(values.last_name)
  ) {
    errors.last_name = 'Last name must not be empty';
  }

  if (
    Object.prototype.hasOwnProperty.call(values, 'email') &&
    validator.isEmpty(values.email)
  ) {
    errors.email = 'Email must not be empty';
  } else if (
    Object.prototype.hasOwnProperty.call(values, 'email') &&
    !validator.isEmail(values.email)
  ) {
    errors.email = 'Please enter a valid email address';
  }

  if (
    Object.prototype.hasOwnProperty.call(values, 'password') &&
    validator.isEmpty(values.password)
  ) {
    errors.password = 'Password must not be empty';
  }

  return errors;
};
