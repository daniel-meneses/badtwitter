import React from "react"
import UserInfo from '../PostMini/UserInfo'
import { connect } from 'react-redux'
import { acceptFollowerRequest, rejectFollowerRequest } from '../../actions/followers.js'
import Button from '../../common/components/Button/Button'
import styles from './UserPreview.mod.scss'
import SubscribeButton from '../SubscribeButton/SubscribeButton'

type Props = {
  isFollowRequest: false,
  acceptFollowerRequest: any,
  rejectFollowerRequest: any,
  user: any;
  userId: number;
}

const UserPreview = (props: Props) => {

  const { user, acceptFollowerRequest, rejectFollowerRequest, isFollowRequest  } = props;
  const { bio, ...userProps } = user
  const { userPreview } = styles

  if (!user) return (<></>)

  const btns = isFollowRequest ?
    <div className={styles.userPreviewButtons}>
      <Button
        className={styles.previewButton}
        styling={'primary'}
        onClick={() => console.log(acceptFollowerRequest({accepted : true, id: user.user_id}))}
        >
        Accept
      </Button>
      <Button
        className={styles.previewButton}
        styling={'primary'}
        onClick={() => console.log(rejectFollowerRequest({accepted : false, id: user.user_id})}
        >
        Reject
      </Button>
    </div>
    :
  <SubscribeButton userId={user.user_id} />

  return (
    <div className={styles.userPreview}>
      <UserInfo
        userId={user.user_id}
        isPreview={true}
        topButtons={btns}
        >
        {bio && bio}
      </UserInfo>
    </div>
  )
}

export default connect((state: any, ownProps: Props) => {
  let { userId } = ownProps
  let { users } = state.globalObject
  let user: any = userId && users[userId]
  return {
    user
  }
}, {acceptFollowerRequest, rejectFollowerRequest})(UserPreview);
