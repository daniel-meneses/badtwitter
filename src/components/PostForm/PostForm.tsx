import React from "react"
import "./PostForm.scss"

type Props = {
  handleFormSubmit: (e: any) => void
}

const PostForm = ({handleFormSubmit}: Props) => {

  const handleSubmit = (e: any) => {
    let el = document.getElementById("input")!;
    handleFormSubmit(el.innerText);
  }

  return (
    <div className="p-form">
        <div id="input" contentEditable data-text="Say something"></div>
      <input type="submit" onClick={handleSubmit} value="Submit" />
    </div>
  );
}

export default PostForm;
