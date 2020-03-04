import React, {useState, useRef, useEffect} from "react"
import "./PostForm.scss"
import { connect } from 'react-redux'
import { postMessage } from '../../actions/post.js'

type Props = {
  user: { avatar: string},
  postMessage: (message: string) => void,
  didUpdate: any
}

function mapStateToProps(state :any) {
  return {
    user: state.session.currentUser,
    didUpdate: state.post.floatingPostFormIsHidden
  }
}

const PostForm = ({user, postMessage, didUpdate}: Props) => {

  const [isFocused, setIsFocused] = useState(false);
  const [postText, setPostText] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);
  var innerText = { __html: postText}

  const handleSubmit = (e: any) => {
    postMessage(postText)
    // post could fail and field would be cleared.
    setPostText("")
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
                        contentEditable>
                        </div>
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

export default connect(mapStateToProps, {postMessage})(PostForm);
