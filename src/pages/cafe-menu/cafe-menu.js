import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { default as React, useEffect, useState } from 'react';
import CustomCheckbox from '../../components/checkbox/custom_checkbox';

import SourceCodeView from '../../components/source-code-view/source_code_view';

import cafeMenuContract from '../../contracts/Cafe_Menu.sol';

const CafeMenu = () => {
  const [contractCode, setContractCode] = useState(null);
  const [contractName, setContractName] = useState('CafeMenu');
  const [contractURI, setContractURI] = useState('');
  const [beforeLines, setBeforeLines] = useState([]);
  const menuItemTypes = ["BREAKFAST", "ENTREE", "SALAD", "PIZZA", "BURGER", "PASTA", "MEAT", "COLDDRINK", "HOTDRINK", "SPECIAL", "CAKE", "COOKIE", "BISKUIT", "PASTRY", "CANDY", "PUDDING", "DEEPFRIED", "FROZEN", "GELATIN", "FRUIT"];
  const [menuItems, setMenuItems] = useState([true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]);

  useEffect(() => {
    fetch(cafeMenuContract)
      .then(r => r.text())
      .then(text => {
        setContractCode(text);
        const allLines = text.split('\n');
        setBeforeLines([allLines.slice(0, 8),allLines.slice(9, 12),allLines.slice(13, 37),allLines.slice(38, 43),allLines.slice(44, 87),allLines.slice(88)]);
      });
  }, []);

  const setItem = (checked, item) => {
    const index = menuItemTypes.indexOf(item);
    const newMenuItems = [...menuItems.slice(0, index), checked, ...menuItems.slice(index+1)];
    setMenuItems(newMenuItems);
    console.log(newMenuItems);
    setNewContract(contractName, contractURI, newMenuItems);
  };

  const targetNameChange = (event) => {
    setContractName(event.target.value);
    setNewContract(event.target.value, contractURI, menuItems);
  };

  const targetURIChange = (event) => {
    setContractURI(event.target.value);
    setNewContract(contractName, event.target.value, menuItems);
  };

  const setNewContract = (newContractName, targetURIParam, newMenuItems) => {
    let newLines = [];
    let itemLine = "    enum MenuItemType {";
    let lastItem = "";
    let addComma = false;
    for(let i=0; i<newMenuItems.length; i++) {
      if(newMenuItems[i]) {
        if(addComma) itemLine += ", ";
        lastItem = menuItemTypes[i];
        itemLine += lastItem;
        addComma = true;        
      }
    }
    itemLine += "}";
    const lastItemLine = `        require(itemType <= uint8(MenuItemType.${lastItem}), "Menu item type is out of range.");`;
    for(let i=0; i<beforeLines.length; i++) {
      newLines.push(...beforeLines[i]);
      if (i===0) {
        newLines.push(`contract ${newContractName} is ERC1155, Ownable {`);
      } else if (i===1) {
        newLines.push(itemLine);
      } else if (i===2) {
        newLines.push(`    constructor() ERC1155("${targetURIParam}") {`);
      } else if (i===3) {
        newLines.push(lastItemLine);
      } else if (i===4) {
        newLines.push(lastItemLine);
      }
    } 
    setContractCode(newLines.join('\n'));
  };

  return (
    <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
        <div style={{ padding: '16px 24px', color: '#44596e' }}>
       {contractCode ? <SourceCodeView key={contractCode} contractName={"Cafe Menu Contract Code Editor"} contractCode={contractCode}/> : <p>Loading...</p>}
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
          onChange={targetNameChange}
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
          onChange={targetURIChange}
          id="outlined-helperText"
          label="URI"
          defaultValue=""
        />
      </div>
    </Box>
      </div>
       <div style={{ padding: '16px 24px', color: '#44596e' }}>
        <h5>Menu Item Types</h5>
        <FormGroup>
          {menuItemTypes.map((item) =>
            <CustomCheckbox id={item} label={item} onChange={(event) => setItem(event.target.checked, item)}/>
          )}
        </FormGroup>
        </div>
      </div>
      </div>
  );
};

export default CafeMenu;