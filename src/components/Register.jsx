import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register(props) {

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
    props.onRegister(email, password);
  }

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
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
          placeholder="Password"
          value={password || ''}
          onChange={handlePasswordInput}
          required />
        <button className="login__button" type="submit">Зарегистрироваться</button>
      </form>
      <p className="login__text">Уже зарегистрированы? <Link to='/signin' className="login__link">Войти</Link></p>
    </section>
  )
}