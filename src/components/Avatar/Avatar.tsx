import React, { FunctionComponent, ReactElement, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './Avatar.mod.scss'
import classNames from 'classnames';

type props = {
  image?: string | null;
  fallback?: string;
  onClick?: () => void;
  onFocus?: () => void;
  className?: string;
}

const Avatar: React.FC<props> = (props: props) => {

  const [isFocused, setIsFocused] = useState(false);
  const { image, onClick, className } = props;

  const img = image || 'fallback'

  const avatarClass = classNames(
    styles.avatar,
    className
  )

  return (
    <div className={styles.hoverOverlay}>
      <img src={img}
           className={avatarClass}
           onClick={onClick}
           alt={'Profile avatar'}
           />
    </div>
  );

}

export default Avatar;
