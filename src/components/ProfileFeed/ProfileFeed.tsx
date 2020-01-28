import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProfileFeed } from '../../actions/feed'
import isEmpty from 'lodash/isEmpty'
import PostMini from "../PostMini/PostMini";

interface ProfileFeed {
  globalObject: {
      users: any,
      posts: any
  },
  feed: {
    profile: {
        timeline: [],
        isFetching: boolean,
        errors: null
        }
    }
}

function mapStateToProps(state :any) {
  return {
    users: state.globalObject.users,
    posts: state.globalObject.posts,
    profile: state.feed.profile
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({getProfileFeed}, dispatch)
}

class ProfileFeed extends React.Component<any, any> {

  componentDidMount() {
    let { getProfileFeed, userId} = this.props
    getProfileFeed(userId)
  }

  render() {
    let { profile={}, history } = this.props;
    if (profile.isFetching === true) { return <div> is fetching </div>}
    if (isEmpty(profile.timeline)) {return <div>is empty</div>}
    return (
       <div className="main">
         <div className="feed">
            { profile.timeline.map( (postId: number) =>
              <PostMini key={postId}
                        postId={postId}
                        />
                      )}
                      </div>
                    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFeed);
