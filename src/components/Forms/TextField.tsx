import React, { useState, useEffect } from "react";
import classNames from 'classnames'
import styles from './TextField.mod.scss'

type Props ={
  value: string;
  label: string;
  className?: string;
  setErrorMessage: (value: string) => string;
  setValue: (value: string) => void;
  type?: string
}

const TextField = (props: Props) => {

  const [error, setError] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [shouldDisplayError, setShouldDisplayError] = useState(false)
  const { value, label, className, setErrorMessage, setValue, type } = props;

  useEffect(()=> {
    let err = setErrorMessage(value)
    setError(err)
  }, [value])

  const handleOnBlur = () => {
    setShouldDisplayError(error ? true : false)
    setIsFocused(false)
  }

  const handleOnChange = (e: any) => {
    setShouldDisplayError(false)
    setValue(e.target.value)
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
          value={value}
          type={type ? type : "text"}
          className={cssStyle}
          onChange={handleOnChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleOnBlur}
          />
        { setErrorMessage &&
          <div className={styles.errorText}>
            {shouldDisplayError && error}
            </div>
        }
    </div>
  )
}

export default TextField;
