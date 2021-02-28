import React, {useState} from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const TestExternalLib = () => {

  const [value, setValue] = useState('')

  return (
    <PhoneInput
      country={'us'}
      value={value}
      onChange={phone => setValue(phone)}
    />
  )
};

export default TestExternalLib;
