import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

export default class Login extends React.Component<any, any> {

    constructor(props: any){
        super(props);
        this.state = {};
    }

    loginRequest = (e: any) =>  {
      if (this.loginValidations(e)) {
      }
    }

    loginValidations = (e: any) => {
      return (this.validatePassword(e.password, e.passwordConfirmation) &&
              this.validateFirstLastName(e.firstName, e.lastName) &&
              this.validateEmail(e.email))
    }

    validateFirstLastName = (firstName: String, lastName: String) => {
      if (firstName === "" || lastName === "") {
        console.log("Name cannot be blank")
        return false
      } else if (firstName.length > 30 || lastName.length > 30) {
        console.log("Name cannot exceed 30 characters")
        return false
      }
      return true
    }

    validateEmail = (email: string) => {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
      if (!re.test(email)) {
        console.log("Invalid email format")
        return false
      } else {
        return true
      }
    }

    validatePassword = (password: String, passwordConfirmation: String) => {
      if (password !== passwordConfirmation) {
        console.log("Passwords do not match")
        return false
      } else if (password.length < 8 ){
        console.log("Password must be at least 8 characters")
        return false
      } else if (password.length > 30 ){
        console.log("Password cannot exceed 30 characters")
        return false
      }
      return true
    }

    public render() {
        return (
            <div>
                Hello { this.state.name }!
                <LoginForm handleLogIn={this.loginRequest} />
            </div>
        );
    }
}
