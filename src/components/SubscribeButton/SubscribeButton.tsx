import React, { useState } from "react";
import { connect } from 'react-redux';
import classNames from 'classnames';
import { postSubscriptionRequest, deleteSubscription } from '../../actions/subscriptions';
import Button, { BtnThemes } from '../../common/components/Button/Button';
import styles from './SubscribeButton.mod.scss'
import showGuestToast from "../Toast/GuestToast";


type OwnProps = {
  userId: number;
}

type Props = {
  userId: number;
  isRequested?: boolean,
  isAccepted?: boolean,
  postSubscriptionRequest: (e: any) => void,
  deleteSubscription: (object: object) => void,
  isAuthenticated: boolean,
}

const SubscribeButton = (props: Props) => {

  const {isRequested, isAccepted, postSubscriptionRequest, userId, isAuthenticated, deleteSubscription} = props

  const [buttonText, setButtonText] = useState(isAccepted ? "Following" : isRequested ? "Pending" : "Follow")

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

  const handleOnClick = () => {
    if (!isAuthenticated) { return showGuestToast() }
    if (isAccepted) {
      deleteSubscription({user_id: userId})
    } else {
      postSubscriptionRequest(userId)
    }
  }

  return (
    <Button
      className={btnStyle}
      theme={BtnThemes.PrimaryFill}
      onClick={handleOnClick}
      onMouseEnter={setHoverText}
      onMouseLeave={resetText}
      >
      {buttonText}
    </Button>
  );
}
export default connect((state :any, ownProps: OwnProps) => {
  let { userId } = ownProps
  let subs = state.subscriptions.subscriptions
  let { pendingUserIds, acceptedUserIds } = subs;
  let isRequested = (pendingUserIds).includes(userId);
  let isAccepted = (acceptedUserIds).includes(userId);
  let isAuthenticated = state.session.session.isAuthenticated;
  return ({isRequested, isAccepted, isAuthenticated})
  },
  { postSubscriptionRequest,
    deleteSubscription })
(SubscribeButton);
