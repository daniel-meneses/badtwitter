import 'isomorphic-fetch';
const API = 'http://localhost:4000/api/v1';
//const API = 'https://still-shelf-30581.herokuapp.com/api/v1'

function headers(data) {
  const isServer = typeof window === 'undefined'
  const cookie = (data || {}).cookie
  if (isServer && cookie) {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cookie: cookie
    }
  } else {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
}

function parseResponse(response) {
  return response.json()
    .then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
}

function parseResponseStatus(response) {
  return response.ok
}

function queryString(params) {
  const query = Object.keys(params)
                      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
                      .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

export default {
  fetch(url, params = {}, header = {}) {
    return fetch(`${API}${url}${queryString(params)}`, {
      method: 'GET',
      headers: headers(header),
      credentials: 'include',
    })
    .then(parseResponse);
  },

  post(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${API}${url}`, {
      method: 'POST',
      headers: headers(url),
      body,
      credentials: 'include',
    })
    .then(parseResponse)
  },

  postImage(url, data) {
    return fetch(`${url}`, {
      method: 'PUT',
      headers: {},
      body: data,
    })
    .then(parseResponseStatus)
  },

  patch(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${API}${url}`, {
      method: 'PATCH',
      headers: headers(url),
      body,
    })
    .then(parseResponse);
  },

  delete(url, data) {
    const body = JSON.stringify(data);
    return fetch(`${API}${url}`, {
      method: 'DELETE',
      headers: headers(url),
      body,
    })
    .then(parseResponse);
  },
};
