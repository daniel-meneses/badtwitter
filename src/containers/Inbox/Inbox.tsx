import React from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getPendingSubscriptionRequests, getFollowRequests } from '../../actions/subscription.js'
import { updateFollowerRequest } from '../../actions/session.js'
import SubscriptionRequest from '../../components/SubscriptionRequest/SubscriptionRequest';
import PostMiniComponent from '../../components/PostMini/PostMini';
import FollowRequest from '../../components/FollowRequest/FollowRequest';

class Inbox extends React.Component<any, any> {

    constructor(props: any){
      super(props);
      this.state = {};
    }

    componentDidMount() {
      this.props.getFollowRequests();
    }

    updateFollowerRequest = (e: any) => {
      var bool = e.target.value === 'accept' ? true : false
      var data = {accepted : e.target.value, user_id: e.target.parentNode.getAttribute("data-key")};
      this.props.updateFollowerRequest(data);
    }

    updateFollowerRequest2 = (e: any) => {
      var bool = e.target.value === 'accept' ? true : false
      var id = e.target.parentNode.getAttribute("data-key")
      var data = {accepted : bool, id: id}
      this.props.updateFollowerRequest(data);
    }


    public render() {
        return (
            <div>
            <span>SUBSCRIPTION REQUESTS</span>
            { this.props.followerRequests.length ?
              this.props.followerRequests.map((req :any) =>
              <FollowRequest key={req.id}
                             id={req.id}
                             user={req.user}
                             handleFollowRequest={this.updateFollowerRequest2}/>)
              :
              <span>Was nill</span>
            }
            </div>
        );
    }
}

function mapStateToProps(state :any) {
  return {
    request_list: state.subscription.subscription_requests,
    followerRequests: state.subscription.follower_requests
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({updateFollowerRequest, getPendingSubscriptionRequests, getFollowRequests}, dispatch)
  }

export default withRouter(connect(mapStateToProps
  , mapDispatchToProps)(Inbox) as any);
