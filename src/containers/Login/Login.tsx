import React from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { parseQuery } from '../../common/helpers';
import SignInForm from '../../components/Forms/SignInForm';
import styles from './Login.mod.scss'

const Login = () => {

  const history = useHistory();
  const { search } = useLocation();

  const redirectUrl = parseQuery(search, 'redirect')
  const fullUrl = redirectUrl ? `/signup?redirect=${redirectUrl}` : '/signup'

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <h1>Sign In</h1>
        <div className={styles.loginForm}>
          <SignInForm/>
          </div>
        <div className={styles.altLink}>
            Need an account?
            <span onClick={() => history.push(fullUrl)}>{` Sign up`}</span>
        </div>
      </div>
    </div>
    );
}

export default Login;
