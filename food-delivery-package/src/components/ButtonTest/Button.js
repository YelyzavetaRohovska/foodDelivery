import React, {useState} from 'react';
import styles from './Button.module.scss';

const TestButton = () => {


  const [test, setTest] = useState(false)
  console.log(test)
  return (
    <button className={styles.btn} onClick={() => setTest(true)}>
      It works!!!
    </button>
  )
};

export default TestButton;
