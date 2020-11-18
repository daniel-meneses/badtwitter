import React from 'react';
import ErrorMessage from '../../common/components/ErrorMessage/ErrorMessage'
import LoadingCirc from '../../common/components/Loading/LoadingCircle/LoadingCircle'
import styles from './LoadingWrapper.mod.scss'

type props = {
  className?: string;
  isFetching?: boolean;
  overrideError?: boolean;
  errors?: { error: string };
  children?: React.ReactNode;
}

const LoadingWrapper = (props: props) => {

  const { className, isFetching, overrideError, errors, children } = props

  const shouldDisplayError = !isFetching && !overrideError && errors
  // @ts-ignore
  const errorMessage:string = (errors || {}).error ? (errors || {}).error : 'Failed to fetch'

  return (
    <div className={styles.loadingWrapper}>
      {isFetching && <LoadingCirc size={'medium'} />}
      {shouldDisplayError && <ErrorMessage text={errorMessage}/>}
      {children}
   </div>
  )
}

export default LoadingWrapper;
