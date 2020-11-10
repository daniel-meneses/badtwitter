import React, { FunctionComponent, MouseEvent, useState } from 'react';
import styles from './Selectable.mod.scss';
import classNames from  'classnames'

type props = {
  colorStyle?: string;
  className?: string;
  onClick?: (event: any) => void;
  children: React.ReactNode;
  borderStyle?: string;
  testid?: string;
};

const Selectable: React.FC<props> = (props: props) => {

  const [isFocused, setIsFocused] = useState(false)

  const { colorStyle, className, onClick, borderStyle, children, testid } = props

  const cssStyles = classNames(
    className,
    styles.borderRound,
    {
      [styles.colorPrimary]: colorStyle==='primary',
      [styles.colorSecondary]: colorStyle==='secondary',
      [styles.colorUnavailable]: colorStyle==='unavailable',
      [styles.borderNone]: !borderStyle,
    }
  )

  return (
      <div
        data-testid={testid}
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
