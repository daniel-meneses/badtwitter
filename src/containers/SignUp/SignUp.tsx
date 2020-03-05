import React from 'react';
import './SignUp.scss'
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { signUp } from '../../actions/session.js';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

type Props = {
  signUp: (e: any, h: any) => void,
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
        <div className='alt_link'>
          Have an account?
          <span onClick={() => history.push('/login')}>Log in</span>
        </div>
    </div>
  );
}

export default connect(mapStateToProps, { signUp })(SignUp);
