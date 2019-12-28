import React from 'react';
import FollowersListItem from '../FollowersListItem/FollowersListItem';

type Props = {
  followers: {},
  handleFollowerClick: any
};

const FollowersList = ({followers, handleFollowerClick} : Props) => {
  return (
    <div>
      { Object.values(followers).map((follower :any) =>
        <FollowersListItem follower={follower}
                           handleFollowerClick={handleFollowerClick}
        />)
       }
    </div>
  );
}

export default FollowersList;
