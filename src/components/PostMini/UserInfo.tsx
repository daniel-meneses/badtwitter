import React, { useRef } from "react"
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import Avatar from '../Avatar/Avatar'
import styles from './PostMini.mod.scss'
import classNames from 'classnames'
import useIgnoreLongClick from '../../utils/hooks/useIgnoreLongClick'


type OwnProps = {
  userId: number;
}

type Props = {
  className?: string;
  userId?: number;
  user?: any;
  topButtons?: React.ReactNode;
  isPreview?: boolean;
  children?: React.ReactNode;
}

const UserInfo = (props: Props) => {

  const history = useHistory();
  const location = useLocation();
  const childDiv:any = useRef<any>();
  const nameAliasDiv:any = useRef<any>();

  const clickAction = () => {
    let destUrl = '/user/' + userId
    let isCurrentUrl = destUrl === location.pathname
    !isCurrentUrl && history.push(destUrl)
  };

  useIgnoreLongClick({ ref: nameAliasDiv, action: clickAction });
  useIgnoreLongClick({ ref: childDiv, action: clickAction });

  const { user , isPreview, topButtons, children } = props;
    
  if (!user) return (<></>)

  const {
    alias,
    avatar,
    bio,
    firstName,
    lastName,
    userId
  } = user;

  const userInfoNameAlias = classNames(
    styles.userInfoNameAlias,
    { [styles.flexCol]: isPreview }
  )

  return (
    <div className={styles.userInfo}>
      <div className={styles.userInfoAvatarContainer}>
        <Avatar 
        image={avatar}
        showImageOnHover={true}
        />
        </div>
      <div className={styles.userInfoContentContainer}>
        <div className={styles.userInfotopDetails}>
          <div className={userInfoNameAlias} ref={nameAliasDiv}>
            <div className={styles.userInfoName}>
              {firstName} {lastName}
              </div>
            <div className={styles.userInfoAlias}>
              @{alias}
              </div>
            </div>
        {
          topButtons &&
          <div className={styles.userInfoButtonSelection}>
            {topButtons}
            </div>
        }
        </div>
        <div ref={childDiv}>{children}</div>
      </div>
    </div>
  );

}

export default connect((state: any, ownProps: OwnProps) => {
  let { byId } = state.users;
  let { userId } = ownProps;  
  let user: any = byId[userId]
  return {user}
}, {})(UserInfo)
