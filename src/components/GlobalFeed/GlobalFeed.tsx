import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { goToUserProfile } from '../../commons/actions'
import { getGlobalFeed } from '../../actions/feed'
import { postLike, deleteLike} from '../../actions/like.js'
import PostMini from "../PostMini/PostMini";
import isEmpty from 'lodash/isEmpty'


interface GlobalFeed {
  feed?: {
    global: {
              list: [],
              dataMap: {},
              isFetching: boolean,
              errors: null
              }
          },
   post?: {
     hasBeenLiked: []}
}

class GlobalFeed extends React.Component<any, any> {

  componentDidMount() {
    this.props.getGlobalFeed()
  }

  handlePostLikeClick = (e: any) => {
    const isLiked = e.target.getAttribute("data-liked");
    const postId = e.target.getAttribute("data-key");
    const data = {post_id: postId}
      if (isLiked === "true") {
        this.props.deleteLike(data)
      } else {
        this.props.postLike(data)
      }
    }

   render() {
     let { global={}, hasBeenLiked=[], history } = this.props;
     if (global.isFetching === true) { return <div> is fetching </div>}
     if (isEmpty(global.dataMap)) {return <div>is empty</div>}
     return (
       <div className="post_list">
         { Object.values(global.dataMap).map((post: any) =>
               <PostMini key={post.id}
                         post={post}
                         handlePostLikeClick={this.handlePostLikeClick}
                         handlePostUserClick={(e :any) => goToUserProfile(history, e.target.getAttribute("data-key"))}
                         hasBeenLiked={hasBeenLiked.includes(post.id)}
                         isExpanded={false}
                         />
                       )
                     }
         </div>
    );
  }
}

function mapStateToProps(state :any) {
  let { global } = state.feed
  return {
    global: global,
    hasBeenLiked: state.post.hasBeenLiked
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({getGlobalFeed, postLike, deleteLike }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GlobalFeed) as any);
