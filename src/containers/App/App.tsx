import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import store from '../../store/store.js';
import Home from '../Home/Home';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import UserProfile from '../UserProfile/UserProfile';
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

  render() {
    let token = localStorage.getItem('token_refresh')
      return (
          <Router>
            <div className="App">
              <Route path='/signup' exact component={SignUp}/>
              <Route path='/user/:id' exact component={UserProfile}/>
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
