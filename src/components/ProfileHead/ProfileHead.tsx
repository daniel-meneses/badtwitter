import React, {useState} from "react"
import './ProfileHead.scss'
import { connect } from 'react-redux'
import SubscribeButton from '../SubscribeButton/SubscribeButton'
import FloatingImage from '../FloatingImageContainer/FloatingImage';
import { useHistory } from 'react-router-dom'
import Button from '../../common/components/Button/Button'
import styles from './ProfileHead.mod.scss'

type Props = {
  user: { user_id: number,
          alias: string,
          avatar: string,
          first_name: string,
          last_name: string,
          bio: string
    },
  currentUserId: number
}

function mapStateToProps(state: any) {
  let currentUser = state.session.currentUser
  return {
    currentUserId: currentUser.user_id
  }
}

const ProfileHead = ({user={}, currentUserId} : Props) => {
  const [displayFloatingImage, setDisplayFloatingImage] = useState(false)
  const history = useHistory()

  return (
    <div className={'profile'}>
    <FloatingImage isDisplayed={displayFloatingImage}
                   image={user.avatar}
                   dismiss={() => setDisplayFloatingImage(false)}/>
      <img className='profile_avatar'
            src={user.avatar}
            onClick={() => setDisplayFloatingImage(true)}
            alt={'Profile Avatar'}/>
      <span className='profile_alias'> {user.alias} </span>
      <div className='profile_head_button'>
        { currentUserId == user.user_id ?
          <Button
            className={styles.editProfile}
            styling={'primary'}
            onClick={() => history.push('/account')}
            >
            Edit Profile
          </Button>
            :
        <SubscribeButton userId={user.user_id} />
        }
      </div>

      <div className='profile_bio_container'>
        <div className='profile_full_name'> {user.first_name + " " + user.last_name} </div>
        <div className='profile_bio'>{user.bio}</div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, {})(ProfileHead);
