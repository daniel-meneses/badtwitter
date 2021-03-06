import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as subscriptionActions from '../../actions/subscriptions';
import Button, { BtnThemes } from '../../common/components/Button/Button';
import styles from './SubscribeButton.mod.scss'
import showGuestToast from "../Toast/GuestToast";
import { selectAcceptedSubscriptions, selectAcceptedSubscriptionUserIds, selectPendingSubscriptionUserIds } from "../../reducers/subscriptions";
import { selectIsAuthenticated } from "../../reducers/session";

type OwnProps = {
  userId: number;
}

type Props = {
  subscriptionRequest?: any;
  userId: number;
  isRequested?: boolean,
  isAccepted?: boolean,
  isAuthenticated: boolean,
  dispatch: AppThunkDispatch;
}

const SubscribeButton: React.FC<Props> = (props) => {

  const { subscriptionRequest, isRequested, isAccepted, userId, isAuthenticated, dispatch } = props
  const { postSubscriptionRequest, deleteSubscription } = subscriptionActions;
  
  const isPending = isRequested && !isAccepted;
  const initialText = isAccepted ? "Following" : isRequested ? "Pending" : "Follow";
  const [buttonText, setButtonText] = useState(initialText)

  useEffect( () => {
    setButtonText(initialText)
  }, [initialText])

  const btnStyle = classNames(
    styles.subscribeBtn,
    {[styles.unsubscribe] : isAccepted},
  )

  const handleOnClick = () => {
    if (!isAuthenticated) { return showGuestToast() }
    let payload = isAccepted? { request_id: subscriptionRequest.id, user_id: userId } : { user_id: userId }
    dispatch(isAccepted ? deleteSubscription(payload) : postSubscriptionRequest(payload))
  }

  return (
    <Button
      className={btnStyle}
      theme={BtnThemes.PrimaryFill}
      onClick={handleOnClick}
      onMouseEnter={() => isAccepted && setButtonText("Unfollow")}
      onMouseLeave={() => setButtonText(initialText)}
      isDisabled={isPending}
      >
      {buttonText}
    </Button>
  );
}

export default connect((state: RootState, { userId }: OwnProps) => {
  return {
    isRequested: selectPendingSubscriptionUserIds(state).includes(userId),
    isAccepted: selectAcceptedSubscriptionUserIds(state).includes(userId),
    isAuthenticated: selectIsAuthenticated(state),
    subscriptionRequest: selectAcceptedSubscriptions(state)[userId]
  }})
(SubscribeButton);
