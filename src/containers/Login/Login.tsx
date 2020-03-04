import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useHistory } from 'react-router-dom'
import {login} from '../../actions/session.js'

type Props = {
  login: (e: any, h: any) => void,
  loginError: string
}

function mapStateToProps(state: any) {
  return {
    loginError: state.session.error
  }
}

const Login =({loginError, login} : Props) => {
  let history = useHistory()

  const handleLogin = (credentials: any) => {
    login(credentials, history)
  }

  return (
    <div className='sign_up_container'>
      <LoginForm
        handleLogin={handleLogin}
        errorResponse={loginError} />
        <div className='alt_link'>
          Need an account?
          <span onClick={() => history.push('/signup')}> Sign up</span>
        </div>
    </div>
    );
}

export default connect(mapStateToProps, {login})(Login)
