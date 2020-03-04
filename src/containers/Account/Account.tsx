import React from 'react'
import './Account.scss'
import { connect } from 'react-redux'
import {logout} from '../../actions/session'
import AccountNav from '../../components/AccountNav/AccountNav'
import ProfileEditForm from '../../components/ProfileEditForm/ProfileEditForm'
import ProfileEditImage from '../../components/ProfileEditImage/ProfileEditImage'

class Account extends React.Component<any, any> {

  render() {
    let { logout } = this.props
      return (
        <div className={'main_container'}>
          <div className={'center_container'}>
            <h2 className={'center_container_header'}> Account </h2>
          <div className={'center_container_body'}>
            <div className='edit_container'>
            <div className='edit_item'>
              <ProfileEditImage />
            </div>
            <div className='edit_item'>
              <ProfileEditForm />
            </div>
            <button className={'logout_button'}onClick={() => logout()}>
              Log out
            </button>
            </div>
            </div>
          </div>
        </div>
      );
  }
}

export default connect(null, {logout})(Account);
