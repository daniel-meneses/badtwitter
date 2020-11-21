import React from 'react';
import styles from './FloatingImage.mod.scss';

type Props = {
  image: string,
  isDisplayed: boolean,
  dismiss: any,
  onBackgroundHover: any,
}

const FloatingImage = ({image, isDisplayed, dismiss, onBackgroundHover} : Props) => {

  return (
      <div className={isDisplayed ? styles.container : styles.isHidden }>
        <div className={styles.imageLarge}>
          <img src={image} alt={'Profile Avatar'} onClick={dismiss} />
        </div>
        <div 
            className={isDisplayed ? styles.fullscreenBackground : styles.isHidden}
            onClick={dismiss}
            onMouseEnter={onBackgroundHover}
            />
      </div>
  )
}

export default FloatingImage;