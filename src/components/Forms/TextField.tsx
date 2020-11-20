import React, { useState, useEffect, ChangeEvent } from "react";
import classNames from 'classnames'
import styles from './TextField.mod.scss'

type Props ={
  value: string;
  label: string;
  className?: string;
  validateAndReturnError: (value: string) => string;
  setValue: (value: string) => void;
  type?: string
}

/*
  Textfield with error message.
  Manages setting, displaying, and removing error message.
*/

const TextField: React.FC<Props> = (props) => {

  const [error, setError] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [shouldDisplayError, setShouldDisplayError] = useState(false)
  const { value, label, className, validateAndReturnError, setValue, type } = props;

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
          type={type || "text"}
          className={cssStyle}
          onChange={handleOnChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleOnBlur}
          />
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
