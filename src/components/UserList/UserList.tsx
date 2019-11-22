import React, { useState } from "react";

export default function UserList(props: any) {
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
      <div className='user-list'>

      </div>
  );
}
