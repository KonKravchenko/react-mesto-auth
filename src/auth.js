export const BASE_URL = 'https://auth.nomoreparties.co';

const _checkResponse = (res) => {
 return res.ok ?  res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
}


export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email })
  })
    .then(res =>_checkResponse(res))    
};


export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then(res =>_checkResponse(res))  
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res =>_checkResponse(res))   
}