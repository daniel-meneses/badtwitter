import React, { useEffect } from 'react';
import './App.scss';
import { Route, Redirect, Switch } from "react-router-dom";
import Home from '../Home/Home';
import NavBar from '../../components/NavBar/NavBar';
import FloatingPostContainer from '../../components/FloatingPostContainer/FloatingPostContainer';
import SignUp from '../SignUp/SignUp';
import UserProfile from '../UserProfile/UserProfile';
import Inbox from '../Inbox/Inbox';
import Account from '../Account/Account';
import Explore from '../Explore/Explore';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import { connect } from 'react-redux';
import { authenticate , unauthenticate} from '../../actions/session';

type Props = {
  authenticate: () => void,
  unauthenticate: () => void,
  isAuthenticated: boolean
}

function mapStateToProps(state: any) {
  return {
    isAuthenticated: state.session.isAuthenticated
  }
}

const App = ({authenticate, unauthenticate, isAuthenticated} : Props) => {

  useEffect(() => {
    const token = localStorage.getItem('token_refresh');
    console.log(document)
    if (token) {
      authenticate();
    } else {
      unauthenticate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])


  return (
        <div className="App">
          {
            isAuthenticated ?
            <>
            <FloatingPostContainer />
              <header>
                <div className='nav_container'>
                  <NavBar/>
                </div>
              </header>
              <main>
              <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/home' exact component={Home}/>
                <Route path='/user/:id' exact component={UserProfile}/>
                <Route path='/inbox' exact component={Inbox}/>
                <Route path='/explore' exact component={Explore}/>
                <Route path='/account' exact component={Account}/>
                <Route path="/signup" render={() => (
                  isAuthenticated ? ( <Redirect to="/home"/> ) : ( <SignUp/> )
                )}/>
                <Route path="/login" render={() => (
                  isAuthenticated ? ( <Redirect to="/home"/> ) : ( <Login/> )
                )}/>
                <Route component={NotFound}/>
              </Switch>
              </main>
              </>

              :
          <>
          <Route path="/signup" render={() => (
            isAuthenticated ? ( <Redirect to="/home"/> ) : ( <SignUp/> )
          )}/>
          <Route path="/login" render={() => (
            isAuthenticated ? ( <Redirect to="/home"/> ) : ( <Login/> )
          )}/>
          <Redirect path="/" to='signup'/>
          </>
        }

        </div>
  );
}

export default connect(mapStateToProps, {authenticate, unauthenticate} )(App);
