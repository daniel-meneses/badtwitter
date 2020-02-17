import React from 'react'
import './Inbox.scss'
import { connect } from 'react-redux'
import FollowRequestList from '../../components/FollowRequestList/FollowRequestList'
import ProfileEditForm from '../../components/ProfileEditForm/ProfileEditForm'
import ProfileEditImage from '../../components/ProfileEditImage/ProfileEditImage'

class Inbox extends React.Component<any, any> {

    public render() {
      return (
        <div className={'main_container'}>
          <div className={'center_container'}>
          <h2> Inbox </h2>
            <FollowRequestList/>
            <ProfileEditImage />
            <ProfileEditForm />
          </div>
          <div className={'right_container'}>
          </div>
        </div>
      );
    }
}

export default connect(
    null
  , {})(Inbox);
