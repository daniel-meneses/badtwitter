import React from "react";
import './SubscribeButton.scss'
import { connect } from 'react-redux';
import { postSubscriptionRequest } from '../../actions/subscription.js'

type Props = {
  userId: number,
  pendingRequests: Array<number>,
  acceptedRequests: Array<number>,
  postSubscriptionRequest: (e: any) => void
}

const SubscribeButton = ({userId, pendingRequests, acceptedRequests, postSubscriptionRequest}: Props) => {

  let isRequested = (pendingRequests || []).includes(userId);
  let isFollowing = acceptedRequests.includes(userId);

  var followRequestText = null
  var buttonClass = null
  if (isRequested) {
    followRequestText = "Pending"
    buttonClass = 'subscribe_request_button is_requested'
  } else if (isFollowing) {
    followRequestText = "Following"
    buttonClass = 'subscribe_request_button following'
  } else {
    followRequestText = "Follow"
    buttonClass = 'subscribe_request_button'
  }


  return (
    <div>
      <button className={buttonClass}
              disabled={isRequested}
              onClick={() => postSubscriptionRequest(userId)}
              >
              <span className='request_text'>{followRequestText}</span>
            </button>
      </div>
  );
}

export default connect(
    (state :any) =>
        ({pendingRequests: state.subscriptions.pending.userIds,
          acceptedRequests: state.subscriptions.accepted.userIds})
        ,
        { postSubscriptionRequest })
    (SubscribeButton);
