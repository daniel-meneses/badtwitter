import React, { FunctionComponent, MouseEvent, useState } from 'react';
import styles from './Button.mod.scss';
import classNames from  'classnames'

type props = {
  className?: string;
  theme?: string;
  styling?: string;
  onClick: (e?: MouseEvent) => void;
  isDisabled?: boolean;
  children?: React.ReactNode | string;
  onMouseEnter?: (e?: MouseEvent) => void;
  onMouseLeave?: (e?: MouseEvent) => void;
};

export enum BtnThemes {
  PrimaryFill = 'PrimaryFill',
  PrimaryOutline = 'PrimaryOutline',
  RedFill = 'RedFill',
  RedOutline = 'RedOutline'
}

const Button: React.FC<props> = (props: props) => {

  const { className, theme = 'PrimaryFill', isDisabled, styling, onClick, onMouseEnter, onMouseLeave, children } = props

  // @ts-ignore
  const btnTheme = styles[`theme-${theme}`]

  const btnStyle = classNames(
    styles.btn,
    btnTheme,
    {
      [styles.btnDisabled]: isDisabled,
    },
    //btnTheme,
    className
  )

  const handleOnClick = (event?: MouseEvent) => {
    !isDisabled && onClick(event)
  }

  return (
      <button onClick={handleOnClick} className={btnStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
      </button>
    );
}

export default Button;
