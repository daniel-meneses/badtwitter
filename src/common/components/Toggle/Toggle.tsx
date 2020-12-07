import React from 'react';
import classNames from 'classnames';
import styles from './Toggle.mod.scss';

type Props = {
    className: string,

}

const ToggleSwitch = (props: Props) => {

    const { className } = props;

    return (
        <label className={styles.switch}>
            <input className={styles.sliderCue} type="checkbox"/>
                <span className={styles.slider}></span>
            </label>
    )
};

export default ToggleSwitch;