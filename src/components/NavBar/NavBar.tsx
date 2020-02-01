import React from 'react'
import './NavBar.scss'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

type Props = {
  title: string
}

function mapStateToProps(state :any) {
  return {};
}

const NavBar = ({title}: Props) => {

  let history = useHistory()

  return (
      <div className='navbar'>
        <div className='navbar_item'
             onClick={() => history.push('/')}>Home </div>
        <div className='navbar_item'
             onClick={() => history.push('/explore')}>Explore </div>
        <div className='navbar_item'
             onClick={() => history.push('/inbox')}>Inbox  </div>
        <div className='navbar_item'
             onClick={() => history.push('/search')}>Search </div>
      </div>
  );
}

export default connect(mapStateToProps, {})(NavBar);
