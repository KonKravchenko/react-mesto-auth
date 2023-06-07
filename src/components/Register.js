import React from 'react';
import { AuthForm } from './AuthForm';

const Register = ({ handleRegister, formValue, setFormValue }) => {

  return (
    <AuthForm
    name="register"
    title="Регистрация"
    buttonText="Зарегистрироваться"
    btnAriaLabel="Зарегистрироваться"
    handle={handleRegister}
    formValue={formValue}
    ></AuthForm>
  )

}

export default Register;