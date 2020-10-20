import React, { useRef, useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import Avatar from '../Avatar/Avatar'
import styles from './PostMini.mod.scss'
import classNames from 'classnames'
import useIgnoreLongClick from '../../utils/hooks/useIgnoreLongClick'

type Props = {
  className?: string;
  userId: number;
  user: {
    alias: string,
    avatar: string,
    bio: string,
    first_name: string,
    last_name: string,
    user_id: number
  };
  topButtons?: React.ReactNode;
  isPreview?: boolean;
  children?: React.ReactNode;
}

const UserInfo = (props: Props) => {

  const history = useHistory();
  const childDiv = useRef<HTMLDivElement>();
  const nameAliasDiv = useRef<HTMLDivElement>();
  const action = () => history.push('/user/' + userId);
  useIgnoreLongClick({ ref: nameAliasDiv, action: action });
  useIgnoreLongClick({ ref: childDiv, action: action });

  const { className, user = {}, isPreview, topButtons, children } = props;


  const {
    alias,
    avatar,
    bio,
    first_name: firstName,
    last_name: lastName,
    user_id: userId
  } = user;

  const userInfoNameAlias = classNames(
    styles.userInfoNameAlias,
    { [styles.flexCol]: isPreview }
  )

  return (
    <div className={styles.userInfo}>
      <div className={styles.userInfoAvatarContainer}>
        <Avatar image={avatar}/>
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

export default connect((state: any, ownProps: Props) => {
  let { users } = state.globalObject;
  let { userId } = ownProps;
  let user: any =  users && users[userId]
  return {user}
}, {})(UserInfo)
