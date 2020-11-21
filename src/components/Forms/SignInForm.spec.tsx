import '@testing-library/jest-dom'
import React from 'react';
import { fireEvent, getAllByRole, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import SignInForm from './SignInForm';
import { renderWithProviders, renderWithNewProps, renderWithMockStore } from '../../test/render';
import * as sessionAction from '../../actions/session'

fetchMock.mock('http://localhost:3000/api/v1/accounts/session', 200);

const mockLogin = jest.spyOn(sessionAction, 'login');
jest.mock("react-router-dom", () => ({
    useHistory: () => ({
        push: jest.fn(),
      }),
    useLocation: () => ({
      pathname: "localhost:3000/example/path"
    }),
}));

const sessionState = (error: object | null = null) => ({
    session: {
        postLoginReq:{
            error: error
        }
    }
})

afterEach(() => {
    jest.clearAllMocks();
  });
  

test("Should display label text", () => {
    const { container, debug, getAllByTestId } = renderWithMockStore(
        <SignInForm />, sessionState())
    const [email, password] = getAllByTestId('textfield')
    expect(email).toHaveValue('')
    expect(password).toHaveValue('')
});

test("Should display label text", () => {
    let error = { error: 'Failed to login', status: '400' }
    const { getByTestId, debug } = renderWithMockStore(
        <SignInForm />, sessionState(error))
    expect(getByTestId('error')).toHaveTextContent('Failed to login')
});


test("Should display label text", () => {
    let error = { error: 'Failed to login', status: 422 }
    const { getByTestId, debug } = renderWithMockStore(
        <SignInForm />, sessionState(error))
    expect(getByTestId('error')).toHaveTextContent('Invalid username or password')
});


test("Should display label text", () => {
    let error = { error: 'Failed to login', status: 422 }
    const { getByTestId, debug } = renderWithMockStore(
        <SignInForm />, sessionState(error))
    expect(getByTestId('error')).toHaveTextContent('Invalid username or password')
});