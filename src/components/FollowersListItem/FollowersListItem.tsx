import React from 'react';

type Props = {
  follower: { user: {id: string,
                      first_name: string,
                      last_name: string
                    }
                }
};

const FollowersListItem = ({follower} : Props) => {

  return (
      <div>
        <span>{follower.user.id}</span>
        <span>{follower.user.first_name}</span>
        <span>{follower.user.last_name}</span>
      </div>
  );
}

export default FollowersListItem;
