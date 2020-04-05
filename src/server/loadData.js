import 'isomorphic-fetch';
const API = 'http://localhost:4000/api/v1';
//const API = 'https://still-shelf-30581.herokuapp.com/api/v1'

function headers(data) {
  const cookie = data.headers.cookie
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cookie: cookie,
  };
}

export default {

  fetch(data) {
    return fetch('http://localhost:4000/api/v1/accounts/session', {
      method: 'GET',
      headers: headers(data),
      credentials: 'include'
      })
      .then(res => {
        return res.json()
      })
      .catch(e => {
      //  console.log("ISO fetch failed")
      //  console.log(e)
        return e
      });
  },

  post(url, data) {
    return fetch('http://localhost:4000/api/v1/accounts/refresh', {
      method: 'POST',
      headers: headers(data),
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
  }

};
