import classNames from "classnames"
import React from "react"
import UserInfo from '../UserInfo/UserInfo'
import styles from './UserPreview.mod.scss'

/*
  Used to display user preview as seen in inbox list.
*/
type Props = {
  className?: string;
  userId: number;
  topButtons?: any;
}

const UserPreview: React.FC<Props> = (props) => {

  const { userId, topButtons, className } = props;

  return (
    <div className={classNames(className, styles.userPreview)}>
      <UserInfo
        userId={userId}
        isPreview={true}
        topButtons={topButtons}
        />
    </div>
  )
}

export default UserPreview;