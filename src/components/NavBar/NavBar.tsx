import React from "react";

type Props = {
  title: string,
  handleLogoClick: (e: any) => void,
  handleSettingsClick: (e: any) => void
};

const NavBar = ({title, handleLogoClick, handleSettingsClick}: Props) => {

  return (
      <div className='nav-bar'>
        <span onClick={handleLogoClick}>LOGO</span>
        <span>{title}</span>
        <span onClick={handleSettingsClick}>Settings Icon</span>
      </div>
  );
}

export default NavBar;
