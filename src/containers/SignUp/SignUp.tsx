import React from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { signUp , login } from '../../actions/session.js';
import { connect } from 'react-redux';

class SignUp extends React.Component<any, any> {

    constructor(props: any){
      super(props);
      this.state = {};
    }

    signupRequest = (e: any) =>  {
      console.log(e)
      let history = useHistory();
      this.props.signUp(e, history);
    }

    loginRequest = (e: any) =>  {
      let history = useHistory();
      this.props.login(e, history);
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

export default connect(null, { signUp , login })(SignUp);
