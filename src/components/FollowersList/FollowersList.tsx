import React from 'react';

type Props = {
  followers: {},
  handleFollowerClick: any,
  displayFollowerItem: (follower: any, handleFollowerClick: any) => JSX.Element
};

const FollowersList = ({followers, handleFollowerClick, displayFollowerItem} : Props) => {
  return (
    <div>
      { Object.values(followers).map((f :any) => displayFollowerItem(f, handleFollowerClick)) }
    </div>
  );
}

export default FollowersList;
