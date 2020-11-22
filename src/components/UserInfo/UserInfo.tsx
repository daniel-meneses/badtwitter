import React, { useState } from "react"
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import Avatar from '../Avatar/Avatar'
import styles from './UserInfo.mod.scss'
import classNames from 'classnames'
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
  const [mouseDownY, setMouseDownY] = useState(0)

  const { user, isPreview, topButtons, children } = props;

  const { alias, avatar, bio, firstName, lastName, userId } = user;

  const userInfoNameAlias = classNames(
    styles.userInfoNameAlias,
    { [styles.flexCol]: isPreview }
  )

  const handleMouseUp = (e: React.MouseEvent) => {
    const isDraggedClick = e.clientY !== mouseDownY
    !isDraggedClick && goToUserProfile();
  }

  const goToUserProfile = () => {
    let destUrl = '/user/' + userId
    let isCurrentUrl = destUrl === location.pathname
    !isCurrentUrl && history.push(destUrl)
  };

  return (
    <div 
      className={styles.userInfo}
      onMouseDown={(e: React.MouseEvent) => setMouseDownY(e.clientY)}
      onMouseUp={handleMouseUp}
      >
      <div className={styles.userInfoAvatarContainer}>
        <Avatar
          className={styles.avatar}
          image={avatar}
          showImageOnHover={true}
          />
        </div>
      <div className={styles.userInfoContentContainer}>
        <div className={styles.userInfotopDetails}>
          <div className={userInfoNameAlias} >
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
        <div>{ isPreview ? bio : children }</div>
      </div>
    </div>
  );

}

export default connect((state: any, { userId }: OwnProps) => ({ 
  user: selectUserById(state, userId)
}))(UserInfo)
