import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../auth.js';

const Register = ({ navBar, handleRegister }) => {

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
    if (formValue.email || formValue.password) {
      auth.register(formValue.password, formValue.email)
        .then((res) => {
          if (res.data) {
            handleRegister()
            navigate('/sign-in', { replace: true });
          } else {
            handleRegister();
          }
        }
        );
    }
  }


  return (
    <div className="register" >

      <form className="form form_black" onSubmit={handleSubmit}>
        <h2 className="form__title form__title_black">
          Регистрация
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
          Зарегистрироваться
        </button>

      </form>

      <div className="sign">
        <p className="sign__text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="sign__link">Войти</Link>
      </div>
    </div>
  );
}

export default Register;