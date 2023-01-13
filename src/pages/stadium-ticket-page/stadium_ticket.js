import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import React, { useEffect, useState } from 'react';
import CustomCheckbox from '../../components/checkbox/custom_checkbox';

import SourceCodeView from '../../components/source-code-view/source_code_view';
import stadiumContract from '../../contracts/Stadium_Ticket.sol';


const StadiumTicket = () => {
  const [contractCode, setContractCode] = useState(null);
  const [lines, setLines] = useState([]);
  const [checkedN, setCheckedN] = React.useState(true);
  const [checkedE, setCheckedE] = React.useState(true);
  const [checkedS, setCheckedS] = React.useState(true);
  const [checkedW, setCheckedW] = React.useState(true);
  const [checked, setChecked] = React.useState([true, true, true, true]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked, event.target.checked, event.target.checked]);
    setMatchEvent(0);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, event.target.checked, checked[2], checked[3]]);
    setMatchEvent(1);
  };

  const handleChange3 = (event) => {
    setChecked([event.target.checked, checked[1], event.target.checked, checked[3]]);
    setMatchEvent(2);
  };

  const handleChange4 = (event) => {
    setChecked([event.target.checked, checked[1], checked[2], event.target.checked]);
    setMatchEvent(3);
  };

  useEffect(() => {
    fetch(stadiumContract)
      .then(r => r.text())
      .then(text => {
        setContractCode(text);
       setLines(text.split('\n'));
      });
  }, []);

  const checkN = (event) => {
    setCheckedN(event.target.checked);
    setDirections(0);
  };

  const checkE = (event) => {
    setCheckedE(event.target.checked);
    setDirections(1);
  };

  const checkS = (event) => {
    setCheckedS(event.target.checked);
    setDirections(2);
  };

  const checkW = (event) => {
    setCheckedW(event.target.checked);
    setDirections(3);
  };

  const setDirections = (i) => {
    const initialDirection = "    enum BlockDirection {";
    let directions = initialDirection;
    if((i !== 0 && checkedN) || (i === 0 && !checkedN)){
      directions = directions + "NORTH";
    }
    if((i !== 1 && checkedE) || (i === 1 && !checkedE)){
      if(directions !== initialDirection) directions += ', ';
      directions = directions + "EAST";
    }
    if((i !== 2 && checkedS) || (i === 2 && !checkedS)){
      if(directions !== initialDirection) directions += ', ';
      directions = directions + "SOUTH";
    }
    if((i !== 3 && checkedW) || (i === 3 && !checkedW)){
      if(directions !== initialDirection) directions += ', ';
      directions = directions + "WEST";
    }
    let newLines = [];
    if(directions === initialDirection) {
      const createLine = "        categories[tokenId] = StadiumCategory(tokenId, price, capacity, name, 0);";
      const addCateLine = "    function addCategory(uint256 price, uint256 capacity, string memory name) public onlyOwner {";
      newLines = [...lines.slice(0, 12), ...lines.slice(14, 18), ...lines.slice(19, 53), addCateLine, ...lines.slice(54, 55), ...lines.slice(56, 63), createLine, ...lines.slice(64)];
    } else {
      const enumLine = lines[13];
      const commaIndex = directions.lastIndexOf(',');
      let lastDirection = directions.slice(commaIndex + 2);
      if(commaIndex === -1) {
        lastDirection = directions.slice(directions.lastIndexOf('{') + 1);
      }
      if(!enumLine.includes('enum')) {
        const addCateLine = "    function addCategory(uint256 price, uint8 direction, uint256 capacity, string memory name) public onlyOwner {";
        const requireLine = `        require(direction <= uint8(BlockDirection.${lastDirection}), "Direction is out of range.");`;
        const createLine = "        categories[tokenId] = StadiumCategory(tokenId, price, BlockDirection(direction), capacity, name, 0);";
        newLines = [...lines.slice(0, 13), directions + "}", '', ...lines.slice(13, 16), '        BlockDirection direction;', ...lines.slice(16, 50), addCateLine, ...lines.slice(51, 52), requireLine, ...lines.slice(52, 59), createLine, ...lines.slice(60)];
      } else {
        const requireLine = `        require(direction <= uint8(BlockDirection.${lastDirection}), "Direction is out of range.");`;
        newLines = [...lines.slice(0, 13), directions + "}", ...lines.slice(14, 55), requireLine, ...lines.slice(56)];
      }
    }
    setLines(newLines);
    setContractCode(newLines.join('\n'));
  };

  const setMatchEvent = (i) => {
    // TODO: Add match
    const hasNewMatch = (i === 0 && !checked[0]) || (i !== 0 && checked[0]);
    const hasHomeTeam = (i === 1 && !checked[1]) || (i !== 1 && checked[1]);
    const hasAwayTeam = (i === 2 && !checked[2]) || (i !== 2 && checked[2]);
    const hasStartDate = (i === 3 && !checked[3]) || (i !== 3 && checked[3]);
    if(hasNewMatch) {
    } else {

    }
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Home Team"
        control={<Checkbox checked={checked[1]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Away Team"
        control={<Checkbox checked={checked[2]} onChange={handleChange3} />}
      />
      <FormControlLabel
        label="Start Date"
        control={<Checkbox checked={checked[3]} onChange={handleChange4} />}
      />
    </Box>
  );

  return (
    <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
       <div style={{ padding: '16px 24px', color: '#44596e' }}>
       {contractCode ? <SourceCodeView key={contractCode} contractName={"Stadium Ticket Contract Code Editor"} contractCode={contractCode}/> : <p>Loading...</p>}
        </div>
        <div style={{marginTop: '17px'}}>
    <h3 style={{textAlign: 'center'}}>Edit the Parameters</h3>
    <div style={{ display: 'flex', direction: 'ltr' }}>
       <div style={{ padding: '16px 24px', color: '#44596e' }}>
        <h5>Block Directions</h5>
        <FormGroup>
          <CustomCheckbox label="NORTH" onChange={checkN}/>
          <CustomCheckbox label="EAST" onChange={checkE}/>
          <CustomCheckbox label="SOUTH" onChange={checkS}/>
          <CustomCheckbox label="WEST" onChange={checkW}/>
        </FormGroup>
        </div>
       <div style={{ padding: '16px 24px', color: '#44596e' }}>
        <h5>Include Match Event</h5>
        <FormControlLabel
          label="Match Event"
          control={
            <Checkbox
              checked={checked[0]}
              indeterminate={checked[0] !== checked[1] || checked[0] !== checked[2] || checked[0] !== checked[3]}
              onChange={handleChange1}
            />
          }
        />
        {children}
        </div>
      </div></div>
      </div>
  );
};

export default StadiumTicket;