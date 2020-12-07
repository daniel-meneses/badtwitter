import React, { useState, useEffect, FormEvent } from "react";
import { connect } from 'react-redux';
import TextField from './TextField'
import * as validate from './FormValidations'
import Button, {BtnThemes} from '../../common/components/Button/Button'
import { useHistory, useLocation } from 'react-router-dom'
import { login } from '../../actions/session'
import styles from './TextField.mod.scss'
import { parseQuery } from "../../common/helpers";
import * as sessionAction from '../../actions/session'

type Props = {
//  login: (payload: LoginPayload, redirectOnSuccess: () => void) => void;
  loginError?: any;
  className?: string;
  dispatch: AppThunkDispatch;
}

type LoginPayload = {
  email: string;
  password: string;
}

export const SignInForm: React.FC<Props> = (props) => {

  const { loginError } = props;
  const history = useHistory();
  const { search } = useLocation();

  const redirectUrl = search && parseQuery(search, 'redirect')

  const [formData, setFormData] = useState<LoginPayload>({
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

  const validateEmail = (text: string):string => {
    let label = 'Email'
    let error = validate.cannotStartWithSpace(label, text)
            || validate.cannotBeBlank(label, text)
            || validate.emailFormat(text)
    setIsValid({...isValid, email: error ? false : true})
    return error
  }

  const validatePassword = (text: string):string => {
    let label = 'Password'
    let error = validate.cannotBeBlank(label, text)
      || validate.min6Characters(label, text)
      || validate.max20Characters(label, text)
    setIsValid({...isValid, password: error ? false : true})
    return error
  }

  const redirectOnSuccess = ():void => history.push(redirectUrl || '/home')

  const handleSubmit = (e: FormEvent | MouseEvent | undefined):void => {
    e && e.preventDefault()
    enableSubmit && props.dispatch(sessionAction.login(formData, redirectOnSuccess))
  }
  
  return (
    <div className={styles.formFields}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formFields}>
        <TextField
          className={styles.signUpFieldColumns}
          label={'Email'}
          value={formData.email}
          setValue={(val: string) => setFormData({...formData, email: val})}
          validateAndReturnError={validateEmail}
          />
        <TextField
          className={styles.signUpFieldColumns}
          label={'Password'}
          type={'password'}
          value={formData.password}
          setValue={(val: string) => setFormData({...formData, password: val})}
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
          <span 
            data-testid={'error'}
            className={styles.authError}>
                {loginError.status === 422 ? 'Invalid username or password' : loginError.error}
                </span>
        }
        </div>
    </div>
  )
}

export default connect((state: any) => 
  ({loginError: state.session.postLoginReq.error}))
  (SignInForm);
