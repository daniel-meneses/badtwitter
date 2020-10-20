import React from 'react'
import { useParams, useHistory } from "react-router-dom"
import styles from './Header.mod.scss'
import Selectable from '../../common/components/Selectable/Selectable'
import BackArrow from '../../common/components/SvgLib/BackArrow'

type Props = {
  title?: string;
  subtitle?: string;
  displayBackButton?: boolean;
  selectableIcon?: React.ReactNode;
  onTitleClick?: (e: React.MouseEvent) => void;
  onIconClick?: (e: React.MouseEvent) => void;
  onBackClick?: any;
}


const Header = (props: Props) => {

  const { title, subtitle, displayBackButton, selectableIcon, onIconClick, onTitleClick, onBackClick } = props
  const history = useHistory()

  return (
    <div className={styles.header}>
      {
        displayBackButton &&
        <Selectable
          className={styles.backButton}
          colorStyle={'secondary'}
          onClick={onBackClick}
          >
          <BackArrow/>
        </Selectable>
      }
      {title && <h2 onClick={onTitleClick}>{title}</h2>}
      {subtitle && <h5>{subtitle}</h5>}
      {
        selectableIcon &&
          <Selectable
            colorStyle={'primary'}
            onClick={onIconClick}
            >
            {selectableIcon}
          </Selectable>
      }
    </div>
  );

}

export default Header;
