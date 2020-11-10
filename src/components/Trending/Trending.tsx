import React from 'react'
import './Trending.scss'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'


const Trending = (props: any) => {

  let history = useHistory()

  return (
      <div  className='trending'>
        <div className='trending_padding'>
        <div className='trending_title'>Trending</div>
        <div className='trending_item'>
          <div className='item_category'>Trending in United States</div>
          <div className='item_title'>Banana boat</div>
          <div className='item_mentions'>161,502 mentions</div>
        </div>
        <div className='trending_item'>
          <div className='item_category'>Trending in United States</div>
          <div className='item_title'>Bernie</div>
          <div className='item_mentions'>42,392 mentions</div>
        </div>
        <div className='trending_item'>
          <div className='item_category'>Trending in Australia</div>
          <div className='item_title'>Marathon</div>
          <div className='item_mentions'>4,844 mentions</div>
        </div>
        <div className='trending_item'>
          <div className='item_category'>Trending in Australia</div>
          <div className='item_title'>Gold Coast</div>
          <div className='item_mentions'>1,237 mentions</div>
        </div>
        <div className='trending_show_more' onClick={() => history.push('/explore')}>
          <div className='show_more'>Show More</div>
        </div>
        </div>
      </div>
  );
}

export default connect(null, {})(Trending)
