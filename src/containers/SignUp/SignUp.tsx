import React from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { parseQuery } from '../../common/helpers';
import SignUpForm from '../../components/Forms/SignUpForm';
import styles from './SignUp.mod.scss'

const SignUp = () => {

  const history = useHistory();
  const { search } = useLocation();
  const redirectUrl = parseQuery(search, 'redirect')
  const fullUrl = redirectUrl ? `/login?redirect=${redirectUrl}` : '/login'

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <h1>Sign Up</h1>
        <div className={styles.loginForm}>
          <SignUpForm />
          </div>
        <div className={styles.altLink}>
            Have an account?
            <span onClick={() => history.push(fullUrl)}>{` Sign In`}</span>
        </div>
      </div>
    </div>

  );
}

export default SignUp;
