import React from "react";
import "./PostMini.scss";
import LikeButton from '../LikeButton/LikeButton';
import { goToUserProfile } from '../../commons/actions';
import { connect } from 'react-redux';

type Props = {
  postId: number,
  history: any,
  posts: any,
  users: any
}

function mapStateToProps(state :any) {
  return {
    posts: state.globalObject.posts,
    users: state.globalObject.users,
   };
}

const PostMiniComponent = ({postId, history, posts, users}: Props) => {

  let post = posts[postId];
  let user = users[post.user_id];

  return (
      <div className='post_mini_component' data-key={post.id}>
        <h3 data-key={post.user_id}
            onClick={() => goToUserProfile(history, user.id)}>
              {user.first_name + " " + user.last_name}
            </h3>
            <i className="arrow down"
               onClick={() => goToUserProfile(history, user.id)}
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
