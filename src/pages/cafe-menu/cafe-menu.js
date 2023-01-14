import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';

import SourceCodeView from '../../components/source-code-view/source_code_view';

import cafeMenuContract from '../../contracts/Cafe_Menu.sol';

const CafeMenu = () => {
  const [contractCode, setContractCode] = useState(null);

  useEffect(() => {
    fetch(cafeMenuContract)
      .then(r => r.text())
      .then(text => {
        setContractCode(text);
  });
  }, []);

  return (
    <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
        <div style={{ padding: '16px 24px', color: '#44596e' }}>
       {contractCode ? <SourceCodeView contractName={"Cafe Menu Contract Code Editor"} contractCode={contractCode}/> : <p>Loading...</p>}
       </div>
        <div style={{marginTop: '17px', marginLeft:'15px', justifyContent: 'center', textAlign:'center',alignItems:'center'}}>
    <h3 style={{textAlign: 'center'}}>Edit the Parameters</h3>
       <div style={{ padding: '16px 24px', color: '#44596e' }}>
        <h5>Enter Token Name</h5>
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          // onChange={targetNameChange}
          id="outlined-required"
          label="Required"
          defaultValue="CafeMenu"
        />
      </div>
    </Box>
        </div>
       <div style={{  color: '#44596e' }}>
        <h5>Enter Token URI</h5>
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          // onChange={targetURIChange}
          id="outlined-helperText"
          label="URI"
          defaultValue=""
        />
      </div>
    </Box>
        
        </div>
      </div>
      </div>
  );
};

export default CafeMenu;