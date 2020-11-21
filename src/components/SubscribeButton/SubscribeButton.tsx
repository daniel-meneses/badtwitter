import React, { useState } from "react";
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as subscriptionActions from '../../actions/subscriptions';
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
  isAuthenticated: boolean,
  dispatch: any;
}

const SubscribeButton: React.FC<Props> = (props) => {

  const { isRequested, isAccepted, userId, isAuthenticated, dispatch } = props
  const { postSubscriptionRequest, deleteSubscription } = subscriptionActions;

  const initialText = isAccepted ? "Following" : isRequested ? "Pending" : "Follow";
  const [buttonText, setButtonText] = useState(initialText)

  const btnStyle = classNames(
    styles.subscribeBtn,
    {[styles.unsubscribe] : isAccepted}
  )

  const handleOnClick = () => {
    if (!isAuthenticated) { return showGuestToast() }
    let payload = { user_id: userId }
    dispatch(isAccepted ? deleteSubscription(payload) : postSubscriptionRequest(payload))
  }

  return (
    <Button
      className={btnStyle}
      theme={BtnThemes.PrimaryFill}
      onClick={handleOnClick}
      onMouseEnter={() => isAccepted && setButtonText("Unfollow")}
      onMouseLeave={() => setButtonText(initialText)}
      >
      {buttonText}
    </Button>
  );
}

export default connect((state: RootState, { userId }: OwnProps) => ({
    isRequested: selectPendingSubscriptionUsers(state).includes(userId),
    isAccepted: selectAcceptedSubscriptionUsers(state).includes(userId),
    isAuthenticated: selectIsAuthenticated(state)
  }))
(SubscribeButton);
