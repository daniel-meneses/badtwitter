import React from 'react'
import './InboxMessages.scss'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import EmptyListMessage from '../EmptyListMessage/EmptyListMessage'
import FollowRequestList from '../FollowRequestList/FollowRequestList'

type Props = {
  followRequests: any
}

function mapStateToProps(state: any) {
  return {
    followRequests: state.followers.pending
  }
}

const InboxMessage = ({followRequests} : Props) => {

  var followRequestList = null
  if (followRequests.isFetching) {
    followRequestList = <EmptyListMessage message={"Fetching.."}/>
  } else if (followRequests.error) {
    followRequestList = <EmptyListMessage message={"An error occurred please try again"}/>
  } else if (isEmpty(followRequests.followRequests)) {
    followRequestList = <EmptyListMessage message={"No follower requests"}/>
  } else {
    followRequestList = <FollowRequestList followRequests={followRequests.followRequests}/>
  }

  return (
    <div>
      <div className={"list_divider"}> Follow Requests </div>
      <div>{followRequestList}</div>
      <div className={"list_divider"}> Inbox </div>
      <EmptyListMessage message={"No messages"}/>
    </div>
  )
}

export default connect(mapStateToProps, {})(InboxMessage);
