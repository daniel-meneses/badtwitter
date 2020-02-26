import React from 'react'
import './Inbox.scss'
import { connect } from 'react-redux'
import InboxNav from '../../components/InboxNav/InboxNav'
import InboxMessages from '../../components/InboxMessages/InboxMessages'
import EmptyListMessage from '../../components/EmptyListMessage/EmptyListMessage'
import FollowRequestList from '../../components/FollowRequestList/FollowRequestList'
import InboxFollowers from '../../components/InboxFollowers/InboxFollowers'
import InboxSubscriptions from '../../components/InboxSubscriptions/InboxSubscriptions'
import isEmpty from 'lodash/isEmpty'
import { getFollowers, getPendingFollowRequests } from '../../actions/followers.js'
import { getAcceptedSubscriptionRequests } from '../../actions/subscription.js'


function mapStateToProps(state: any) {
  return {
    focusedTab: state.inbox.focusedTab
  }
}

class Inbox extends React.Component<any, any> {

  componentDidMount() {
    this.props.getFollowers()
    this.props.getPendingFollowRequests()
    this.props.getAcceptedSubscriptionRequests()
  }

    public render() {
      let {focusedTab} = this.props

      var view = null;
      if (focusedTab==='Messages') {
        view = <InboxMessages />
      }
      else if (focusedTab==='Followers') {
        view = <InboxFollowers />
      }
      else if (focusedTab==='Subscriptions') {
        view = <InboxSubscriptions/ >
      }

      return (
        <div className={'main_container'}>
          <div className={'center_container'}>
          <h2 className={'center_container_header'}> Inbox </h2>
          <div className={'center_container_body'}>
            <InboxNav focusedTab={focusedTab}/>
            {view}
            </div>
          </div>
          <div className={'right_container'}>
          </div>
        </div>
      );
    }
}

export default connect(
    mapStateToProps
  , {getFollowers,getPendingFollowRequests, getAcceptedSubscriptionRequests })(Inbox);
