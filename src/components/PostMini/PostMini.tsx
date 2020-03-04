import React, {useState} from "react"
import './PostMini.scss'
import LikeButton from '../LikeButton/LikeButton'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import FloatingImage from '../FloatingImageContainer/FloatingImage';

type Props = {
  postId: number,
  posts: { [index: string] :
              { id: number,
                user_id: number,
                post: any,
                created: string }
              },
  users: any,
}

function mapStateToProps(state :any) {
  return {
    posts: state.globalObject.posts,
    users: state.globalObject.users,
   };
}

const PostMiniComponent = ({postId, posts, users}: Props) => {
  const [displayFloatingImage, setDisplayFloatingImage] = useState(false)
  let history = useHistory()
  let post = posts[postId];
  if (post === undefined) {
    return <></>
  }
  let user = users[post.user_id];
  var timeStamp = moment(post.created).format("MMM Do LT");;

  return (
      <div  className='post_mini_component'
            data-key={post.id}>
        <img src={user.avatar} onClick={() => setDisplayFloatingImage(true)}/>
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
