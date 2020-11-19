import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import classNames from 'classnames'
import { editAccountInfo, AccountInfoPayload } from '../../actions/account'
import TextField from '../Forms/TextField'
import * as validate from '../Forms/FormValidations'
import Button from '../../common/components/Button/Button'
import styles from './ProfileEditForm.mod.scss'
import { isEqual } from 'lodash'
import { selectCurrentUser } from "../../reducers/users"

type OwnProps = {
  className?: string
};

type ConnectProps = {
  currentUser: any,
  editAccountInfo: (data: AccountInfoPayload) => void,
};

type Props = OwnProps & ConnectProps;

const ProfileEditForm: React.FunctionComponent<Props> = (props) => {

  const { currentUser, editAccountInfo, className } = props;

  const initial = {
    first_name: currentUser.firstName,
    last_name: currentUser.lastName,
    bio: currentUser.bio
  }

  const [isValid, setIsValid] = useState({
    first_name: true,
    last_name: true,
    bio: true,
  })

  const [formData, setFormData] = useState(initial)
  const [isEditable, setIsEditable] = useState(false)
  const [enableSubmit, setEnableSubmit] = useState(false)

  useEffect(() => {
    setEnableSubmit(isEqual(initial, formData))
  }, [formData])

  const validateName = (text: string) => {
    let label = 'Name'
    let error = validate.cannotStartWithSpace(label, text)
      || validate.cannotBeBlank(label, text)
    setIsValid({ ...isValid, first_name: error ? false : true })
    return error
  }

  const validateBio = (text: string) => {
    let label = 'Bio'
    let error = validate.max200Characters(label, text)
    setIsValid({ ...isValid, bio: error ? false : true })
    return error
  }

  const cancelEdit = () => {
    setFormData(initial)
    setIsEditable(false)
  }

  const handleOnClick = () => {
    let isInvalid = Object.values(isValid).includes(false)
    if (isInvalid) {
      console.log('Unable to save changes');
    } else {
      editAccountInfo(formData)
      setIsEditable(false)
    }
  }

  const formClass = classNames(
    styles.formDefault,
    { [styles.editFormHover]: !isEditable },
    { [styles.isEditing]: isEditable },
    className
  )

  return (
    <div className={formClass} onClick={() => !isEditable && setIsEditable(true)}>
      { isEditable &&
        <div className={styles.overlay}
          onClick={(e: any) => isEditable && cancelEdit()}>
        </div>
      }
      <TextField
        label={'First Name'}
        value={formData.first_name}
        setValue={(val: any) => setFormData({ ...formData, first_name: val })}
        validateAndReturnError={validateName}
      />
      <TextField
        label={'Last Name'}
        value={formData.last_name}
        setValue={(val: any) => setFormData({ ...formData, last_name: val })}
        validateAndReturnError={validateName}
      />
      <TextField
        label={'Bio'}
        value={formData.bio}
        setValue={(val: any) => setFormData({ ...formData, bio: val })}
        validateAndReturnError={validateBio}
      />
      {
        isEditable &&
        <>
          <Button
            className={styles.acceptEdit}
            onClick={handleOnClick}
            isDisabled={enableSubmit}
          >
            {'Update'}
          </Button>
        </>
      }
    </div>
  );
}

export default connect((state: RootState) => ({ 
  currentUser: selectCurrentUser(state) || {}
}),
{ editAccountInfo })(ProfileEditForm);
