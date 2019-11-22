import React, { useState } from "react";

export default function PostForm(props: any) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.submitMessage(message);
  }

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className='signup-form'>
      <span>Say Something</span>
        <input
          value={message}
          type="text"
          onChange={e => handleInputChange(e)}
        />
      <input type="submit" value="Submit" />
    </form>
  );
}
