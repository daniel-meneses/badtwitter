import React from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getPendingSubscriptionRequests, getFollowRequests, updateFollowerRequest } from '../../actions/subscription.js'
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
      var id = e.target.parentNode.getAttribute("data-key")
      var data = {accepted : bool, id: id}
      this.props.updateFollowerRequest(data);
    }

    public render() {
      var followRequests:object  = this.props.followerRequests ? this.props.followerRequests : {};
        return (
            <div>
            <span>SUBSCRIPTION REQUESTS</span>
            {
              Object.values(followRequests).map(req =>
                <FollowRequest key={req.id}
                               request={req}
                               handleFollowRequest={this.updateFollowerRequest}/>
            )}
            </div>
        );
    }
}

function mapStateToProps(state :any) {
  return {
    request_list: state.subscription.subscription_request_ids,
    followerRequests: state.subscription.follower_request_users
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({updateFollowerRequest, getPendingSubscriptionRequests, getFollowRequests}, dispatch)
  }

export default withRouter(connect(mapStateToProps
  , mapDispatchToProps)(Inbox) as any);
