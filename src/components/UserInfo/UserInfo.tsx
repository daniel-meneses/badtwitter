import React, { useRef } from "react"
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import Avatar from '../Avatar/Avatar'
import styles from './UserInfo.mod.scss'
import classNames from 'classnames'
import useIgnoreLongClick from '../../utils/hooks/useIgnoreLongClick'
import { User } from "../../types/common"
import { selectUserById } from "../../reducers/users"

/*
    Base componenet for displaying user as feed / inbox list item
    Extended to create UserPost and UserPreview componenets
*/

type OwnProps = {
  userId: number;
  className?: string;
  children?: React.ReactChild;
}

type StoreProps = {
  user: User;
  topButtons?: React.ReactNode;
  isPreview?: boolean;
}

type Props = OwnProps & StoreProps;

const UserInfo: React.FunctionComponent<Props> = (props) => {

  const history = useHistory();
  const location = useLocation();
  const childRenderDiv:any = useRef<any>();
  const nameAliasDiv:any = useRef<any>();

  const clickAction = () => {
    let destUrl = '/user/' + userId
    let isCurrentUrl = destUrl === location.pathname
    !isCurrentUrl && history.push(destUrl)
  };

  useIgnoreLongClick({ ref: nameAliasDiv, action: clickAction });
  useIgnoreLongClick({ ref: childRenderDiv, action: clickAction });

  const { user, isPreview, topButtons, children } = props;


  const { alias, avatar, bio, firstName, lastName, userId } = user;

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
        <div ref={childRenderDiv}>{ isPreview ? bio : children }</div>
      </div>
    </div>
  );

}

export default connect((state: any, { userId }: OwnProps) => ({ 
  user: selectUserById(state, userId)
}))(UserInfo)
