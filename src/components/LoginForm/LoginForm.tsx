import React, { useState } from "react";
import './LoginForm.scss';

type Props ={
  handleLogin: any,
  errorResponse: any
}

const LoginForm = ({handleLogin, errorResponse} : Props) => {
  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [isFocused, setIsFocused] = useState({"email": false, "password": false});
  const [loginObject, setLoginObject] = useState({"email": "", "password": ""});

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleLogin(loginObject);
  }

  const handleInputChange = (e: any) => {
    setLoginObject({...loginObject,
                [e.target.id]: e.target.value
                });
  }

  const validateInput = (e: any) => {
    let input = e.target.id;
    let value = e.target.value;
    if (value==="") {
      setFocus(input, false);
      return
    }
    switch (input) {
      case 'email':
        validateEmail(value)
        break;
      case 'password':
        validatePassword(value)
        break;
      default: console.log("Something happened");
    }
  }

  const validateEmail = (value: string) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
    if (!re.test(value)) {
      console.log("This hit but..")
      setEmailWarning("Please check email format");
      console.log(" but..")

    } else {
      setEmailWarning("");
    }
  }

  const validatePassword = (value: string) => {
    if (value.length < 6 ){
      setPasswordWarning("Minimum 6 characters")
    } else if (value.length > 30 ){
      setPasswordWarning("Password must be less than 30 characters")
    } else {
      setPasswordWarning("")
    }
  }

  const setFocus = (input: any, focus: any) => {
    setIsFocused({...isFocused,
                  [input]: focus
                });
  }

  let submitEnabled = !Object.values(loginObject).includes("")
  var error = null
  let errorMessage = (errorResponse || {}).error
  if (errorMessage == 'unprocessable') {
    error = "Incorrect email or password"
  }

  return (
    <form onSubmit={handleSubmit} className='signup-form'>
    <div className='signup-title'>Log in via Email</div>
      <div className='signup-input'>
        <span id={isFocused.email ? "isFocused" : ""}>Email</span>
          <input
            id='email'
            value={loginObject.email}
            type="text"
            className={loginObject.email.length > 3 ? "field_completed" : ""}
            onBlur={e => validateInput(e)}
            onChange={e => handleInputChange(e)}
            onFocus={e => setFocus(e.target.id, true)}
          />
          </div>
      <div className='signup-input'>
        <span id={isFocused.password ? "isFocused" : ""}>Password</span>
          <input
            id='password'
            value={loginObject.password}
            type="text"
            className={loginObject.password.length > 5 ? "field_completed" : ""}
            onBlur={e => validateInput(e)}
            onChange={e => handleInputChange(e)}
            onFocus={e => setFocus(e.target.id, true)}
          />
      </div>
      <div className='input-submit-field'>
        <input className={submitEnabled? 'signup-submit-button enabled' : 'signup-submit-button disabled'} disabled={!submitEnabled} type="submit" value="Submit" />
        <div className='login_fail_message'>{error}</div>
      </div>
    </form>
  );
}

export default LoginForm
