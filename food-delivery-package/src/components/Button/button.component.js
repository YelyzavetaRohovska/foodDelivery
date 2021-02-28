import React from 'react';
import styles from './button.module.scss';

const Button = (props) => {
  return (
    <div>
      <button
        className={`${styles.btn} ${!props.primaryButton && styles.fillBtn}`}
        onClick={props.onClick}
        disabled={props.disabled}
      >{props.children}</button>
    </div>
  )
}
export default Button;
