import React from "react";
import { connect } from 'react-redux';
import { postSubscriptionRequest } from '../../actions/subscription.js'

type Props = {
  userId: number,
  pendingRequests: Array<number>,
  postSubscriptionRequest: (e: any) => void
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

export default connect(
    (state :any) =>
        ({pendingRequests: state.subscriptions.pending.userIds})
        ,
        { postSubscriptionRequest })
    (SubscribeButton);
