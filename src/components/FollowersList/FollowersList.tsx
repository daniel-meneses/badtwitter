import React from 'react';

type Props = {
  followers: {},
  handleFollowerClick: string,
  displayFollowerItem: (follower: any) => JSX.Element
};

const FollowersList = ({followers, handleFollowerClick, displayFollowerItem} : Props) => {
  const followersList: Array<any> = Object.values(followers)
  return (
    <div>
    { followersList.length ?
      followersList.map((f :any) =>
      <div>
        {displayFollowerItem(f)}
        </div>
      )
      :
      <span>Feed Empty</span>
    }
    </div>
  );
}

export default FollowersList;
