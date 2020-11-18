import React from 'react'
import './FloatingImage.scss'
import {connect} from 'react-redux'

type Props = {
  image: string,
  isDisplayed: boolean,
  dismiss: any,
  onBackgroundHover: any,
}

const FloatingImage = ({image, isDisplayed, dismiss, onBackgroundHover} : Props) => {

  return (
      <div className={isDisplayed ? 'floating-image-container' : 'isHidden' }>
        <div className='floating-image'>
          <img src={image} alt={'Profile Avatar'} onClick={dismiss} />
        </div>
        <div 
            className={isDisplayed ? 'float-bg' : 'hidden'}
            onClick={dismiss}
            onMouseEnter={onBackgroundHover}
            />
      </div>
  )
}

export default FloatingImage;