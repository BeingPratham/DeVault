import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./App.css";
import "./components/Home.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Home from './components/Home';

import WSPGallery from './components/Images';
import MyAccess from './components/MyAccess';
import Share  from './components/Share';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import videoBg from "../src/images/earth2.mp4";
import logo from "../src/images/DeVault-logos_white.png"


function BasicExample() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modelopen, setModelopen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {

      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );

        setContract(contract);
        setProvider(provider);

      } else {
        console.error("Metamask is not installed");
      }
    };

    provider && loadProvider();


  }, []);
  return (

    <div className="mainz">
      <video autoPlay loop muted playsInline src={videoBg}></video>
      <div className="content">
        <>
          <Router>
            <Navbar className="nav justify-content-center" expand="lg">
              <Container>
                <Nav.Link as={Link} to="/"><Navbar.Brand ><img src={logo} className="logo"></img></Navbar.Brand></Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link className='{{font-family: Helvetica, Arial, Sans-Serif;}}' as={Link} to="/" >Home</Nav.Link>
                    <Nav.Link as={Link} to='/images' >Snapshots</Nav.Link>
                    {/* <Nav.Link as={Link} to="/imagestemplate">My Image 2</Nav.Link> */}
                    <Nav.Link as={Link} to='/share' >Shared-Images</Nav.Link>
                    <Nav.Link as={Link} to="/myaccess" >Accession</Nav.Link>
                  </Nav>
                  <div className='flx'>
                    <div className='space'></div>
                    <p className='infoAcc'>{account}</p>
                  </div>

                </Navbar.Collapse>
              </Container>

            </Navbar>
            <div>
              <Routes>
                <Route path='/' element={<Home account={account} provider={provider} contract={contract} />}></Route>
                <Route path='/images' element={<WSPGallery account={account} contract={contract} />}></Route>
                <Route path='/share' element={<Share account={account} contract={contract}/>}></Route>
                <Route path='/myaccess' element={<MyAccess contract={contract} />}></Route>
              </Routes>
            </div>
          </Router>
        </>
      </div>
    </div >

  );
}

export default BasicExample;