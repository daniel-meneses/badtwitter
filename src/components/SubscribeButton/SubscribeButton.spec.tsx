import '@testing-library/jest-dom'
import React from 'react';
import { fireEvent, getByRole } from '@testing-library/react';
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

test("When subscription not requested then text is 'Follow'", () => {
    const { getByRole } = renderWithProviders(<SubscribeButton userId={1} />, {})
    const btn = getByRole('button')
    expect(btn).toHaveTextContent('Follow');
});

test("When subscription requested then text is 'Pending", () => {
    const { getByRole } = renderWithProviders(<SubscribeButton userId={12} />, subState([], [12]))
    const btn = getByRole('button')
    expect(btn).toHaveTextContent('Pending');
});

test("When subscription accepted then text is 'Following", () => {
    const { getByRole } = renderWithProviders(<SubscribeButton userId={12} />, subState([12], []))
    const btn = getByRole('button')
    expect(btn).toHaveTextContent('Following');
});

test("When subscription accepted and button hovered then text is 'Pending", () => {
    const { getByRole } = renderWithProviders(<SubscribeButton userId={12} />, subState([12], []))
    const btn = getByRole('button')
    fireEvent.mouseOver(btn)
    expect(btn).toHaveTextContent('Unfollow');
});
