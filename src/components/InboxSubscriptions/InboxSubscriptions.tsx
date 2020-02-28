import React from 'react'
import { connect } from 'react-redux'
import FollowersList from '../FollowersList/FollowersList'
import EmptyListMessage from '../EmptyListMessage/EmptyListMessage'
import isEmpty from 'lodash/isEmpty'

type Props = {
  followers: any
}

function mapStateToProps(state: any) {
  return {
    followers: state.followers.accepted
  }
}

const InboxSubscriptions = ({followers} :Props) => {

  let followersListSection = null
  if (followers.isFetching) {
    followersListSection = <div>Fetching</div>
  } else if (followers.error) {
    followersListSection = <EmptyListMessage message={"An error has occurred please try again."}/>
  } else if (isEmpty(followers.followRequests)) {
    followersListSection = <EmptyListMessage message={"You loner"}/>
  } else {
    followersListSection = <FollowersList followers={followers}/>
  }


  return (
    <div>AccountSubscriptions</div>
  )
}

export default connect(mapStateToProps, {})(InboxSubscriptions)
