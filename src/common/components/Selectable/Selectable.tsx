import React, { FunctionComponent, MouseEvent, useState } from 'react';
import styles from './Selectable.mod.scss';
import classNames from  'classnames'

type props = {
  colorStyle?: string;
  className?: string;
  onClick?: (event: any) => void;
  children: React.ReactNode;
  borderStyle?: string
};

const Selectable: React.FC<props> = (props: props) => {

  const [isFocused, setIsFocused] = useState(false)

  const { colorStyle, className, onClick, borderStyle, children } = props

  const cssStyles = classNames(
    className,
    styles.selectable,
    {
      [styles.colorPrimary]: colorStyle==='primary',
      [styles.colorSecondary]: colorStyle==='secondary',
      [styles.borderNone]: !borderStyle
    }
  )

  return (
      <div
        className={cssStyles}
        onClick={onClick}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        >
        {children}
      </div>
    );
}

export default Selectable;
