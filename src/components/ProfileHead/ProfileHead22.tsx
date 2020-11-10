import React, {useState} from "react"
import './ProfileHead.scss'
import { connect } from 'react-redux'
import SubscribeButton from '../SubscribeButton/SubscribeButton'
import FloatingImage from '../FloatingImageContainer/FloatingImage';
import { useHistory } from 'react-router-dom'
import Button, { BtnThemes } from '../../common/components/Button/Button'
import styles from './ProfileHead.mod.scss'
import { getUserById, isCurrentUser } from '../../selectors/users';
import { User } from '../../types/common'
import Avatar from "../Avatar/Avatar";

type ConnectProps = {
  user: User;
  isCurrentUser: boolean;
}

function mapStateToProps(state: any, ownProps: any) {
  let { userId } = ownProps
  return {
    user: getUserById(state, userId),
    isCurrentUser: isCurrentUser(state, userId),
  }
}

const ProfileHead = (props : any) => {

  const { user, isCurrentUser } = props
  
  if (!user) { return <></>}
  const [displayFloatingImage, setDisplayFloatingImage] = useState(false)
  const history = useHistory()
  
  const { userId, avatar, alias, firstName, lastName, bio } = user

  return (
    <div className={'profile'}>
      <div className={'profile-image-alias'}>
        <Avatar image={avatar} className={'profile_avatar'} showImageOnHover={true} />
        <span className='profile_alias'> {alias} </span>
        </div>
      <div className='profile_head_button'>
        { isCurrentUser ?
          <Button
            className={styles.editProfile}
            theme={BtnThemes.PrimaryOutline}
            onClick={() => history.push('/account')}
            >
            Edit Profile
          </Button>
            :
        <SubscribeButton userId={userId} />
        }
      </div>

      <div className='profile_bio_container'>
        <div className='profile_full_name'> {firstName + " " + lastName} </div>
        <div className='profile_bio'>{bio}</div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, {})(ProfileHead);
