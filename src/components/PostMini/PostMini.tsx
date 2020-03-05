import React, {useState} from "react"
import './PostMini.scss'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import LikeButton from '../LikeButton/LikeButton'
import FloatingImage from '../FloatingImageContainer/FloatingImage';

type Props = {
  postId: number,
  post: { id: number,
          user_id: number,
          post: any,
          created: string
        },
  user: { alias: string,
          avatar: string,
          bio: string,
          first_name: string,
          last_name: string,
          user_id: number
        }
}

function mapStateToProps(state :any, ownProps: any) {
  const global = state.globalObject
  const post = global.posts[ownProps.postId]
  const user = global.users[post.user_id]
  return {
    post: post,
    user: user
   };
}

const PostMiniComponent = ({postId, post, user}: Props) => {
  const [displayFloatingImage, setDisplayFloatingImage] = useState(false)
  let history = useHistory()
  if (post === undefined || user===undefined) {
    return <></>
  }
  var timeStamp = moment(post.created).format("MMM Do LT");;

  return (
      <div className='post_mini_component' data-key={post.id}>
        <img src={user.avatar} onClick={() => setDisplayFloatingImage(true)} alt={'Profile avatar'}/>
        <h3 data-key={post.user_id}
            onClick={() => history.push("/user/" + user.user_id)}>
            {user.first_name + " " + user.last_name}
        </h3>
        <FloatingImage isDisplayed={displayFloatingImage}
                       image={user.avatar}
                       dismiss={() => setDisplayFloatingImage(false)}/>
        <p> {post.post} </p>
        <div className='post_mini_footer'>
          <LikeButton postId={post.id} />
          <span>{timeStamp} </span>
        </div>
      </div>
  );
}

export default connect(mapStateToProps, {})(PostMiniComponent);
