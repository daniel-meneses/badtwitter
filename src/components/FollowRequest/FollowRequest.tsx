import React from 'react';

type Props = {
  request: {id: string,
            user: { id: string,
                    first_name: string,
                    last_name: string}},
  handleUpdateRequest: (e: any) => void,
  handleUserClick: (e: any) => void
};

const FollowRequest = ({request, handleUpdateRequest, handleUserClick} : Props) => {
  const user = request.user;
  return (
      <div className='follow_request' data-key={request.id}>
        <span data-key={user.id} onClick={handleUserClick}> {user.first_name} {user.last_name}</span>
        <button value={'accept'} onClick={handleUpdateRequest}> Accept </button>
        <button value={'decline'} onClick={handleUpdateRequest}> Decline </button>
      </div>
  );
}

export default FollowRequest;
