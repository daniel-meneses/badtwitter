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

  let history = useHistory()

  return (
      <div  className='trending'>
        <div className='trending_padding'>
        <div className='trending_title'>Trending</div>
        <div className='trending_item'>
          <div className='item_category'>Poltiics</div>
          <div className='item_title'>This a fake long trending title</div>
          <div className='item_mentions'>16,000 mentions</div>
        </div>
        <div className='trending_item'> This a fake long trending title </div>
        <div className='trending_item'> This a fake long trending title </div>
        <div className='trending_item'> This a fake long trending title </div>
        <div className='trending_item'> This a fake long trending title </div>
        </div>
      </div>
  );
}

export default connect(mapStateToProps, {})(Trending)
