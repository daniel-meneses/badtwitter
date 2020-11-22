import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './TabNavigation.mod.scss'

type props = {
  className?: string;
  tabs: Array<any>;
}

const TabNavigation = (props: props) => {

  const { className, tabs } = props

  const focusedStyle = (isFocused: boolean) => classNames(
    styles.tabHeaderItem,
    { [styles.tabHeaderItemFocused]: isFocused }
  )

  return (
    <div className={className}>
      {
        tabs.map( (item: any, i) =>
          <div className={styles.tabHeader} key={i}>
            <div
              key={i}
              id={item.title}
              className={focusedStyle(item.isFocused)}
              onClick={item.onClick}
              >
              {item.title}
            </div>
          </div>
      )
    }
   </div>
  )
}

export default TabNavigation;
