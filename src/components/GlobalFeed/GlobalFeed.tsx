import React from 'react'
import './GlobalFeed.scss'
import { connect } from 'react-redux'
import PostMini from '../PostMini/PostMini'

type Props = {
  globalTimeline: Array<number>
}

const GlobalFeed = ({globalTimeline=[]} : Props) => {

  return (
    <div className="post_list">
    { globalTimeline.map( (postId: number) =>
       <PostMini key={postId}
                 postId={postId}
                 />
               )}
       </div>
  );
}

export default GlobalFeed
