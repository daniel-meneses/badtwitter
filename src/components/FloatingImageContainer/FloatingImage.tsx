import React from 'react'
import './FloatingImage.scss'
import {connect} from 'react-redux'

type Props = {
  image: string
  isDisplayed: boolean,
  dismiss: any
}

const FloatingImage = ({image, isDisplayed, dismiss} : Props) => {
  return (
      <div className={isDisplayed ? 'floating-image-container' : 'isHidden' }>
        <div className='floating-image'>
          <img src={image} />
        </div>
        <div className={isDisplayed ? 'float-bg' : 'hidden'}
              onClick={dismiss}/>
      </div>
  )
}

export default connect(null, {})(FloatingImage)
