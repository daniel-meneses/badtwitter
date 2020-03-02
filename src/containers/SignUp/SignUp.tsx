import React from 'react';
import './SignUp.scss'
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { signUp , login } from '../../actions/session.js';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

type Props = {
  signUp: (e: any, h: any) => void,
  login: (e: any, h: any) => void,
  signupError: string
}

function mapStateToProps(state: any) {
  return {
    signupError: state.session.error
  }
}

const SignUp = ({signUp, signupError} : Props) => {
  let history = useHistory()

  return (
    <div className='sign_up_container'>
        <SignUpForm
          handleLogIn={(e: any) => signUp(e, history)}
          loginFailMessage={signupError}
          />
    </div>
  );
}

export default connect(mapStateToProps, { signUp , login })(SignUp);
