import React from 'react'
import {useState} from 'react'
import './AccountNav.scss'

type Props = {

}

const AccountNav = ({} : Props) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={'account_nav_container'}>
      <div className={'account_nav_item'}><div>Settings1</div></div>
      <div className={'account_nav_item'}><div>Settings2</div></div>
      <div className={'account_nav_item'}><div>Settings3</div></div>
    </div>
  )
}

export default AccountNav
