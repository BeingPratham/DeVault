import {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import { ethers } from "ethers";
import "./myaccess.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
const MyAccess = () => {
    let prev=0;
    const [contract,setContract] = useState(null);
    const sharing = async () => {
    
        const address = document.querySelector(".address").value;
        console.log(address);
        await contract.allow(address);
        
      };
      const revoke = async () => {
    
        const address = document.querySelector(".address").value;
        console.log("Revoke:- ",address);
        // await contract.disallow(address);
        
      };
      
    //   setTimeout(accessList,1000);
    
      useEffect(() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        const loadProvider = async () => {
            console.log("Helloo");
            if (provider) {
              window.ethereum.on("chainChanged", () => {
                window.location.reload();
              });
      
              window.ethereum.on("accountsChanged", () => {
                window.location.reload();
              });
              await provider.send("eth_requestAccounts", []);
              const signer = provider.getSigner();
              let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
              const contract = new ethers.Contract(
                contractAddress,
                Upload.abi,
                signer
              );
              console.log(contract);
              
              setContract(contract);
              
              
            } else {
              console.error("Metamask is not installed");
            }
          };
          
          
          const accessList = async () => {
    
            const addressList = await contract.shareAccess();
            console.log("add",addressList);
            
            let select = document.querySelector("#disp");
              const options = addressList;
              console.log("prev",prev);
              console.log("option",options.length);
              if(prev<options.length){
                  prev=options.length;
                  console.log("ppreeevv:- ",prev);
                  
            for (let i = 0; i < options.length; i++) {
              let opt = options[i];
              let e1 = document.createElement("li");
              e1.textContent = opt;
              e1.value = opt;
              console.log(e1);
              select.appendChild(e1);
              
            }
            
          }
          
          }
          provider && loadProvider();
          contract && setInterval(accessList,2000);
          
        //   contract && accessList();


        // accessList();
        // setInterval(accessList,10000);
        // console.log(opt);
      }, []);
    return (
        
        <div>
            
        <center>
            <h1>Share Access</h1>
            <center>
                <form>
                    <input type="text" name="text" id="txt" placeholder='Enter address here' required></input>
                    <br></br>
                    <button className='share-btn'  onClick={() => sharing()}>Share</button>
                    
                </form>
                {/* <div className="body"> */}
            {/* <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <button onClick={() => sharing()}>Share</button> */}
          <div className='share-cont'>
            <ul id="disp">
                {/* <li className='address'></li> */}
            </ul>
          </div>
            </center>
        </center>
        
        </div>
        
    )
}

export default MyAccess
