import React, { useState, useEffect, ChangeEvent } from "react";
import classNames from 'classnames'
import styles from './TextField.mod.scss'
import { EyeIcon, EyeSlashIcon } from "../../common/components/SvgLib/HideEyeIcon";

type Props ={
  value: string;
  label: string;
  className?: string;
  validateAndReturnError: (value: string) => string;
  setValue: (value: string) => void;
  type?: string;
  autoFocus?: boolean;
}

/*
  Textfield with error message.
  Manages setting, displaying, and removing error message.
*/

const TextField: React.FC<Props> = (props) => {

  const [error, setError] = useState('')
  const [isProtected, setIsProteced] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [shouldDisplayError, setShouldDisplayError] = useState(false)
  const { value, label, className, validateAndReturnError, setValue, type, autoFocus } = props;

  // Text new value for validation errors
  useEffect(()=> {
    let validateError = validateAndReturnError(value);
    (validateError !== error) && setError(validateError)
  }, [value])

  // Show error message on blur
  const handleOnBlur = () => {
    setShouldDisplayError(error ? true : false)
    setIsFocused(false)
  }

  // Remove error message if input is changing
  const handleOnChange = (e: ChangeEvent) => {
    setShouldDisplayError(false)
    const inputEl = e.target as HTMLInputElement
    setValue(inputEl.value)
  }

  const textfieldStyle = classNames(
    styles.textFieldWithError,
    className
  )

  const cssStyle = classNames(
    styles.textField,
    {[styles.errorField] : shouldDisplayError}
  )

  const isPassword = type === 'password'
  const isHidden = isPassword && isProtected

  return (
    <div className={textfieldStyle}>
      {label &&
        <span className={isFocused ? styles.labelFocused : styles.label}>
          {label}
          </span>
      }
        <input
          data-testid={'textfield'}
          value={value}
          type={isHidden ? 'password' : 'text'}
          className={cssStyle}
          onChange={handleOnChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleOnBlur}
          autoFocus={autoFocus}
          />
          { isPassword && (
            isHidden
              ? <EyeIcon className={styles.hideIcon} onClick={()=> setIsProteced(false)}/>
              : <EyeSlashIcon className={styles.hideIcon} onClick={()=> setIsProteced(true)}/>
          )}
          { shouldDisplayError &&
          <div 
            data-testid={'textfield-error'}
            className={styles.errorText}>
            {error}
            </div>
        }
    </div>
  )
}

export default TextField;
