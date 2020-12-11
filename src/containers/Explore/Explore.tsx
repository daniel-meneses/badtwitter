import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import MainContainer from '../MainContainer/MainContainer'
import Header from '../../components/Header/Header';
import About from '../../components/About/About';
import { getExploreContentWithTag } from '../../actions/explore';
import ErrorMessage from '../../common/components/ErrorMessage/ErrorMessage';
import LoadingWrapper from '../../components/LoadingWrapper/LoadingWrapper';
import UserPost from '../../components/PostMini/UserPost';
import styles from '../Home/Home.mod.scss';
import { useHistory } from 'react-router';
import Trending from '../../components/Trending/Trending';
import { selectIsAuthenticated } from '../../reducers/session';
import { selectGlobalFeed, selectTagFeedByName } from '../../reducers/feeds';
import { FetchRequest } from '../../types/common';
import { getGlobalFeed } from '../../actions/feed';
import { useScrollCallback } from '../../utils/hooks/useScrollHooks';
import FeedList from '../../components/FeedList/FeedList';

type OwnProps = {
  match: any;
}

type ConnectedProps = {
  isAuthenticated: boolean;
  timeline: number[];
  nextCursor: string;
  tagId: string | null;
  fetchState: FetchRequest;
  dispatch: AppThunkDispatch;
}

function mapProps(state: RootState, ownProps: OwnProps) {
  const subject = ownProps.match.params.subject
  const isGlobal = subject === 'global'
  const isAuthenticated = selectIsAuthenticated(state);
  if (isGlobal) {
    let { timeline, nextCursor } = selectGlobalFeed(state);
    let fetchState = state.feeds.getGlobalFeedRequest;
    return {
      tagId: null,
      timeline,
      nextCursor,
      isAuthenticated,
      fetchState
    }
  } else {
    let tagId = ownProps.match.params.tagId
    let { timeline, nextCursor } = selectTagFeedByName(state, tagId) || {}
    let fetchState = state.feeds.getTagFeedRequest;
    return {
      tagId,
      timeline,
      nextCursor,
      isAuthenticated,
      fetchState
    }
  }
}

const Explore: React.FC<ConnectedProps & OwnProps> = (props) => {

  const { isAuthenticated, timeline = [], nextCursor = '', fetchState, tagId, dispatch } = props;

  const history = useHistory();

  useLayoutEffect(() => {
    tagId
      ? dispatch(getExploreContentWithTag(tagId))
      : dispatch(getGlobalFeed())
  }, [tagId])

  const fetcNextContentPage = (scrollPercent: number) => {
    let shouldFetch = scrollPercent > 60
    if (shouldFetch && nextCursor && !fetchState.isFetching) {
      dispatch(getGlobalFeed(nextCursor))
    }
  }

  useScrollCallback(fetcNextContentPage);

  return (
    <MainContainer
      mainCenter=
      {
        <>
          <Header
            title={'Explore'}
            onBackClick={() => history.push('/explore/global')}
            displayBackButton={tagId ? true : false}
          />
          {
            <FeedList {...props} />
          }
        </>
      }
      mainRight={
        <>
          {
            !isAuthenticated &&
            <Header
              title={'Login/Register'}
              isRightHeader={true}
              onTitleClick={() => history.push('/signup')}
            />
          }
          <div>
            <Trending />
          </div>
        </>
      }
    />
  )
}

const connectedComponent = connect(mapProps)(Explore);

export default React.memo(connectedComponent);
