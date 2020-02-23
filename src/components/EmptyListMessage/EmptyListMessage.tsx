import React, {useState} from "react"
import './EmptyListMessage.scss'
import { connect } from 'react-redux'
import { postMessage } from '../../actions/post.js'

type Props = {
  message: string
}

const EmptyListMessage = ({message}: Props) => {

  return (
    <div className="empty_list_message">
      
    </div>
  );
}

export default connect(null)(EmptyListMessage);
