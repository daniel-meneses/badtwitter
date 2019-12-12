import React from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getPendingSubscriptionRequests } from '../../actions/subscription.js'
import { updateFollowerRequest } from '../../actions/session.js'
import SubscriptionRequest from '../../components/SubscriptionRequest/SubscriptionRequest';


import PostMiniComponent from '../../components/PostMini/PostMini';

class Inbox extends React.Component<any, any> {

    constructor(props: any){
      super(props);
      this.state = {};
    }

    componentDidMount() {
      this.props.getPendingSubscriptionRequests();
    }

    updateFollowerRequest = (e: any) => {
      var bool = e.target.id === 'accept' ? true : false
      var data = {accepted : bool, user_id: e.target.parentNode.getAttribute("data-key")};
      this.props.updateFollowerRequest(data);
    }

    public render() {
        return (
            <div>
            <span>SUBSCRIPTION REQUESTS</span>
            { this.props.request_list.length ?
              this.props.request_list.map((r :any) =>
              <SubscriptionRequest key={r.id}
                                    subscription={r}
                                    handleFollowRequest={this.updateFollowerRequest}/>)
              :
              <span>Was nill</span>
            }
            </div>
        );
    }
}

function mapStateToProps(state :any) {
  return {
    request_list: state.subscription.subscription_requests
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({updateFollowerRequest, getPendingSubscriptionRequests}, dispatch)
  }

export default withRouter(connect(mapStateToProps
  , mapDispatchToProps)(Inbox) as any);
