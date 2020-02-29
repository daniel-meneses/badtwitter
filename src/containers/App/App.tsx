import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from '../Home/Home';
import NavBar from '../../components/NavBar/NavBar';
import FloatingPostContainer from '../../components/FloatingPostContainer/FloatingPostContainer';
import SignUp from '../SignUp/SignUp';
import UserProfile from '../UserProfile/UserProfile';
import Inbox from '../Inbox/Inbox';
import Account from '../Account/Account';
import Explore from '../Explore/Explore';
import { connect } from 'react-redux';
import { authenticate , unauthenticate} from '../../actions/session';

const mapStateToProps = function(state: any) {
  return {
    isAuthenticated: state.session.isAuthenticated
  }
}

class App extends React.Component<any, any> {

  componentDidMount() {
    const token = localStorage.getItem('token_refresh');
    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
  }

  handleNavLogoClick = () => {
    console.log("You clicked on logo!")
  }

  handleSettingsClick = () => {
    console.log("You clicked on settings!")
  }

  render() {
    let token = localStorage.getItem('token_refresh')
      return (
          <Router>
            <div className="App">
              <FloatingPostContainer />
              <Route path='/signup' exact component={SignUp}/>
              <header>
                <div className='nav_container'>
                  {token ? <NavBar/> : <></>}
                </div>
              </header>
              <main>
                <div>
                <Route path='/home' exact component={Home}/>
                <Route path='/user/:id' exact component={UserProfile}/>
                <Route path='/inbox' component={Inbox}/>
                <Route path='/explore' component={Explore}/>
                <Route path='/account' component={Account}/>
                <Route exact path="/" render={() => (
                token ? ( <Redirect to="/home"/> ) : ( <Redirect to="/signup"/> )
              )}/>
                </div>
              </main>
            </div>
          </Router>
      );
  }
}

export default connect(mapStateToProps, {authenticate, unauthenticate} )(App);
