import { useState, useEffect } from "react";
import "./myaccess.css";
const MyAccess = ({ contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address-share").value;
    await contract.allow(address);
    
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#disp");
      const options = addressList;
      
      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("li");
        e1.textContent = opt;
        e1.value = opt;
        
        select.appendChild(e1);
      }
    
    };
    contract && accessList();
  }, [contract]);

  return (
    <div>
      <center>
        <h1>Share Access</h1>
        <center>
          <form>
            <input
              type="text"
              name="text"
              // id="txt"
              className="address-share"
              placeholder="Enter address here"
              required
            ></input>
            <br></br>
            <button className="share-btn" onClick={() => sharing()}>
              Share
            </button>
            
          </form>
          {/* <button className="share-btn" onClick={() => accessList()}>
              Show address
            </button> */}
          {/* <div className="body"> */}
          {/* <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <button onClick={() => sharing()}>Share</button> */}
          <div className="share-cont">
            <ul id="disp">{/* <li className='address'></li> */}</ul>
          </div>
        </center>
      </center>
    </div>
  );
};

export default MyAccess;
