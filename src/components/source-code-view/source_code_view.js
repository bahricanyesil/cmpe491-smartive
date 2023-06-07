import AssignmentIcon from "@mui/icons-material/Assignment";
import CodeIcon from "@mui/icons-material/Code";
import ConstructionIcon from "@mui/icons-material/Construction";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ExploreIcon from "@mui/icons-material/Explore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { amber, deepOrange, green, teal } from "@mui/material/colors";
import HDWalletProvider from "@truffle/hdwallet-provider";
import CodeEditor from "@uiw/react-textarea-code-editor";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { solidityCompiler } from "../../utils/solidity/index.js";
import AvalancheIcon from "../assets/avalanche.png";
import BloxbergIcon from "../assets/bloxberg.png";
import EthereumIcon from "../assets/ethereum.png";
import PolygonIcon from "../assets/polygon.png";
import DropdownMenuButton from "../dropdown-menu/dropdown_menu_button.js";
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
  const [selectedChain, setSelectedChain] = useState("");
  const [compiledCode, setCompiledCode] = useState("");
  const [deployedAddress, setDeployedAddress] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [code, setCode] = useState(contractCode);
  const [open, setOpen] = useState(false);
  const [deployingContract, setDeployingContract] = useState(false);
  const [userAddress, setUserAddress] = useState([]);
  const [compileLoading, setCompileLoading] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [dialogText, setDialogText] = useState("Successfully Copied!");
  const blockchains = ["Ethereum", "Polygon", "Avalanche", "Bloxberg"];
  const blockchainRPCs = [
    "",
    "https://rpc-mumbai.maticvigil.com/",
    "https://api.avax-test.network/ext/bc/C/rpc",
    "https://core.bloxberg.org",
  ];
  const explorers = [
    "https://sepolia.etherscan.io/tx/",
    "https://mumbai.polygonscan.com/tx/",
    "https://testnet.snowtrace.io/tx/",
    "https://blockexplorer.bloxberg.org/tx/",
  ];

  // Load the cached value on component mount
  useEffect(() => {
    const cachedValue = localStorage.getItem('privateKey');
    if (cachedValue) {
      setPrivateKey(cachedValue);
    }
  }, []);


  const deployContract = async (newSelectedChain) => {
    if ((!privateKey || privateKey.length === 0) && newSelectedChain !== "Ethereum") {
      alert("Please enter your private key from Metamask to deploy!");
      return;
    }
    if (constructorParams) {
      for (let i = 0; i < constructorParams.length; i++) {
        if (!constructorParams[i] || constructorParams[i].length === 0) {
          alert("Please fill all the constructor parameters!");
          return;
        }
      }
    }
    if (window.web3) {
      let rpcURL = "";
      if (newSelectedChain !== "Ethereum") {
        rpcURL = blockchainRPCs[blockchains.indexOf(newSelectedChain)];
      }
      let provider = window.web3.currentProvider;
      if (rpcURL && rpcURL.length > 0) {
        provider = new HDWalletProvider([privateKey], rpcURL);
      } else {
        await switchToEthereum();
      }
      const web3 = new Web3(provider);

      web3.eth.getAccounts(async function (error, accounts) {
        if (accounts.length === 0) {
          alert("Please connect your wallet to use your account!");
          return;
        }
        setUserAddress(accounts);
        const bytecode = compiledCode.evm?.bytecode?.object;
        const contract = new web3.eth.Contract(compiledCode.abi);
        setDeployingContract(true);
        try {
          await contract
            .deploy({
              data: "0x" + bytecode,
              arguments: constructorParams ? constructorParams : [],
            })
            .send({ from: accounts[0], gas: 3000000 })
            .on("confirmation", (confirmationNumber, receipt) => {
              if (confirmationNumber === 1) {
                console.log(
                  "Contract deployed at address:",
                  receipt.contractAddress
                );
                console.log("Transaction hash:", receipt.transactionHash);
                setDeployedAddress(receipt.contractAddress);
                setTransactionHash(receipt.transactionHash);
                setDialogText("Contract Deployed!");
                setOpen(true);
                setUserAddress([window.ethereum.selectedAddress]);
                setDeployingContract(false);
              }
            });
        } catch (error) {
          console.log(error);
          setDeployingContract(false);
          alert(`Error deploying contract!\n\n${error['message'].toString()}`);
        }
      });
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      alert("Please install Metamask to deploy!");
    }
  };

  const switchToEthereum = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        const currentChainId = await web3.eth.getChainId();
        if (currentChainId !== "11155111") {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xAA36A7" }],
          });
        }
      } catch (error) {
        console.error("Error switching to Ethereum:", error);
      }
    } else {
      console.error("MetaMask not detected.");
    }
  };

  const copyAction = () => {
    const contractStart = completeContract.indexOf(`contract ${contractName}`);
    const beforeContract = completeContract.substring(0, contractStart - 1);
    navigator.clipboard.writeText(beforeContract + contractCode);
    setDialogText("Successfully Copied!");
    setOpen(true);
  };

  const privateKeyChange = (event) => {
    const input = event.target.value;
    setPrivateKey(input);
    localStorage.setItem('privateKey', input);
  }

  const compileCode = async () => {
    const contractStart = completeContract.indexOf(`contract ${contractName}`);
    const beforeContract = completeContract.substring(0, contractStart - 1);
    const nameStart = contractCode.indexOf("contract") + 9;
    const nameEnd = contractCode.indexOf("is");
    const contractClassName = contractCode.substring(nameStart, nameEnd - 1);
    setCompileLoading(true);
    try {
      const compiled = await solidityCompiler({
        version: `https://binaries.soliditylang.org/bin/soljson-v0.8.17+commit.8df45f5f.js`,
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

  const openExplorer = () => {
    const explorerURL = explorers[blockchains.indexOf(selectedChain)];
    window.open(explorerURL + transactionHash, "_blank");
  };

  const handleBlockchainChange = (selectedIndex) => {
    const newSelectedChain = blockchains[selectedIndex];
    setSelectedChain(newSelectedChain);
    deployContract(newSelectedChain);
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
  const maskedPrivateKey = "*".repeat(privateKey.length);

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
            <DropdownMenuButton
              divStyle={{ marginLeft: "5px" }}
              icons={[
                <img src={EthereumIcon} alt="Ethereum" height={"25px"} />,
                <img src={PolygonIcon} alt="Polygon" height={"25px"} />,
                <img src={AvalancheIcon} alt="Avalanche" height={"25px"} />,
                <img src={BloxbergIcon} alt="Bloxberg" height={"25px"} />,
              ]}
              handleBlockchainChange={handleBlockchainChange}
              texts={["Ethereum", "Polygon", "Avalanche", ""]}
              buttonText={
                deployingContract
                  ? `Deploying to ${selectedChain}...`
                  : "Deploy"
              }
            ></DropdownMenuButton>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "7px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            required
            onChange={privateKeyChange}
            id="outlined-required"
            label="Private Key"
            value={maskedPrivateKey}
          />
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
      )}{" "}
      {compiledCode ? (
        <div style={{ marginBottom: "15px", marginTop: "15px" }}>
          {deployedAddress && !deployingContract ? (
            <Button
              startIcon={<ExploreIcon />}
              onClick={openExplorer}
              style={{ marginLeft: "5px" }}
              sx={{ backgroundColor: "teal", color: "#fff" }}
              variant="contained"
            >
              Open Explorer
            </Button>
          ) : (
            <div></div>
          )}
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
