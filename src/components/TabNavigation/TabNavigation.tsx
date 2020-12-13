import * as React from 'react';
import classNames from 'classnames';
import styles from './TabNavigation.mod.scss'

type props = {
  className?: string;
  tabs: Array<any>;
}

const TabbedView: React.FC<props> = (props) => {

  const { className, tabs } = props

  const focusedStyle = (isFocused: boolean) => classNames(
    styles.tab,
    { [styles.focusedTab]: isFocused }
  )

  const focusedView = tabs.find(tab => tab.isFocused).children;

  return (
    <div className={classNames(styles.tabbedView, className)}>
       <div className={styles.tabContainer}>
      {
        tabs.map((item: any, i) =>
            <div
              key={i}
              id={item.title}
              className={focusedStyle(item.isFocused)}
              onClick={item.onClick}
            >
              {item.title}
            </div>
        )
      }
      </div>
      {focusedView}
    </div>
  )
}

export default TabbedView;
