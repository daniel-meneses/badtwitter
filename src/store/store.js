import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from '../reducers/main.js';

// Redux store.
// Returns state from reducers
const store = createStore(
  mainReducer,
  applyMiddleware(thunk)
);
export default store;
