import React, { useState } from "react";
import "./PostForm.scss";

type Props = {
  handleFormSubmit: (e: any) => void
}

const PostForm = ({handleFormSubmit}: Props) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleFormSubmit(message);
  }

  return (
    <div className="p-form">
      <form onSubmit={handleSubmit} >
          <input
            value={message}
            type="text"
            onChange={e => setMessage(e.target.value)}
          />
          <div className="p-form-ft">
            <input type="submit" value="Submit" />
          </div>
      </form>
    </div>
  );
}

export default PostForm;
