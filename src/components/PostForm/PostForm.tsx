import React, { useState, useRef, useEffect } from "react"
import { connect } from 'react-redux'
import { getLinkPreview, postMessage } from '../../actions/post'
import styles from './PostForm.mod.scss'
import Avatar from '../Avatar/Avatar'
import Button, { BtnThemes } from '../../common/components/Button/Button'
import showGuestToast from "../Toast/GuestToast"
import { PostFormActionTypes, selectLinkPreview, selectPersistedFormText } from '../../reducers/ui';
import { selectIsAuthenticated } from "../../reducers/session"
import { selectCurrentUser } from "../../reducers/globalObjects"
import LinkPreview, { PreviewStyleTypes } from "../LinkPreview/LinkPreview"
import { LinkPreview as PreviewType } from '../../types/common'

type Props = {
  avatar: string,
  isAuthenticated: boolean,
  persistedFormText: string,
  linkPreview: null | PreviewType;
  dispatch: AppThunkDispatch,
}

function mapStateToProps(state: RootState) {
  return {
    avatar: (selectCurrentUser(state) || {}).avatar,
    isAuthenticated: selectIsAuthenticated(state),
    persistedFormText: selectPersistedFormText(state),
    linkPreview: selectLinkPreview(state),
  }
}

const PostForm: React.FC<Props> = (props) => {

  const { avatar, isAuthenticated, persistedFormText='', linkPreview, dispatch } = props

  const [ postText, setPostText ] = useState(persistedFormText);
  const inputEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputEl.current!.innerText = persistedFormText
  }, [])

  useEffect(() => {
    dispatch({ type: PostFormActionTypes.SET_POST_FORM_TEXT, text: postText })
  }, [postText])

  const handleSubmit = () => {
    if (!isAuthenticated) { 
      return showGuestToast('Log in or sign up to post your message') 
    };
    dispatch(postMessage({ link_preview: linkPreview, message: postText }));
    resetFromState();
  }

  const resetFromState = () => {
    setPostText("")
    inputEl.current!.innerText = ""
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLElement;
    const inputText = input.innerText as string;
    setPostText(inputText)
  }

  const handleOnPaste = (e: React.ClipboardEvent) => {
    let pastedText = e.clipboardData!.getData('Text');
    let isLink = pastedText && pastedText.startsWith('http');
    return isLink && dispatch(getLinkPreview(pastedText))
  }

  const dismissLinkPreview = () => {
    return dispatch({type: PostFormActionTypes.CLEAR_LINK_PREVIEW })
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
          onPaste={handleOnPaste}
          ref={inputEl}
        >
        </div>
      </div>
      <div>
        {
          linkPreview &&
          <LinkPreview 
            type={PreviewStyleTypes.inForm} 
            linkPreview={linkPreview} 
            className={styles.linkPreview}
            onDismissClick={dismissLinkPreview}
            />
        }
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

const connectedComponent = connect(mapStateToProps)(PostForm);

export default React.memo(connectedComponent)