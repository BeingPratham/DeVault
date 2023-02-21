import "./Home.css";
import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Fileupload  from "./Fileupload";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import WSPGallery from "./Images";

function Home({account,provider,contract}) {
    // const { ethers } = require("ethers");
  //   const [account,setAccount] = useState("");
  // const [contract,setContract] = useState(null);
  // const [provider,setProvider] = useState(null);
  // const [modelopen,setModelopen] = useState(false);

  // useEffect(() => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   console.log("effe");
  //   const loadProvider = async () => {
  //     console.log("Helloo");
  //     if (provider) {
  //       window.ethereum.on("chainChanged", () => {
  //         window.location.reload();
  //       });

  //       window.ethereum.on("accountsChanged", () => {
  //         window.location.reload();
  //       });
  //       await provider.send("eth_requestAccounts", []);
  //       const signer = provider.getSigner();
  //       const address = await signer.getAddress();
  //       setAccount(address);
  //       BasicExample({account:"pratham"});
  //       let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  //       const contract = new ethers.Contract(
  //         contractAddress,
  //         Upload.abi,
  //         signer
  //       );
  //       console.log(contract);
  //       console.log(account);
  //       setContract(contract);
  //       setProvider(provider);
        
  //     } else {
  //       console.error("Metamask is not installed");
  //     }
  //   };
    
  //   provider && loadProvider();
  //   // loadProvider();
    
  // }, []);

    return (
      <div className="web-display">
        <div>
          <section className="Parent">
            {/* <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"></img> */}
            <section className="child">
              <div className="Information">
                <p className="content-info">
                    Hello,{account}<br></br>
                  This is DeCentralized file storing and sharing app, Where you can securely store and share your images.
                </p>
              </div>
              <Fileupload account={account}
          provider={provider}
          contract={contract}></Fileupload>
            </section>
            <div className="img">
              {/* <img className="Img-eth" src="https://gifdb.com/images/high/ethereum-crypto-currency-ze5wridyq212wbi8.gif" alt="Etherium"></img> */}
            </div>
          </section>
        </div>
        </div>
      );
}
export default Home;
