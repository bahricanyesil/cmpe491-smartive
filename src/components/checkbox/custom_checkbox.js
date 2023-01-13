import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import * as React from 'react';

export default function CustomCheckbox({label, onChange}) {
  return (<FormControlLabel control={<Checkbox style={{width:'35px', height:'35px'}} onChange={onChange} defaultChecked />} label={label} />
  );
}