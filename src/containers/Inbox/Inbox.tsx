import React from 'react'
import './Inbox.scss'
import { connect } from 'react-redux'
import FollowRequestList from '../../components/FollowRequestList/FollowRequestList'

class Inbox extends React.Component<any, any> {

    public render() {
      return (
        <div className={'main_container'}>
          <div className={'center_container'}>
          <h2> Inbox </h2>
            <FollowRequestList/>
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
