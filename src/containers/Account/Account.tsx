import * as React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/session'
import ProfileEditForm from '../../components/ProfileEditForm/ProfileEditForm'
import ProfileEditImage from '../../components/ProfileEditImage/ProfileEditImage'
import { useHistory } from 'react-router-dom'
import MainContainer from '../MainContainer/MainContainer'
import Header from '../../components/Header/Header';
import styles from './Account.mod.scss'
import Button, {BtnThemes} from '../../common/components/Button/Button'

type Props = {
  dispatch: AppThunkDispatch;
}

const Account: React.FC<Props> = ({dispatch}) => {
  
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
              onClick={() => dispatch(logout(history))}
              >
              {'Logout'}
              </Button>
          </div>
        </>
      }

    />
  )
}

const connectedComponent = connect(null)(Account);

export default React.memo(connectedComponent);