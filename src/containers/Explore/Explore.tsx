import React from 'react';
import { connect } from 'react-redux';

class Explore extends React.Component<any, any> {

  componentDidMount() {
  }

  render() {
      return (
        <div className={'main_container'}>
          <div className={'center_container'}>
          <h2> Explore </h2>
          </div>
          <div className={'right_container'}>
          </div>
        </div>
      );
  }
}

export default connect(null, {} )(Explore);
