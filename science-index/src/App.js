import './App.css';
import scienceIndexAbi from "./scienceIndexAbi.json";
import {ethers} from "ethers";
import {useEffect, useState} from "react";
import {
  Button,
  Input,
  Typography,
  Stack,
  TextField
} from '@mui/material';

const scienceIndexAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  // CONNECTING
  const [accounts, setAccounts] = useState([]);

  async function connectAccounts() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      setAccounts(accounts);
    }
  }

  useEffect(() => {
    connectAccounts();
  }, []);

  // Getting ScienceIndex
  const [semanticID, setSemanticID] = useState("");
  const [hIndex, setHIndex] = useState("");
  const [careerLength, setCareerLength] = useState("");
  const [paperCount, setPaperCount] = useState("");
  const [citationCount, setCitationCount] = useState("");

  async function handleGetScienceIndex() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        scienceIndexAddress,
        scienceIndexAbi.abi,
        signer
      );
      try {
        const response = await contract.getScienceIndex(semanticID);
        const receipt = await provider.getTransactionReceipt(response.hash);
        console.log("response: ", receipt);
        setScienceIndex(Number(receipt.logs[0].data)/1e18);
      } catch(err) {
        console.log("error: ", err);
      }
    }
  }

  // add border to input box
  return (
    <div className="App">
      <Typography id="Header" variant="h4" gutterBottom>
        Get Your Science index
      </Typography>
      <Stack alignItems="center">
        <Input
          autoFocus
          disableUnderline
          placeholder="Enter Semantic ID here"
          sx={{ alignItems: 'center'}}
          onChange={(event) => {setSemanticID(event.target.value)}}
        >
        </Input>
      </Stack>
      <Stack className="Button" alignItems="center">
        <Button onClick={handleGetScienceIndex} sx={{backgroundColor: "rgb(135, 246, 246)", margin: 1}}>
          Get
        </Button>
      </Stack>
      <TextField
        label={"Science Index" + (semanticID != "" ? " for " + semanticID : "")}
        value={hIndex}
      />
      <TextField
        label={"h-index" + (semanticID != "" ? " for " + semanticID : "")}
        value={scienceIndex}
      />
      <TextField
        label={"Career Length" + (semanticID != "" ? " for " + semanticID : "")}
        value={careerLength}
      />
      <TextField
        label={"Paper Count" + (semanticID != "" ? " for " + semanticID : "")}
        value={paperCount}
      />
      <TextField
        label={"Citation Count" + (semanticID != "" ? " for " + semanticID : "")}
        value={citationCount}
      />
    </div>
  );
}

export default App;
