import React from 'react'
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import MainContainer from '../MainContainer/MainContainer'

const NotFound =() => {


  const history = useHistory();

  return (
    <MainContainer
      mainCenter=
      {
        <>
           <div className={'main_container'}>
            <Header
              title={''}
              onTitleClick={() => history.push('/home')}
            />
            <h1>Page Not Found</h1>
          </div>
        </>
      }
    />
  )
}

export default NotFound
