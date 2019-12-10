import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
//   return '6f961db45cf15ca4eed61718a9b029be'
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
