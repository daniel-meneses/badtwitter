import React, { useState } from 'react';
import styles from './Avatar.mod.scss'
import classNames from 'classnames';
import FloatingImage from '../FloatingImageContainer/FloatingImage';
import { debounce } from 'lodash';

type props = {
  image?: string | null;
  fallback?: string;
  onClick?: () => void;
  onFocus?: () => void;
  className?: string;
  showImageOnHover?: boolean;
}

const Avatar: React.FC<props> = (props: props) => {

  const [ displayFloatingImage, setDisplayFloatingImage ] = useState(false)
  const { image, onClick, className, showImageOnHover=false } = props;

  const img = image || 'https://images-03.s3-ap-southeast-2.amazonaws.com/user_placeholder.png'

  const avatarClass = classNames(
    styles.avatar,
    className
  )

  const showAfterWait = debounce(() => setDisplayFloatingImage(true), 400, {
    'leading': false,
    'trailing': true
  })

  return (
    <div>
      { showImageOnHover &&
      <FloatingImage
        isDisplayed={displayFloatingImage}
        image={img}
        onBackgroundHover={() => setDisplayFloatingImage(false)}
        dismiss={() => setDisplayFloatingImage(false)}
        />
      }
      <img src={img}
        onMouseEnter={showAfterWait}
        onMouseLeave={showAfterWait.cancel}
        className={avatarClass}
        onClick={onClick}
        alt={'Profile avatar'}
      />
    </div>
  );

}

export default Avatar;
