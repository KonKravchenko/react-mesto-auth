import { useState } from 'react';

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
console.log(values)
  return { values, handleChange, setValues };
}