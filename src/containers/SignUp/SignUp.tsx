import React from 'react';
import './SignUp.scss'
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { signUp , login } from '../../actions/session.js';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

type Props = {
  signUp: (e: any, h: any) => void,
  login: (e: any, h: any) => void
}

const SignUp = ({signUp, login} : Props) => {
  let history = useHistory()

  let loginC = <LoginForm handleLogIn={(e: any) => signUp(e, history)} />

  return (
    <div className='sign_up_container'>
      <div className='sign_up_container2'>
        <SignUpForm
          handleLogIn={(e: any) => signUp(e, history)}
          loginFailMessage={"login failed api response"}
          />
      </div>
    </div>
  );
}

export default connect(null, { signUp , login })(SignUp);
