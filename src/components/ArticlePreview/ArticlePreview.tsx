import * as React from 'react';
import { useHistory } from 'react-router';
import styles from './ArticlePreview.mod.scss';

type Article = {
  id: string;
  url: string;
  title: string;
  imageLarge: string;
  imageSmall: string;
  author: string;
  date: string;
  tag: string;
}

const ArticlePreview: React.FC<Article> = (article) => {

  const history = useHistory();
  const { id, title, imageSmall, imageLarge, author, date, tag } = article;

  return (
    <div data-testid={'article-list-post'} onClick={() => history.push('/article/' + id)} className={styles.articlePreview}>
      <div className={styles.infoContainer}>
        <div>
          <span className={styles.author}>{author}</span>
          <span className={styles.date}>{" " + tag + " • " + date}</span>
        </div>
        <h1>{title}</h1>
      </div>
      <img src={imageSmall || imageLarge} />
    </div>
  )
}

export default React.memo(ArticlePreview);


