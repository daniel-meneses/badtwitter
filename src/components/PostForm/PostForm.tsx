import React, {useState, useRef} from "react"
import "./PostForm.scss"
import { connect } from 'react-redux'
import { postMessage } from '../../actions/post.js'

type Props = {
  user: { avatar: string},
  postMessage: (message: string) => void,
  didUpdate: any,
  shouldClearForm: boolean
}

function mapStateToProps(state :any) {
  return {
    user: state.session.currentUser,
    didUpdate: state.post.floatingPostFormIsHidden,
    shouldClearForm: state.post.shouldClearForm
  }
}

function resetClearForm() {
  return (dispatch: any) => dispatch({ type: "RESET_CLEAR_FORM"})
}

const PostForm = ({user, postMessage, didUpdate, shouldClearForm}: Props) => {

  const [postText, setPostText] = useState("");
  const inputEl = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: any) => {
    postMessage(postText)
    setPostText("")
  }

  if (shouldClearForm === true) {
    if (inputEl.current !== null) {
      inputEl.current.innerText = ""

    }
  }

  const handleInputChange = (e: any) => {
    const input = e.target as HTMLElement;
    const inputText = input.textContent as string;
    setPostText(inputText)
  }

  return (
    <div className="p-form">
      <div className="post_form_main">
        <img src={user.avatar}
             alt={'Profile avatar'}/>
        <div id="input" onInput={handleInputChange}
                        data-text={"What's happenning?"}
                        data-value=""
                        contentEditable
                        ref={inputEl}
                        >
                        </div>
                      </div>
        <div className="post_form_footer">
          <button className={postText.length > 0 ? 'submit_post highlighted' : 'submit_post'}
                  onClick={handleSubmit}
                  >
                  Submit
                  </button>
                  </div>
    </div>
  );
}

export default connect(mapStateToProps, {postMessage})(PostForm);
