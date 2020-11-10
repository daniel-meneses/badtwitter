import 'isomorphic-fetch';
import * as env from '../constants/environment'

function headers(data: any): any {
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

function parseResponse(response: any) {
  return response.json()
    .then((data: any) => {
      if (!response.ok) {
        return Promise.reject(data)
      }
      return data
    })
    .catch((err: any) => {
      let error = err.error
      let { status } = response
      if (error) {
        return Promise.reject({error, status})
      } else {
        return Promise.reject({error: setErrorByCode(status)})
      }
    })

}

function setErrorByCode(code: number){
  const is400 = code >= 400 && code < 500
  const is500 = code >= 500 && code < 600
  return is400 ? 'Resource not found' :
            is500 ? 'Server error occurred' :
                        'Unknown error occurred'
}

function parseResponseStatus(response: any) {
  return response.ok
}

function queryString(params: any) {
  const query = Object.keys(params)
                      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
                      .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

export default {
  fetch(url: string, params = {}, header = {}) {
    return fetch(`${env.API}${url}${queryString(params)}`, {
      method: 'GET',
      headers: headers(header),
      credentials: 'include',
    })
    .then(parseResponse);
  },

  post(url: string, data: any) {
    const body = JSON.stringify(data);

    return fetch(`${env.API}${url}`, {
      method: 'POST',
      headers: headers(url),
      body,
      credentials: 'include',
    })
    .then(parseResponse)
  },

  postImage(url: string, data: any) {
    return fetch(`${url}`, {
      method: 'PUT',
      headers: {},
      body: data,
    })
    .then(parseResponseStatus)
  },

  patch(url: string, data: any) {
    const body = JSON.stringify(data);

    return fetch(`${env.API}${url}`, {
      method: 'PATCH',
      headers: headers(url),
      body,
      credentials: 'include',
    })
    .then(parseResponse);
  },

  delete(url: string, data: any) {
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
