import React from 'react';
import ErrorMessage from '../../common/components/ErrorMessage/ErrorMessage'
import LoadingCirc from '../../common/components/Loading/LoadingCircle/LoadingCircle'
import styles from './LoadingWrapper.mod.scss'

type props = {
  className?: string;
  isFetching?: boolean;
  overrideError?: boolean;
  error?: { error: string } | null;
  children?: React.ReactNode;
}

const LoadingWrapper = (props: props) => {
  
  const { className, isFetching, overrideError, error, children } = props

  const shouldDisplayError = !isFetching && !overrideError && error
  // @ts-ignore
  const errorMessage:string = (error || {}).error ? (error || {}).error : 'Failed to fetch'

  return (
    <div className={styles.loadingWrapper}>
      {isFetching && <LoadingCirc size={'medium'} />}
      {shouldDisplayError && <ErrorMessage text={errorMessage}/>}
      {children}
   </div>
  )
}

export default React.memo(LoadingWrapper);
