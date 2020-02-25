import React from 'react'
import './Inbox.scss'
import { connect } from 'react-redux'
import InboxNav from '../../components/InboxNav/InboxNav'
import InboxList from '../../components/InboxList/InboxList'
import { getFollowers, getPendingFollowRequests } from '../../actions/followers.js'
import { getAcceptedSubscriptionRequests } from '../../actions/subscription.js'

import FollowRequestList from '../../components/FollowRequestList/FollowRequestList'

class Inbox extends React.Component<any, any> {

  componentDidMount() {
    this.props.getFollowers()
    this.props.getPendingFollowRequests()
    this.props.getAcceptedSubscriptionRequests()
  }

    public render() {
      return (
        <div className={'main_container'}>
          <div className={'center_container'}>
          <h2 className={'center_container_header'}> Inbox </h2>
          <div className={'center_container_body'}>
            <InboxNav />
            <FollowRequestList/>
            <InboxList />
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
  , {getFollowers,getPendingFollowRequests, getAcceptedSubscriptionRequests })(Inbox);
