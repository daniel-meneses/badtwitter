import React from 'react'
import {useState} from 'react'
import './InboxNav.scss'

type Props = {

}

const InboxNav = ({} : Props) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={'inbox_nav_container'}>
      <div className={'inbox_nav_item'}><div>Inbox</div></div>
      <div className={'inbox_nav_item'}><div>Followers</div></div>
      <div className={'inbox_nav_item'}><div>Subscriptions</div></div>
    </div>
  )
}

export default InboxNav
