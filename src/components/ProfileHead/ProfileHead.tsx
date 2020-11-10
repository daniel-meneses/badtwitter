import React, { useState } from "react"
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

const ProfileHead = (props: any) => {

  const { user, isCurrentUser } = props

  if (!user) { return <></> }
  const [displayFloatingImage, setDisplayFloatingImage] = useState(false)
  const history = useHistory()

  const { userId, avatar, alias, firstName, lastName, bio } = user

  return (
    <div className={styles.container}>
    <div className={styles.topLine}></div>
      <div className={styles.topRow}>
        <Avatar image={avatar} className={styles.avatar} />
        <div className={styles.topButton}>
          {isCurrentUser ?
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
      </div>
      <div className={styles.middleRow}>
        <h3 className={styles.fullName}> {firstName + " " + lastName} </h3>
        <h4 className={styles.alias}> {'@' + alias} </h4>
      </div>
      <div className={styles.bottomRow}>
        <div>{bio}</div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, {})(ProfileHead);
