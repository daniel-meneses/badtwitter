import React, {useState} from "react"
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

  const [postText, setPostText] = useState("");

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
        <img src={user.avatar}
             alt={'Profile avatar'}/>
        <div id="input" onInput={handleInputChange}
                        data-text={"What's happenning?"}
                        data-value=""
                        contentEditable>
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
