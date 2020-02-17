import React from 'react';
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

  return (
    <div>
        <SignUpForm
          handleLogIn={(e: any) => signUp(e, history)}
          loginFailMessage={"hey"}
          />
          <LoginForm
            handleLogIn={(e: any) => signUp(e, history)}
          />
    </div>
  );
}

export default connect(null, { signUp , login })(SignUp);
