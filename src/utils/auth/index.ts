const key = 'access_token'

export function getAuthToken() {
    return window.localStorage.getItem(key)
}

export function setAuthToken(accessToken: string) {
    window.localStorage.setItem(key, accessToken)
}

export function removeAuthToken() {
    window.localStorage.removeItem(key)
}
