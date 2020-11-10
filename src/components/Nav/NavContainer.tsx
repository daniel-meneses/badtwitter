import React, { FunctionComponent, ReactElement, MouseEvent, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Button, { BtnThemes } from '../../common/components/Button/Button'
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
import { PostFormActionTypes } from '../../reducers/ui'
import showGuestToast from '../Toast/GuestToast';



type NavItem = {
  text: string;
  icon: ReactElement<any, any>;
  selected: boolean;
  onClick: () => void;
}

type Props = {
  dispatch: Dispatch;
  currentUserId: number;
  isAuthenticated: boolean;
  focusedInboxTab: string;
}

const NavContainer = (props: Props) => {

  const { currentUserId, focusedInboxTab, isAuthenticated } = props
  const history = useHistory();
  const location = useLocation();

  const logoStyle = { className: styles.navItemIcon }

  const isSelected = (loc: string) => location.pathname.includes(loc)

  const showFloatingPostForm = () => {
    if (!isAuthenticated) { return showGuestToast(); }
    props.dispatch({type: PostFormActionTypes.DISPLAY_FLOATING_POST_FORM })
  }

  const navList: NavItem[] = [
    {
      text: '',
      icon: <AppLogo  {...logoStyle} styles={{fill: 'green'}} />,
      selected: false,
      onClick: () => {
        location.pathname !== `/home` &&
        history.push('/home')
      }
    },
    {
      text: 'Home',
      icon: <HomeIcon  {...logoStyle} />,
      selected: isSelected('/home'),
      onClick: () => {
        location.pathname !== `/home` &&
        history.push('/home')
      }
    },
    {
      text: 'Explore',
      icon: <ExploreIcon  {...logoStyle} />,
      selected: isSelected('/explore'),
      onClick: () => {
        location.pathname !== `/explore` &&
        history.push('/explore')
      }
    },
    {
      text: 'Inbox',
      icon: <InboxIcon  {...logoStyle} />,
      selected: isSelected('/inbox'),
      onClick: () => {
        if (!isAuthenticated) { return }
        location.pathname !== `/inbox/${focusedInboxTab}` &&
        history.push('/inbox/' + focusedInboxTab)
      }
    },
    {
      text: 'Profile',
      icon: <ProfileIcon {...logoStyle} />,
      selected: isSelected(`/user/${currentUserId}`),
      onClick: () => {
        if (!isAuthenticated) { return }
        location.pathname !== `/user/${currentUserId}` &&
        history.push(`/user/${currentUserId}`)
      }
    },
    {
      text: 'Account',
      icon: <AccountIcon {...logoStyle} />,
      selected: isSelected('/account'),
      onClick: () => {
        if (!isAuthenticated) { return }
        location.pathname !== `/account` &&
        history.push('/account')
      }
    }
  ]

  const navItemStyles = (isSelected: boolean) => classNames(
    styles.navItem,
    { [styles.navItemSelected] : isSelected }
  )

  const shouldDisable = (i: number) => {
    // disable nav options 2-6 for guest
    return i > 2 && !isAuthenticated
  }

  return (
    <div className={styles.navContainer}>
      {
        navList.map( (item: NavItem, i: any) =>
            <Selectable
              colorStyle={shouldDisable(i) ? 'unavailable' : 'secondary'}
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
          theme={BtnThemes.PrimaryFill}
          onClick={showFloatingPostForm}
          >
          {'New Post'}
        </Button>
        </div>
    </div>
  );

}

export default connect((state: any) => {
    return {
      isAuthenticated: state.session.session.isAuthenticated,
      currentUserId: state.session.session.currentUserId, 
      focusedInboxTab: state.ui.inbox.focusedTab,
    }
})(NavContainer);
