import React from 'react';
import classNames from 'classnames';
import styles from './ErrorMessage.mod.scss';

type props = {
  className?: string;
  text: string;
};

const ErrorMessage: React.FC<props> = (props: props) => {

  const { text, className } = props

  return (
      <div className={classNames(styles.error, className)}>
        {text}
      </div>
    );
}

export default ErrorMessage;
