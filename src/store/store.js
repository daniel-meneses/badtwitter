import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from '../reducers/main.js';
import throttle from 'lodash.throttle';
import { saveStateToLocal, loadState } from '../localStorage.js';


const persistedState = loadState();
// Redux store.
// Returns state from reducers
const store = createStore(
  mainReducer,
  persistedState,
  applyMiddleware(thunk)
);

// Persist some state to local.
// https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e
store.subscribe(throttle(() => {
  var state = store.getState();
  //console.log(state)
  saveStateToLocal({
    subscription: { subscription_requests: state.subscription.subscription_requests },
    session: { currentUser: state.session.currentUser }
  });
}, 1000));

export default store;
