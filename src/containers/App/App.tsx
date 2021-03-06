import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import Home from '../Home/Home';
import FloatingPostContainer from '../../components/FloatingPostContainer/FloatingPostContainer';
import SignUp from '../SignUp/SignUp';
import UserProfile from '../UserProfile/UserProfile';
import Inbox from '../Inbox/Inbox';
import Account from '../Account/Account';
import Explore from '../Explore/Explore';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Nav from '../../components/Nav/NavContainer';
import { connect } from 'react-redux';
import styles from './App.mod.scss'
import ReduxToastr from 'react-redux-toastr'
import { useLocation } from 'react-router-dom';
import { selectIsAuthenticated } from '../../reducers/session';
import { usePersistedScroll } from '../../utils/hooks/useScrollHooks';
import { getAllLikes } from '../../actions/likes';
import { getPendingSubscriptionRequests, getAcceptedSubscriptionRequests } from '../../actions/subscriptions';
import Article from '../Article/Article';

interface StoreProps {
  isAuthenticated: boolean;
}

interface Props extends StoreProps {
  dispatch: AppThunkDispatch;
}

function mapStateToProps(state: RootState): StoreProps {
  return {
    isAuthenticated: selectIsAuthenticated(state),
  }
}

const App = ({ isAuthenticated, dispatch }: Props) => {

  const loc = useLocation();

  const noNav = ['/login', '/signup']
  const shouldShowNav = !noNav.includes(loc.pathname)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getPendingSubscriptionRequests())
      dispatch(getAcceptedSubscriptionRequests())
      dispatch(getAllLikes())
    }
  }, [])
  
  usePersistedScroll();

  return (
    <div className={styles.app} id='scrollable'>
      {
        shouldShowNav ?
          <>
            <FloatingPostContainer />
            <header>
              <div className={styles.navLayout}>
                <Nav />
              </div>
            </header>
          </> : <></>
      }
      <main>
        <Switch>
          <Route path='/' exact render={() => <Redirect to="/home" />} />
          <Route path='/home' exact component={Home} />
          <Route path='/user/:id' exact component={UserProfile} />
          <Route path='/inbox/:tab' exact component={Inbox} />
          <Route path="/inbox" render={() => <Redirect to="/inbox/messages" />} />
          <Route path='/article/:id' exact component={Article} />
          <Route path='/explore/:tab' exact component={Explore} />
          <Route path='/explore/:tab/:tagId' exact component={Explore} />
          <Route path='/account' exact component={Account} />
          <Route path="/signup" render={
            () => isAuthenticated ? <Redirect to="/home" /> : <SignUp />
          } />
          <Route path="/login" render={
            () => isAuthenticated ? <Redirect to="/home" /> : <Login />
          } />
          <Route component={NotFound} />
        </Switch>
        <ReduxToastr
          position="top-right"
          preventDuplicates
          closeOnToastrClick
          // @ts-ignore
          getState={(state: RootState) => state.toastrReducer}
        />
      </main>
    </div>
  );
}

export default connect(mapStateToProps)(App);
