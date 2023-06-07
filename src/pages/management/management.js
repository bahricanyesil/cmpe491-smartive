import { Button, Grid, Snackbar, Card, CardContent, TextField, Typography, ListItemIcon } from '@mui/material';
import MuiAlert from "@mui/material/Alert";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ViewListIcon from '@mui/icons-material/ViewList';
import LinkIcon from '@mui/icons-material/Link';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Web3 from 'web3';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransactionCard = ({ transaction }) => {
  return (
    <Card sx={{ backgroundColor: '#c5d1eb', boxShadow: '0px 16px 40px rgba(0, 0, 0, 0.8)', borderRadius: '20px', marginBottom: '10px', marginTop: '10px' }}>
      <CardContent>
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <Typography variant="h6" sx={{ fontWeight: 'bold'}}>Transaction Time:</Typography>
          </div>
          <div style={{ marginTop: '2px', marginLeft: '65px' }}>
            <Typography>{transaction.time}</Typography>
          </div>
        </div>
        <div style={{ marginTop: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
            <CallReceivedIcon />
            </ListItemIcon>
            <Typography variant="h6" sx={{ fontWeight: 'bold'}}>From:</Typography>
          </div>
          <div style={{ marginTop: '2px', marginLeft: '65px' }}>
            <Typography>{transaction.from}</Typography>
          </div>
        </div>
        <div style={{ marginTop: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
            <CallMadeIcon />
            </ListItemIcon>
            <Typography variant="h6" sx={{ fontWeight: 'bold'}}>To:</Typography>
          </div>
          <div style={{ marginTop: '2px', marginLeft: '65px' }}>
            <Typography>{transaction.to}</Typography>
          </div>
        </div>
        <div style={{ marginTop: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
            <FingerprintIcon />
            </ListItemIcon>
            <Typography variant="h6" sx={{ fontWeight: 'bold'}}>Transaction Hash:</Typography>
          </div>
          <div style={{ marginTop: '2px', marginLeft: '65px' }}>
            <Typography>{transaction.hash}</Typography>
          </div>
        </div>
        <div style={{ marginTop: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
            <MonetizationOnIcon />
            </ListItemIcon>
            <Typography variant="h6" sx={{ fontWeight: 'bold'}}>Value:</Typography>
          </div>
          <div style={{ marginTop: '2px', marginLeft: '65px' }}>
            <Typography>{transaction.value}</Typography>
          </div>
        </div>
        <div style={{ marginTop: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
            <LocalGasStationIcon />
            </ListItemIcon>
            <Typography variant="h6" sx={{ fontWeight: 'bold'}}>Gas Price:</Typography>
          </div>
          <div style={{ marginTop: '2px', marginLeft: '65px' }}>
            <Typography>{transaction.gasPrice}</Typography>
          </div>
        </div>
        <div style={{ marginTop: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
            <ViewListIcon />
            </ListItemIcon>
            <Typography variant="h6" sx={{ fontWeight: 'bold'}}>Block Number:</Typography>
          </div>
          <div style={{ marginTop: '2px', marginLeft: '65px' }}>
            <Typography>{transaction.blockNumber}</Typography>
          </div>
        </div>
        <div style={{ marginTop: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
            <LinkIcon />
            </ListItemIcon>
            <Typography variant="h6" sx={{ fontWeight: 'bold'}}>Chain ID:</Typography>
          </div>
          <div style={{ marginTop: '2px', marginLeft: '65px' }}>
            <Typography>{transaction.chainId}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ContractTransactionsPage = () => {
  const location = useLocation();
  const { contractAddressParam, contractAbiParam } = location.state || {};
  const [contractAddress, setContractAddress] = useState(contractAddressParam);
  const [contractAbi, setContractAbi] = useState(contractAbiParam);
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [dialogText, setDialogText] = useState("Successfully Fetched!");

  const web3 = new Web3(window.web3.currentProvider);

  const fetchContractTransactions = async () => {
    setTransactionDetails([]);
    setIsLoading(true);
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
      await fetchTransactionDetails(events);
      showSnackbar();
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const fetchTransactionDetails = async (events) => {
    try {
      const tempTransactionDetails = [];

      const promises = events.map(async (transaction) => {
        console.log(transaction)
        const tx = await web3.eth.getTransaction(transaction.transactionHash);
        console.log(tx);

        if (tx) {
          const block = await web3.eth.getBlock(tx.blockNumber);
          const timestamp = block.timestamp * 1000;
          const tempTransaction = {
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            value: web3.utils.fromWei(tx.value, 'ether'),
            gasPrice: web3.utils.fromWei(tx.gasPrice, 'gwei'),
            gas: tx.gas,
            blockNumber: tx.blockNumber,
            chainId: tx.chainId,
            time: new Date(timestamp).toLocaleString()
          };

          tempTransactionDetails.push(tempTransaction);
          console.log(tempTransaction);
        }
      });

      await Promise.all(promises);

      
      const sortedTransactions = tempTransactionDetails.sort((a, b) => {
        const timeA = new Date(a.time).getTime();
        const timeB = new Date(b.time).getTime();
      
        return timeB - timeA;
      });
      setTransactionDetails([...tempTransactionDetails]);
      console.log(transactionDetails);
    } catch (error) {
      setDialogText("Error occurred!")
      console.error(error);
    }
  };

  const handleContractAddressChange = (event) => {
    setContractAddress(event.target.value);
  };

  const handleContractAbiChange = (event) => {
    setContractAbi(event.target.value);
  };

  const showSnackbar = () => {
    setIsSnackbarOpen(true);
    setTimeout(() => {
      setIsSnackbarOpen(false);
    }, 2000);
  };

  const dialogError = dialogText.toLowerCase().includes("error");

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ margin: '20px 0', width: '500px' }}>
          <TextField
            id="contract-address"
            label="Contract Address"
            value={contractAddress}
            onChange={handleContractAddressChange}
            fullWidth
          />
        </div>

        <div style={{ margin: '20px 0', width: '800px' }}>
          <TextField
            id="contract-abi"
            label="Contract ABI"
            multiline
            rows={8}
            value={contractAbi}
            onChange={handleContractAbiChange}
            fullWidth
          />
        </div>
        <div style={{ width: '350px', marginBottom: '20px'}}>
          <Button
            variant="contained"
            onClick={fetchContractTransactions}
            style={{ marginTop: '10px', width: '100%' }}
            sx={{ backgroundColor: '#1976d2', color: 'white' }}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Fetch Transactions'}
          </Button>
        </div>

        <Card sx={{ backgroundColor: '#B4C0DA', padding: '10px', marginBottom: '20px', borderRadius: '5px', boxShadow: '0px 16px 40px rgba(0, 0, 0, 0.5)'}}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '24px', color: '#fffff', textTransform: 'uppercase', borderBottom: '2px solid #000000', paddingBottom: '5px' }}>Transaction List</Typography>
        </Card>
      </div>
      <div style={{ marginLeft: '20px', marginTop: '20px' }}>
        
        <div style={{marginTop: '20px' }}>
          <Grid container spacing={2}>
            {transactionDetails.map((transaction, index) => (
              <Grid item key={index} xs={6} sm={6} md={6} lg={6}>
                <TransactionCard transaction={transaction} />
              </Grid>
          ))}
        </Grid>
        </div>
      </div>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={() => setIsSnackbarOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={() => setIsSnackbarOpen(false)}
          severity={dialogError ? "error" : "success"}
          sx={{ width: "300%" }}
        >
          {dialogText}
        </Alert>
      </Snackbar>

    </div>
  );
};

export default ContractTransactionsPage;
