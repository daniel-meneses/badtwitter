import React from 'react'
import './GlobalFeed.scss'
import { connect } from 'react-redux'
import { getGlobalFeed } from '../../actions/feed'
import isEmpty from 'lodash/isEmpty'
import PostMini from '../PostMini/PostMini'
import EmptyListMessage from '../EmptyListMessage/EmptyListMessage'

interface GlobalFeed {
  feed: {
    global: {
        timeline: Array<number>,
        isFetching: boolean,
        errors: string
        }
    }
}

function mapStateToProps(state :any) {
  return {
    global: state.feed.global
  }
}

class GlobalFeed extends React.Component<any, any> {

  componentDidMount() {
    this.props.getGlobalFeed()
  }

  render() {
    let { global } = this.props;
    console.log(global)
    if (global === undefined ) {return <div>HELP</div>}
    if (global.isFetching === true) { return <div> is fetching </div>}
    return (
      <div className="post_list">
      { global.timeline.map( (postId: number) =>
         <PostMini key={postId}
                   postId={postId}
                   />
                 )}
         </div>
    );
  }
}

export default connect(mapStateToProps, {getGlobalFeed})(GlobalFeed);
