import React from "react"
import "./PostMini.scss"
import LikeButton from '../LikeButton/LikeButton'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

type Props = {
  postId: number,
  posts: any,
  users: any,
}

function mapStateToProps(state :any) {
  return {
    posts: state.globalObject.posts,
    users: state.globalObject.users,
   };
}

const PostMiniComponent = ({postId, posts, users}: Props) => {

  let post = posts[postId];
  let user = users[post.user_id];
  let history = useHistory()

  return (
      <div className='post_mini_component' data-key={post.id}>
        <h3 data-key={post.user_id}
            onClick={() => history.push("/user/" + user.id)}>
              {user.first_name + " " + user.last_name}
            </h3>
            <i className="arrow down"
               onClick={() => history.push("/user/" + user.id)}
               ></i>
        <p> {post.post} </p>
        <div className='post_mini_footer'>
          <LikeButton postId={post.id} />
                <span>{post.created} </span>
          </div>
      </div>
  );
}

export default connect(mapStateToProps, {})(PostMiniComponent);
