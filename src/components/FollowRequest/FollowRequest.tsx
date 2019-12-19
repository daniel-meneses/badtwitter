import React from 'react';

const FollowRequest = (props: any) => {
  return (
      <div className='follow_request' data-key={props.request.id}>
        <span> {props.request.user.first_name} </span>
        <span> {props.request.user.last_name} </span>
        <button value={'accept'} onClick={props.handleFollowRequest}> Accept </button>
        <button value={'decline'} onClick={props.handleFollowRequest}> Decline </button>
      </div>
  );
}

export default FollowRequest;
