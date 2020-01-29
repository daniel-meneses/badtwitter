import React from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { signUp , login } from '../../actions/session.js';
import { connect } from 'react-redux';

class SignUp extends React.Component<any, any> {

    signupRequest = (e: any) =>  {
      this.props.signUp(e, this.props.history);
    }

    loginRequest = (e: any) =>  {
      this.props.login(e, this.props.history);
    }

    public render() {
        return (
            <div>
                <SignUpForm
                  handleLogIn={this.signupRequest}
                  loginFailMessage={"hey"}
                  />
                  <LoginForm
                    handleLogIn={this.loginRequest}
                  />
            </div>
        );
    }
}

export default connect(null, { signUp , login })(SignUp);
