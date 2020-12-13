import classNames from 'classnames';
import React  from 'react'
import { useHistory } from 'react-router-dom'
import styles from './Trending.mod.scss';
import { Trending } from '../../types/common';


interface TrendingComp extends Trending {
  className?: string;
}

const Trending: React.FC<TrendingComp> = ({ name, count, className }) => {

  let history = useHistory()

  return (
    <div className={classNames(className, styles.trending_item2)}
      onClick={() => history.push('/explore/trending/' + name)}
      >
      <div className={styles.item_category}>Trending in Australia</div>
      <div className={styles.item_title}>{name}</div>
      <div className={styles.item_mentions}>{`${count} mention${count > 1 ? 's' : ''}`}</div>
    </div>
  )
};

export default React.memo(Trending);