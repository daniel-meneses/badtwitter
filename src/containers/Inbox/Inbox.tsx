import React, { useEffect } from 'react'
import './Inbox.scss'
import { connect } from 'react-redux'
import InboxNav from '../../components/InboxNav/InboxNav'
import InboxMessages from '../../components/InboxMessages/InboxMessages'
import FollowRequestList from '../../components/FollowRequestList/FollowRequestList'
import InboxFollowers from '../../components/InboxFollowers/InboxFollowers'
import InboxSubscriptions from '../../components/InboxSubscriptions/InboxSubscriptions'
import { getFollowers, getPendingFollowRequests } from '../../actions/followers.js'
import { getAcceptedSubscriptionRequests } from '../../actions/subscription.js'
import * as nav from '../../constants/inboxNav'

type Props = {
  getFollowers: () => void,
  getPendingFollowRequests: () => void,
  getAcceptedSubscriptionRequests: () => void,
  focusedTab: string
}

function mapStateToProps(state: any) {
  return {
    focusedTab: state.inbox.focusedTab
  }
}

const Inbox = ({getFollowers,
                getPendingFollowRequests,
                getAcceptedSubscriptionRequests,
                focusedTab} : Props) => {

  useEffect(() => {
    getFollowers()
    getPendingFollowRequests()
    getAcceptedSubscriptionRequests()
   }, [])

   var view = null;
   if (focusedTab===nav.INBOX_MESSAGES) {
     view = <InboxMessages />
   } else if (focusedTab===nav.INBOX_FOLLOWERS) {
     view = <InboxFollowers />
   } else if (focusedTab===nav.INBOX_SUBSCRIPTIONS) {
     view = <InboxSubscriptions/ >
   }

   return(
     <div className={'main_container'}>
       <div className={'center_container'}>
       <h2 className={'center_container_header'}>
        Inbox
        </h2>
       <div className={'center_container_body'}>
         <InboxNav focusedTab={focusedTab}/>
         {view}
         </div>
       </div>
       <div className={'right_container'}>
       </div>
     </div>
   )
}

export default connect(mapStateToProps,
                        {getFollowers,
                         getPendingFollowRequests,
                         getAcceptedSubscriptionRequests})(Inbox)
