import React from 'react';
import { connect } from 'react-redux';
import MainContainer from '../MainContainer/MainContainer'
import Header from '../../components/Header/Header';
import About from '../../components/About/About';

const Explore: React.FC = () => {

  return (
    <MainContainer
      mainCenter=
      {
        <>
          <Header title={'Explore'} />
          < About/>
       </>
      }
    />
  )
}

export default connect(null, {} )(Explore);
