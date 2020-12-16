import React from "react"
import { useHistory, useLocation } from "react-router-dom";
import Header from "./Header"

const GuestHeader = () => {

  const history = useHistory();
  const { pathname } = useLocation();
  const redirectUrl = 'redirect=' + pathname
  
  return (<Header
    title={'Login/Register'}
    isRightHeader={true}
    onTitleClick={() => history.push('/signup?' + redirectUrl)}
  />)

}

export default GuestHeader;