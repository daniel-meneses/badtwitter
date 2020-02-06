import React from 'react';
import './Inbox.scss'
import { connect } from 'react-redux';
import FollowRequestList from '../../components/FollowRequestList/FollowRequestList';


type Props = {
  pendingFollowerRequest: {}
};

function mapStateToProps(state :any) {
  return {
    pendingFollowerRequest: state.followers.pending.followRequests
  }
}

class Inbox extends React.Component<any, any> {

    public render() {
      return (
        <div className={'main_container'}>
          <div className={'center_container'}>
          <h2> Inbox </h2>
            <FollowRequestList/>
          </div>
          <div className={'right_container'}>
          hey
          </div>
        </div>
      );
    }
}

export default connect(
    mapStateToProps
  , {})(Inbox);
