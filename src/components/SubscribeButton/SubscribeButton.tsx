import React from "react";
import { connect } from 'react-redux';
import { postSubscriptionRequest } from '../../actions/subscription.js'
import { bindActionCreators } from 'redux';

type Props = {
  userId: number,
  pendingRequests: Array<number>,
  postSubscriptionRequest: (e: any) => void
}

function mapStateToProps(state :any) {
  return {
    pendingRequests: state.subscription.pendingSubRequestUserIds
   };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({postSubscriptionRequest}, dispatch)
}

const SubscribeButton = ({userId, pendingRequests, postSubscriptionRequest}: Props) => {

  let isRequested = pendingRequests.includes(userId);

  return (
    <div>
      <button className={'subscribe_request_button'}
              disabled={isRequested}
              onClick={() => postSubscriptionRequest(userId)}
              >
              {isRequested ? "Pending" : "Request Follow"}
            </button>
      </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeButton);
