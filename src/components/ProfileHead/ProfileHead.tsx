import React from "react"
import { connect } from 'react-redux'
import SubscribeButton from '../SubscribeButton/SubscribeButton'
import { useHistory } from 'react-router-dom'
import Button, { BtnThemes } from '../../common/components/Button/Button'
import styles from './ProfileHead.mod.scss'
import { User } from '../../types/common'
import Avatar from "../Avatar/Avatar";
import { selectUserById } from "../../reducers/globalObjects";
import { selectCurrenUserId } from "../../reducers/session";


type OwnProps = {
  userId: number;
}

type ConnectProps = {
  user: User;
  isCurrentUser: boolean;
}

function mapStateToProps(state: any, { userId }: OwnProps) {
  return {
    user: selectUserById(state, userId) || {},
    isCurrentUser: selectCurrenUserId(state) === userId,
  }
}

const ProfileHead: React.FC<ConnectProps> = (props) => {

  const { user, isCurrentUser } = props
  const history = useHistory()

  const { id, avatar, alias='', firstName='', lastName='', bio='' } = user
  const isValidUser = !!id

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
            isValidUser && <SubscribeButton userId={id} />
          }
        </div>
      </div>
      <div className={styles.middleRow}>
        <h3 className={styles.fullName}> {firstName + " " + lastName} </h3>
        <h4 className={styles.alias}> {alias && `@${alias}` } </h4>
      </div>
      <div className={styles.bottomRow}>
        <div>{bio}</div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, {})(ProfileHead);
