import { useState } from 'react';
import { FormHook } from '../../types';

export const useForm = ({ initialState, validate, callback }: FormHook) => {
  const [values, setValues] = useState<Record<string, string>>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e?.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const get_err = validate(values);

    if (Object.keys(get_err).length === 0) {
      callback();
    }
    setErrors(get_err);
  };
  return { values, handleChange, handleSubmit, errors };
};
