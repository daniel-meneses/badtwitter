import React, {useState, useRef, useEffect} from "react"
import { connect } from 'react-redux'
import { postMessage } from '../../actions/post'
import styles from './PostForm.mod.scss'
import Avatar from '../Avatar/Avatar'
import Button, { BtnThemes } from '../../common/components/Button/Button'
import { getCurrentUser } from '../../selectors/users';
import showGuestToast from "../Toast/GuestToast"
import { PostFormActionTypes } from '../../reducers/ui';

type Props = {
  avatar: string,
  createPostStatus: boolean,
  postMessage: (e: any) => void,
  isAuthenticated: boolean,
  postFormText: string,
  persistPostForm: (text: string) => void;
}

function mapStateToProps(state :any) {
  let { post } = state;
  let user = getCurrentUser(state);  
  return {
    avatar: ( user || {}).avatar,
    createPostStatus: post.newPostSuccess,
    isAuthenticated: state.session.session.isAuthenticated,
    postFormText: state.ui.postForm.postFormText
  }
}

const persistPostForm = (text: string) => 
    (dispatch: any) => dispatch({ type: PostFormActionTypes.SET_POST_FORM_TEXT, text: text })

const PostForm = (props: Props) => {

  const { avatar, postMessage, isAuthenticated, postFormText, persistPostForm } = props

  const persistedText = postFormText || ''
  const [postText, setPostText] = useState(persistedText);
  const inputEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputEl.current?.innerText = persistedText
  }, [])
  
  useEffect(() => {
    persistPostForm(postText)
  }, [postText])

  const handleSubmit = () => {
    if (!isAuthenticated) { return showGuestToast('Log in or sign up to post your message') }
    postMessage(postText)
    setPostText("")
    inputEl.current?.innerText = ""
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
          onClick={handleSubmit}
          isDisabled={postText.length === 0}
          className={styles.postFormSubmit}
          theme={BtnThemes.PrimaryFill}
          >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, {postMessage, persistPostForm})(PostForm);
