import { useCallback, useState } from 'react';

export default function useFormValidation() {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage }); //e.target.validationMessage дефолтный метод
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

// function getErrorMessage(name, value) {
//   let message = null;
//   if (name === 'name') {
//     if (!nameRegex.test(value)) return (message = `Введите Имя`);
//   }
//   if (name === 'email') {
//     if (!emailRegex.test(value)) return (message = `Введите коректный Емейл`);
//   }
//   if (name === 'pass') {
//     if (!passRegex.test(value))
//       return (message = `Минимальная длина 6 симв.`);
//   }
//   return message;
// }

// function resetForm() {
//   setInputs(newValues);
//   setErrors(newValues);
// }

// function resetSubmitButton() {
//   setIsValid(false);
// }
