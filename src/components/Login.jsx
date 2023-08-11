import { useState } from "react";

export default function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleMailInput(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input type="email"
          name="email"
          className="login__input login__input_email"
          placeholder="Email"
          value={email || ''}
          onChange={handleMailInput}
          required />
        <input type="password"
          name="password"
          className="login__input login__input_password"
          placeholder="Пароль"
          value={password || ''}
          onChange={handlePasswordInput}
          required />
        <button className="login__button" type="submit">Войти</button>
      </form>
    </section>
  )
}