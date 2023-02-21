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

function WSPGallery({account,contract}){
  // console.log("img",account);
  // const [data, setData] = useState("");
  // const getdata = async () => {
  //   let dataArray;
  //   const Otheraddress = document.querySelector(".address-img").value;
  //   console.log(Otheraddress);
  //   try {
  //     if (Otheraddress) {
  //       dataArray = await contract.display(Otheraddress);
        
  //     } else {
        
  //       dataArray = await contract.display(account);

  //       console.log(dataArray);
  //     }
    
  //   } catch (e) {
  //     alert("You don't have access");
  //   }
  //   const isEmpty = Object.keys(dataArray).length === 0;
  
  //   if (!isEmpty) {
  //     const str = dataArray.toString();
  //     const str_array = str.split(",");
  //     console.log(str_array);
  //     const images = str_array.map((item, i) => {
  //       return (
  //         <a href={item} key={i} target="_blank">
  //           <img
  //             key={i}
  //             src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              
  //             alt="new"
  //             className="image-list"
  //           ></img>
  //         </a>
  //       );
  //     });
  //     setData(images);
  //     console.log("data",data.length);
  //   } else {
  //     alert("No image to display");
  //   }
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    dataArray = await contract.display(account);
    // try {
    //   if (Otheraddress) {
    //     dataArray = await contract.display(Otheraddress);
    //     console.log(dataArray);
    //   } else {
    //     dataArray = await contract.display(account);
    //   }
    // } catch (e) {
    //   alert("You don't have access");
    // }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
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
        className="address"
      ></input>
      <br></br>
             <button onClick={getdata} className="getdata">Get Data</button>
             <div className="image-list">{data}</div>

      
    </div >
  )
}

export default WSPGallery

