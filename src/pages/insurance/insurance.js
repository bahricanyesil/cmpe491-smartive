import React, { useEffect, useState } from 'react';
import SourceCodeView from '../../components/source-code-view/source_code_view';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import insuranceContract from '../../contracts/insurance.sol';

const Insurance = () => {
  const [contractCode, setContractCode] = useState(null);
  const [contractName, setContractName] = useState("Insurance");
  const [contractURI, setContractURI] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [extraTokenPrice, setExtraTokenPrice] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [beforeLines, setBeforeLines] = useState([]);
  
  useEffect(() => {
    fetch(insuranceContract)
      .then(r => r.text())
      .then(text => {
        setContractCode(text);
  });
  }, []);

  useEffect(() => {
    fetch(insuranceContract)
      .then((r) => r.text())
      .then((text) => {
        setContractCode(text);
        const allLines = text.split("\n");
        setBeforeLines([
          allLines.slice(0, 6),
          allLines.slice(7, 28),
          allLines.slice(36, 97),
        ]);
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
  const targetTokenPriceChange = (event) => {
    setTokenPrice(event.target.value);
    setNewContract(contractName, contractURI, tokenSymbol, event.target.value);                         // CONTRACT CREATION
  };

  const targetWalletAddressChange = (event) => {
    setWalletAddress(event.target.value);
    setNewContract(contractName, contractURI, tokenSymbol, tokenPrice ,event.target.value);                         // CONTRACT CREATION
  };

  const targetExtraTokenPriceChange = (event) => {
    setExtraTokenPrice(event.target.value);
    setNewContract(contractName, contractURI, tokenSymbol,tokenPrice, walletAddress , event.target.value);                         // CONTRACT CREATION
  };
  const targetTokenAmountChange = (event) => {
    setTokenAmount(event.target.value);
    setNewContract(contractName, contractURI, tokenSymbol,tokenPrice, walletAddress , extraTokenPrice, event.target.value);                         // CONTRACT CREATION
  };

  const targetTotalAmountChange = (event) => {
    setTotalAmount(event.target.value);
    setNewContract(contractName, contractURI, tokenSymbol,tokenPrice, walletAddress , extraTokenPrice, tokenAmount, event.target.value);                         // CONTRACT CREATION
  };


  const setNewContract = (  newContractName = contractName,
    newContractURI = contractURI ,
    newTokenSymbol = tokenSymbol,
    newTokenPrice = tokenPrice,
    newWalletAddress = walletAddress,
    newExtraTokenPrice = extraTokenPrice,
    newTokenAmount = tokenAmount,
    newTotalAmount = totalAmount,
    ) => {
    let newLines = [];
    
    
    for (let i = 0; i < beforeLines.length; i++) {
     // newLines.push(...beforeLines[i]);
      if (i === 0) {
        newLines.push(...beforeLines[i]);
        newLines.push(`contract ${newContractName} is ERC20, Ownable {`);
      } else if (i === 1) {
        newLines.push(...beforeLines[i]);
        newLines.push(`    constructor ( ) ERC20( "${newContractURI}" , "${newTokenSymbol}") {`);
        newLines.push(`        firstTokenSetPrice = ${newTokenPrice};`);
        newLines.push(`        wallet = "${newWalletAddress}";`);
        newLines.push(`        extraTokenPrice = ${newExtraTokenPrice};`);
        newLines.push(`        firstTokenSetAmount =  ${newTokenAmount};`);
        newLines.push(`        _mint(msg.sender, ${newTotalAmount});`);
      } else if (i === 2) {
        newLines.push(...beforeLines[i]);
      } 
      }
    
    setContractCode(newLines.join("\n"));
  };
  
  
  

  return (
    <div style={{ display: "flex", height: "100%", direction: "ltr" }}>
      <div style={{ padding: "16px 24px", width: "77%", color: "#44596e" }}>
        {contractCode ? (
          <SourceCodeView
            key={contractCode}
            contractName={"Insurance Contract Code Editor"}
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
                defaultValue="Insurance"
              />
            </div>
          </Box>
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
                defaultValue="InsuranceToken"
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
                defaultValue="ISK"
              />
            </div>
          </Box>
        </div>

        <div style={{ padding: "5px 24px", color: "#44596e" }}>
          <h5>Enter Price of Token Set</h5>
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
                onChange={targetTokenPriceChange}
                id="outlined-helperText"
                label="Required"
                defaultValue=""
              />
            </div>
          </Box>
        </div>

        <div style={{ padding: "5px 24px", color: "#44596e" }}>
          <h5>Enter Address of Wallet</h5>
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
                onChange={targetWalletAddressChange}
                id="outlined-helperText"
                label="Required"
                defaultValue=""
              />
            </div>
          </Box>
        </div>

        <div style={{ padding: "5px 24px", color: "#44596e" }}>
          <h5>Enter Price of Extra Token</h5>
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
                onChange={targetExtraTokenPriceChange}
                id="outlined-helperText"
                label="Required"
                defaultValue=""
              />
            </div>
          </Box>
        </div>

        <div style={{ padding: "5px 24px", color: "#44596e" }}>
          <h5>Enter amount of Token in Set</h5>
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
                onChange={targetTokenAmountChange}
                id="outlined-helperText"
                label="Required"
                defaultValue=""
              />
            </div>
          </Box>
        </div>

        <div style={{ padding: "5px 24px", color: "#44596e" }}>
          <h5>Enter Total Token Supply</h5>
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
                onChange={targetTotalAmountChange}
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

export default Insurance;