import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../auth.js';


const Login = ({ navBar, handleLogin, infoTooltipData, tokenCheck }) => {


  const [formValue, setFormValue] = useState({
    password: '',
    email: ''
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth.authorize(formValue.password, formValue.email)
      .then((data) => {
        if (data.token) {
          setFormValue({ password: '', email: '' });
          handleLogin();
          tokenCheck();
          infoTooltipData(data)
          console.log(data)
          navigate('/main', { replace: true });
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="login">
      <form className="form form_black" onSubmit={handleSubmit} >
        <h2 className="form__title form__title_black">
          Вход
        </h2>
        <div className="form__input-container form__input-container_black">
          <input className="form__item form__item_black"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formValue.email}
            onChange={handleChange} />

          <input className="form__item form__item_bottom form__item_black"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={formValue.password}
            onChange={handleChange} />
        </div>

        <button className="form__button form__button_white"
          type="submit"
          onSubmit={handleSubmit}>
          Войти
        </button>

      </form>
    </div>
  )
}

export default Login;