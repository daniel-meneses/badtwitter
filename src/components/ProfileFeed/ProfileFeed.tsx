import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { goToUserProfile } from '../../commons/actions'
import { getProfileFeed } from '../../actions/feed'
import { postLike, deleteLike} from '../../actions/like.js'
import PostMini from "../PostMini/PostMini";
import isEmpty from 'lodash/isEmpty'


interface ProfileFeed {
  feed?: {
    profile: {
              list: [],
              dataMap: {},
              isFetching: boolean,
              errors: null
              }
          }
}

class ProfileFeed extends React.Component<any, any> {

  componentDidMount() {
    this.props.getProfileFeed(this.props.match.params.id)
  }

  handlePostLikeClick = (e: any) => {
    const isLiked = e.target.getAttribute("data-key");
    const data = {post_id: e.target.id}
      if (isLiked === "true") {
        this.props.deleteLike(data)
      } else {
        this.props.postLike(data)
      }
    }

   render() {
     let { profile={}, hasBeenLiked=[], history } = this.props;
     if (profile.isFetching === true) { return <div> is fetching </div>}
     if (isEmpty(profile.dataMap)) {return <div>is empty</div>}
     return (
       <div className="post_list">
         { Object.values(profile.dataMap).map((post: any) =>
               <PostMini key={post.id}
                         post={post}
                         handlePostLikeClick={this.handlePostLikeClick}
                         handlePostUserClick={(e :any) => goToUserProfile(history, e.target.getAttribute("data-key"))}
                         hasBeenLiked={hasBeenLiked.includes(post.id)} />
                       )
                     }
         </div>
    );
  }
}

function mapStateToProps(state :any) {
  let { profile } = state.feed
  return {
    profile: profile,
    hasBeenLiked: state.post.hasBeenLiked
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({getProfileFeed, postLike, deleteLike }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileFeed) as any);
