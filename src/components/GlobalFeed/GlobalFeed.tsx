import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getGlobalFeed } from '../../actions/feed'
import isEmpty from 'lodash/isEmpty'
import PostMini from "../PostMini/PostMini";

interface GlobalFeed {
  globalObject: {
      users: any,
      posts: any
  },
  feed?: {
    global: {
        timeline: any,
        isFetching: boolean,
        errors: null
        }
    }
}

function mapStateToProps(state :any) {
  return {
    users: state.globalObject.users,
    posts: state.globalObject.posts,
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
    let { global={}, history } = this.props;
    if (global.isFetching === true) { return <div> is fetching </div>}
    if (isEmpty(global.timeline)) {return <div>is empty</div>}
    return (
      <div className="post_list">
      { global.timeline.map( (postId: number) =>
         <PostMini key={postId}
                   postId={postId}
                   history={history}
                   />
                 )}
         </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GlobalFeed) as any);
