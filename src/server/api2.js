import 'isomorphic-fetch';
const API = 'http://localhost:4000/api/v1';
//const API = 'https://still-shelf-30581.herokuapp.com/api/v1'

function headers(data) {
  const cookie = (data || {}).cookie
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cookie: cookie,
  };
}

function parseResponse(response) {
  return response.json()
    .then((json) => {
      if (!response.ok) {
        console.log(json)
        return Promise.reject(json);
      }
      return json;
    })
}

function queryString(params) {
  const query = Object.keys(params)
                      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
                      .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

export default {

  fetch(url, data) {
    return fetch(`${API}${url}`, {
      method: 'GET',
      headers: headers(data),
      credentials: 'include'
      })
      .then(parseResponse)
    },

  post(url, data) {
    const body = JSON.stringify(data);
    return fetch(`${API}${url}`, {
      method: 'POST',
      headers: headers(data),
      body,
      credentials: 'include',
      })
      .then(res => {
      //  console.log("ISO fetch success")
      //  console.log(res)
        return res.json();
      })
      .catch(e => {
      //  console.log("ISO fetch failed")
      //  console.log(e)
        return e
        // do nothing
      });
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
  }
};
