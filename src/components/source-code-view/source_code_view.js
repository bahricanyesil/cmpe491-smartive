import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ConstructionIcon from '@mui/icons-material/Construction';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { green, pink } from '@mui/material/colors';
import Snackbar from '@mui/material/Snackbar';
import CodeEditor from '@uiw/react-textarea-code-editor';
import React, { useState } from 'react';
import TruffleContract from 'truffle-contract';
import Web3 from 'web3';
import './source_code_view.css';

const contract = TruffleContract();

const bytecode = contract.bytecode

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const SourceCodeView = ({contractName, contractCode}) => {
  const [address, setaddress] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [compiledData, setCompiledData] = useState(null);
  const [code, setCode] = useState(contractCode);
  const [open, setOpen] = useState(false);

  function handleCompile() {
    // const compiled = solc.compile(contractCode);
    // const contractName = Object.keys(compiled.contracts)[0];
    // const abi = JSON.parse(compiled.contracts[contractName].interface);
    // const bytecode = compiled.contracts[contractName].bytecode;
    // setCompiledData({ abi, bytecode });
  }

  const deployContract = async () => {
    if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
      web3.eth.getAccounts(async function(error, accounts) {
        if(accounts.length === 0) {
          alert('Please connect your wallet to use your account!');
        }
        setUserAddress(accounts);
        if (window.ethereum && accounts.length === 0) {
          window.ethereum.enable().then(() => {
            setUserAddress([window.ethereum.selectedAddress]);
          });
        }
      }) 
    } else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };
  
  const copyAction = () => {
    navigator.clipboard.writeText(contractCode);
    setOpen(true);
  }

  const handleClose = (event) => {
    setOpen(false);
  };

  return (
    <div data-color-mode="dark">
    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'7px' }}>
      <h3>{contractName}</h3>
      <div>
      <Button startIcon={<ContentCopyIcon />} onClick={copyAction} variant="contained">Copy</Button>
      <Button startIcon={<ConstructionIcon />} style={{marginLeft: '20px'}} sx={{ backgroundColor: green[700] }} onClick={handleCompile} variant="contained">Compile</Button>
      <Button startIcon={<CloudUploadIcon />} style={{marginLeft: '20px'}} sx={{ backgroundColor: pink[700] }} onClick={deployContract} variant="contained">Deploy</Button>
      </div>
    </div>
    <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '300%' }}>
          Successfully Copied!
        </Alert>
      </Snackbar>
      {compiledData && <p>ABI: {compiledData.abi}</p>}
      {compiledData && <p>Bytecode: {compiledData.bytecode}</p>}
    <CodeEditor
      value={code}
      language="solidity"
      onCopy={(code) => {}}
      placeholder="Please enter JS code."
      onChange={(evn) => setCode(evn.target.value)}
      padding={15}
      style={{
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        fontSize: 12
      }}
    />
  </div>
  );
};

export default SourceCodeView;