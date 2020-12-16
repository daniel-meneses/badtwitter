import React, { ReactElement } from 'react';
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
import { selectIsAuthenticated, selectCurrenUserId } from '../../reducers/session';


type NavItem = {
  text: string;
  icon: ReactElement<any, any>;
  selected: boolean;
  onClick: () => void;
}

type Props = {
  dispatch: Dispatch;
  currentUserId: number | null;
  isAuthenticated: boolean;
  focusedInboxTab: string;
}

const NavContainer: React.FC<Props> = (props) => {

  const { currentUserId, focusedInboxTab, isAuthenticated } = props
  const history = useHistory();
  const location = useLocation();

  const logoStyle = { className: styles.navItemIcon }

  const isSelected = (loc: string) => location.pathname.includes(loc)

  const showFloatingPostForm = () => {
    if (!isAuthenticated) { return showGuestToast(); }
    props.dispatch({ type: PostFormActionTypes.DISPLAY_FLOATING_POST_FORM })
  }


  const handleNavOnclick = (url: string, blockForGuest: boolean = false) => {
    if (blockForGuest && !isAuthenticated) { return }
    const isCurrentUrl = location.pathname === url
    if (isCurrentUrl) {
      document.getElementById('scrollable')?.scrollTo(0, 0);
    } else if (!isCurrentUrl) {
      history.push(url)
    }
    
  }

  const topNavLogo = 
  <Selectable
    colorStyle={'secondary'}
    className={classNames(styles.navItem, styles.logo)}
    onClick={() => handleNavOnclick('/home')}
    >
    <AppLogo className={classNames(styles.navItemIcon, styles.logo)} styles={{ fill: 'green' }} />
  </Selectable>

  const navList: NavItem[] = [
    {
      text: 'Home',
      icon: <HomeIcon  {...logoStyle} />,
      selected: isSelected('/home'),
      onClick: () => handleNavOnclick('/home')
    },
    {
      text: 'Explore',
      icon: <ExploreIcon  {...logoStyle} />,
      selected: isSelected('/explore'),
      onClick: () => handleNavOnclick('/explore/global')
    },
    {
      text: 'Inbox',
      icon: <InboxIcon  {...logoStyle} />,
      selected: isSelected('/inbox'),
      onClick: () => handleNavOnclick(`/inbox/${focusedInboxTab}`, true)
    },
    {
      text: 'Profile',
      icon: <ProfileIcon {...logoStyle} />,
      selected: isSelected(`/user/${currentUserId}`),
      onClick: () => handleNavOnclick(`/user/${currentUserId}`, true)
    },
    {
      text: 'Account',
      icon: <AccountIcon {...logoStyle} />,
      selected: isSelected('/account'),
      onClick: () => handleNavOnclick('/account', true)
    }
  ]

  const navItemStyles = (isSelected: boolean) => classNames(
    styles.navItem,
    { [styles.navItemSelected]: isSelected }
  )

  const shouldDisable = (i: number) => {
    // disable nav options 2-6 for guest
    return i > 1 && !isAuthenticated
  }

  return (
    <div data-testid={'nav-container'} className={styles.navContainer}>
      {
        topNavLogo
      }
      {
        navList.map((item: NavItem, i: any) =>
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

export default connect((state: RootState) => {
  return {
    isAuthenticated: selectIsAuthenticated(state),
    currentUserId: selectCurrenUserId(state),
    focusedInboxTab: state.ui.inbox.focusedTab,
  }
})(NavContainer);
