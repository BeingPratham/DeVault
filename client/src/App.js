import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
import { Share } from './components/Share';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";



function BasicExample({account}) {
  // console.log(account);
  return (

    <div className="mainz">
      {/* <video autoPlay loop muted playsInline src={videoBg}></video> */}
      <div className="content">
        <>
          <Router>
          <Navbar bg="dark" expand="lg" variant="dark">
              <Container>
              <Nav.Link as={Link} to="/"><Navbar.Brand >DeVault</Navbar.Brand></Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                     <Nav.Link as={Link} to='/images'>My Images</Nav.Link>
                     {/* <Nav.Link as={Link} to="/imagestemplate">My Image 2</Nav.Link> */}
                     
                     <Nav.Link as={Link} to="/myaccess">My Access</Nav.Link>
                   </Nav>
                 </Navbar.Collapse>
               </Container>
               {/* <p>{account}</p> */}
             </Navbar>
            <div>
              <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/images' element={<WSPGallery/>}></Route>
                 <Route path='/share' element={<Share />}></Route>
                <Route path='/myaccess' element={<MyAccess />}></Route>
              </Routes>
            </div>
          </Router> 
        </>
      </div>
    </div >

  );
}

export default BasicExample;