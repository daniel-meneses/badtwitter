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
import { InboxActionTypes } from '../../reducers/ui';
import SubscriptionsList from '../../components/SubscriptionsList/SubscriptionsList';

type Props = {
  getFollowers: () => void;
  getPendingFollowRequests: () => void;
  getAcceptedSubscriptionRequests: () => void;
  getPendingSubscriptionRequests: () => void;
  setFocusedTab: (tab: string) => void;
}

const setFocusedTab = (tab: string) => 
    (dispatch: any) => dispatch({ type: InboxActionTypes.SET_INBOX_TAB_FOCUS, tab: tab })

const Inbox: React.FC<Props> = (props) => {

  const {
    setFocusedTab,
    getFollowers,
    getPendingFollowRequests,
    getPendingSubscriptionRequests,
    getAcceptedSubscriptionRequests
  } = props;

  const history = useHistory()
  const { tab } = useParams()
  const isMessages = tab === 'messages'
  const isFollowers = tab === 'followers'
  const isSubscriptions = tab === 'subscriptions'

  useEffect(() => {
    getFollowers()
    getPendingFollowRequests()
    getPendingSubscriptionRequests()
    getAcceptedSubscriptionRequests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const inboxTabs = [
    {
      title: 'Messages',
      onClick: () => {
        setFocusedTab('messages')
        history.push('/inbox/messages')
      },
      isFocused: isMessages,
    },
    {
      title: 'Followers',
      onClick: () => {
        setFocusedTab('followers')
        history.push('/inbox/followers')
      },
      isFocused: isFollowers,
    },
    {
      title: 'Subscriptions',
      onClick: () => {
        setFocusedTab('subscriptions')
        history.push('/inbox/subscriptions')
      },
      isFocused: isSubscriptions,
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
          <TabNavigation tabs={inboxTabs} />
          <div className={styles.inboxList}>
            {
              isMessages && <MessageList />
            }
            {
              isFollowers && <FollowersList />
            }
            {
              isSubscriptions && <SubscriptionsList />
            }
          </div>
        </>
      }
      mainRight=
      {
        <div>
          <Trending postId={1} />
        </div>
      }
    />

  )

}

export default connect((state: any) => {
  return { focusedTab: state.ui.inbox }
},
  {
    getFollowers,
    getPendingFollowRequests,
    getAcceptedSubscriptionRequests,
    getPendingSubscriptionRequests,
    setFocusedTab,
  })(Inbox)
