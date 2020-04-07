import React from 'react'
import AppSSR from './AppSSR'
import { Provider } from 'react-redux'
import { StaticRouter } from "react-router-dom";
import store from '../../store/store.js';

const AppWithStore = () => {

  return (
    <div>
    <Provider store={store}><StaticRouter><AppSSR /></StaticRouter></Provider>
    </div>
  );
}

export default AppWithStore
