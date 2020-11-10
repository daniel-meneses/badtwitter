import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/session'
import ProfileEditForm from '../../components/ProfileEditForm/ProfileEditForm2'
import ProfileEditImage from '../../components/ProfileEditImage/ProfileEditImage'
import { useHistory } from 'react-router-dom'
import MainContainer from '../MainContainer/MainContainer'
import Header from '../../components/Header/Header';
import styles from './Account.mod.scss'
import Button, {BtnThemes} from '../../common/components/Button/Button'

type Props = {
  logout: (history: any) => void
}

const Account = ({logout} : Props) => {
  
  const history = useHistory();

  return (
    <MainContainer
      mainCenter={
        <>
          <Header title={'Account'} />
          <div className={styles.accountInfo}>
            <ProfileEditImage />
            <ProfileEditForm className={styles.accountName} />
            <Button
              className={styles.logoutButton}
              theme={BtnThemes.PrimaryFill}
              onClick={() => logout(history)}
              >
              {'Logout'}
              </Button>
          </div>
        </>
      }

    />
  )
}

export default connect(null, {logout})(Account);
