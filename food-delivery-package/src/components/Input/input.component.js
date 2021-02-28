import React from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styles from './input.module.scss';


const Input = (props) => {

  return (
    <div className={styles.inputWrapper}>
      {props.phoneInput ? <PhoneInput
        country={'ua'}
        onBlur={props.onBlur}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        inputClass={styles.phoneInput}
      /> : <input
        className={props.editInput ? styles.editInput : styles.input}
        type={props.type}
        placeholder={props.placeholder}
        onBlur={props.onBlur}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        disabled={props.disabled}
      />}
      {
        props.editInput &&
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="silver"
            d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"
          />
        </svg>
      }
      <div className={styles.error}>{props.error}</div>
    </div>
  )
}
export default Input;
