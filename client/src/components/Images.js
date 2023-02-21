import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
// import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons'

import './Images.css'

function WSPGallery(){

  const [account,setAccount] = useState("");
  const [contract,setContract] = useState(null);
  useEffect(() => {
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("effe");
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
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        console.log(contract);
        console.log(account);
        setContract(contract);
        
        
      } else {
        console.error("Metamask is not installed");
      }
    };
    
    provider && loadProvider();
    // loadProvider();
    
    
  }, []);
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address-img").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
        
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;
  
    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              
              alt="new"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
      console.log("data",data.length);
    } else {
      alert("No image to display");
    }
  };
  //
  const [slideNumber, setSlideNumber] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = (index) => {
    setSlideNumber(index)
    setOpenModal(true)
  }

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  // Previous Image
  const prevSlide = () => {
    slideNumber === 0
      ? setSlideNumber(data.length - 1)
      : setSlideNumber(slideNumber - 1)
  }

  // Next Image  
  const nextSlide = () => {
    slideNumber + 1 === data.length
      ? setSlideNumber(0)
      : setSlideNumber(slideNumber + 1)
  }

  return (


    <div>
      
      <input
        type="text"
        placeholder="Enter Address"
        className="address-img"
      ></input>
      <br></br>
             <button onClick={getdata} className="getdata">Get Data</button>
             <div className="image-list">{data}</div>

      
    </div >
  )
}

export default WSPGallery
