import React from 'react'
import { connect } from 'react-redux'
import './Account.scss'
import { authenticate , unauthenticate} from '../../actions/session'
import ProfileEditForm from '../../components/ProfileEditForm/ProfileEditForm'
import ProfileEditImage from '../../components/ProfileEditImage/ProfileEditImage'

class Account extends React.Component<any, any> {

  componentDidMount() {
  }

  render() {
      return (
        <div className={'main_container'}>
          <div className={'center_container'}>
          <h2> Account </h2>
          <div className='edit_container'>
          <div className='edit_item'>
          <ProfileEditImage />
            </div>
          <div className='edit_item'>
            <ProfileEditForm />
            </div>
            </div>
          </div>
          <div className={'right_container'}>
          </div>
        </div>
      );
  }
}

export default connect(null, {} )(Account);
