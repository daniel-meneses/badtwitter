import React, { useState } from 'react';
import classNames from 'classnames';
import ErrorMessage from '../../common/components/ErrorMessage/ErrorMessage'
import LoadingCirc from '../../common/components/Loading/LoadingCircle/LoadingCircle'
import styles from './LoadingWrapper.mod.scss'

type props = {
  className?: string;
  isFetching?: boolean;
  overrideError?: boolean;
  errors?: any;
  children?: React.ReactNode;
}

const LoadingWrapper = (props: props) => {

  const { className, isFetching, overrideError, errors, children } = props

  const shouldDisplayError = !isFetching && !overrideError && errors

  return (
    <div className={styles.loadingWrapper}>
      {isFetching && <LoadingCirc size={'medium'} />}
      {shouldDisplayError && <ErrorMessage text='Failed to load new posts'/>}
      {children}
   </div>
  )
}

export default LoadingWrapper;
