import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import TextField from './TextField'
import * as validate from './FormValidations'
import Button, {BtnThemes} from '../../common/components/Button/Button'
import { useHistory, useLocation } from 'react-router-dom'
import { login } from '../../actions/session'
import styles from './TextField.mod.scss'
import { parseQuery } from "../../common/helpers";

type Props = {
  login: (e: any, h: any) => void;
  loginError: any;
  className?: string;
}

export const SignInForm = (props: Props) => {

  const { login, loginError, className } = props;
  const history = useHistory();
  const { search } = useLocation();

  const redirectUrl = parseQuery(search, 'redirect')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
  })

  const [enableSubmit, setEnableSubmit] = useState(false)

  useEffect(()=> {
    let isInvalid = Object.values(isValid).includes(false)
    setEnableSubmit(!isInvalid)
  }, [isValid])

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

  const redirectOnSuccess = () => history.push(redirectUrl || '/home')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    enableSubmit && login(formData, redirectOnSuccess) 
  }
  
  return (
    <div className={styles.formFields}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formFields}>
        <TextField
          className={styles.signUpFieldColumns}
          label={'Email'}
          value={formData.email}
          setValue={(val: any) => setFormData({...formData, email: val})}
          validateAndReturnError={validateEmail}
          />
        <TextField
          className={styles.signUpFieldColumns}
          label={'Password'}
          type={'password'}
          value={formData.password}
          setValue={(val: any) => setFormData({...formData, password: val})}
          validateAndReturnError={validatePassword}
          />
          </div>
      <Button
        className={styles.submitButton}
        onClick={handleSubmit}
        theme={BtnThemes.PrimaryFill}
        isDisabled={!enableSubmit}
        >
        {'Submit'}
        </Button>
        </form>
        <div className={styles.error}>
        {loginError &&
          <span className={styles.authError}>{loginError.status === 422 ? 'Invalid username or password' : loginError.error}</span>
        }
        </div>
    </div>
  )
}

export default connect((state: any) => {
  return {loginError: state.session.postLoginReq.error}
}, { login })(SignInForm);
