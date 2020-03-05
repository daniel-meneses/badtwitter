import React from "react"
import './EmptyListMessage.scss'

type Props = {
  message: string
}

const EmptyListMessage = ({message}: Props) => {

  return (
    <div className="empty_list_message">
      <span>{message}</span>
    </div>
  );
}

export default EmptyListMessage
