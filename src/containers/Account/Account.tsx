import React from 'react'
import './Account.scss'
import { connect } from 'react-redux'
import { logout } from '../../actions/session'
import ProfileEditForm from '../../components/ProfileEditForm/ProfileEditForm'
import ProfileEditImage from '../../components/ProfileEditImage/ProfileEditImage'
import { useHistory } from 'react-router-dom'

type Props = {
  logout: (history: any) => void,
  currentUser: any
}

function mapStateToProps(state: any) {
  return {
    currentUser: state.session.currentUser
  }
}

const Account = ({logout, currentUser} : Props) => {
  const history = useHistory();

  return (
    <div className={'main_container'}>
      <div className={'center_container'}>
        <h2 className={'center_container_header'}>
          Account
          </h2>
      <div className={'center_container_body'}>
        <div className='edit_container'>
          <div className='edit_item'>
            <ProfileEditImage userAvatar={currentUser.avatar}/>
          </div>
          <div className='edit_item'>
            <ProfileEditForm />
          </div>
          <button className={'logout_button'}onClick={() => logout(history)}>
            Log out
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, {logout})(Account);
