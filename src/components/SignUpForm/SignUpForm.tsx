import React, { useState } from "react";
import './SignUpForm.scss';



export default function SignUpForm(props: any) {

  const [aliasWarning, setAliasWarning] = useState("");
  const [firstNameWarning, setFirstNameWarning] = useState("");
  const [lastNameWarning, setLastNameWarning] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [confirmationWarning, setConfirmationWarning] = useState("");
  const [isFocused, setIsFocused] = useState({"alias": false, "first_name": false, "last_name": false, "email": false, "password": false, "password_confirmation": false});
  const [signupObject, setSignupObject] = useState({"alias": "", "first_name": "", "last_name": "", "email": "", "password": "", "password_confirmation": ""});

  const handleSubmit = (e: any) => {
      e.preventDefault();
      let signup = {'user' : signupObject};
      props.handleLogIn(signup);
  }

  const clearWarnings = (input: any) => {
    switch (input) {
      case 'alias':
        setAliasWarning("")
        break;
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
      case 'alias':
        validateAlias(value)
        break;
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

  const validateAlias = (value: string) => {
    if (!/^[A-Za-z ]+$/.test(value)) {
      setAliasWarning("Must contain letters only")
    } else if (value.charAt(0) === " ") {
      setAliasWarning("Alias cannot start with space")
    } else {
      setAliasWarning("")
    }
  }

  const validateFirstName = (value: string) => {
    if (!/^[A-Za-z ]+$/.test(value)) {
      setFirstNameWarning("Must contain letters only")
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
      setPasswordWarning("Minimum 8 characters")
    } else if (value.length > 30 ){
      setPasswordWarning("Maximum 30 characters")
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

  let error = null;
  let emailErrorResponse = (((props.loginFailMessage || {}).errors || {}).credential || {}).email
  if (emailErrorResponse === "has already been taken") {
    error = "Email has already been taken"
  }

  let submitEnabled = !Object.values(signupObject).includes("")

  return (
    <form onSubmit={handleSubmit} className='signup-form'>
    <div className='signup-title'>Sign up via Email</div>
    <div className='signup-input'>
      <span id={isFocused.alias ? "isFocused" : "notFocused"}>Alias</span>
        <input
          id='alias'
          value={signupObject.alias}
          type="text"
          className={signupObject.alias.length > 0 ? "field_completed" : ""}
          onBlur={e => validateInput(e)}
          onChange={e => handleInputChange(e)}
          onFocus={e => setFocus(e.target.id, true)}
        />
        <span className={'input-warning'} hidden={!aliasWarning}>{aliasWarning}</span>
    </div>
    <div className='signup-input'>
      <span id={isFocused.email ? "isFocused" : "notFocused"}>Email</span>
        <input
          id='email'
          value={signupObject.email}
          type="text"
          className={signupObject.email.length > 0 ? "field_completed" : ""}
          onBlur={e => validateInput(e)}
          onChange={e => handleInputChange(e)}
          onFocus={e => setFocus(e.target.id, true)}
        />
        <span className={'input-warning'} hidden={!emailWarning}>{emailWarning}</span>
    </div>
      <div className='signup-input'>
        <span id={isFocused.first_name ? "isFocused" : "notFocused"}>First name</span>
          <input
            id='first_name'
            value={signupObject.first_name}
            type="text"
            className={signupObject.first_name.length > 0 ? "field_completed" : ""}
            onBlur={e => validateInput(e)}
            onChange={e => handleInputChange(e)}
            onFocus={e => setFocus(e.target.id, true)}
          />
          <span className={'input-warning'} hidden={!firstNameWarning}>{firstNameWarning}</span>
      </div>
    <div className='signup-input'>
      <span id={isFocused.last_name ? "isFocused" : "notFocused"}>Last name</span>
        <input
          id='last_name'
          value={signupObject.last_name}
          type="text"
          className={signupObject.last_name.length > 0 ? "field_completed" : ""}
          onBlur={e => validateInput(e)}
          onChange={e => handleInputChange(e)}
          onFocus={e => setFocus(e.target.id, true)}
        />
        <span className={'input-warning'} hidden={!lastNameWarning}>{lastNameWarning}</span>
    </div>
    <div className='signup-input'>
      <span id={isFocused.password ? "isFocused" : "notFocused"}>Password</span>
        <input
          id='password'
          value={signupObject.password}
          type="text"
          className={signupObject.password.length > 5 ? "field_completed" : ""}
          onBlur={e => validateInput(e)}
          onChange={e => handleInputChange(e)}
          onFocus={e => setFocus(e.target.id, true)}
        />
        <span className={'input-warning'} hidden={!passwordWarning}>{passwordWarning}</span>
    </div>
    <div className='signup-input'>
      <span id={isFocused.password_confirmation ? "isFocused" : "notFocused"}>Password Confirmation</span>
        <input
          id='password_confirmation'
          value={signupObject.password_confirmation}
          className={signupObject.password_confirmation.length > 5 ? "field_completed" : ""}
          type="text"
          onBlur={e => validateInput(e)}
          onChange={e => handleInputChange(e)}
          onFocus={e => setFocus(e.target.id, true)}
        />
      <span className={'input-warning'} hidden={!confirmationWarning}>{confirmationWarning}</span>
    </div>
    <div className='input-submit-field'>
      <input className={submitEnabled? 'signup-submit-button enabled' : 'signup-submit-button disabled'} disabled={!submitEnabled} type="submit" value="Submit" />
      <div className='login_fail_message'>{error}</div>
    </div>
    </form>
  );
}
