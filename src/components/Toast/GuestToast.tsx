import React from 'react';
import Button, { BtnThemes } from '../../common/components/Button/Button';
import styles from './GuestToast.mod.scss';
import { useHistory, useLocation } from 'react-router-dom';
import {toastr} from 'react-redux-toastr'
import { Link } from "react-router-dom";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'


const AuthComponent = () => {

    const history = useHistory();
    const { pathname } = useLocation();

    const redirectUrl = 'redirect=' + pathname

    return (
        <div data-testid={'guest-toast'} className={styles.buttonContainer}>
            <Button
                className={styles.registerButton}
                onClick={() => history.push('/signup?' + redirectUrl)}
            >
                {'Sign Up'}
            </Button>
            <Button
                className={styles.registerButton}
                theme={BtnThemes.PrimaryOutline}
                onClick={() => history.push('/login?' + redirectUrl)}
            >
                {'Login'}
            </Button>
        </div>
    )
}

const toastrOptions: any = {
    icon: 'warning',
    newestOnTop: false,
    preventDuplicates: true,
    status: 'success',
    timeOut: 3500,
    showCloseButton: false,
    component: AuthComponent,
}

const showGuestToast = (text = '') => toastr.light('Guest User', text || 'Please sign up or log in', toastrOptions)

export default showGuestToast;