import {useState } from 'react'

// import { useState, useEffect } from "react";

import "./Images.css";
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

function Share({account,contract}){
  //
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        alert("Enter address to display");
        setData("");
      }
    } catch (e) {
      alert("You don't have access");
    }
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

export default Share

