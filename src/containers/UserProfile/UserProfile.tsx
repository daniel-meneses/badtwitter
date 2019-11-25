import React from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { getUserById } from '../../actions/session.js'
import PostMiniComponent from '../../components/PostMini/PostMini';

class UserProfile extends React.Component<any, any> {

    constructor(props: any){
      super(props);
      this.state = {};
    }

    componentDidMount() {
      this.props.getUserById(this.props.match.params.id);
    }



    public render() {
      console.log(this.props.userProfile)
      var a: Array<any> = []
      if (this.props.userProfile.posts) {
        a = this.props.userProfile.posts
      }
        return (
            <div>
                Hello there!
                <span>{this.props.userProfile.email}</span>
                <span>{this.props.userProfile.first_name}</span>
                <span>{this.props.userProfile.last_name}</span>
                { a.map(a => <PostMiniComponent key={a.id} post={a} />) }
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
