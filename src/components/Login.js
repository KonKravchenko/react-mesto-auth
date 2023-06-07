import React from 'react';
import { AuthForm } from './AuthForm';

const Login = ({ handleLogin, formValue, setFormValue }) => {

return (
  <AuthForm 
  name="login"
  title="Вход"
  buttonText="Войти"
  btnAriaLabel="Войти"
  handle={handleLogin}
  formValue={formValue}
  ></AuthForm>
)

}

export default Login;