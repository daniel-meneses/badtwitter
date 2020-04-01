import 'isomorphic-fetch';
const API = 'http://localhost:4000/api/v1';
//const API = 'https://still-shelf-30581.herokuapp.com/api/v1'

export default () => {
  return fetch(API + '/feed/global')
    .then(res => {
      return res.json();
    })
    .catch(e => {
      return e
      // do nothing
    });
};
