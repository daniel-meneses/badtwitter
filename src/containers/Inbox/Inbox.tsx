import React, { useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { getFollowers, getPendingFollowRequests } from '../../actions/followers.js'
import { getAcceptedSubscriptionRequests } from '../../actions/subscription.js'
import MainContainer from '../MainContainer/MainContainer'
import Header from '../../components/Header/Header';
import TabNavigation from '../../components/TabNavigation/TabNavigation'
import LoadingWrapper from '../../components/LoadingWrapper/LoadingWrapper'
import UserPreview from '../../components/UserPreview/UserPreview'
import Header from '../../components/Header/Header';

type Props = {
  getFollowers: () => void,
  getPendingFollowRequests: () => void,
  getAcceptedSubscriptionRequests: () => void,
  followRequests: any,
  followers: any,
  subscriptions: any
}

function mapStateToProps(state: any) {
  return {
    followers: state.followers.accepted,
    followRequests: state.followers.pending,
    subscriptions: state.subscriptions.accepted
  }
}


const Inbox = ({getFollowers,
                getPendingFollowRequests,
                getAcceptedSubscriptionRequests,
                followRequests,
                followers,
                subscriptions,
                } : Props) => {

  const history = useHistory()
  const { tab } = useParams()
  const isMessages = tab === 'messages'
  const isFollowers = tab === 'followers'
  const isSubscriptions = tab === 'subscriptions'

  useEffect(() => {
    getFollowers()
    getPendingFollowRequests()
    getAcceptedSubscriptionRequests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

  const inboxViews = [
    {
      title: 'Messages',
      onClick: () => history.push('/inbox/messages'),
      isFocused: isMessages,
      data: followRequests.followRequests
    },
    {
      title: 'Followers',
      onClick: () => history.push('/inbox/followers'),
      isFocused: isFollowers,
      data: followers.followRequests
    },
    {
      title: 'Subscriptions',
      onClick: () => history.push('/inbox/subscriptions'),
      isFocused: isSubscriptions,
      data: subscriptions.subscriptionRequests
    }
  ]

  const view = inboxViews.find(view => view.isFocused)

   return(
     <MainContainer
       mainCenter={
         <>
          <Header
            title={'Inbox'}
            onTitleClick={() => history.push('/inbox/messages')}
            />
         <TabNavigation tabs={inboxViews} />
         { view.data &&
           Object.values(view.data).map((req: any, i: number) =>
             <UserPreview
               key={req.id}
               userId={req.user_id || req.subject_id}
               isFollowRequest={view.title === 'Messages'}
               />
         }
         </>
       }
     />

   )

}

export default connect(mapStateToProps,
                        {getFollowers,
                         getPendingFollowRequests,
                         getAcceptedSubscriptionRequests})(Inbox)
