import React from 'react'
import { connect } from 'react-redux'
import SubscriptionsList from '../SubscriptionsList/SubscriptionsList'
import EmptyListMessage from '../EmptyListMessage/EmptyListMessage'
import isEmpty from 'lodash.isempty'

type Props = {
  subscriptions: any
}

function mapStateToProps(state: any) {
  return {
    subscriptions: state.subscriptions.accepted
  }
}

const InboxSubscriptions = ({subscriptions} :Props) => {

  let followersListSection = null
  if (subscriptions.isFetching) {
    followersListSection = <EmptyListMessage message={"Fetching.."}/>
  } else if (subscriptions.error) {
    followersListSection = <EmptyListMessage message={"An error has occurred please try again."}/>
  } else if (isEmpty(subscriptions.subscriptionRequests)) {
    followersListSection = <EmptyListMessage message={"No subscriptions"}/>
  } else {
    followersListSection = <SubscriptionsList subscriptions={subscriptions}/>
  }


  return (
    <div>{followersListSection}</div>
  )
}

export default connect(mapStateToProps, {})(InboxSubscriptions)
