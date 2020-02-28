import React from 'react';
import InboxListItem from '../../components/InboxListItem/InboxListItem'

type Props = {
  followers : {
      followRequests: {}
    }
}

const FollowersList = ({followers} : Props) => {
  return (
    <div>
      {
       Object.values(followers.followRequests).map( (follower: any) =>
       <InboxListItem key={follower.id}
                      user_id={follower.user_id}
                      isFollowRequest={false}
                      />
     )}
    </div>
  )
}

export default FollowersList;
