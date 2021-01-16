import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from '../reducers/main';


const storeFromState = () => {

  let persistedState = {};
  if (typeof window !== "undefined") {
    // TODO delete window.__PRELOADED_STATE__ after read
    persistedState = window.__INITIAL_STATE_ || {}
  }

  return createStore(
    mainReducer,
    persistedState,
    applyMiddleware(thunk)
  );
}


const store = storeFromState();

export default store;
