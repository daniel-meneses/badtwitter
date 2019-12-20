import React from "react";

export default function NavBar(props: any) {

  return (
      <div className='nav-bar'>
        <span onClick={props.logoClick}>LOGO</span>
        <span>{props.title}</span>
        <span onClick={props.settingsClick}>Settings Icon</span>
      </div>
  );
}
