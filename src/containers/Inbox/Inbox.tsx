import React from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { goToUserProfile } from '../../commons/actions'
import { isObjectEmpty } from '../../commons/helpers'
import { getPendingSubscriptionRequests, getFollowRequests, updateFollowerRequest, getFollowers } from '../../actions/subscription.js'
import FollowRequest from '../../components/FollowRequest/FollowRequest';

class Inbox extends React.Component<any, any> {

    componentDidMount() {
      this.props.getFollowRequests()
    }

    updateFollowerRequest = (e: any) => {
      var bool = e.target.value === 'accept' ? true : false
      var id = e.target.parentNode.getAttribute("data-key")
      var data = {accepted : bool, id: id}
      this.props.updateFollowerRequest(data);
    }

    public render() {
      let {followerRequests, history} = this.props
      let shouldDisplayerFollowers = !isObjectEmpty(followerRequests);
      return (
        <div>
        <span>SUBSCRIPTION REQUESTS</span>
          {
            shouldDisplayerFollowers &&
            Object.values(followerRequests).map( (req :any) =>
            <FollowRequest key={req.id}
                           request={req}
                           handleUserClick={(e :any) => goToUserProfile(history, e.currentTarget.getAttribute("data-key"))}
                           handleUpdateRequest={this.updateFollowerRequest}/>)
          }
        </div>
      );
    }
}

type Props = {
  followerRequests: {};
};

function mapStateToProps(state :any) {
  return {
    followerRequests: state.subscription.follower_request_users
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({updateFollowerRequest, getPendingSubscriptionRequests, getFollowRequests, getFollowers}, dispatch)
  }

export default withRouter(connect(mapStateToProps
  , mapDispatchToProps)(Inbox) as any);
