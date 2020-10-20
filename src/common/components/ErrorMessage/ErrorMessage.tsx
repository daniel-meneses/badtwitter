import React, { FunctionComponent, useState } from 'react';
//import styles from './ErrorMessage.mod.scss';
import classNames from  'classnames'

type props = {
  className?: string;
  text: string;
};

const ErrorMessage: React.FC<props> = (props: props) => {

  const { className, text } = props

  return (
      <div>
        {text}
      </div>
    );
}

export default ErrorMessage;
