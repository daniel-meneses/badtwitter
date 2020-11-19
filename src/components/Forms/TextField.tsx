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

const TextField: React.FC<Props> = (props) => {

  const [error, setError] = useState<string>('')
  const [isFocused, setIsFocused] = useState(false)
  const [shouldDisplayError, setShouldDisplayError] = useState(false)
  const { value, label, className, validateAndReturnError, setValue, type } = props;

  useEffect(()=> {
    setError(validateAndReturnError(value))
  }, [value])

  const handleOnBlur = () => {
    setShouldDisplayError(error ? true : false)
    setIsFocused(false)
  }

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
          value={value}
          type={type ? type : "text"}
          className={cssStyle}
          onChange={handleOnChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleOnBlur}
          />
        { shouldDisplayError &&
          <div className={styles.errorText}>
            {error}
            </div>
        }
    </div>
  )
}

export default TextField;
