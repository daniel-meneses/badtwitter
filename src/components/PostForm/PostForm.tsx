import React, {useState, useRef} from "react"
import { connect } from 'react-redux'
import { postMessage } from '../../actions/post.js'
import styles from './PostForm.mod.scss'
import Avatar from '../Avatar/Avatar'
import Button from '../../common/components/Button/Button'

type Props = {
  avatar: string,
  createPostStatus: boolean,
  postMessage: (e: any) => void
}

function mapStateToProps(state :any) {
  let { session, post } = state
  return {
    avatar: session.currentUser.avatar,
    createPostStatus: post.newPostSuccess
  }
}

const PostForm = (props: Props) => {

  const { avatar, postMessage, createPostStatus } = props

  const [postText, setPostText] = useState("");
  const inputEl = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    postMessage(postText)
    setPostText("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLElement;
    const inputText = input.textContent as string;
    setPostText(inputText)
  }

  return (
    <div className={styles.postForm}>
      <div className={styles.postFormContent}>
        <Avatar
          image={avatar}
          className={styles.postFormAvatar}
          />
        <div className={styles.postFormInput}
              onInput={handleInputChange}
              data-text={"What's happenning?"}
              data-value=""
              contentEditable
              ref={inputEl}
              >
        </div>
      </div>
      <div className={styles.postFormFooter}>
        <Button
          styling={'primary'}
          onClick={handleSubmit}
          className={styles.postFormSubmit}
    //      disabled={postText.length === 0}
          >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, {postMessage})(PostForm);
