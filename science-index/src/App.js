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

const scienceIndexAddress = "0x834a6bBAec202Db55F29062969E67469343D92F1";

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
        setScienceIndex("Loading...");
        setHIndex("Loading...");
        setCareerLength("Loading...");
        setPaperCount("Loading...");
        setCitationCount("Loading...");

        const semanticResp = await fetch(
          "https://api.semanticscholar.org/graph/v1/author/".concat(
          semanticID,
          "?fields=paperCount,citationCount,hIndex,papers.year"
          )
        );
        const respJson = await semanticResp.json();
        
        const paperCount = respJson.paperCount
        const citationCount = respJson.citationCount
        const hindex = respJson.hIndex
        
        const papers = respJson.papers
        let paperYears = []
        for (let i = 0; i < papers.length; i++) {
          if (papers[i].year !== null) {
            paperYears.push(papers[i].year)
          }
        }
        const careerLength = Math.max(...paperYears) - Math.min(...paperYears)
        
        setHIndex(hindex);
        setCareerLength(careerLength);
        setPaperCount(paperCount);
        setCitationCount(citationCount);
        
        const response = await contract.getScienceIndex(
          semanticID, 
          hindex, 
          careerLength, 
          paperCount, 
          citationCount
        );

        await response.wait();
        const receipt = await provider.getTransactionReceipt(response.hash);
        console.log("receipt: ", receipt);
        console.log("value: ", receipt.logs[0].data.substring(0, 66));
        setScienceIndex(ethers.utils.formatEther(BigNumber.from(receipt.logs[0].data.substring(0, 66)).fromTwos(256)));
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
        <TextField className="OutputText"
          label={"Science Index" + (semanticID != "" ? " for " + semanticID : "")}
          value={scienceIndex}
        />
      </Stack>
      <Stack className="Output" alignItems="center">
        <TextField className="OutputText"
          label={"h-index" + (semanticID != "" ? " for " + semanticID : "")}
          value={hIndex}
          size="small"
        />
      </Stack>
      <Stack className="Output" alignItems="center">
        <TextField className="OutputText"
          label={"Career Length" + (semanticID != "" ? " for " + semanticID : "")}
          value={careerLength}
          size="small"
        />
      </Stack>
      <Stack className="Output" alignItems="center">
        <TextField className="OutputText"
          label={"Paper Count" + (semanticID != "" ? " for " + semanticID : "")}
          value={paperCount}
          size="small"
        />
      </Stack>
      <Stack className="Output" alignItems="center">
        <TextField className="OutputText"
          label={"Citation Count" + (semanticID != "" ? " for " + semanticID : "")}
          value={citationCount}
          size="small"
        />
      </Stack>
    </div>
  );
}

export default App;
