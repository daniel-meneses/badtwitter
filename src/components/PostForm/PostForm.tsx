import React, { useState } from "react";
import "./PostForm.scss";

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
    <div className="p-form">
      <form onSubmit={handleSubmit} >
          <input
            value={message}
            type="text"
            onChange={e => handleInputChange(e)}
          />
          <div className="p-form-ft">
            <input type="submit" value="Submit" />
          </div>
      </form>
    </div>
  );
}
