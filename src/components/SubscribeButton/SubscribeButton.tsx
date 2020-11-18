import React, { useState } from "react";
import { connect } from 'react-redux';
import classNames from 'classnames';
import { postSubscriptionRequest, deleteSubscription, subscriptionPayload } from '../../actions/subscriptions';
import Button, { BtnThemes } from '../../common/components/Button/Button';
import styles from './SubscribeButton.mod.scss'
import showGuestToast from "../Toast/GuestToast";
import { selectPendingSubscriptionUsers, selectAcceptedSubscriptionUsers } from "../../reducers/subscriptions";
import { selectIsAuthenticated } from "../../reducers/session";

type OwnProps = {
  userId: number;
}

type Props = {
  userId: number;
  isRequested?: boolean,
  isAccepted?: boolean,
  postSubscriptionRequest: (payload: subscriptionPayload) => void,
  deleteSubscription: (payload: subscriptionPayload) => void,
  isAuthenticated: boolean,
}

const SubscribeButton: React.FC<Props> = (props) => {

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
      postSubscriptionRequest({user_id: userId})
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
export default connect((state: RootState, { userId }: OwnProps) => ({
    isRequested: selectPendingSubscriptionUsers(state).includes(userId),
    isAccepted: selectAcceptedSubscriptionUsers(state).includes(userId),
    isAuthenticated: selectIsAuthenticated(state)
  }),
  { 
    postSubscriptionRequest,
    deleteSubscription 
  })
(SubscribeButton);
