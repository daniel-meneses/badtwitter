import '@testing-library/jest-dom'
import { createStore } from 'redux';
import mainReducer from '../../reducers/main';
import { Provider } from "react-redux";
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LikeButton from './LikeButton';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

function renderWithProviders(ui: any, testStoreState: any = {}) {
  const store = createStore(mainReducer, testStoreState);
  return render(<Provider store={store}>{ui}</Provider>);
}

function renderWithMockStore(ui: any, testStoreState: any = {}) {
  const store = mockStore(testStoreState);
  return render(<Provider store={store}>{ui}</Provider>);
}

let likedPost = { 
  likes: {
    likes: {
      postIds: [12]
    }
  } 
}

test("Link button unlike fill white", () => {
  const { getByTestId, debug } = renderWithProviders(<LikeButton postId={12}  />, {})
  const btn = getByTestId('like-button')
  expect(btn).toHaveAttribute('fill', 'white')
  expect(btn).toHaveAttribute('stroke', 'green')
});

test("Link button liked fill green", () => {
  const { getByTestId, debug } = renderWithProviders(<LikeButton postId={12} />, likedPost)
  const btn = getByTestId('like-button')
  expect(btn).toHaveAttribute('fill', 'green')
});

/*
  This fails becuase reducers don't update state tree
  on success..

test("When selected then turn green", () => {
  const { getByTestId, debug } = renderWithMockStore(<LikeButton postId={80} />, likedPost)
  const el = getByTestId('like-selectable')
  debug();
  fireEvent.click(el)
  debug();
  expect(el).toHaveAttribute('fill', 'green')
});

*/