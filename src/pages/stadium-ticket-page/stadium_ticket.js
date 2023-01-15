import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import CustomCheckbox from '../../components/checkbox/custom_checkbox';

import SourceCodeView from '../../components/source-code-view/source_code_view';
import stadiumContract from '../../contracts/Stadium_Ticket.sol';

const StadiumTicket = () => {
  const [contractCode, setContractCode] = useState(null);
  const [contractName, setContractName] = useState('StadiumTicket');
  const [contractURI, setContractURI] = useState('');
  const [beforeLines, setBeforeLines] = useState([]);
  const [checkedDirections, setCheckedDirections] = React.useState([true, true, true, true]);
  const [checked, setChecked] = React.useState(true);
  const matchStruct = ["    struct MatchEvent {", "        string homeTeam;", "        string awayTeam;", "        uint256 startDate;", "    }", "", "    MatchEvent public matchEvent;"];
  const directionStructLine = "        BlockDirection direction;";
  const defaultEnum = "    enum BlockDirection {NORTH, EAST, SOUTH, WEST}";
  const [directionEnum, setDirectionEnum] = useState(defaultEnum);
  const hasMatchConstructor = ["    constructor(string memory homeTeam_, string memory awayTeam_, uint256 startDate_) ERC1155(\"\") {", "        require(!compareStrings(homeTeam_, awayTeam_), \"The home and away team can not be the same team.\");", "        require(startDate_ > block.timestamp, \"You can not set start time of the match to a past date.\");", "        matchEvent = MatchEvent({", "            homeTeam: homeTeam_,", "            awayTeam: awayTeam_,", "            startDate: startDate_", "        });"];
  const withoutMatchConstructor = "    constructor() ERC1155(\"\") {";
  const hasDirectionAdd = "    function addCategory(uint256 price, uint8 direction, uint256 capacity, string memory name) public onlyOwner {";
  const withoutDirectionAdd = "    function addCategory(uint256 price, uint256 capacity, string memory name) public onlyOwner {";
  const requireLine = "        require(!checkEventPassed(), \"Event has already occurred.\");";
  const hasDirectionAssign = "        categories[tokenId] = StadiumCategory(tokenId, price, BlockDirection(direction), capacity, name, 0);";
  const withoutDirectionAssign = "        categories[tokenId] = StadiumCategory(tokenId, price, capacity, name, 0);";
  const checkEventPassFunc = ["    function checkEventPassed() private returns (bool) {", "        if(block.timestamp >= matchEvent.startDate) {", "            _pause();", "            return true;", "        }", "        return false;", "    }", ""];

  const handleChange1 = (event) => {
    setChecked(event.target.checked);
    setNewContract(directionEnum, contractName, event.target.checked, contractURI);   
  };

  useEffect(() => {
    fetch(stadiumContract)
      .then(r => r.text())
      .then(text => {
        setContractCode(text);
        const allLines = text.split('\n');
        setBeforeLines([allLines.slice(0, 9),allLines.slice(10, 13), allLines.slice(15, 18), allLines.slice(19, 24), allLines.slice(31, 35), allLines.slice(43, 53), allLines.slice(56, 63), allLines.slice(64, 70), allLines.slice(71, 83), allLines.slice(91, 95), allLines.slice(96)]);
      });
  }, []);

  const checkN = (event) => {
    const newCheckedDirectionList = [event.target.checked, checkedDirections[1], checkedDirections[2], checkedDirections[3]];
    setCheckedDirections(newCheckedDirectionList);
    setDirections(newCheckedDirectionList);
  };

  const checkE = (event) => {
    const newCheckedDirectionList = [checkedDirections[0], event.target.checked, checkedDirections[2], checkedDirections[3]];
    setCheckedDirections(newCheckedDirectionList);
    setDirections(newCheckedDirectionList);
  };

  const checkS = (event) => {
    const newCheckedDirectionList = [checkedDirections[0], checkedDirections[1], event.target.checked, checkedDirections[3]];
    setCheckedDirections(newCheckedDirectionList);
    setDirections(newCheckedDirectionList);
  };

  const checkW = (event) => {
    const newCheckedDirectionList = [checkedDirections[0], checkedDirections[1], checkedDirections[2], event.target.checked];
    setCheckedDirections(newCheckedDirectionList);
    setDirections(newCheckedDirectionList);
  };

  const targetNameChange = (event) => {
    setContractName(event.target.value);
    setNewContract(directionEnum, event.target.value, checked, contractURI);
  };

  const targetURIChange = (event) => {
    setContractURI(event.target.value);
    setNewContract(directionEnum, contractName, checked, event.target.value);
  };

  const setDirections = (newCheckedList) => {
    const initialDirection = "    enum BlockDirection {";
    let directions = initialDirection;
    if(newCheckedList[0]){
      directions = directions + "NORTH";
    }
    if (newCheckedList[1]) {
      if (directions !== initialDirection) directions += ', ';
      directions = directions + "EAST";
    }
    if (newCheckedList[2]) {
      if (directions !== initialDirection) directions += ', ';
      directions = directions + "SOUTH";
    }
    if (newCheckedList[3]) {
      if (directions !== initialDirection) directions += ', ';
      directions = directions + "WEST";
    }
    if(directions === initialDirection) {
      setDirectionEnum("");
      setNewContract("", contractName, checked, contractURI);
    } else {
      directions += "}";
      setDirectionEnum(directions);
      setNewContract(directions, contractName, checked, contractURI);
    }
  };

  const setNewContract = (directions, newContractName, hasMatch, targetURIParam) => {
    const hasDirection = directions !== "";
    let newLines = [];
    for(let i=0; i<beforeLines.length; i++) {
      newLines.push(...beforeLines[i]);
      if (i===0) {
        newLines.push(`contract ${newContractName} is ERC1155, Pausable, Ownable {`);
      } else if(i===1) {
        if(hasDirection) {
          newLines.push(directions);
          newLines.push("");
        }
      } else if (i===2) {
        if(hasDirection) {
          newLines.push(directionStructLine);
        }
      } else if (i===3) {
        if(hasMatch) {
          newLines = [...newLines, ...matchStruct];
        }
      } else if (i===4) {
        let lastLine = hasMatch ? hasMatchConstructor[0] : withoutMatchConstructor;
        lastLine = lastLine.slice(0, lastLine.lastIndexOf("{") - 3) + targetURIParam + "\") {";
        if(hasMatch) {
          newLines = [...newLines, lastLine, ...hasMatchConstructor.slice(1)];
        } else {
          newLines.push(lastLine);
        }
      } else if (i===5) {
        newLines.push(hasDirection ? hasDirectionAdd : withoutDirectionAdd);
        if(hasMatch) newLines.push(requireLine);
        if(hasDirection) {
          const commaIndex = directions.lastIndexOf(",");
          const openIndex = directions.lastIndexOf("{");
          const lastDirection = directions.slice((commaIndex === -1 ? openIndex-1 : commaIndex) + 2, directions.lastIndexOf("}"));
          newLines.push(`        require(direction <= uint8(BlockDirection.${lastDirection}), "Direction is out of range.");`);
        }
      } else if (i===6) {
        newLines.push(hasDirection ? hasDirectionAssign : withoutDirectionAssign);
      } else if (i===7) {
        if(hasMatch) newLines.push(requireLine);
      } else if (i===8) {
        if(hasMatch) newLines = [...newLines, ...checkEventPassFunc];
      } else if (i===9) {
        if(hasMatch) newLines.push(requireLine);
      }      
    } 
    setContractCode(newLines.join('\n'));
  };
  
  return (
    <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
       <div style={{ padding: '16px 24px', color: '#44596e' }}>
       {contractCode ? <SourceCodeView key={contractCode} contractName={"Stadium Ticket Contract Code Editor"} contractCode={contractCode}/> : <p>Loading...</p>}
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
          defaultValue="StadiumTicket"
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
        <FormGroup>
          <CustomCheckbox label="Match Event" onChange={handleChange1}/>
        </FormGroup>
        </div>
      </div>
      </div>
  );
};

export default StadiumTicket;

