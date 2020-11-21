import React, { useEffect, useState, useRef } from 'react'
import styles from './MainContainer.mod.scss'

/*
  Main content is split into two partitions.
  Container itself is display flex.

*/

type Props = {
  mainCenter: React.ReactNode;
  mainRight?: React.ReactNode;
}

const MainContainer = (props: Props) => {

  const { mainCenter, mainRight } = props;

  return (
    <div className={styles.mainContainer}>
     <div className={styles.mainCenter}>
       {mainCenter}
     </div>
     <div className={styles.mainRight}>
       {
         mainRight && mainRight
       }
     </div>
   </div>
  )

}

export default (MainContainer)
