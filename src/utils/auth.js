export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(email, password) {

  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(res => checkResponse(res))
    .then((res) => {
      return res;
    });
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(res => checkResponse(res))
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
}

export function getToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then(res => checkResponse(res))
    .then((data) => data);
}

function checkResponse(res) {
  // тут проверка ответа
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`)
}