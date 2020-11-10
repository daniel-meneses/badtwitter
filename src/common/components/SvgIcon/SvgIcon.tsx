import React, { FunctionComponent, useState } from 'react';

type props = {
  className?: string;
  onMouseEnter?: (event: any) => void;
  onMouseLeave?: (event: any) => void;
  onClick?: (event: any) => void;
  viewBox?: string;
  children?: any;
  isFocused?: boolean;
  isSelected?: boolean;
  styles?: any;
  fill?: string;
  stroke?: string;
  width?: string;
};

const SvgIcon: React.FC<props> = (props: props) => {

  const {
    className,
    onMouseEnter,
    onMouseLeave,
    onClick,
    viewBox,
    children,
    styles,
    fill,
    stroke,
    width,
    ...otherProps
  } = props

  return (
      <svg
        style={styles}
        {...otherProps}
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        viewBox={viewBox}
        fill={fill}
        stroke={stroke}
        strokeWidth={width}
      >
        {children}
      </svg>
    );
}

export default SvgIcon;
