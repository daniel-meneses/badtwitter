import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from '../Home/Home';
import NavBar from '../../components/NavBar/NavBar';
import SignUp from '../SignUp/SignUp';
import UserProfile from '../UserProfile/UserProfile';
import Inbox from '../Inbox/Inbox';
import { connect } from 'react-redux';
import { authenticate , unauthenticate} from '../../actions/session';

class Account extends React.Component<any, any> {

  componentDidMount() {
  }

  render() {
      return (
        <div> </div>
      );
  }
}

export default connect(null, {} )(Account);
