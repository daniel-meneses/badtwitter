import React from "react"
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from './PostMini.mod.scss'
import UserInfo from './UserInfo'
import { IUser, IPost } from '../../store/globalObjects/types'
import moment from 'moment'
import LikeButton from '../LikeButton/LikeButton'

type Props = {
  className?: string;
  postId: number;
  post: any;
  user: any;
}

const UserPost = (props: Props) => {

  const { className, post, user } = props;

  const { id, likes, created, post: message } = post

  if (!user) { return <></> }
  const { user_id: userId } = user

  const timeStamp = moment(created).format("MMM Do LT");
  const history = useHistory()

  return (
    <div className={styles.userPost}>
      <UserInfo userId={userId}>
        <div className={styles.userPostMessage}>
          {message}
          </div>
      </UserInfo>
      <div className={styles.userPostFooter}>
        <div className={styles.footerIconWithCount}>
          <LikeButton className={styles.footerIcon} postId={id} />
          {likes && <div>{likes}</div>}
        </div>
        <div className={styles.footerTimestamp}>
          {timeStamp}
        </div>
      </div>
    </div>
  )
}

export default connect((state: any, ownProps: Props) => {
  let { postId } = ownProps
  let { users, posts } = state.globalObject
  let post: any = posts[postId] || {}
  let user: any = post && users[post.user_id]
  return {
    post, user
  }
}, {})(UserPost)
