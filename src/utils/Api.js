 class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  }

  getProfileData() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
      .then(this._checkResponse);
  }

  setProfileData(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);
  }

  setProfileAvatar(avatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(avatar)
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
      .then(this._checkResponse);
  }

  setNewCard(name, link) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(name, link)
    })
      .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._checkResponse);
  }

  addLike(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers,
    })
      .then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._checkResponse);
  }
}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'e3cda1d4-1903-40f4-b79f-2419b5c60311',
    'Content-Type': 'application/json'
  }
});