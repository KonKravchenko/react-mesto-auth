import React from 'react';

const Login = ({ handleLogin, formValue, setFormValue }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const { email, password } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    handleLogin(formValue)
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
            value={email}
            onChange={handleChange} />

          <input className="form__item form__item_bottom form__item_black"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={password}
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