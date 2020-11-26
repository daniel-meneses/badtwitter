import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getTrendingTags } from '../../actions/explore';
import { selectTrending, Trending } from '../../reducers/explore';
import styles from './Trending.mod.scss';

const mapState = (state: RootState) => ({
  trending: selectTrending(state)
})

const Trending = (props: any) => {

  const { trending, dispatch } = props;

  let history = useHistory()

  let { trendingContainer, trending_title, trending_item, item_category, item_title, item_mentions} = styles

  useEffect( () => {
    dispatch(getTrendingTags())
  }, [])

  const trendingHtml: React.FC<Trending> = ( {title, count}: Trending, i: number) => (
    <div key={i} className={trending_item} onClick={() => history.push('/explore/tags/' + title)}>
          <div className={item_category}>Trending in Australia</div>
          <div className={item_title}>{title}</div>
          <div className={item_mentions}>{`${count} mention${count > 1 ? 's' : ''}`}</div>
        </div>
  )

  return (
      <div  className={trendingContainer}>
        <div >
        <div className={trending_title}>Trending</div>
          {
            trending.map( (t: Trending, i: number) => {
              return trendingHtml({...t}, i)
            })
          }
        <div className={styles.trending_show_more} onClick={() => history.push('/explore')}>
          <div className={styles.trending_show_more}>Explore</div>
        </div>
        </div>
      </div>
  );
}

export default connect(mapState)(Trending)
