import React from "react"
import { connect } from 'react-redux'
import PostForm from '../PostForm/PostForm';
import { PostFormActionTypes } from '../../reducers/ui';
import styles from './FloatingPostContainer.mod.scss';
import CloseXIcon from "../../common/components/SvgLib/CloseXIcon";

type Props = {
  shouldDisplay: boolean,
  dispatch: AppThunkDispatch;
}

const FloatingPostContainer: React.FC<Props> = ({ shouldDisplay, dispatch }) => {

  const dismissForm = () => 
    dispatch({ type: PostFormActionTypes.HIDE_FLOATING_POST_FORM });

  return (
    <div data-testid={'floating-post-form'} className={styles.container}
      hidden={!shouldDisplay}>
      <div className={styles.fullscreenBackground}
        onClick={dismissForm}>
      </div>
      <div className={styles.postForm}>
        <div className={styles.postFormNav}>
          <CloseXIcon onClick={dismissForm} />
        </div>
        <PostForm />
      </div>
    </div>
  );
}

export default connect((state: RootState) => ({
  shouldDisplay: state.ui.postForm.shouldDisplayPostForm
}))(FloatingPostContainer);
