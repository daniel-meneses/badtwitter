import React from "react"
import { connect } from 'react-redux'
import styles from './PostMini.mod.scss'
import UserInfo from './UserInfo'
import moment from 'moment'
import LikeButton from '../LikeButton/LikeButton'

type OwnProps = {
  postId: number;
}

type Props = {
  className?: string;
  post: any;
}

const UserPost = (props: Props) => {

  const { post } = props;
  const { id: postId, likes, created, post: message, user_id: userId } = post

  const timeStamp = moment(created).format("MMM Do LT");

  return (
    <div className={styles.userPost}>
      <UserInfo userId={userId}>
        <div>
          {message}
          </div>
      </UserInfo>
      <div className={styles.userPostFooter}>
        <div className={styles.footerIconWithCount}>
          <LikeButton className={styles.footerIcon} postId={postId} />
          {likes && <div>{likes}</div>}
        </div>
        <div className={styles.footerTimestamp}>
          {timeStamp}
        </div>
      </div>
    </div>
  )
}

export default connect((state: any, ownProps: OwnProps) => {
  let { postId } = ownProps
  let post: any = state.post.byId[postId] || {}
  return {
    post
  }
}, {})(UserPost)
