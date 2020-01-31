import React from 'react'
import './SideBar.scss'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

type Props = {}

function mapStateToProps(state :any) {
  return {};
}

const SideBar = ({}: Props) => {

  let history = useHistory()

  return (
    
      <div className='sidebar'>
        <div className='sidebar_item'
             onClick={() => history.push('/')}>Home </div>
        <div className='sidebar_item'
             onClick={() => history.push('/explore')}>Explore </div>
        <div className='sidebar_item'
             onClick={() => history.push('/inbox')}>Inbox  </div>
        <div className='sidebar_item'
             onClick={() => history.push('/search')}>Search </div>
      </div>
  );
}

export default connect(mapStateToProps, {})(SideBar);
