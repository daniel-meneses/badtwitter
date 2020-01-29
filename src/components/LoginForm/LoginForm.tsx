import React, { useState } from "react";
import './LoginForm.scss';

export default function LoginForm(props: any) {
  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [isFocused, setIsFocused] = useState({"email": false, "password": false});
  const [loginObject, setLoginObject] = useState({"email": "", "password": ""});

  const handleSubmit = (e: any) => {
      e.preventDefault();
      props.handleLogIn(loginObject);
  }

  const handleInputChange = (e: any) => {
    setLoginObject({...loginObject,
                [e.target.id]: e.target.value
                });
  }

  const validateInput = (e: any) => {
    let input = e.target.id;
    let value = e.target.value;
    // Remove focus if blank
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
    console.log(emailWarning)
  }

  const validatePassword = (value: string) => {
    if (value.length < 8 ){
      setPasswordWarning("Password must be at least 8 characters")
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

  return (
    <form onSubmit={handleSubmit} className='signup-form'>
      <div className='signup-input'>
      <span id={isFocused.email ? "isFocused" : ""}>Email</span>
        <input
          id='email'
          value={loginObject.email}
          type="text"
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
          onBlur={e => validateInput(e)}
          onChange={e => handleInputChange(e)}
          onFocus={e => setFocus(e.target.id, true)}
        />
      <input disabled={Object.values(loginObject).includes("")} type="submit" value="Submit" />
      <span hidden={!emailWarning}></span>
      </div>
    </form>
  );
}
