import { Button, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Web3 from 'web3';


const ContractTransactionsPage = () => {
  // State variables
  const [contractAddress, setContractAddress] = useState('');
  const [contractAbi, setContractAbi] = useState('');
  const [transactionDetails, setTransactionDetails] = useState([]);

  // Create a new Web3 instance
  const web3 = new Web3(window.web3.currentProvider);

  // Function to fetch contract transactions
  const fetchContractTransactions = async () => {
    setTransactionDetails([])
    try {
      const contract = new web3.eth.Contract(JSON.parse(contractAbi), contractAddress);
      const blockNumber = await web3.eth.getBlockNumber();
      const filter = {
        fromBlock: blockNumber - 20000,
        toBlock: 'latest',
        address: contractAddress,
      };
  
      const events = await contract.getPastEvents('allEvents', filter);
      console.log(events);
      await fetchTransactionDetails(events); // Call fetchTransactionDetails() here
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchTransactionDetails = async (events) => {
    try {
      const tempTransactionDetails = [];
  
      // Create an array of promises for each transaction retrieval
      const promises = events.map(async (transaction) => {
        const tx = await web3.eth.getTransaction(transaction.transactionHash);
        console.log(tx);
  
        if (tx) {
          const tempTransaction = {
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            value: web3.utils.fromWei(tx.value, 'ether'),
            gasPrice: web3.utils.fromWei(tx.gasPrice, 'gwei'),
            gas: tx.gas
          };
  
          tempTransactionDetails.push(tempTransaction);
          console.log(tempTransaction);
        }
      });
  
      // Wait for all promises to resolve
      await Promise.all(promises);
  
      setTransactionDetails([...tempTransactionDetails]);
      console.log(transactionDetails);
    } catch (error) {
      console.error(error);
    }
  };
  

  // Event handlers for input fields
  const handleContractAddressChange = (event) => {
    setContractAddress(event.target.value);
  };

  const handleContractAbiChange = (event) => {
    setContractAbi(event.target.value);
  };

  return (
    <div>
      <div>
        <TextField
          id="contract-address"
          label="Contract Address"
          value={contractAddress}
          onChange={handleContractAddressChange}
        />
      </div>
      <div>
        <TextField
          id="contract-abi"
          label="Contract ABI"
          multiline
          rows={4}
          value={contractAbi}
          onChange={handleContractAbiChange}
        />
      </div>
      <Button variant="contained" color="primary" onClick={fetchContractTransactions}>
        Fetch Transactions
      </Button>
      <div>
        <Typography variant="h6">Transaction List</Typography>
        <List>
          {transactionDetails.map((transaction, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Transaction Hash: ${transaction.hash}`}
                secondary={`From: ${transaction.from} - To: ${transaction.to}`}
              />
              {/* Add more transaction details as needed */}
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );

          }  
export default ContractTransactionsPage;
