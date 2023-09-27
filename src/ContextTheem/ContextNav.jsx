import { useState } from 'react';

import ToggleButton from 'react-bootstrap/ToggleButton';
const ContextNav = () => {

  const [checked, setChecked] = useState(false);
  const getValue = (e) => {
    setChecked(e.target.checked)
    console.log(e.target.checked)

    if (checked) {
      console.log("ok")
    } else {
      console.log("false")
    }
  }


  const design = (
    <>
     <input type="checkbox" value={checked} onChange={getValue}/>

    </>


  );
  return design
}
export default ContextNav