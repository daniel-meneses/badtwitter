import React from 'react';

type Props = {
  request: {id: boolean,
            user: { first_name: string,
                    last_name: string}},
  handleUpdateRequest: (e: any) => void;
};

const FollowRequest = ({request, handleUpdateRequest} : Props) => {
  const user = request.user;
  return (
      <div className='follow_request' data-key={request.id}>
        <span> {user.first_name} </span>
        <span> {user.last_name} </span>
        <button value={'accept'} onClick={handleUpdateRequest}> Accept </button>
        <button value={'decline'} onClick={handleUpdateRequest}> Decline </button>
      </div>
  );
}

export default FollowRequest;
