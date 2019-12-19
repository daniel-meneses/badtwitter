import React from 'react';

type Props = {
  request: {id: boolean,
            user: { first_name: string,
                    last_name: string}},
  handleFollowRequest: any;
};

const FollowRequest = ({request, handleFollowRequest} : Props) => {
  return (
      <div className='follow_request' data-key={request.id}>
        <span> {request.user.first_name} </span>
        <span> {request.user.last_name} </span>
        <button value={'accept'} onClick={handleFollowRequest}> Accept </button>
        <button value={'decline'} onClick={handleFollowRequest}> Decline </button>
      </div>
  );
}

export default FollowRequest;
