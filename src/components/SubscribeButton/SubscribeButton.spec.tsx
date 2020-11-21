import '@testing-library/jest-dom'
import React from 'react';
import { fireEvent } from '@testing-library/react';
import SubscribeButton from './SubscribeButton';
import showGuestToast from '../Toast/GuestToast';
import * as subscriptionActions from '../../actions/subscriptions';
import fetchMock from 'fetch-mock';
import { renderWithProviders, renderWithMockStore } from '../../test/render';

fetchMock.mock('http://localhost:3000/api/v1/subscription', 200);
fetchMock.mock('http://localhost:3000/api/v1/subscription/delete', 200);
jest.mock('../Toast/GuestToast');

const mockSubscriptionRequest = jest.spyOn(subscriptionActions, 'postSubscriptionRequest');
const mockDeleteSubscription = jest.spyOn(subscriptionActions, 'deleteSubscription');

const subState = (accept: number[] = [], pending: number[] = []) => ({
    subscriptions: {
        subscriptions: {
            acceptedUserIds: accept,
            pendingUserIds: pending,
        }
    },
})


const sessionState = (isAuth: boolean) => ({
    session: {
        session: {
            isAuthenticated: isAuth
        }
    }
})

const expectedPayload = (userId: number) => ({user_id: userId})

test("When subscription not requested then text is 'Follow'", () => {
    const { getByRole } = renderWithProviders(<SubscribeButton userId={1} />, {})
    const btn = getByRole('button')
    expect(btn).toHaveTextContent('Follow');
});

test("When 'Follow' selected then subscription request made", () => {
    const { getByRole } = renderWithMockStore(<SubscribeButton userId={12} />, {...subState([], [12]), ...sessionState(true)} )
    const btn = getByRole('button')
    fireEvent.click(btn)
    expect(mockSubscriptionRequest).toHaveBeenCalledWith(expectedPayload(12))
});

test("When subscription requested then text is 'Pending' ", () => {
    const { getByRole } = renderWithProviders(<SubscribeButton userId={12} />, {...subState([], [12]), ...sessionState} )
    const btn = getByRole('button')
    expect(btn).toHaveTextContent('Pending');
});

test("When subscription accepted then text is 'Following", () => {
    const { getByRole } = renderWithProviders(<SubscribeButton userId={12} />, subState([12], []))
    const btn = getByRole('button')
    expect(btn).toHaveTextContent('Following');
});


test("When subscription accepted and button hovered then text is 'Unfollow'", () => {
    const { getByRole } = renderWithProviders(<SubscribeButton userId={12} />, subState([12], []))
    const btn = getByRole('button')
    fireEvent.mouseOver(btn)
    expect(btn).toHaveTextContent('Unfollow');
});

test("When 'Unfollow' selected then delete subscription request made", () => {
    const { getByRole } = renderWithMockStore(<SubscribeButton userId={12} />, {...subState([12], []), ...sessionState(true)} )
    const btn = getByRole('button')
    fireEvent.mouseOver(btn)
    fireEvent.click(btn)
    expect(mockDeleteSubscription).toHaveBeenCalledWith(expectedPayload(12))
});


test("When guest user selects like icon then guest prompt triggered", () => {
    const { getByRole } = renderWithMockStore(<SubscribeButton userId={12} />, {...subState([], []), ...sessionState(false)} )
    const btn = getByRole('button');
    fireEvent.click(btn)
    expect(showGuestToast).toHaveBeenCalled();
  });