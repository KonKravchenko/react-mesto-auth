export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email })
  })
    .then((response) => {
      try {
        if (response) {
          return response.json();
        }
      } catch (e) {
        return (e)
      }
    })
    .catch((err) => console.log(err));
};


export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((response => response.json()))
    .then((data) => {
      console.log(data)
      if (data) {
        localStorage.setItem('token', data.token);
        console.log(data);
        return data;
      }
    })
    .catch(err => console.log(err))
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.json())
    .then((data) =>  data )
    .catch(err => console.log(err))
}