import React from 'react'
import {useState} from 'react'
import {connect} from 'react-redux'
import './InboxNav.scss'
import * as nav from '../../constants/inboxNav'

type Props = {
  setFocusedTab: (dispatch: any) => void,
  focusedTab: string
}

function setFocusedTab(e: any) {
  return (dispatch: any) => {
    dispatch({type: 'SET_INBOX_TAB_FOCUS', tab: e.currentTarget.id})
  }
}

const InboxNav = ({setFocusedTab, focusedTab} : Props) => {

  return (
    <div className={'inbox_nav_container'}>
      <div className={focusedTab === nav.INBOX_MESSAGES ? 'inbox_nav_item focused' : 'inbox_nav_item'} id={nav.INBOX_MESSAGES} onClick={setFocusedTab}><div>Messages</div></div>
      <div className={focusedTab === nav.INBOX_FOLLOWERS ? 'inbox_nav_item focused' : 'inbox_nav_item'} id={nav.INBOX_FOLLOWERS} onClick={setFocusedTab}><div>Followers</div></div>
      <div className={focusedTab === nav.INBOX_SUBSCRIPTIONS ? 'inbox_nav_item focused' : 'inbox_nav_item'} id={nav.INBOX_SUBSCRIPTIONS} onClick={setFocusedTab}><div>Subscriptions</div></div>
    </div>
  )
}

export default connect(null, {setFocusedTab})(InboxNav)
