import React, {useState} from "react"
import './ProfileHead.scss'
import SubscribeButton from '../SubscribeButton/SubscribeButton'
import FloatingImage from '../FloatingImageContainer/FloatingImage';


type Props = {
  user: { user_id: number,
          alias: string,
          avatar: string,
          first_name: string,
          last_name: string,
          bio: string
    }
}

const ProfileHead = ({user} : Props) => {
  const [displayFloatingImage, setDisplayFloatingImage] = useState(false)

  return (
    <div className={'profile'}>
    <FloatingImage isDisplayed={displayFloatingImage}
                   image={user.avatar}
                   dismiss={() => setDisplayFloatingImage(false)}/>
      <img className='profile_avatar'
            src={user.avatar}
            onClick={() => setDisplayFloatingImage(true)}
            alt={'Profile Avatar'}/>
      <span className='profile_alias'> {user.alias} </span>
      <div className='profile_subscribe'>
        <SubscribeButton userId={user.user_id} />
      </div>
      <div className='profile_bio_container'>
        <div className='profile_full_name'> {user.first_name + " " + user.last_name} </div>
        <div className='profile_bio'>{user.bio}</div>
      </div>
    </div>
  );
}

export default ProfileHead;
