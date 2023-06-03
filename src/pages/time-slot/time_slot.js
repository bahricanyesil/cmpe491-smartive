import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from 'react';
import CustomCheckbox from "../../components/checkbox/custom_checkbox";
import SourceCodeView from '../../components/source-code-view/source_code_view';

import TimeSlotContract from '../../contracts/timeSlot.sol';

const TimeSlot = () => {
  const [contractCode, setContractCode] = useState(null);
  const [contractName, setContractName] = useState("TimeSlot");
  const [contractURI, setContractURI] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [beforeLines, setBeforeLines] = useState([]);
  const [interval, setInterval] = useState("");


  useEffect(() => {
    fetch(TimeSlotContract)
      .then((r) => r.text())
      .then((text) => {
        setContractCode(text);
        const allLines = text.split("\n");
        setBeforeLines([
          allLines.slice(0, 9),
          allLines.slice(10, 32),
          allLines.slice(38, 88),
        ]);
      });
  }, []);
  

  useEffect(() => {
    fetch(TimeSlotContract)
      .then(r => r.text())
      .then(text => {
        setContractCode(text);
  });
  }, []);

  const targetNameChange = (event) => {
    setContractName(event.target.value);
    setNewContract(event.target.value);                         // CONTRACT CREATION
  };

  const targetURIChange = (event) => {
    setContractURI(event.target.value);
    setNewContract(contractName, event.target.value);                         // CONTRACT CREATION
  };

  const targetTokenSymbolChange = (event) => {
    setTokenSymbol(event.target.value);
    setNewContract(contractName, contractURI, event.target.value);                         // CONTRACT CREATION
  };
  
  const targetEventNameChange = (event) => {
    setEventName(event.target.value);
    setNewContract(contractName, contractURI, tokenSymbol, event.target.value);                         // CONTRACT CREATION
  };
  
  const targetEventStartTimeChange = (event) => {
    setEventStartTime(event.target.value);
    setNewContract(contractName, contractURI, tokenSymbol, eventName, event.target.value);                         // CONTRACT CREATION
  };

  const targetEventEndTimeChange = (event) => {
    setEventEndTime(event.target.value);
    setNewContract(contractName, contractURI, tokenSymbol, eventName, eventStartTime, event.target.value);                         // CONTRACT CREATION
  };
  
  const targetIntervalChange = (event) => {
    setInterval(event.target.value);
    setNewContract(contractName, contractURI, tokenSymbol, eventName, eventStartTime, interval ,event.target.value);                         // CONTRACT CREATION
  };


  const setNewContract = ( newContractName = contractName,
    newContractURI = contractURI ,
    newTokenSymbol = tokenSymbol,
    newEventName = eventName,
    newEventStartTime = eventStartTime,
    newEventEndTime = eventEndTime,
    newInterval = interval, ) => {
    let newLines = [];
    
    
    for (let i = 0; i < beforeLines.length; i++) {
     // newLines.push(...beforeLines[i]);
      if (i === 0) {
        newLines.push(...beforeLines[i]);
        newLines.push(`contract ${newContractName} is ERC721, Pausable, Ownable {`);
      } else if (i === 1) {
        newLines.push(...beforeLines[i]);
        newLines.push(`    constructor ( ) ERC721( "${newContractURI}" , "${newTokenSymbol}")`);
        newLines.push(`        EventDetails.eventName = "${newEventName}";`);
        newLines.push(`        EventDetails.eventStartTime = ${newEventStartTime};`);
        newLines.push(`        EventDetails.eventEndTime = ${newEventEndTime};`);
        newLines.push(`        EventDetails.interval = ${newInterval};`);
      } else if (i === 2) {
        newLines.push(...beforeLines[i]);
      } 
      }
    
    setContractCode(newLines.join("\n"));
  };


  return (
<<<<<<< HEAD
    <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
      <main>
        <div style={{ padding: '16px 24px', color: '#44596e' }}>
       {contractCode ? <SourceCodeView key={contractCode} contractName={"Time Slots Contract Code Editor"} contractCode={contractCode}/> : <p>Loading...</p>}
=======
    <div style={{ display: "flex", height: "100%", direction: "ltr" }}>
      <div style={{ padding: "16px 24px", width: "77%", color: "#44596e" }}>
        {contractCode ? (
          <SourceCodeView
            key={contractCode}
            contractName={"Time Slot Contract Code Editor"}
            contractCode={contractCode}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>{" "}
      <div
        style={{
          marginTop: "17px",
          marginLeft: "15px",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <h3 style={{ textAlign: "center" }}>Edit the Parameters</h3>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <h5>Enter Contract Name</h5>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
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
                defaultValue="TimeSlot"
              />
            </div>
          </Box>
>>>>>>> 78c09e94051cc41e16aa9d9d8a83dee62aba3fdb
        </div>

        <div style={{ padding: "5px 24px", color: "#44596e" }}>
          <h5>Enter Token URI</h5>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
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

        <div style={{ padding: "5px 24px", color: "#44596e" }}>
          <h5>Enter Token Symbol</h5>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                onChange={targetTokenSymbolChange}
                id="outlined-helperText"
                label="Token Symbol"
                defaultValue=""
              />
            </div>
          </Box>
        </div>

        <div style={{ padding: "5px 24px", color: "#44596e" }}>
          <h5>Enter Name of the Event</h5>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                onChange={targetEventNameChange}
                id="outlined-helperText"
                label="Required"
                defaultValue=""
              />
            </div>
          </Box>
        </div>

        <div style={{ padding: "5px 24px", color: "#44596e" }}>
          <h5>Enter Start Time of the Event</h5>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                onChange={targetEventStartTimeChange}
                id="outlined-helperText"
                label="Required"
                defaultValue=""
              />
            </div>
          </Box>
        </div>

        <div style={{ padding: "5px 24px", color: "#44596e" }}>
          <h5>Enter End Time of the Event</h5>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                onChange={targetEventEndTimeChange}
                id="outlined-helperText"
                label="Required"
                defaultValue=""
              />
            </div>
          </Box>
        </div>

        <div style={{ padding: "5px 24px", color: "#44596e" }}>
          <h5>Enter Interval</h5>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                onChange={targetIntervalChange}
                id="outlined-helperText"
                label="Required"
                defaultValue=""
              />
            </div>
          </Box>
        </div>








      </div>
        
    </div>
   
  );
};

export default TimeSlot;