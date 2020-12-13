import React from 'react';
import { connect } from 'react-redux';
import MainContainer from '../MainContainer/MainContainer'
import Header from '../../components/Header/Header';
import { useHistory } from 'react-router';
import { selectIsAuthenticated } from '../../reducers/session';
import { ExploreTabs, setFocusedExploreTab } from '../../reducers/ui';
import TabNavigation from '../../components/TabNavigation/TabNavigation';
import { selectTrendingTags } from '../../reducers/explore';
import FollowWidget from '../../components/Widget/FollowWidget';
import TrendingFeed from '../../components/ExploreFeeds/TrendingFeed';
import GlobalFeed from '../../components/ExploreFeeds/GlobalFeed';
import TagFeed from '../../components/ExploreFeeds/TagFeed';

type OwnProps = {
  match: any;
}

type ConnectedProps = {
  isAuthenticated: boolean;
  focusedTab: ExploreTabs;
  dispatch: AppThunkDispatch;
}

const Explore: React.FC<ConnectedProps & OwnProps> = (props) => {

  const { isAuthenticated, dispatch } = props;
  const { tab, tagId } = props.match.params;

  const history = useHistory();

  const inboxTabs = [
    {
      title: 'Global',
      onClick: () => {        
        dispatch(setFocusedExploreTab(ExploreTabs.GLOBAL))
        history.push('/explore/global')
      },
      isFocused: tab === ExploreTabs.GLOBAL,
      children: <GlobalFeed />
    },
    {
      title: 'Trending',
      onClick: () => {
        dispatch(setFocusedExploreTab(ExploreTabs.TRENDING))
        history.push('/explore/trending')
      },
      isFocused: tab === ExploreTabs.TRENDING,
      children:  tagId ? <TagFeed {...props}/> : <TrendingFeed />
    }
  ]

  return (
    <MainContainer
      mainCenter=
      {
        <>
          <Header
            title={'Explore'}
            onBackClick={() => history.push('/explore/trending')}
            displayBackButton={tagId ? true : false}
          />
          <TabNavigation 
            tabs={inboxTabs} />
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
            <FollowWidget />
        </>
      }
    />
  )
}

function mapProps(state: RootState) {
  return {
    trending: selectTrendingTags(state),
    isAuthenticated: selectIsAuthenticated(state),
    focusedTab: state.ui.explore.focusedTab,
  }
}

const connectedComponent = connect(mapProps)(Explore);

export default React.memo(connectedComponent);
