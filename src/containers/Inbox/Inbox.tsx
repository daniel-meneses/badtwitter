import React from 'react'
import './Inbox.scss'
import { connect } from 'react-redux'
import FollowRequestList from '../../components/FollowRequestList/FollowRequestList'

class Inbox extends React.Component<any, any> {

    public render() {
      return (
        <div className={'main_container'}>
          <div className={'center_container'}>
          <h2 className={'center_container_header'}> Inbox </h2>
          <div className={'center_container_body'}>
            <FollowRequestList/>
            </div>
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
