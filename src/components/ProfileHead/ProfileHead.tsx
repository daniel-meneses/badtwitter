import React from 'react'
import SubscribeButton from '../SubscribeButton/SubscribeButton'

type Props = {
  user: { user_id: number,
          alias: string,
          avatar: string,
          first_name: string,
          last_name: string,
    }
}

const ProfileHead = ({user} : Props) => {

  return (
    <div className={'profile'}>
      <img className='profile_avatar' src={user.avatar}/>
      <span className='profile_alias'> {user.alias} </span>
      <div className='profile_subscribe'>
        <SubscribeButton userId={user.user_id} />
      </div>
        <div className='profile_full_name'> {user.first_name + " " + user.last_name} </div>
        <div className='profile_bio'>This is my biography text. It will spread across the page and be limited to 240 characters.</div>
    </div>
  );
}

export default ProfileHead;
