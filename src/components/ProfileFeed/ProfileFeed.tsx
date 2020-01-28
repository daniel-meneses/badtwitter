import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProfileFeed } from '../../actions/feed'
import isEmpty from 'lodash/isEmpty'
import PostMini from "../PostMini/PostMini"

interface ProfileFeed {
  feed: {
    profile: {
        timeline: Array<number>,
        isFetching: boolean,
        errors: string
        }
    }
}

function mapStateToProps(state :any) {
  return {
    profile: state.feed.profile
  }
}

const mapDispatchToProps = { getProfileFeed }

class ProfileFeed extends React.Component<any, any> {

  componentDidMount() {
    let { getProfileFeed, userId} = this.props
    getProfileFeed(userId)
  }

  render() {
    let { profile } = this.props;
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
