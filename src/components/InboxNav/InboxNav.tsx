import React from 'react'
import {useState} from 'react'
import {connect} from 'react-redux'
import './InboxNav.scss'

type Props = {
  setFocusedTab: any,
  focusedTab: any
}

function setFocusedTab(e: any) {
  return (dispatch: any) => {
    dispatch({type: 'SET_INBOX_TAB_FOCUS', tab: e.currentTarget.id})
  }
}

const InboxNav = ({setFocusedTab, focusedTab} : Props) => {

  return (
    <div className={'inbox_nav_container'}>
      <div className={focusedTab === 'Messages' ? 'inbox_nav_item focused' : 'inbox_nav_item'} id={"Messages"} onClick={setFocusedTab}><div>Messages</div></div>
      <div className={focusedTab === 'Followers' ? 'inbox_nav_item focused' : 'inbox_nav_item'} id={"Followers"} onClick={setFocusedTab}><div>Followers</div></div>
      <div className={focusedTab === 'Subscriptions' ? 'inbox_nav_item focused' : 'inbox_nav_item'} id={"Subscriptions"} onClick={setFocusedTab}><div>Subscriptions</div></div>
    </div>
  )
}

export default connect(null, {setFocusedTab})(InboxNav)
