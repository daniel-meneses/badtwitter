import React from "react"
import { connect } from 'react-redux'
import PostForm from '../PostForm/PostForm';
import { postMessage } from '../../actions/post'
import { PostFormActionTypes } from '../../reducers/ui';
import styles from './FloatingPostContainer.mod.scss';

type Props = {
  shouldDisplay: boolean,
  postMessage: (message: string) => void,
  dismissForm: any
}

const dismissForm = () => {
  return (dispatch: any) => {
    dispatch({ type: PostFormActionTypes.HIDE_FLOATING_POST_FORM })
  }
}

const FloatingPostContainer = ({ shouldDisplay, dismissForm }: Props) => {

  return (
    <div className={styles.container}
      hidden={!shouldDisplay}>
      <div className={styles.fullscreenBackground}
        onClick={dismissForm}>
      </div>
      <div className={styles.postForm}>
        <div className={styles.postFormNav}>
          <svg onClick={dismissForm}>
            <g>
              <path d='M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z' />
            </g>
          </svg>
        </div>
        <PostForm />
      </div>
    </div>
  );
}

export default connect((state: RootState) => ({
    shouldDisplay: state.ui.postForm.shouldDisplayPostForm
  }),
  {
    postMessage,
    dismissForm
  })(FloatingPostContainer);
