import React, { useState } from "react";

export default function PostComponent(props: any) {
  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [isFocused, setIsFocused] = useState({"email": false, "password": false});
  const [loginObject, setLoginObject] = useState({"email": "", "password": ""});


  const setFocus = (input: any, focus: any) => {
    setIsFocused({...isFocused,
                  [input]: focus
                });
  }

  return (
      <div className='post-component'>
        <span>{props.post.user_name}</span>
        <span>{props.post.message}</span>
      </div>
  );
}
