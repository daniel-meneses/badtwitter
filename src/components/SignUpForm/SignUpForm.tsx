import React, { useState } from "react";
import './SignUpForm.scss';

export default function SignUpForm(props: any) {

  const [firstNameWarning, setFirstNameWarning] = useState("");
  const [lastNameWarning, setLastNameWarning] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [confirmationWarning, setConfirmationWarning] = useState("");
  const [isFocused, setIsFocused] = useState({"alias": false, "first_name": false, "last_name": false, "email": false, "password": false, "password_confirmation": false});
  const [signupObject, setSignupObject] = useState({"alias": "", "first_name": "", "last_name": "", "email": "", "password": "", "password_confirmation": ""});

  const handleSubmit = (e: any) => {
      e.preventDefault();
      if (firstNameWarning || lastNameWarning || emailWarning || passwordWarning || confirmationWarning) {
        console.log("NOPE")
      }
      let signup = {'user' : signupObject};
      props.handleLogIn(signup);
  }

  const clearWarnings = (input: any) => {
    switch (input) {
      case 'first_name':
        setFirstNameWarning("")
        break;
      case 'last_name':
        setLastNameWarning("")
        break;
      case 'email':
        setEmailWarning("")
        break;
      case 'password':
        setPasswordWarning("")
        break;
      case 'password_confirmation':
        setConfirmationWarning("")
        break;
      default: console.log("Something happened");
    }
  }

  const handleInputChange = (e: any) => {
    clearWarnings(e.target.id)
    setSignupObject({...signupObject,
                [e.target.id]: e.target.value
                });
  }

  const validateInput = (e: any) => {
    let input = e.target.id;
    let value = e.target.value;
    enableRegisterButton();
    if (value==="") {
      setFocus(input, false);
      return
    }
    switch (input) {
      case 'first_name':
        validateFirstName(value)
        break;
      case 'last_name':
        validateLastName(value)
        break;
      case 'email':
        validateEmail(value)
        break;
      case 'password':
        validatePassword(value)
        break;
      case 'password_confirmation':
        validateConfirmation(value)
        break;
      default: console.log("Something happened");
    }
  }

  const validateFirstName = (value: string) => {
    if (!/^[A-Za-z ]+$/.test(value)) {
      setFirstNameWarning("First name must contain letters only")
    } else if (value.charAt(0) === " ") {
      setFirstNameWarning("First name cannot start with space")
    } else {
      setFirstNameWarning("")
    }
  }

  const validateLastName = (value: string) => {
    if (!/^[A-Za-z ]+$/.test(value)) {
      setLastNameWarning("Last name must contain letters only")
    } else if (value.charAt(0) === " ") {
      setLastNameWarning("Last name cannot start with space")
    } else {
      setLastNameWarning("")
    }
  }

  const validateEmail = (value: string) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
    if (!re.test(value)) {
      setEmailWarning("Please check email format");
    } else {
      setEmailWarning("");
    }
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

  const validateConfirmation = (value: string) => {
    if (value!==signupObject.password) {
      setConfirmationWarning("Passwords do not match")
    } else {
      setConfirmationWarning("")
    }
  }

  const setFocus = (input: any, focus: any) => {
    setIsFocused({...isFocused,
                  [input]: focus
                });
  }

  const enableRegisterButton = () => {
    if (Object.values(signupObject).includes("") || firstNameWarning || lastNameWarning || emailWarning || passwordWarning || confirmationWarning) {
      console.log("disable")
    }
  }

  return (
    <form onSubmit={handleSubmit} className='signup-form'>
    <div className='signup-input'>
      <span id={isFocused.alias ? "isFocused" : ""}>Alias</span>
        <input
          id='alias'
          value={signupObject.alias}
          type="text"
          onBlur={e => validateInput(e)}
          onChange={e => handleInputChange(e)}
          onFocus={e => setFocus(e.target.id, true)}
        />
    </div>
      <div className='signup-input'>
        <span id={isFocused.first_name ? "isFocused" : ""}>First name</span>
          <input
            id='first_name'
            value={signupObject.first_name}
            type="text"
            onBlur={e => validateInput(e)}
            onChange={e => handleInputChange(e)}
            onFocus={e => setFocus(e.target.id, true)}
          />
          <h6 hidden={!firstNameWarning}>{firstNameWarning}</h6>
      </div>
    <div className='signup-input'>
      <span id={isFocused.last_name ? "isFocused" : ""}>Last name</span>
        <input
          id='last_name'
          value={signupObject.last_name}
          type="text"
          onBlur={e => validateInput(e)}
          onChange={e => handleInputChange(e)}
          onFocus={e => setFocus(e.target.id, true)}
        />
        <h6 hidden={!lastNameWarning}>{lastNameWarning}</h6>
    </div>
    <div className='signup-input'>
      <span id={isFocused.email ? "isFocused" : ""}>Email</span>
        <input
          id='email'
          value={signupObject.email}
          type="text"
          onBlur={e => validateInput(e)}
          onChange={e => handleInputChange(e)}
          onFocus={e => setFocus(e.target.id, true)}
        />
        <h6 hidden={!emailWarning}>{emailWarning}</h6>
    </div>
    <div className='signup-input'>
      <span id={isFocused.password ? "isFocused" : ""}>Password</span>
        <input
          id='password'
          value={signupObject.password}
          type="text"
          onBlur={e => validateInput(e)}
          onChange={e => handleInputChange(e)}
          onFocus={e => setFocus(e.target.id, true)}
        />
        <h6 hidden={!passwordWarning}>{passwordWarning}</h6>
    </div>
    <div className='signup-input'>
      <span id={isFocused.password_confirmation ? "isFocused" : ""}>Password Confirmation</span>
        <input
          id='password_confirmation'
          value={signupObject.password_confirmation}
          type="text"
          onBlur={e => validateInput(e)}
          onChange={e => handleInputChange(e)}
          onFocus={e => setFocus(e.target.id, true)}
        />
      <h6 hidden={!confirmationWarning}>{confirmationWarning}</h6>
      <input disabled={Object.values(signupObject).includes("")} type="submit" value="Submit" />
    </div>
    <span>{props.loginFailMessage}</span>
    </form>
  );
}
