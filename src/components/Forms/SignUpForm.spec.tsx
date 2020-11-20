import '@testing-library/jest-dom'
import React from 'react';
import { fireEvent, getAllByRole, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import SignUpForm from './SignUpForm';
import { renderWithProviders, renderWithNewProps, renderWithMockStore } from '../../test/render';
import userEvent from '@testing-library/user-event'
import * as sessionAction from '../../actions/session'


fetchMock.mock('http://localhost:3000/api/v1/accounts/user', 200);

const mockLogin = jest.spyOn(sessionAction, 'signUp');

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
        postRegisterReq:{
            error: error
        }
    }
})

afterEach(() => {
    jest.clearAllMocks();
  });
  

test("Should display empty text fields on initial render", () => {
    const { getAllByTestId } = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, fName, lName, email, pw1, pw2] = getAllByTestId('textfield')
    expect(alias).toHaveValue('')
    expect(fName).toHaveValue('')
    expect(lName).toHaveValue('')
    expect(email).toHaveValue('')
    expect(pw1).toHaveValue('')
    expect(pw2).toHaveValue('')
});

test("Should display alias cannot be blank error", () => {
    const { getAllByTestId, getByTestId} = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(alias, '')
    fireEvent.blur(alias)
    expect(getByTestId('textfield-error')).toHaveTextContent('Alias cannot be blank')
});

test("Should display alias cannot start with a space", () => {
    const { getAllByTestId, getByTestId} = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(alias, ' ')
    fireEvent.blur(alias)
    expect(getByTestId('textfield-error')).toHaveTextContent('Alias cannot start with a space')
});

test("Should remove alias error on change", () => {
    const { getAllByTestId, queryByTestId } = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(alias, ' ')
    fireEvent.blur(alias)
    userEvent.type(alias, 'New alias')
    const error = queryByTestId('textfield-error');
    expect(error).toBeNull()
});

test("Should display email invalid format error", () => {
    const { getAllByTestId, getByTestId} = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(email, 'awd')
    fireEvent.blur(email)
    expect(getByTestId('textfield-error')).toHaveTextContent('Invalid email format')
});

test("Should display email cannot be blank error", () => {
    const { getAllByTestId, getByTestId} = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(email, '')
    fireEvent.blur(email)
    expect(getByTestId('textfield-error')).toHaveTextContent('Email cannot be blank')
});

test("Should display email cannot start with a space error", () => {
    const { getAllByTestId, getByTestId} = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(email, ' awdawdw')
    fireEvent.blur(email)
    expect(getByTestId('textfield-error')).toHaveTextContent('Email cannot start with a space')
});

test("Should remove email error on change", () => {
    const { getAllByTestId, queryByTestId } = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(email, ' ')
    fireEvent.blur(email)
    userEvent.type(email, 'a')
    const error = queryByTestId('textfield-error');
    expect(error).toBeNull()
});

test("Should display first name cannot be blank error", () => {
    const { getAllByTestId, getByTestId} = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(fName, '')
    fireEvent.blur(fName)
    expect(getByTestId('textfield-error')).toHaveTextContent('Name cannot be blank')
});

test("Should display first name cannot start with a space", () => {
    const { getAllByTestId, getByTestId} = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(fName, ' ')
    fireEvent.blur(fName)
    expect(getByTestId('textfield-error')).toHaveTextContent('Name cannot start with a space')
});

test("Should remove first name error on change", () => {
    const { getAllByTestId, queryByTestId } = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(fName, ' ')
    fireEvent.blur(fName)
    userEvent.type(fName, 'a')
    const error = queryByTestId('textfield-error');
    expect(error).toBeNull()
});

test("Should display last name cannot be blank error", () => {
    const { getAllByTestId, getByTestId} = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(lName, '')
    fireEvent.blur(lName)
    expect(getByTestId('textfield-error')).toHaveTextContent('Name cannot be blank')
});

test("Should display last name cannot start with a space", () => {
    const { getAllByTestId, getByTestId} = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(lName, ' ')
    fireEvent.blur(lName)
    expect(getByTestId('textfield-error')).toHaveTextContent('Name cannot start with a space')
});

test("Should remove first name error on change", () => {
    const { getAllByTestId, queryByTestId } = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(lName, ' ')
    fireEvent.blur(lName)
    userEvent.type(lName, 'a')
    const error = queryByTestId('textfield-error');
    expect(error).toBeNull()
});

test("Should display password must be 6 characters error", () => {
    const { getAllByTestId, getByTestId} = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(pw1, '12345')
    fireEvent.blur(pw1)
    expect(getByTestId('textfield-error')).toHaveTextContent('Password must be at least 6 characters')
});

test("Should remove password error on change", () => {
    const { getAllByTestId, queryByTestId } = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(pw1, ' ')
    fireEvent.blur(pw1)
    userEvent.type(pw1, 'a')
    const error = queryByTestId('textfield-error');
    expect(error).toBeNull()
});

test("Should display passwords do not match error", () => {
    const { getAllByTestId, getByTestId} = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(pw1, '123456')
    fireEvent.blur(pw1)
    userEvent.type(pw2, '123457')
    fireEvent.blur(pw2)
    expect(getByTestId('textfield-error')).toHaveTextContent('Passwords do not match')
});

test("Should remove passwords do not match error", () => {
    const { getAllByTestId, queryByTestId} = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(pw1, '123456')
    fireEvent.blur(pw1)
    userEvent.type(pw2, '123457')
    fireEvent.blur(pw2)
    userEvent.type(pw2, '12345')
    const error = queryByTestId('textfield-error');
    expect(error).toBeNull()
});


test("Should enable submit when all fields valid", () => {
    const payload = {
        alias: "Alias", 
        email: "daniel@gmail.com", 
        first_name: "daniel", 
        last_name: "monkey", 
        password: "123456", 
        password_confirmation: "123456"
    }
    const { getAllByTestId, getByTestId} = renderWithMockStore(
        <SignUpForm />, sessionState())
    const [alias, email, fName, lName, pw1, pw2] = getAllByTestId('textfield')
    userEvent.type(alias, payload.alias)
    userEvent.type(email, payload.email)
    userEvent.type(fName, payload.first_name)
    userEvent.type(lName, payload.last_name)
    userEvent.type(pw1, payload.password)
    userEvent.type(pw2, payload.password_confirmation)
    fireEvent.blur(pw2)
    fireEvent.click(getByTestId('button'))
    expect(mockLogin).toHaveBeenCalledWith(payload, expect.anything())
});

test("Should display generic error text", () => {
    let error = { error: 'Failed to sign up', status: 400 }
    const { getByTestId } = renderWithMockStore(
        <SignUpForm />, sessionState(error))
    expect(getByTestId('error')).toHaveTextContent('Failed to sign up')
});


test("Should display alias taken error text", () => {
    let error = { error: { alias: 'Alias taken'}, status: 422 }
    const { getByTestId } = renderWithMockStore(
        <SignUpForm />, sessionState(error))
    expect(getByTestId('error')).toHaveTextContent('Alias taken')
});


test("Should display email taken error text", () => {
    let error = { error: { email: 'Email taken'}, status: 422 }
    const { getByTestId } = renderWithMockStore(
        <SignUpForm />, sessionState(error))
    expect(getByTestId('error')).toHaveTextContent('Email taken')
});


