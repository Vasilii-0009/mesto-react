const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'f2aec418-693a-4d30-9fa0-f227bcec820c'
  },
}
class Api {
  constructor(configApi) {
    this._url = configApi.url
    this._headers = configApi.headers
  }

  _checkResponse(item) {
    return item.then(item => {
      if (item.ok) {
        return item.json()
      }
      return Promise.reject(`${item.status}`)
    })
  }

  getTasks() {
    const card = fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
    return this._checkResponse(card)
  }

  getInfoUser() {
    const infoUSer = fetch(`${this._url}/users/me`, {
      headers: this._headers,
    })
    return this._checkResponse(infoUSer)
  }

  saveInfoUser(name, about) {
    const saveInfoUser = fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name, about
      })
    })
    return this._checkResponse(saveInfoUser)
  }

  creatCard(name, link) {
    const creatCard = fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
    return this._checkResponse(creatCard)
  }

  deleteCard(id) {
    const deleteCard = fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    return this._checkResponse(deleteCard)
  }

  addLike(id,) {
    const addLike = fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    return this._checkResponse(addLike)
  }

  deleteLike(id) {
    const addLike = fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    return this._checkResponse(addLike)
  }

  updateAvatar(avatar) {
    const updateAvatar = fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    return this._checkResponse(updateAvatar)
  }
}

const dataApi = new Api(configApi)

export default dataApi 