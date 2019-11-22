import React from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { getUserById } from '../../actions/session.js'

class UserProfile extends React.Component<any, any> {

    constructor(props: any){
      super(props);
      this.state = {};
    }

    componentDidMount() {
      this.props.getUserById(this.props.match.params.id);
    }

    public render() {
        return (
            <div>
                Hello there!
                <span>{this.props.userProfile.email}</span>
            </div>
        );
    }
}

function mapStateToProps(state :any) {
  return {
    userProfile: state.profile.profile
  }
}

export default withRouter(connect(mapStateToProps
  , { getUserById })(UserProfile) as any);
