import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MainContainer from '../MainContainer/MainContainer'
import Header from '../../components/Header/Header';
import About from '../../components/About/About';
import { getExploreContentWithTag } from '../../actions/explore';
import { selectExploreByTag, selectFetchExploreByTagReq } from '../../reducers/explore';
import ErrorMessage from '../../common/components/ErrorMessage/ErrorMessage';
import LoadingWrapper from '../../components/LoadingWrapper/LoadingWrapper';
import UserPost from '../../components/PostMini/UserPost';
import styles from '../Home/Home.mod.scss';
import { useHistory } from 'react-router';
import Trending from '../../components/Trending/Trending';
import { selectIsAuthenticated } from '../../reducers/session';

function mapProps(state: RootState, ownProps: any) {
  let { match: { params: { id: tag } } } = ownProps;
  return {
    isAuthenticated: selectIsAuthenticated(state),
    feed: selectExploreByTag(state, tag) || {},
    feedFetchState: selectFetchExploreByTagReq(state)
  }
}

const Explore: React.FC = (props: any) => {

  const { isAuthenticated, feed, feedFetchState, dispatch } = props;
  let { match: { params: { id: tag } } } = props;
  let { timeline = [] } = feed;
  const history = useHistory();

  useEffect(() => {
    dispatch(getExploreContentWithTag(tag))
  }, [tag])

  return (
    <MainContainer
      mainCenter=
      {
        <>
          <Header
            title={'Explore'}
            onBackClick={() => history.push('/explore')}
            displayBackButton={tag ? true : false}
          />
          {
            tag
              ? <LoadingWrapper
                isFetching={feedFetchState.isFetching}
                errors={feedFetchState.error}
              >
                {
                  timeline.length
                    ? timeline.map((postId: number, i: number) => {
                      const isLastItem = timeline.length === i + 1
                      return (<UserPost
                        key={postId}
                        className={isLastItem ? styles.addMarginToLastListItem : ''}
                        postId={postId}
                      />)
                    })
                    : <ErrorMessage text={'No followers to display'} />
                }
              </LoadingWrapper>

              : <About />
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

export default connect(mapProps)(Explore);
