import React, {useState} from "react"
import "./PostForm.scss"
import { connect } from 'react-redux'

type Props = {
  handleFormSubmit: (e: any) => void,
  user: any
}

function mapStateToProps(state :any) {
  return {
    user: state.session.currentUser
  }
}

const PostForm = ({handleFormSubmit, user}: Props) => {

  const [isFocused, setIsFocused] = useState(false);
  const [postText, setPostText] = useState("");

  const handleSubmit = (e: any) => {
    handleFormSubmit(postText);
    let el = document.getElementById("input")!;
    el.innerHTML=""
  }

  const handleInputChange = (e: any) => {
    const input = e.target as HTMLElement;
    const inputText = input.textContent as string;
    setPostText(inputText)
  }

  return (
    <div className="p-form">
      <div className="post_form_main">
        <img src={user.avatar}/>
        <div id="input" onFocus={e => setIsFocused(true)}
                        onBlur={e => setIsFocused(false)}
                        onInput={handleInputChange}
                        data-text={"What's happenning?"}
                        data-value=""
                        contentEditable></div>
      </div>
      <div className="post_form_footer">
        <input type="submit"
                className={postText.length > 0 ? 'submit_post highlighted' : 'submit_post'}
                onClick={handleSubmit}
                value="Submit" />
      </div>
    </div>
  );
}

export default connect(mapStateToProps, {})(PostForm);
