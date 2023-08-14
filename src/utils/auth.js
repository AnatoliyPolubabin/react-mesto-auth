export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.status === 201) {
       return response.json();
        } else {
          response.json().then((data) => console.error(data.error));
          throw new Error();
        }
      })
      .then((res) => {
        return res;
      })
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
   .then((response) => {
   if (response.status === 200) {
    return response.json();
      } else {
        response.json().then((data) => console.error(data.message));
        throw new Error();
      }
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
    .catch((err) => console.log(err));
}

export function getToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
}