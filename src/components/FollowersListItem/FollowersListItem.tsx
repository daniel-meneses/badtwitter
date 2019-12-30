import React from 'react';
import './FollowersListItem.scss';

type Props = {
  follower: { user: {id: string,
                      first_name: string,
                      last_name: string
                    }
                },
  handleFollowerClick: () => void
};

const FollowersListItem = ({follower, handleFollowerClick} : Props) => {

  return (
      <div className={"follower_list_tem"}
           data-key={follower.user.id}
           onClick={handleFollowerClick}>
        <span >{follower.user.id}</span>
        <span >{follower.user.first_name}</span>
        <span >{follower.user.last_name}</span>
      </div>
  );
}

export default FollowersListItem;
