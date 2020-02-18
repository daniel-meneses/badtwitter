import React from 'react'
import './LikeButton.scss'
import { connect } from 'react-redux'
import { postLike, deleteLike} from '../../actions/like.js'

type Props = {
  postId: number,
  likedPostIds: Array<number>,
  postLike: (e: any) => void,
  deleteLike: (e: any) => void
}

function mapStateToProps(state :any) {
  return { likedPostIds: state.likes.likedPostIds }
}

const LikeButton = ({postId, likedPostIds, postLike, deleteLike }: Props) => {

  let isLiked = likedPostIds.includes(postId);

  let handlePostLikeClick = (e: any) => {
    const data = {post_id: postId}
      if (isLiked) {
        deleteLike(data)
      } else {
        postLike(data)
      }
    }

  return (
    <div>
      <span className={"like_button"}
            data-key={postId}
            onClick={handlePostLikeClick}
            >
            { !isLiked ?
            <svg viewBox="0 0 28 28"><g fill="white" stroke="green"><path d='M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z'/></g></svg>
            :
            <svg viewBox="0 0 28 28"><g fill="green" stroke="green"><path d='M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z'/></g></svg>
            }
          </span>
      </div>
  );
}

//M4 12v7a.971.971 0 0 0 .278.704.99.99 0 0 0 .701.296H6v-9H4.98a.99.99 0 0 0-.701.296A.971.971 0 0 0 4 12zm15.281-.96a3.046 3.046 0 0 0-2.321-1.061h-2.634c.04-.181.08-.36.11-.532.515-2.934 0-4-.504-4.594A2.432 2.432 0 0 0 12.075 4a3.078 3.078 0 0 0-2.968 2.751c-.393 1.839-.454 2-.968 2.725l-.768 1.089a2.011 2.011 0 0 0-.363 1.141v6.273c.001.532.216 1.041.596 1.416s.896.585 1.433.584h7.247a3.014 3.014 0 0 0 2.997-2.507l.677-4a2.963 2.963 0 0 0-.677-2.432zm-1.998 6.1a1.007 1.007 0 0 1-1 .835H9.038v-6.269l.767-1.089a7.577 7.577 0 0 0 1.302-3.509c.036-.543.255-1.209.969-1.108.714.1.575 1.916.363 3.1a19.712 19.712 0 0 1-.868 2.882l5.39-.008c.297-.001.58.128.773.352a.993.993 0 0 1 .226.813l-.676 4.001z

export default connect(mapStateToProps, {postLike, deleteLike})(LikeButton);
