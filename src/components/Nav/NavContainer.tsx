import React, { FunctionComponent, ReactElement, MouseEvent, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../../common/components/Button/Button'
import HomeIcon from '../../common/components/SvgLib/HomeIcon'
import ExploreIcon from '../../common/components/SvgLib/ExploreIcon'
import InboxIcon from '../../common/components/SvgLib/InboxIcon'
import ProfileIcon from '../../common/components/SvgLib/ProfileIcon'
import AccountIcon from '../../common/components/SvgLib/AccountIcon'
import AppLogo from '../../common/components/SvgLib/AppLogo'
import NewPostIcon from '../../common/components/SvgLib/NewPostIcon'
import styles from './Nav.mod.scss'
import Selectable from '../../common/components/Selectable/Selectable'
import classNames from 'classnames'
//import { Dispatch } from 'react-redux'

type NavItem = {
  text: string;
  icon: ReactElement<any, any>;
  selected: boolean;
  onClick: () => void;
}

type Props = {
  dispatch: any;
}

const NavContainer = (props: Props) => {

  const history = useHistory();
  const location = useLocation();
  const userId: number = 39;

  const logoStyle = { className: styles.navItemIcon }
  const isSelected = (loc: string) => location.pathname === loc

  const showFloatingPostForm = () => props.dispatch({type: 'DISPLAY_FLOATING_POST_FORM' })

  const navItems: NavItem[] = [
    {
      text: '',
      icon: <AppLogo {...logoStyle} styles={{fill: 'green'}} />,
      selected: false,
      onClick: () => history.push('/home')
    },
    {
      text: 'Home',
      icon: <HomeIcon {...logoStyle} />,
      selected: isSelected('/home') || isSelected('/'),
      onClick: () => history.push('/home')
    },
    {
      text: 'Explore',
      icon: <ExploreIcon {...logoStyle} />,
      selected: isSelected('/explore'),
      onClick: () => history.push('/explore')
    },
    {
      text: 'Inbox',
      icon: <InboxIcon {...logoStyle} />,
      selected: isSelected('/inbox/messages'),
      onClick: () => history.push('/inbox')
    },
    {
      text: 'Profile',
      icon: <ProfileIcon {...logoStyle} />,
      selected: isSelected(`/user/${userId}`),
      onClick: () => history.push('/user/' + userId)
    },
    {
      text: 'Account',
      icon: <AccountIcon {...logoStyle} />,
      selected: isSelected('/account'),
      onClick: () => history.push('/account')
    }
  ]

  const navItemStyles = (isSelected: boolean) => classNames(
    styles.navItem,
    { [styles.navItemSelected] : isSelected }
  )

  return (
    <div className={styles.navContainer}>
      {
        navItems.map( (item: NavItem, i: any) =>
            <Selectable
              colorStyle={'secondary'}
              key={i}
              className={navItemStyles(item.selected)}
              onClick={item.onClick}
            >
              {item.icon}
              {
                item.text &&
                  <div className={styles.navItemText}>
                    {item.text}
                  </div>
              }
            </Selectable>
        )
      }
      <div className={styles.navPostContainer}>
      <Selectable className={styles.navPostIcon}>
        <NewPostIcon
          onClick={showFloatingPostForm}
          />
      </Selectable>
        <Button
          className={styles.navPostBtn}
          styling={'primary'}
          onClick={() => console.log('Do Something')}
          >
          {'New Post'}
        </Button>
        </div>
    </div>
  );

}

export default connect()(NavContainer);
