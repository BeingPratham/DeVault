import { useState, useEffect } from "react";
import "./myaccess.css";
const MyAccess = ({contract}) =>{
  const sharing = async () => {
    // e.preventDefault();
    const address = document.querySelector(".address-share").value;
    console.log(address);
    await contract.allow(address);
    // setModalOpen(false);
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
  // const [value, setValue] = useState("");
  // const ref = useRef(null);
  // const sharing = async (e) => {

  //   e.preventDefault();
  //   try{
  //     const address = value;
  //     console.log(address);
  //   }
  //   catch(e){
  //     e.preventDefault();
  //     console.log(e);
  //   }
    // const address = document.querySelector(".address-share").value;
    
    // const address = 
    // const address="0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
    
    // await contract.allow(address);
    
    // await contract.allow(address);
    
  // };
  // const addAccess = async() => {
    // const address = document.querySelector(".address-share").value;
    
    // let addr = list;
    // const addressList = await contract.shareAccess();
    // const options = addressList;
    // console.log(options.length);
    // for (let i = 0; i < options.length; i++) {
    //   console.log(options[i]);
    // }
  // }
  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };

  // useEffect(() => {
    
  //   const myfun=()=>{
  //     console.log("hello");
  //     console.log(contract);
  //   }
    // const accessList = async () => {
    //   const addressList = await contract.shareAccess();
    //   // let select = document.querySelector("#disp");
    //   let select = ref.current;
    //   const options = addressList;
    //   console.log(options);
    //   for (let i = 0; i < options.length; i++) {
    //     let opt = options[i];
    //     let e1 = document.createElement("li");
    //     e1.textContent = opt;
    //     e1.value = opt;
        
    //     select.appendChild(e1);
    //   }
    
    // };
    // contract && accessList();
  //   contract && myfun();
    
  // }, [contract]);

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
              // value={value}
              // onChange={handleChange}
              className="address-share"
              placeholder="Enter address here"
              required
            ></input>
            <br></br>
            <button className="share-btn" onClick={() => sharing()}>
              Share
            </button>
            {/* <button onClick={() => sharing()}>Share</button> */}
            
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
          <div  className="share-cont">
            <ul id="disp">{/* <li className='address'></li> */}</ul>
          </div>
        </center>
      </center>
    </div>
  );
};

export default MyAccess;
