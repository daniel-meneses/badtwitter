const API = 'http://localhost:4000/api/v1';
function headers(url) {
  var token = ""
  var tokenType = ""
  // This needs to be set somewhere else
  if (url === '/accounts/refresh') {
    tokenType = "token_refresh"
  } else {
    tokenType = "token_access"
  }
  try {
    token = JSON.parse(localStorage.getItem(tokenType));
  } catch (e) {
    console.log(e)
  }

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer: ${token}`,
  };
}

function parseResponse(response) {
  return response.json().then((json) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  });
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
  fetch(url, params = {}) {
    return fetch(`${API}${url}${queryString(params)}`, {
      method: 'GET',
      headers: headers(url),
    })
    .then(parseResponse);
  },

  post(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${API}${url}`, {
      method: 'POST',
      headers: headers(url),
      body,
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
