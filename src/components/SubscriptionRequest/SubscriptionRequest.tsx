import React, { useState } from "react";

export default function SubscriptionRequest(props: any) {

  const doThing = (e :any) => {
    let a = e.currentTarget.parentNode.getAttribute("data-key");
  }

  return (
      <div className='post-component' data-key={props.subscription.id}>
        <span>{props.subscription.first_name + props.subscription.last_name}</span>
        <button value={"Accept"} onClick={props.denyRequest}> DECLINE </button>
        <button value={"Deny"} onClick={props.acceptRequest}> ACCEPT </button>
      </div>
  );
}
