import * as React from 'react';
import { useHistory } from 'react-router';
import styles from './ArticlePreview.mod.scss';

type Article = {
  id: string;
  title: string;
  imageLarge: string;
  imageSmall: string;
  author: string;
  date: string;
  tag: string;
}

const ArticleHeader: React.FC<Article> = (article) => {

  const history = useHistory();
  const { id, title, imageSmall, imageLarge, author, date, tag } = article;

  return (
    <div data-testid={'article-top-post'} onClick={() => history.push('/article/' + id)} className={styles.articleHeader}>
      <img src={imageLarge || imageSmall} />
      <div className={styles.whiteTextBackground}></div>
      <div className={styles.infoContainer}>
        <div>
          <span>{author}</span>
          <span>{tag + " • " + date}</span>
        </div>
        <h1>{title}</h1>
      </div>
    </div>
  )
}
export default React.memo(ArticleHeader);