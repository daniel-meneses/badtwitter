import React from 'react';
import { connect } from 'react-redux';
import MainContainer from '../MainContainer/MainContainer'
import Header from '../../components/Header/Header';

const Explore: React.FC = () => {

  return (
    <MainContainer
      mainCenter=
      {
        <>
          <Header title={'Explore'} />
          <h1> Work in Progres.. </h1>
       </>
      }
    />
  )
}

export default connect(null, {} )(Explore);
