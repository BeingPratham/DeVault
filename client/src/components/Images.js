import { useEffect, useState } from 'react'
import './Images.css'
import fileIcon from "../images/FileIcon.png";

function WSPGallery({account,contract}){
  const [data, setData] = useState("");
  useEffect(()=>{
    const getdata = async () => {
      let dataArray;
      
      try {
          
          dataArray = await contract.display(account);
        
      } catch (e) {
        alert("You don't have access");
        
      }
      const isEmpty = Object.keys(dataArray).length === 0;
      console.log(dataArray);
      if (!isEmpty) {
        
        const str = dataArray.toString();
        const str_array = str.split(",");
        // console.log(str);
        // console.log(str_array);
        const images = str_array.map((item, i) => {
          console.log(item);
          return (
            <a href={`https://ipfs.io/ipfs/${item.substring(6)}`} key={i} target="_blank">
              <img
                key={i}
                src={fileIcon}
                alt="new"
                className="image-list"
              ></img>
              {/* {item.substring(6)}<br></br> */}
            </a>
            
          );
        });
        setData(images);
      } else {
        alert("No image to display");
      }
    };
    getdata();
  },[]);
  

  return (


    <div>
      
      {/* <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input> */}
      <br></br>
             
             <div className="image-list">{data}</div>

      
    </div >
  )
}

export default WSPGallery

