import React from 'react';

type Props = {
  followers: {},
  displayFollowerItem: (follower: any, handleFollowerClick: any) => JSX.Element,
  handleFollowerClick: any
};

const FollowersList = ({followers, handleFollowerClick, displayFollowerItem} : Props) => {
  const followersList: Array<any> = Object.values(followers)
  return (
    <div>
    { followersList.length ?
      followersList.map((f :any) =>
      <div>
        {displayFollowerItem(f, handleFollowerClick)}
        </div>
      )
      :
      <span>Feed Empty</span>
    }
    </div>
  );
}

export default FollowersList;
