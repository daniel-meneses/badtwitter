import React from 'react'
import './Trending.scss'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

type Props = {
  postId: any,
  posts: any,
  users: any
}

function mapStateToProps(state :any) {
  return {
    posts: state.globalObject.posts,
    users: state.globalObject.users,
   };
}

const Trending = ({postId, posts, users}: Props) => {
  let post = posts[postId];
  let user = users[post.user_id];
  let history = useHistory()

  return (
      <div  className='trending'>
        <div className='trending_padding'>
        <h3>Trending</h3>

        <div className='trending_item'> This a fake long trending title </div>
        <div className='trending_item'> This a fake long trending title </div>
        <div className='trending_item'> This a fake long trending title </div>
        </div>
      </div>
  );
}

export default connect(mapStateToProps, {})(Trending)
