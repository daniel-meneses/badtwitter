import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getTrendingTags } from '../../actions/explore';
import { selectTrendingTags } from '../../reducers/explore';
import styles from './Trending.mod.scss';

const Trending = (props: any) => {

  const { trending = [], dispatch } = props;

  let history = useHistory()

  let { trendingContainer, trending_title, trending_item, item_category, item_title, item_mentions} = styles

  useEffect( () => {
    dispatch(getTrendingTags())
  }, [])

  const trendingHtml: React.FC<any> = ( {name, count}: any, i: number) => (
    <div key={i} className={trending_item} onClick={() => history.push('/explore/tags/' + name)}>
          <div className={item_category}>Trending in Australia</div>
          <div className={item_title}>{name}</div>
          <div className={item_mentions}>{`${count} mention${count > 1 ? 's' : ''}`}</div>
        </div>
  )

  return (
      <div  className={trendingContainer}>
        <div >
        <div className={trending_title}>Trending</div>
          { 
            trending.map( (t: any, i: number) => {
              return trendingHtml({...t}, i)
            })
          }
        <div className={styles.trending_show_more} onClick={() => history.push('/explore/global')}>
          <div className={styles.trending_show_more}>Explore</div>
        </div>
        </div>
      </div>
  );
}

const connectedComponent = connect((state: RootState) => ({
  trending: selectTrendingTags(state)
}))(Trending)

export default React.memo(connectedComponent);