import React from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

import { signUp , login } from '../../actions/session.js';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class SignUp extends React.Component<any, any> {

    constructor(props: any){
      super(props);
      this.state = {};
    }

    signupRequest = (e: any) =>  {
      console.log(e)
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
                  loginFailMessage={this.state.emailLoginFail}
                  />
                  <LoginForm
                    handleLogIn={this.loginRequest}
                  />
            </div>
        );
    }
}

export default withRouter(connect(null, { signUp , login })(SignUp) as any);
