import React from 'react';
import InboxListItem from '../../components/InboxListItem/InboxListItem'

type Props = {
  subscriptions: any
}

const SubscriptionsList = ({subscriptions} : Props) => {
  return (
    <div>
      {
       Object.values(subscriptions.subscriptionRequests).map( (subscription: any) =>
       <InboxListItem key={subscription.id}
                      user_id={subscription.subject_id}
                      isFollowRequest={false}
                      />
     )}
    </div>
  )
}

export default SubscriptionsList;
