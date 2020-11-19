import '@testing-library/jest-dom'
import React from 'react';
import { fireEvent } from '@testing-library/react';
import LikeButton, { testIds } from './LikeButton';
import showGuestToast from '../Toast/GuestToast';
import * as likeActions from '../../actions/likes';
import fetchMock from 'fetch-mock';
import { renderWithProviders, renderWithMockStore } from '../../test/render';

fetchMock.mock('http://localhost:3000/api/v1/like', 200);
fetchMock.mock('http://localhost:3000/api/v1/like/delete', 200);
jest.mock('../Toast/GuestToast');

const mockLikeUserPost = jest.spyOn(likeActions, 'likeUserPost');
const mockUnlikeUserPost = jest.spyOn(likeActions, 'unlikeUserPost');

const likeState = {
  likes: {
    likes: {
      postIds: [12]
    }
  },
}

const sessionState = (isAuth: boolean) => ({
  session: {
    session: {
      isAuthenticated: isAuth
    }
  }
})

test("When post not liked then like icon fill is white", () => {
  const { getByTestId } = renderWithProviders(<LikeButton postId={12}  />, {})
  const btn = getByTestId(testIds.likeSVG)
  expect(btn).toHaveAttribute('fill', 'white')
  expect(btn).toHaveAttribute('stroke', 'green')
});

test("When post is liked then like icon fill is green", () => {
  const { getByTestId } = renderWithProviders(<LikeButton postId={12} />, likeState)
  const btn = getByTestId(testIds.likeSVG)
  expect(btn).toHaveAttribute('fill', 'green')
});

test("When authenticated user selects like icon then function like post invoked with argument post id", () => {
  const { getByTestId } = renderWithMockStore(<LikeButton postId={123} />, {...likeState, ...sessionState(true)} )
  const el = getByTestId(testIds.likeContainer)
  fireEvent.click(el)
  expect(mockLikeUserPost).toHaveBeenCalledWith(123);
});

test("When authenticated user selects unlike icon then function unlike post invoked with argument post id", () => {
  const { getByTestId } = renderWithMockStore(<LikeButton postId={12} />, {...likeState, ...sessionState(true)} )
  const el = getByTestId(testIds.likeContainer)
  fireEvent.click(el)
  expect(mockUnlikeUserPost).toHaveBeenCalledWith(12);
});

test("When guest user selects like icon then show guest prompt function called", () => {
  const { getByTestId } = renderWithMockStore(<LikeButton postId={80} />, {...likeState, ...sessionState(false)} )
  const el = getByTestId(testIds.likeContainer)
  fireEvent.click(el)
  expect(showGuestToast).toHaveBeenCalledWith('Log in or sign up to like posts');
});
