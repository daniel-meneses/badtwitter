import React from 'react';
import { connect } from 'react-redux';
import MainContainer from '../MainContainer/MainContainer'
import Header from '../../components/Header/Header';
import { useHistory } from 'react-router';
import { selectIsAuthenticated } from '../../reducers/session';
import { selectExploreArticles } from '../../reducers/explore';
import FollowWidget from '../../components/Widget/FollowWidget';
import ArticleFull from '../../components/Article/ArticleFull';
import { getNewsArticleById } from '../../actions/explore';

type OwnProps = {
  match: any;
}

type ConnectedProps = {
  article: any;
  isAuthenticated: any;
  dispatch: AppThunkDispatch;
}

const Explore: React.FC<ConnectedProps & OwnProps> = (props) => {

  const { article, isAuthenticated, dispatch } = props;
  const { id } = props.match.params;

  const history = useHistory();

  React.useEffect( ()=> {
    !article && dispatch(getNewsArticleById(id));
  }, [])

  return (
    <MainContainer
      mainCenter=
      {
        <>
          <Header
            title={'Explore'}
            onBackClick={() => history.push('/explore/news')}
            displayBackButton={true}
          />
          {
            article && <ArticleFull {...article} />
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
            <FollowWidget />
        </>
      }
    />
  )
}

function mapProps(state: RootState, ownProps: any) {
  return {
    article: selectExploreArticles(state)[ownProps.match.params.id],
    isAuthenticated: selectIsAuthenticated(state),
  }
}

const connectedComponent = connect(mapProps)(Explore);

export default React.memo(connectedComponent);
