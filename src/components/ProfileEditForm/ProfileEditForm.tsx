import React, { useState } from "react"
import { connect } from 'react-redux'
import './ProfileEditForm.scss'

type Props = {
  currentUser: any
}

function mapStateToProps(state :any) {
  return { currentUser: state.session.currentUser }
}

const ProfileEditForm = ({currentUser}: Props) => {
  const [firstName, setFirstName] = useState(currentUser.first_name);
  const [lastName, setLastName] = useState(currentUser.last_name);
  const [bio, setBio] = useState("");
  const [isFocused, setIsFocused] = useState({"first_name": false, "last_name": false, "bio" : false});

  const handleSubmit = (e: any) => {
      e.preventDefault();
      console.log(firstName + " " + lastName + " " + bio)
  }

  const handleInputOnChange = (e: any) => {
    let value = e.target.value;
    switch (e.target.id) {
      case 'first_name':
        setFirstName(value)
        break;
      case 'last_name':
        setLastName(value)
        break;
      case 'bio':
        setBio(value)
        break;
      default: console.log("Something happened");
    }
  }

  const validateInputOnBlur = (e: any) => {
    let input = e.target.id;
    let value = e.target.value;
    if (value==="") {
      setFocus(input, false);
      return
    }
    switch (input) {
      case 'first_name':
        validateName(value)
        break;
      case 'last_name':
        validateName(value)
        break;
      case 'bio':
        validateBio(value)
        break;
      default: console.log("Something happened");
    }
  }

  const validateName = (value: string) => {
    if (!/^[A-Za-z ]+$/.test(value)) {
      console.log("Last name must contain letters only")
    } else if (value.charAt(0) === " ") {
      console.log("Last name cannot start with space")
    } else if (value.length > 24 ) {
      console.log("Toooo long")
    } else {
      console.log("")
    }
  }

  const validateBio = (value:  string) => {
    if (value.length > 120) {
      console.log("Toooo long")
    }
  }

  const setFocus = (input: any, focus: any) => {
    setIsFocused({...isFocused,
                  [input]: focus
                });
  }

  return (
    <form onSubmit={handleSubmit} className='profile_edit_form'>
      <div className='edit_form_field_container'>
      <div className='edit_field' id={isFocused.first_name ? "isFocused2" : ""}>
        First Name
        </div>
          <input
            id='first_name'
            value={firstName}
            type="text"
            onBlur={e => validateInputOnBlur(e)}
            onChange={e => handleInputOnChange(e)}
            onFocus={e => setFocus(e.target.id, true)}
          />
      <div className='edit_field' id={isFocused.last_name ? "isFocused2" : ""}>
        Last Name
      </div>
          <input
            id='last_name'
            value={lastName}
            type="text"
            onBlur={e => validateInputOnBlur(e)}
            onChange={e => handleInputOnChange(e)}
            onFocus={e => setFocus(e.target.id, true)}
          />
      <div className='edit_field' id={isFocused.bio ? "isFocused2" : ""}>
        Bio
      </div>
          <input
            id='bio'
            value={bio ? bio : ""}
            type="text"
            onBlur={e => validateInputOnBlur(e)}
            onChange={e => handleInputOnChange(e)}
            onFocus={e => setFocus(e.target.id, true)}
          />
      <div className='form_submit'>
        <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
        </div>
    </form>
  );
}

export default connect(mapStateToProps, {})(ProfileEditForm)
