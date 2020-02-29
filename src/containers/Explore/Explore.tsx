import React from 'react';
import { connect } from 'react-redux';
import EmptyListMessage from '../../components/EmptyListMessage/EmptyListMessage'

class Explore extends React.Component<any, any> {

  componentDidMount() {
  }

  render() {
      return (
        <div className={'main_container'}>
          <div className={'center_container'}>
            <h2 className='center_container_header'>
              Explore
              </h2>
            <div className={'center_container_body'}>
              <EmptyListMessage message={'Work in progress..'} />
              </div>
          </div>
          <div className={'right_container'}>
            </div>
        </div>
      );
  }
}

export default connect(null, {} )(Explore);
