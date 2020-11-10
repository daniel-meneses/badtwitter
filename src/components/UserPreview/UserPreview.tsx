import React from "react"
import UserInfo from '../PostMini/UserInfo'
import { connect } from 'react-redux'
import { acceptFollowerRequest, rejectFollowerRequest } from '../../actions/followers'
import Button, { BtnThemes } from '../../common/components/Button/Button'
import styles from './UserPreview.mod.scss'
import SubscribeButton from '../SubscribeButton/SubscribeButton'

type Props = {
  isFollowRequest?: boolean;
  acceptFollowerRequest?: any;
  rejectFollowerRequest?: any;
  user?: any;
  userId: number;
}

const UserPreview = (props: Props) => {

  if (!props.user) return (<>{'No user'}</>)

  const { user, acceptFollowerRequest, rejectFollowerRequest, isFollowRequest, userId  } = props;
  const { bio, ...userProps } = user
  const { userPreview } = styles

  const btns = isFollowRequest ?
    <div className={styles.userPreviewButtons}>
      <Button
        className={styles.previewButton}
        theme={BtnThemes.PrimaryFill}
        onClick={() => acceptFollowerRequest({accepted : true, id: userId})}
        >
        Accept
      </Button>
      <Button
        className={styles.previewButton}
        theme={BtnThemes.RedOutline}
        onClick={() => rejectFollowerRequest({accepted : false, id: userId})}
        >
        Reject
      </Button>
    </div>
    :
  <SubscribeButton userId={userId} />

  return (
    <div className={styles.userPreview}>
      <UserInfo
        userId={userId}
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
  let { byId } = state.users
  let user: any = byId && byId[userId]
  return {
    user
  }
}, {acceptFollowerRequest, rejectFollowerRequest})(UserPreview);
