import React, { useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { getFollowers, getPendingFollowRequests } from '../../actions/followers'
import { getPendingSubscriptionRequests, getAcceptedSubscriptionRequests } from '../../actions/subscriptions'
import MainContainer from '../MainContainer/MainContainer'
import TabNavigation from '../../components/TabNavigation/TabNavigation'
import Header from '../../components/Header/Header';
import styles from './Inbox.mod.scss'
import MessageList from '../../components/MessagesList/MessagesList';
import FollowersList from '../../components/FollowersList/FollowersList';
import Trending from '../../components/Trending/Trending';
import { setFocusedInboxTab } from '../../reducers/ui';
import SubscriptionsList from '../../components/SubscriptionsList/SubscriptionsList';
import TrendingWidget from '../../components/Widget/TrendingWidget';

type Props = {
  dispatch: AppThunkDispatch;
}

const Inbox: React.FC<Props> = (props) => {

  const { dispatch } = props;

  const history = useHistory()
  const { tab } = useParams<{tab: string}>()
  const isMessages = tab === 'messages'
  const isFollowers = tab === 'followers'
  const isSubscriptions = tab === 'subscriptions'

  useEffect(() => {
    dispatch(getFollowers())
    dispatch(getPendingFollowRequests())
    dispatch(getPendingSubscriptionRequests())
    dispatch(getAcceptedSubscriptionRequests())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const inboxTabs = [
    {
      title: 'Messages',
      onClick: () => {
        dispatch(setFocusedInboxTab('messages'))
        history.push('/inbox/messages')
      },
      isFocused: isMessages,
      children: <MessageList />,
    },
    {
      title: 'Followers',
      onClick: () => {
        dispatch(setFocusedInboxTab('followers'))
        history.push('/inbox/followers')
      },
      isFocused: isFollowers,
      children: <FollowersList />,
    },
    {
      title: 'Subscriptions',
      onClick: () => {
        dispatch(setFocusedInboxTab('subscriptions'))
        history.push('/inbox/subscriptions')
      },
      isFocused: isSubscriptions,
      children: <SubscriptionsList />,
    }
  ]

  return (
    <MainContainer
      mainCenter={
        <>
          <Header
            title={'Inbox'}
            onTitleClick={() => history.push('/inbox/messages')}
          />
          <TabNavigation 
            tabs={inboxTabs} 
            className={styles.topTabs}
            />
        </>
      }
      mainRight=
      {
        <TrendingWidget />
      }
    />

  )

}

export default connect((state: any) => 
({ focusedTab: state.ui.inbox }))(Inbox)
