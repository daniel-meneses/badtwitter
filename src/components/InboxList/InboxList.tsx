import React from 'react'
import './InboxList.scss'
import { connect } from 'react-redux'

type Props = {
  someType: any
}

function mapStateToProps(state: any) {
  return {
    someType: state
  }
}

const InboxList = ({someType} : Props) => {

  return (
    <div></div>
  )
}

export default connect(mapStateToProps, {})(InboxList);
