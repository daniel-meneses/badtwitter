import 'isomorphic-fetch';
import * as env from '../constants/environment.js'

function headers(data) {
  const cookie = (data || {}).cookie
  if (env.IS_SERVER && cookie) {
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
    return fetch(`${env.API}${url}${queryString(params)}`, {
      method: 'GET',
      headers: headers(header),
      credentials: 'include',
    })
    .then(parseResponse);
  },

  post(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${env.API}${url}`, {
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

    return fetch(`${env.API}${url}`, {
      method: 'PATCH',
      headers: headers(url),
      body,
      credentials: 'include',
    })
    .then(parseResponse);
  },

  delete(url, data) {
    const body = JSON.stringify(data);
    return fetch(`${env.API}${url}`, {
      method: 'DELETE',
      headers: headers(data),
      body,
      credentials: 'include',
    })
    .then(parseResponse);
  },
};
