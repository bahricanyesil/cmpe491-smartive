import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ConstructionIcon from "@mui/icons-material/Construction";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { green, pink, yellow } from "@mui/material/colors";
import CodeEditor from "@uiw/react-textarea-code-editor";
import React, { useState } from "react";
import Web3 from "web3";
import { solidityCompiler } from "../../utils/solidity/index.js";
import "./source_code_view.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SourceCodeView = ({ contractName, contractCode }) => {
  const [compiledCode, setCompiledCode] = useState("");
  const [code, setCode] = useState(contractCode);
  const [open, setOpen] = useState(false);
  const [userAddress, setUserAddress] = useState([]);
  const [compileLoading, setCompileLoading] = useState(false);
  const [deployLoading, setDeployLoading] = useState(false);
  const [dialogText, setDialogText] = useState("Successfully Copied!");

  const deployContract = async () => {
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
        try {
          await contract
            .deploy({ data: bytecode })
            .send({ from: accounts[0], gas: 3000000 })
            .on("confirmation", (confirmationNumber, receipt) => {
              if (confirmationNumber === 1) {
                console.log(
                  "Contract deployed at address:",
                  receipt.contractAddress
                );
                setDialogText("Contract Deployed!");
                setOpen(true);
                setUserAddress([window.ethereum.selectedAddress]);
              }
            });
        } catch (error) {
          console.log("Error:", error);
          console.log(error);
        }
      });
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const copyAction = () => {
    navigator.clipboard.writeText(contractCode);
    setDialogText("Successfully Copied!");
    setOpen(true);
  };

  const compileCode = async () => {
    setCompileLoading(true);
    try {
      const compiled = await solidityCompiler({
        version: `https://binaries.soliditylang.org/bin/soljson-v0.8.20+commit.a1b79de6.js`,
        contractBody: contractCode,
        options: { optimizer: { enabled: true, runs: 1000 } },
      });
      console.log(compiled);
      if(compiled.errors) {
        console.log(compiled.errors);
        setDialogText("Error while compiling!");
        setOpen(true);
        return;
      }
      const contractClassName = contractName.replace(
        /\b(Contract|Code|Editor)\b/g,
        ""
      );
      const compiledContract =
        compiled.contracts?.Compiled_Contracts?.[
          contractClassName.replace(/\s/g, "")
        ];
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

  const handleClose = (event) => {
    setOpen(false);
  };

  const dialogError = dialogText.toLowerCase().includes('error');

  return (
    <div data-color-mode="dark">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "7px",
        }}
      >
        <h4>{contractName}</h4>
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
        <Alert onClose={handleClose} severity={dialogError ? "error" : "success"} sx={{ width: "300%" }}>
          {dialogText}
        </Alert>
      </Snackbar>
      {compiledCode ? (
        <div style={{ marginBottom: "15px" }}>
          <Button
            startIcon={<ConstructionIcon />}
            onClick={copyABI}
            style={{ marginLeft: "5px" }}
            sx={{ backgroundColor: yellow[900] }}
            variant="contained"
          >
            Copy ABI
          </Button>
          <Button
            startIcon={<ConstructionIcon />}
            onClick={copyByteCode}
            style={{ marginLeft: "5px" }}
            sx={{ backgroundColor: yellow[900] }}
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
