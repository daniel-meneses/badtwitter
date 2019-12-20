import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from '../Home/Home';
import NavBar from '../../components/NavBar/NavBar';
import SignUp from '../SignUp/SignUp';
import UserProfile from '../UserProfile/UserProfile';
import Inbox from '../Inbox/Inbox';
import { connect } from 'react-redux';
import { authenticate , unauthenticate} from '../../actions/session';

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
              <NavBar title="home" logoClick={this.handleNavLogoClick} settingsClick={this.handleSettingsClick}/>
              <Route path='/signup' exact component={SignUp}/>
              <Route path='/user/:id' exact component={UserProfile}/>
              <Route path='/inbox' component={Inbox}/>
              <Route exact path="/" render={() => (
                token ? ( <Home/> ) : ( <Redirect to="/signup"/> )
              )}/>
            </div>
          </Router>
      );
  }
}

const mapStateToProps = function(state: any) {
  return {
    isAuthenticated: state.session.isAuthenticated
  }
}

export default connect(mapStateToProps, {authenticate, unauthenticate} )(App);
