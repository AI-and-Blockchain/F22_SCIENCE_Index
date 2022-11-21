import './App.css';
import scienceIndexAbi from "./scienceIndexAbi.json";
import {ethers, BigNumber} from "ethers";
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
  const [scienceIndex, setScienceIndex] = useState("");
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
        console.log("value: ", receipt.logs[0].data.substring(0, 66));
        setScienceIndex(ethers.utils.formatEther(BigNumber.from(receipt.logs[0].data.substring(0, 66)).fromTwos(256)));
        setHIndex(ethers.utils.formatEther(BigNumber.from("0x" + receipt.logs[0].data.substring(66, 130)).fromTwos(256)));
        setCareerLength(ethers.utils.formatEther(BigNumber.from("0x" + receipt.logs[0].data.substring(130, 194)).fromTwos(256)));
        setPaperCount(ethers.utils.formatEther(BigNumber.from("0x" + receipt.logs[0].data.substring(194, 258)).fromTwos(256)));
        setCitationCount(ethers.utils.formatEther(BigNumber.from("0x" + receipt.logs[0].data.substring(258, 322)).fromTwos(256)));
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
      <Stack className="Output" alignItems="center">
        <TextField
          label={"Science Index" + (semanticID != "" ? " for " + semanticID : "")}
          value={scienceIndex}
        />
      </Stack>
      <Stack className="Output" alignItems="center">
        <TextField
          label={"h-index" + (semanticID != "" ? " for " + semanticID : "")}
          value={hIndex}
        />
      </Stack>
      <Stack className="Output" alignItems="center">
        <TextField
          label={"Career Length" + (semanticID != "" ? " for " + semanticID : "")}
          value={careerLength}
        />
      </Stack>
      <Stack className="Output" alignItems="center">
        <TextField
          label={"Paper Count" + (semanticID != "" ? " for " + semanticID : "")}
          value={paperCount}
        />
      </Stack>
      <Stack className="Output" alignItems="center">
        <TextField
          label={"Citation Count" + (semanticID != "" ? " for " + semanticID : "")}
          value={citationCount}
        />
      </Stack>
    </div>
  );
}

export default App;
