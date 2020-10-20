import React, { useState } from "react";
import { connect } from 'react-redux';
import classNames from 'classnames';
import { postSubscriptionRequest } from '../../actions/subscription.js';
import Button from '../../common/components/Button/Button';
import styles from './SubscribeButton.mod.scss'

type Props = {
  userId: number,
  isRequested: boolean,
  isAccepted: boolean,
  postSubscriptionRequest: (e: any) => void
}

const SubscribeButton = (props: Props) => {

  const [buttonText, setButtonText] = useState("Follow")

  const {isRequested, isAccepted, postSubscriptionRequest} = props

  const btnStyle = classNames(
    styles.subscribeBtn,
    {[styles.unsubscribe] : isAccepted}
  )

  const setHoverText = () => {
    if (isAccepted) { setButtonText("Unfollow") }
  }

  const resetText = () => {
    let text = isAccepted ? "Following" : isRequested ? "Pending" : "Follow"
    setButtonText(text)
  }

  return (
    <Button
      className={btnStyle}
      styling={'primary'}
      onClick={() => postSubscriptionRequest(userId)}
      onMouseEnter={setHoverText}
      onMouseLeave={resetText}
      >
      {buttonText}
    </Button>
  );
}
export default connect((state :any, ownProps: Props) => {
  let { userId } = ownProps
  let subs = state.subscriptions
  let pending = subs.pending.userIds;
  let accepted = subs.accepted.userIds
  let isRequested = (pending || []).includes(userId);
  let isAccepted = (accepted || []).includes(userId);
  return ({isRequested, isAccepted})
}{ postSubscriptionRequest })
(SubscribeButton);
