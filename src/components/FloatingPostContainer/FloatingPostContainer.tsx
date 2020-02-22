import React, {useState} from "react"
import './FloatingPostContainer.scss'
import { connect } from 'react-redux'
import PostForm from '../PostForm/PostForm';
import { postMessage } from '../../actions/post.js'

type Props = {
  dispatch: any
  floatingPostFormIsHidden: boolean
}

const mapStateToProps = (state: any) => {
  return {
    floatingPostFormIsHidden: state.post.floatingPostFormIsHidden
  }
}

const FloatingPostContainer = ({floatingPostFormIsHidden, dispatch}: Props) => {

  const handleFormSubmit = (e: any) => {
    if (e.message === "") { return}
    //postMessage(e)
    dispatch({type: 'HIDE_FLOATING_POST_FORM' })
  }

  return (
    <div className="floating_post_form_container" hidden={floatingPostFormIsHidden}>
      <div className="floating_post_form_background"
           onClick={() => dispatch({type: 'HIDE_FLOATING_POST_FORM' })}
        ></div>
      <div className="floating_post_form">
        <div className="floating_post_nav">
            <svg onClick={() => dispatch({type: 'HIDE_FLOATING_POST_FORM' })}>
              <g>
                <path d='M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z'/>
                </g>
            </svg>
          </div>
          <div>
          <PostForm handleFormSubmit={(e :any) => handleFormSubmit({message: e})} />
            </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(FloatingPostContainer);
