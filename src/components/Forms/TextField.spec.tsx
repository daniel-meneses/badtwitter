import '@testing-library/jest-dom'
import React from 'react';
import { fireEvent } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import TextField from './TextField';
import { renderWithProviders, renderWithNewProps } from '../../test/render';

fetchMock.mock('http://localhost:3000/api/v1/subscription', 200);
fetchMock.mock('http://localhost:3000/api/v1/subscription/delete', 200);
jest.mock('../Toast/GuestToast');

const mockValidateError = jest.fn();
const mockSetvalue = jest.fn();

afterEach(() => {
    jest.clearAllMocks();
  });

test("Should display label text", () => {
    const { container } = renderWithProviders(
        <TextField 
            value={'testValue'} 
            label={'testLabel'}
            validateAndReturnError={mockValidateError}
            setValue={mockSetvalue}  />, {})
    expect(container).toHaveTextContent('testLabel');
});


test("Should display input value text", () => {
    const { getByRole } = renderWithProviders(
        <TextField 
            value={'testValue'} 
            label={'testLabel'}
            validateAndReturnError={mockValidateError}
            setValue={mockSetvalue}  />, {})
    let inputEl = getByRole('textbox');
    expect(inputEl).toHaveValue('testValue');
});

test("When input value changed then set value callback invoked", () => {
    const { getByRole } = renderWithProviders(
        <TextField 
            value={'testValue'} 
            label={'testLabel'}
            validateAndReturnError={mockValidateError}
            setValue={mockSetvalue}  />, {})
    let inputEl = getByRole('textbox')
    fireEvent.change(inputEl, { target: { value: 'newTestValue' } })
    expect(mockSetvalue).toBeCalledWith('newTestValue')
});

test("When value prop changes then validtion callback invoked'", () => {
    const { container } = renderWithProviders(
        <TextField 
            value={'testValue1'} 
            label={'testLabel'}
            validateAndReturnError={mockValidateError}
            setValue={mockSetvalue}  />, {})
    renderWithNewProps(
        <TextField 
            value={'testValue2'} 
            label={'testLabel'}
            validateAndReturnError={mockValidateError}
            setValue={mockSetvalue}  />, container)
    expect(mockValidateError).toBeCalledTimes(2)
    expect(mockValidateError).toBeCalledWith('testValue2')
});
