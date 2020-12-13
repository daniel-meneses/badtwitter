import * as React from 'react';
import styles from './Widget.mod.scss';

type Props = {
    title: string;
    onShowMoreClick: (e: React.MouseEvent) => void;
    children: JSX.Element[] | JSX.Element;
}

const Widget: React.FC<Props> = (props) => {

    const { title, onShowMoreClick, children } = props;

    return (
        <div className={styles.widgetContainer}>
            <div className={styles.title}>{title}</div>
            {
                children
            }
            <div className={styles.showMore} onClick={onShowMoreClick}>
               Show More
            </div>
        </div>
    );
}

export default React.memo(Widget);


  