import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import CustomCheckbox from '../../components/checkbox/custom_checkbox';

import SourceCodeView from '../../components/source-code-view/source_code_view';
import stadiumContract from '../../contracts/Stadium_Ticket.sol';

const StadiumTicket = () => {
  const [contractCode, setContractCode] = useState(null);
  const [contractName, setContractName] = useState('StadiumTicket');
  const [targetDirectionName, setTargetDirectionName] = useState('');
  const [matchDetailName, setMatchDetailName] = useState('');
  const [matchDetailType, setMatchDetailType] = useState('');
  const [contractURI, setContractURI] = useState('');
  const [beforeLines, setBeforeLines] = useState([]);
  const [checkedDirections, setCheckedDirections] = React.useState([true, true, true, true]);
  const [checked, setChecked] = React.useState(true);
  const [matchStruct, setMatchStructSetter] = useState(["    struct MatchEvent {", "        string homeTeam;", "        string awayTeam;", "        uint256 startDate;", "    }", "", "    MatchEvent public matchEvent;"]);
  const directionStructLine = "        BlockDirection direction;";
  const defaultEnum = "    enum BlockDirection {NORTH, EAST, SOUTH, WEST}";
  const [directionEnum, setDirectionEnum] = useState(defaultEnum);
  const [constructorList, setConstructorList] = useState(["    constructor(string memory homeTeam_, string memory awayTeam_, uint256 startDate_) ERC1155(\"\") {", "        require(!compareStrings(homeTeam_, awayTeam_), \"The home and away team can not be the same team.\");", "        require(startDate_ > block.timestamp, \"You can not set start time of the match to a past date.\");", "        matchEvent = MatchEvent({", "            homeTeam: homeTeam_,", "            awayTeam: awayTeam_,", "            startDate: startDate_", "        });"]);
  const withoutMatchConstructor = "    constructor() ERC1155(\"\") {";
  const hasDirectionAdd = "    function addCategory(uint256 price, uint8 direction, uint256 capacity, string memory name) public onlyOwner {";
  const withoutDirectionAdd = "    function addCategory(uint256 price, uint256 capacity, string memory name) public onlyOwner {";
  const requireLine = "        require(!checkEventPassed(), \"Event has already occurred.\");";
  const hasDirectionAssign = "        categories[tokenId] = StadiumCategory(tokenId, price, BlockDirection(direction), capacity, name, 0);";
  const withoutDirectionAssign = "        categories[tokenId] = StadiumCategory(tokenId, price, capacity, name, 0);";
  const checkEventPassFunc = ["    function checkEventPassed() private returns (bool) {", "        if(block.timestamp >= matchEvent.startDate) {", "            _pause();", "            return true;", "        }", "        return false;", "    }", ""];
  const [userDirections, setUserDirections] = React.useState([]);
  const [matchDetailsCheck, setMatchDetailsCheck] = React.useState([true, true, true]);
  const [matchDetails, setMatchDetails] = React.useState(['homeTeam', 'awayTeam', 'startDate']);
  const [matchDetailTypes, setMatchDetailTypes] = React.useState(['string', 'string', 'uint256']);

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

  const addDirection = (e) => {
    if(e.key == 'Enter' && targetDirectionName.length > 0) {
      const newCheckedDirectionList = [...checkedDirections, true];
      setCheckedDirections(newCheckedDirectionList);
      const newUserDirections = [...userDirections, targetDirectionName];
      setUserDirections(newUserDirections);
      setTargetDirectionName('');
      setDirections(newCheckedDirectionList, newUserDirections);
    }
  }

  const addMatchDetail = (e) => {
    if(e.key != 'Enter') return;
    const val = matchDetailType;
    if(val !== 'string' && val !== 'string[]' && val !== 'uint256' && val !== 'bool' && val !== 'address' && val !== 'bytes' && val != 'uint128' && val != 'uint64' && val != 'uint32' && val != 'uint16') {
      alert('Please enter a valid type');
      return;
    }
    if(matchDetailName == 'string' || matchDetailName == 'string[]' || matchDetailName == 'uint256' || matchDetailName == 'bool' || matchDetailName == 'address' || matchDetailName == 'bytes' || matchDetailName == 'uint128' || matchDetailName == 'uint64' || matchDetailName == 'uint32' || matchDetailName == 'uint16') {
      alert('Please enter a valid name');
      return;
    }
    if(matchDetailName.length > 0 && matchDetailType.length > 0) {
      const newMatchDetailCheck = [...matchDetailsCheck, true];
      setMatchDetailsCheck(newMatchDetailCheck);
      const newMatchDetails = [...matchDetails, matchDetailName];
      setMatchDetails(newMatchDetails);
      const newMatchDetailTypes = [...matchDetailTypes, matchDetailType];
      setMatchDetailTypes(newMatchDetailTypes);
      setMatchDetailName('');
      setMatchDetailType('');
      setMatchStruct(newMatchDetailCheck, newMatchDetails, newMatchDetailTypes);
    }
  }

  const checkMatchDetails = (event, index) => {
    const newCheckedMatchList = [...matchDetailsCheck.slice(0, index), event.target.checked, ...matchDetailsCheck.slice(index+1)];
    setMatchDetailsCheck(newCheckedMatchList);
    setMatchStruct(newCheckedMatchList);
  };

  const checkUserDirection = (event, index) => {
    const newCheckedDirectionList = [...checkedDirections.slice(0, index+4), event.target.checked, ...checkedDirections.slice(index+5)];
    setCheckedDirections(newCheckedDirectionList);
    setDirections(newCheckedDirectionList);
  };

  const checkN = (event) => {
    const newCheckedDirectionList = [event.target.checked, ...checkedDirections.slice(1)];
    setCheckedDirections(newCheckedDirectionList);
    setDirections(newCheckedDirectionList);
  };

  const checkE = (event) => {
    const newCheckedDirectionList = [...checkedDirections.slice(0, 1), event.target.checked, ...checkedDirections.slice(2)];
    setCheckedDirections(newCheckedDirectionList);
    setDirections(newCheckedDirectionList);
  };

  const checkS = (event) => {
    const newCheckedDirectionList = [...checkedDirections.slice(0, 2), event.target.checked, ...checkedDirections.slice(3)];
    setCheckedDirections(newCheckedDirectionList);
    setDirections(newCheckedDirectionList);
  };

  const checkW = (event) => {
    const newCheckedDirectionList = [...checkedDirections.slice(0, 3), event.target.checked, ...checkedDirections.slice(4)];
    setCheckedDirections(newCheckedDirectionList);
    setDirections(newCheckedDirectionList);
  };

  const matchDetailTypeChange = (event) => {
    setMatchDetailType(event.target.value);
  };

  const targetDirectionNameChange = (event) => {
    setTargetDirectionName(event.target.value);
  };

  const matchDetailNameChange = (event) => {
    setMatchDetailName(event.target.value);
  };

  const targetNameChange = (event) => {
    setContractName(event.target.value);
    setNewContract(directionEnum, event.target.value, checked, contractURI);
  };

  const targetURIChange = (event) => {
    setContractURI(event.target.value);
    setNewContract(directionEnum, contractName, checked, event.target.value);
  };

  const setDirections = (newCheckedList, userDirectionsParam=userDirections) => {
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
    for(let i=0; i<userDirectionsParam.length; i++) {
      if(!newCheckedList[i+4]) continue;
      if (directions !== initialDirection) directions += ', ';
      directions = directions + userDirectionsParam[i];
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

  const setNewContract = (directions, newContractName, hasMatch, targetURIParam, newMatchStruct=matchStruct, newConstructorList=constructorList) => {
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
          newLines = [...newLines, ...newMatchStruct];
        }
      } else if (i===4) {
        let lastLine = hasMatch ? newConstructorList[0] : withoutMatchConstructor;
        lastLine = lastLine.slice(0, lastLine.lastIndexOf("{") - 3) + targetURIParam + "\") {";
        if(hasMatch) {
          newLines = [...newLines, lastLine, ...newConstructorList.slice(1)];
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

  const customCheckboxes = [];
  for(let i=0; i<userDirections.length; i++) {
    customCheckboxes.push(<CustomCheckbox label={userDirections[i]} onChange={(event)=>checkUserDirection(event, i)}/>);
  }

  const matchCheckboxes = [];
  for(let i=0; i<matchDetails.length; i++) {
    matchCheckboxes.push(<CustomCheckbox label={matchDetails[i] + ' - ' + matchDetailTypes[i]} onChange={(event)=>checkMatchDetails(event, i)}/>);
  }
  
  const setMatchStruct = (newCheckedList, newMatchList=matchDetails, newMatchDetailTypes=matchDetailTypes) => {
    let matchStruct = ["    struct MatchEvent {"];
    let newConstructorList = [];
    let startString = "    constructor(";
    let entered = false;
    for(let i=0;i<newCheckedList.length; i++) {
      if(!newCheckedList[i]) continue;
      entered = true;
      matchStruct.push(`        ${newMatchDetailTypes[i]} ${newMatchList[i]};`);
      if(newMatchDetailTypes[i].includes('string')){
        startString += newMatchDetailTypes[i] + ' memory ' + newMatchList[i] + '_, ';
      } else {
        startString += newMatchDetailTypes[i] + ' ' + newMatchList[i] + '_, ';
      }
    }
    matchStruct = [...matchStruct,  "    }", "", "    MatchEvent public matchEvent;"];
    setMatchStructSetter(matchStruct);
    startString = startString.slice(0, entered ? startString.length-2 : startString.length) + ") ERC1155(\"\") {";
    newConstructorList = [startString];
    if(newCheckedList[0] && newCheckedList[1]) {
      newConstructorList.push("        require(!compareStrings(homeTeam_, awayTeam_), \"The home and away team can not be the same team.\");");
    }
    if(newCheckedList[2]) {
      newConstructorList.push("        require(startDate_ > block.timestamp, \"You can not set start time of the match to a past date.\");");
    }
    newConstructorList.push("        matchEvent = MatchEvent({");
    let entered2 = false;
    for(let i=0;i<newCheckedList.length; i++) {
      if(!newCheckedList[i]) continue;
      entered2 = true;
      newConstructorList.push(`            ${newMatchList[i]}: ${newMatchList[i]}_,`);
    }
    if(entered2) {
      const lastEl = newConstructorList[newConstructorList.length-1];
      newConstructorList = [...newConstructorList.slice(0, newConstructorList.length-1), lastEl.slice(0, lastEl.length-1)];
    }
    newConstructorList.push("        });");
    setConstructorList(newConstructorList);
    setNewContract(directionEnum, contractName, checked, contractURI, matchStruct, newConstructorList);
  }
  
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
          {customCheckboxes}
        </FormGroup>
        <TextField
        style={{marginTop: '15px'}}
          onChange={targetDirectionNameChange}
          id="outlined-helperText"
          label="New Block Direction"
          value={targetDirectionName}
          defaultValue=""
          onKeyDown={addDirection}
        />
        </div>
       <div style={{ padding: '16px 24px', color: '#44596e' }}>
        <h5>Include Match Event</h5>
        <FormGroup>
          <CustomCheckbox label="Match Event" onChange={handleChange1}/>
          <Divider spacing={1}>Match Details</Divider>
          {matchCheckboxes}
        </FormGroup>
        <div>
        <TextField
        style={{marginTop: '15px'}}
          onChange={matchDetailNameChange}
          label="New Match Detail"
          value={matchDetailName}
          defaultValue=""
          onKeyDown={addMatchDetail}
        />
        <TextField
        style={{marginTop: '15px'}}
          onChange={matchDetailTypeChange}
          label="New Match Detail Type"
          value={matchDetailType}
          defaultValue=""
          onKeyDown={addMatchDetail}
        />
        </div>
        </div>
      </div>
      </div>
  );
};

export default StadiumTicket;

