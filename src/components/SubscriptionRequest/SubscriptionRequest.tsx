import React, { useState } from "react";

export default function SubscriptionRequest(props: any) {

  const doThing = (e :any) => {
    let a = e.currentTarget.parentNode.getAttribute("data-key");
  }

  console.log(props.subscription.id)

  return (
      <div className='post-component' data-key={props.subscription.id}>
        <span>{props.subscription.first_name + props.subscription.last_name}</span>
        <button id={'accept'} onClick={props.handleFollowRequest}> Accept </button>
        <button id={'decline'} onClick={props.handleFollowRequest}> Decline </button>
      </div>
  );
}
