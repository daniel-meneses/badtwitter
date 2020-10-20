import React, { FunctionComponent, MouseEvent, useState } from 'react';
import styles from './Button.mod.scss';
import classNames from  'classnames'

type props = {
  className?: string;
  style?: string;
  styling?: string;
  onClick: (event?: MouseEvent) => void;
  text?: string;
  children?: React.ReactNode | string;
  onMouseEnter?: (e? MouseEvent) => void;
  onMouseLeave?: (e? MouseEvent) => void;
};

enum ButtonType {
  None = 'none',
  Player = 'player',
  Details = 'details',
  Other = 'other',
}

const Button: React.FC<props> = (props: props) => {

  const { className, style, styling, onClick, text, onMouseEnter, onMouseLeave, children } = props

  const btnStyle = classNames(
    styles.btn,
    {
      [styles.stylePrimary]: styling==='primary',
      [styles.styleSecondary]: styling==='secondary',
    },
    className
  )

  return (
      <button onClick={onClick} className={btnStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
      </button>
    );
}

export default Button;
