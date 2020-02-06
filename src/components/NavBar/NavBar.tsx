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
      <h2> Logo </h2>
        <div className='navbar_item'
             onClick={() => history.push('/')}><span>[ LG ] Home</span></div>
        <div className='navbar_item'
             onClick={() => history.push('/explore')}>
             <span>[ LG ] Explore</span></div>
        <div className='navbar_item'
             onClick={() => history.push('/inbox')}>
             <span>[ LG ] Inbox</span></div>
        <div className='navbar_item'
             onClick={() => history.push('/search')}>
             <span>[ LG ] Search</span></div>
      </div>
  );
}

export default connect(mapStateToProps, {})(NavBar);
