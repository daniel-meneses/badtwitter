import * as React from 'react';
import { connect } from 'react-redux';
import { getLinkPreview } from '../../actions/post';
import Selectable from '../../common/components/Selectable/Selectable';
import ArticleIcon from '../../common/components/SvgLib/ArticleIcon';
import NewPostIcon from '../../common/components/SvgLib/NewPostIcon';
import { selectIsAuthenticated } from '../../reducers/session';
import { PostFormActionTypes } from '../../reducers/ui';
import { NewsArticle } from '../../types/common';
import showGuestToast from '../Toast/GuestToast';
import styles from './Article.mod.scss';

type Props = {
  isAuthenticated: boolean;
  dispatch: AppThunkDispatch;
}

const ArticleFull: React.FC<NewsArticle & Props> = (article) => {

  const { url, title, imageSmall, imageLarge, author, description, date, isAuthenticated, dispatch } = article;

  const showFloatingPostForm = () => {
    if (!isAuthenticated) { return showGuestToast(); }
    dispatch({ type: PostFormActionTypes.SET_POST_FORM_TEXT, text: url})
    dispatch({ type: PostFormActionTypes.DISPLAY_FLOATING_POST_FORM })
    dispatch(getLinkPreview(url))
  }

  return (
    <div data-testid={'article-container'} className={styles.articleContainer}>
      <img src={imageLarge || imageSmall} />
      <div className={styles.infoContainer}>
        <div>
          <span>{author}</span>
          <span>{" • " + date}</span>
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
        <div data-testid={'article-button-container'} className={styles.bottomButtons}>
          <a target="_blank" className={styles.abutton} href={url}>
          <Selectable
            colorStyle={'secondary'}
            className={styles.button}
            onClick={() => console.log('awd')}
            >
            <ArticleIcon className={styles.icon}/>
              <span className={'awd'}>
                Read full article
              </span>
          </Selectable>
          </a>
          <Selectable
            colorStyle={'secondary'}
            className={styles.button}
            onClick={showFloatingPostForm}
            >
            <NewPostIcon className={styles.icon}/>
              <span className={'awd'}>
                Share your thoughts
              </span>
          </Selectable>
          </div>
      </div>
    </div>
  )
}

const connectedArticle = connect((state: RootState) => {
  return {
    isAuthenticated: selectIsAuthenticated(state),
  }
})(ArticleFull);

export default React.memo(connectedArticle);