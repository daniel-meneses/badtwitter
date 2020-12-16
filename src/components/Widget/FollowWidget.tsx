import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { selectUsers } from "../../reducers/globalObjects";
import { selectCurrenUserId } from "../../reducers/session";
import { selectAcceptedSubscriptionUserIds } from "../../reducers/subscriptions";
import SubscribeButton from "../SubscribeButton/SubscribeButton";
import UserPreview from "../UserPreview/UserPreview";
import Widget from "./Widget";
import styles from './Widget.mod.scss';

type OwnProps = {
  limit? : number;
}

type ConnectedProps = {
  userList: any[];
}

const WhoToFollow: React.FC<OwnProps & ConnectedProps> = ({ userList=[] }) => {

  const history = useHistory();

  return (
      <Widget
          title={`Who to follow`}
          onShowMoreClick={() => history.push('/explore/global')}
      >
          {
              userList.map(u =>
                  <UserPreview
                      className={styles.itemHover}
                      key={u.id}
                      userId={u.id}
                      topButtons={<SubscribeButton userId={u.id} />}
                  />
              )
          }
      </Widget>
  )
}

const whoToFollowStoreProps = (state: RootState, { limit = 5 }: OwnProps) => {
  const users = selectUsers(state);
  const currentUserId = selectCurrenUserId(state);
  const acceptedSubscriptions = selectAcceptedSubscriptionUserIds(state);
  const userList = Object.values(users).slice(0, limit).map((u: any) => {
      const isSubscribed = acceptedSubscriptions.includes(u.id);
      const isCurrentUser = u.id === currentUserId;
      return !isSubscribed && !isCurrentUser && u
  }).filter(Boolean);
  return (
      { userList }
  )
}

export default connect(whoToFollowStoreProps)(WhoToFollow);