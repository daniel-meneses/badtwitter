import React, { useState, useEffect } from "react";
import Button, { BtnThemes } from '../../common/components/Button/Button';
import * as validate from './FormValidations';
import TextField from './TextField'
import styles from './TextField.mod.scss'
import * as sessionActions from '../../actions/session';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom'
import { parseQuery } from '../../common/helpers';

type Props = {
  dispatch: AppThunkDispatch;
  signupError: { error: any }
}

export const SignUpForm = (props: Props) => {

  const { signupError, dispatch } = props

  const history = useHistory();
  const { search } = useLocation();

  const redirectUrl = search && parseQuery(search, 'redirect')
  
  const [formData, setFormData] = useState({
    alias: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: ''
  })

  const [isValid, setIsValid] = useState({
    alias: false,
    email: false,
    firstName: false,
    lastName: false,
    password: false,
    passwordConfirm: false
  })

  const [enableSubmit, setEnableSubmit] = useState(false)

  useEffect(()=> {
    let isInvalid = Object.values(isValid).includes(false)
    setEnableSubmit(!isInvalid)
  }, [isValid])

  const validateAlias = (text: string) => {
    let label = 'Alias'
    let error = validate.cannotBeBlank(label, text)
              || validate.cannotStartWithSpace(label, text)
    setIsValid({...isValid, alias: error ? false : true})
    return error
  }

  const validateFirstName = (text: string) => {
    let label = 'Name'
    let error = validate.cannotBeBlank(label, text)
            || validate.cannotStartWithSpace(label, text)
            || validate.max20Characters(label, text)
            || validate.mustOnlyContainLetters(label, text)
    setIsValid({...isValid, firstName: error ? false : true})
    return error
  }

  const validateLastName = (text: string) => {
    let label = 'Name'
    let error = validate.cannotBeBlank(label, text)
            || validate.cannotStartWithSpace(label, text)
            || validate.max20Characters(label, text)
            || validate.mustOnlyContainLetters(label, text)
    setIsValid({...isValid, lastName: error ? false : true})
    return error
  }

  const validateEmail = (text: string) => {
    let label = 'Email'
    let error = validate.cannotStartWithSpace(label, text)
            || validate.cannotBeBlank(label, text)
            || validate.emailFormat(text)
    setIsValid({...isValid, email: error ? false : true})
    return error
  }

  const validatePassword = (text: string) => {
    let label = 'Password'
    let error = validate.cannotBeBlank(label, text)
      || validate.min6Characters(label, text)
      || validate.max20Characters(label, text)
    setIsValid({...isValid, password: error ? false : true})
    return error
  }

  const validateConfrimation = (text: string) => {
    let label = 'Password'
    let error = text === formData.password ? '' : 'Passwords do not match'
    setIsValid({...isValid, passwordConfirm: error ? false : true})
    return error
  }

  const redirectOnSuccess = () => history.push(redirectUrl || '/home')

  const handleSignUp = (e: any) => {
    e.preventDefault()
    if (!enableSubmit) { return }
    const {
      alias,
      email,
      firstName: first_name,
      lastName: last_name,
      password: password,
      passwordConfirm: password_confirmation
    } = formData
    dispatch(sessionActions.signUp({alias, email, first_name, last_name, password, password_confirmation}, redirectOnSuccess))
  }

  return (
    <div className={styles.formFields}>
      <form className={styles.formFields} onSubmit={handleSignUp}>
        <div className={styles.formFields}>
        <TextField
          className={styles.signUpFieldColumns}
          label={'Alias'}
          value={formData.alias}
          setValue={(val: any) => setFormData({...formData, alias: val})}
          validateAndReturnError={validateAlias}
          />
        <TextField
          className={styles.signUpFieldColumns}
          label={'Email'}
          value={formData.email}
          setValue={(val: any) => setFormData({...formData, email: val})}
          validateAndReturnError={validateEmail}
          />
        <TextField
          className={styles.signUpFieldColumns}
          label={'First Name'}
          value={formData.firstName}
          setValue={(val: any) => setFormData({...formData, firstName: val})}
          validateAndReturnError={validateFirstName}
          />
        <TextField
          className={styles.signUpFieldColumns}
          label={'Last Name'}
          value={formData.lastName}
          setValue={(val: any) => setFormData({...formData, lastName: val})}
          validateAndReturnError={validateLastName}
          />
        <TextField
          className={styles.signUpFieldColumns}
          label={'Password'}
          type={'password'}
          value={formData.password}
          setValue={(val: any) => setFormData({...formData, password: val})}
          validateAndReturnError={validatePassword}
          />
        <TextField
          className={styles.signUpFieldColumns}
          label={'Password Confirmation'}
          type={'password'}
          value={formData.passwordConfirm}
          setValue={(val: any) => setFormData({...formData, passwordConfirm: val})}
          validateAndReturnError={validateConfrimation}
          />
        </div>
      <Button
        theme={BtnThemes.PrimaryFill}
        className={styles.submitButton}
        onClick={handleSignUp}
        isDisabled={!enableSubmit}
        >
        {'Submit'}
        </Button>
        </form>
        <div className={styles.error}>
        {signupError &&
          <span data-testid='error' className={styles.authError}>{
            signupError.error.alias || signupError.error.email || signupError.error
          }</span>
        }
        </div>
    </div>
  )
}

export default connect((state: any) => {
  return {signupError: state.session.postRegisterReq.error}
})(SignUpForm);
