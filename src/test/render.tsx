import '@testing-library/jest-dom'
import React from 'react';
import { createStore } from 'redux';
import mainReducer from '../reducers/main';
import { Provider } from "react-redux";
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

export function renderWithProviders(ui: any, testStoreState: any = {}) {
  const store = createStore(mainReducer, testStoreState);
  return render(<Provider store={store}>{ui}</Provider>);
}

export function renderWithMockStore(ui: any, testStoreState: any = {}) {
  const store = mockStore(testStoreState);
  return render(<Provider store={store}>{ui}</Provider>);
}
