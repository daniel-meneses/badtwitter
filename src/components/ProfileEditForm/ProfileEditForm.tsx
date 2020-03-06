import React, { useState } from "react"
import { connect } from 'react-redux'
import './ProfileEditForm.scss'
import {editProfileBio} from '../../actions/profile.js'

type Props = {
  currentUser: any,
  editProfileBio: any
}

function mapStateToProps(state :any) {
  return { currentUser: state.session.currentUser }
}

const ProfileEditForm = ({currentUser, editProfileBio}: Props) => {
  const [editObject, setEditObject] = useState({"first_name": currentUser.first_name, "last_name": currentUser.last_name, "bio" : currentUser.bio});
  const [isFocused, setIsFocused] = useState({"first_name": false, "last_name": false, "bio" : false});

  const handleSubmit = (e: any) => {
      e.preventDefault();
      editProfileBio(editObject)
  }

  const handleInputChange = (e: any) => {
    setEditObject({...editObject,
                [e.target.id]: e.target.value
                });
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
    if (value.length > 244) {
      console.log("Toooo long")
    }
  }

  const setFocus = (input: any, focus: any) => {
    setIsFocused({...isFocused,
                  [input]: focus
                });
  }

  const disableSubmit = (editObject.first_name === currentUser.first_name &&
                              editObject.last_name === currentUser.last_name &&
                              editObject.bio === currentUser.bio)
  const buttonStyle = {diabled: disableSubmit}
  console.log(disableSubmit)

  return (
    <form onSubmit={handleSubmit} className='profile_edit_form'>
      <div className='edit_form_field_container'>
      <div className='edit_field' id={isFocused.first_name ? "isFocused2" : ""}>
        First Name
        </div>
          <input
            id='first_name'
            value={editObject.first_name}
            type="text"
            onBlur={e => validateInputOnBlur(e)}
            onChange={e => handleInputChange(e)}
            onFocus={e => setFocus(e.target.id, true)}
          />
      <div className='edit_field' id={isFocused.last_name ? "isFocused2" : ""}>
        Last Name
      </div>
          <input
            id='last_name'
            value={editObject.last_name}
            type="text"
            onBlur={e => validateInputOnBlur(e)}
            onChange={e => handleInputChange(e)}
            onFocus={e => setFocus(e.target.id, true)}
          />
      <div className='edit_field' id={isFocused.bio ? "isFocused2" : ""}>
        Bio
      </div>
          <input
            id='bio'
            value={editObject.bio}
            type="text"
            onBlur={e => validateInputOnBlur(e)}
            onChange={e => handleInputChange(e)}
            onFocus={e => setFocus(e.target.id, true)}
          />
      <div className='form_submit'>
        <button type="submit" className={disableSubmit ? 'hide' : 'green-button'} onClick={handleSubmit}>Submit</button>
        </div>
        </div>
    </form>
  );
}

export default connect(mapStateToProps, {editProfileBio})(ProfileEditForm)
