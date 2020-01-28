import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getGlobalFeed } from '../../actions/feed'
import isEmpty from 'lodash/isEmpty'
import PostMini from '../PostMini/PostMini'

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

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({getGlobalFeed}, dispatch)
}

class GlobalFeed extends React.Component<any, any> {

  componentDidMount() {
    this.props.getGlobalFeed()
  }

  render() {
    let { global } = this.props;
    if (global.isFetching === true) { return <div> is fetching </div>}
    if (isEmpty(global.timeline)) {return <div>is empty</div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(GlobalFeed);
