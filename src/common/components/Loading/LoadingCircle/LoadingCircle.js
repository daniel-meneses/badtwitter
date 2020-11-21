import React from 'react';
import styles from './LoadingCircle.mod.scss';
import ReactLoading from 'react-loading';

function setSize(size) {
  switch (size) {
    case 'xsmall':
      return '20px';
    case 'small':
      return '30px';
    case 'medium':
      return '40px'
    case 'large':
      return '60px'
    case 'xlarge':
      return '80px'
    default:
      return '30px';
  }
}

const LoadingCirc = ({size}) => {

  var loadingSize = setSize(size)

  return (
  <div className={styles.container}>
    <ReactLoading type={'spin'}
                  color={'green'}
                  height={loadingSize} width={loadingSize}
                  />
    </div>
  )
};

export default LoadingCirc;
