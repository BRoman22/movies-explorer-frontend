import { useCallback, useState } from 'react';
import { EmailRegex } from '../utils/constants.js';

export default function useFormValidation() {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const input = e.target;
    const { name, value } = input;

    if (input.validity.valueMissing) {
      input.setCustomValidity('Пожалуйста, заполните поле');
    } else if (input.validity.tooShort && name === 'name') {
      input.setCustomValidity('Минимум 2 символа');
    } else if (input.validity.tooShort && name === 'password') {
      input.setCustomValidity('Минимум 6 символов');
    } else if (!value.match(EmailRegex) && name === 'email') {
      input.setCustomValidity('Некорректный формат email');
    } else {
      input.setCustomValidity('');
    }

    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}) => {
      setInputs(newValues);
      setErrors(newErrors);
    },
    [setInputs, setErrors],
  );

  const resetSubmitButton = useCallback(
    (newIsValid = false) => {
      setIsValid(newIsValid);
    },
    [setIsValid],
  );

  return {
    inputs,
    setInputs,
    errors,
    isValid,
    handleChange,
    resetForm,
    resetSubmitButton,
  };
}
