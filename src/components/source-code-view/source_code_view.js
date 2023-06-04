import AssignmentIcon from "@mui/icons-material/Assignment";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CodeIcon from "@mui/icons-material/Code";
import ConstructionIcon from "@mui/icons-material/Construction";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { amber, deepOrange, green, pink, teal } from "@mui/material/colors";
import CodeEditor from "@uiw/react-textarea-code-editor";
import React, { useState } from "react";
import Web3 from "web3";
import { solidityCompiler } from "../../utils/solidity/index.js";
import "./source_code_view.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SourceCodeView = ({
  contractName,
  contractCode,
  completeContract,
  constructorParams,
}) => {
  const [compiledCode, setCompiledCode] = useState("");
  const [deployedAddress, setDeployedAddress] = useState("");
  const [code, setCode] = useState(contractCode);
  const [open, setOpen] = useState(false);
  const [deployingContract, setDeployingContract] = useState(false);
  const [userAddress, setUserAddress] = useState([]);
  const [compileLoading, setCompileLoading] = useState(false);
  const [deployLoading, setDeployLoading] = useState(false);
  const [dialogText, setDialogText] = useState("Successfully Copied!");

  const deployContract = async () => {
    for(let i=0;i<constructorParams.length;i++){
      if(constructorParams[i] == null || constructorParams[i].length===0){
        console.log(constructorParams)
        alert("Please fill all the constructor parameters!");
        return;
      }
    }
    if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
      web3.eth.getAccounts(async function (error, accounts) {
        if (accounts.length === 0) {
          alert("Please connect your wallet to use your account!");
        }
        setUserAddress(accounts);
        const enabled = accounts.length > 0;
        if (window.ethereum && accounts.length === 0) {
          window.ethereum.enable().then(() => {
            enabled = true;
          });
        }
        const bytecode = compiledCode.evm?.bytecode?.object;
        const contract = new web3.eth.Contract(compiledCode.abi);
        setDeployingContract(true);
        try {
          await contract
            .deploy({ data: bytecode, arguments: constructorParams })
            .send({ from: accounts[0], gas: 3000000 })
            .on("confirmation", (confirmationNumber, receipt) => {
              if (confirmationNumber === 1) {
                console.log(
                  "Contract deployed at address:",
                  receipt.contractAddress
                );
                setDeployedAddress(receipt.contractAddress);
                setDialogText("Contract Deployed!");
                setOpen(true);
                setUserAddress([window.ethereum.selectedAddress]);
              }
            });
        } catch (error) {
          console.log("Error:", error);
          console.log(error);
        } finally {
          setDeployingContract(false);
        }
      });
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const copyAction = () => {
    const contractStart = completeContract.indexOf(`contract ${contractName}`);
    const beforeContract = completeContract.substring(0, contractStart - 1);
    navigator.clipboard.writeText(beforeContract + contractCode);
    setDialogText("Successfully Copied!");
    setOpen(true);
  };

  const compileCode = async () => {
    const contractStart = completeContract.indexOf(`contract ${contractName}`);
    const beforeContract = completeContract.substring(0, contractStart - 1);
    const nameStart = contractCode.indexOf("contract") + 9;
    const nameEnd = contractCode.indexOf("is");
    const contractClassName = contractCode.substring(nameStart, nameEnd - 1);
    setCompileLoading(true);
    try {
      const compiled = await solidityCompiler({
        version: `https://binaries.soliditylang.org/bin/soljson-v0.8.20+commit.a1b79de6.js`,
        contractBody: beforeContract + contractCode,
        options: { optimizer: { enabled: true, runs: 1000 } },
      });
      if (compiled.errors) {
        console.log(compiled.errors);
        setDialogText("Error while compiling!");
        setOpen(true);
        return;
      }
      const compiledContract =
        compiled.contracts?.Compiled_Contracts?.[contractClassName];
      setCompiledCode(compiledContract);
      setDialogText("Successfully Compiled!");
      setOpen(true);
    } catch (error) {
      console.log("Error while compiling");
      console.log(error);
    } finally {
      setCompileLoading(false);
    }
  };

  const copyByteCode = () => {
    navigator.clipboard.writeText(compiledCode.evm?.bytecode?.object);
    setDialogText("Successfully Copied Byte Code!");
    setOpen(true);
  };

  const copyABI = () => {
    const formattedABI = JSON.stringify(compiledCode.abi, null, "\t");
    navigator.clipboard.writeText(formattedABI);
    setDialogText("Successfully Copied ABI!");
    setOpen(true);
  };

  const copyDeployedContractAddress = () => {
    navigator.clipboard.writeText(deployedAddress);
    setDialogText("Successfully Copied Deployed Contract Address!");
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const dialogError = dialogText.toLowerCase().includes("error");

  return (
    <div data-color-mode="dark">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "7px",
        }}
      >
        <h4>{contractName} Contract Code Editor</h4>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            startIcon={<ContentCopyIcon />}
            onClick={copyAction}
            variant="contained"
          >
            Copy
          </Button>
          <Button
            startIcon={<ConstructionIcon />}
            onClick={compileCode}
            style={{ marginLeft: "5px" }}
            sx={{ backgroundColor: green[700] }}
            variant="contained"
          >
            {compileLoading ? "Compiling..." : "Compile"}
          </Button>
          {compiledCode ? (
            <Button
              startIcon={<CloudUploadIcon />}
              style={{ marginLeft: "5px" }}
              sx={{ backgroundColor: pink[700] }}
              onClick={deployContract}
              variant="contained"
            >
              Deploy
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={dialogError ? "error" : "success"}
          sx={{ width: "300%" }}
        >
          {dialogText}
        </Alert>
      </Snackbar>
      {compiledCode ? (
        <div style={{ marginBottom: "15px", marginTop: "15px" }}>
          {deployedAddress || deployingContract ? (
            <Button
              startIcon={<LocationOnIcon />}
              onClick={copyDeployedContractAddress}
              style={{ marginLeft: "5px" }}
              sx={{ backgroundColor: teal[500], color: "#fff" }}
              variant="contained"
            >
              {deployingContract ? "Loading..." : "Copy Contract Address"}
            </Button>
          ) : (
            <div></div>
          )}
          <Button
            startIcon={<AssignmentIcon />}
            onClick={copyABI}
            style={{ marginLeft: "5px" }}
            sx={{ backgroundColor: amber[500], color: "#fff" }}
            variant="contained"
          >
            Copy ABI
          </Button>
          <Button
            startIcon={<CodeIcon />}
            onClick={copyByteCode}
            style={{ marginLeft: "5px" }}
            sx={{ backgroundColor: deepOrange[500], color: "#fff" }}
            variant="contained"
          >
            Copy ByteCode
          </Button>
        </div>
      ) : (
        <div></div>
      )}
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
          fontSize: 12,
        }}
      />
    </div>
  );
};

export default SourceCodeView;
