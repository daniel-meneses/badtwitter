import React from 'react'
import FollowersList from '../FollowersList/FollowersList'
import EmptyListMessage from '../EmptyListMessage/EmptyListMessage'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'

type Props = {
  followers: any
}

function mapStateToProps(state: any)  {
  return {
    followers: state.followers.accepted
  }
}

const InboxFollowers = ({followers={}} :Props) => {

  let followersListSection = null
  if (followers.isFetching) {
    followersListSection = <EmptyListMessage message={"Fetching..."}/>
  } else if (followers.error) {
    followersListSection = <EmptyListMessage message={"An error has occurred please try again."}/>
  } else if (isEmpty(followers.followRequests)) {
    followersListSection = <EmptyListMessage message={"No followers"}/>
  } else {
    followersListSection = <FollowersList followers={followers} />
  }

  return (
    <div>{followersListSection}</div>
  )
}

export default connect(mapStateToProps, {})(InboxFollowers)
