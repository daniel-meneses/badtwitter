import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './TabNavigation.mod.scss'

type props = {
  className?: string;
  tabs: Array<any>;
}

const TabNavigation = (props: props) => {

  const { className, tabs } = props

  const focusedStyle = classNames(
    styles.tabHeaderItem,
    styles.tabHeaderItemFocused
  )

  return (
    <div className={className}>
      {
        tabs.map( (item: any, i) =>
          <div className={styles.tabHeader} key={i}>
            <div
              key={i}
              id={item.title}
              className={item.isFocused ? focusedStyle : styles.tabHeaderItem}
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
