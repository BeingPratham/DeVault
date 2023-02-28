import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3ZWNhMzhiYi0xNGIzLTQ2MzgtYjZhZS1hN2RiZDY0ODg0ODUiLCJlbWFpbCI6InVwYWRoeWF5cHJhdGhhbW0yMTVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjVkODdlMDg4YjhiYTc0NTFjOGJkIiwic2NvcGVkS2V5U2VjcmV0IjoiNmM1ZWI2Nzk4OWY4MmIxYjM5N2NiNGI5MjA4MTVjNWUyNWY1NjI5ZDQyMTlkMmQ0YWQyNmVlZmJkYjdhZTU0YSIsImlhdCI6MTY3NzU2NDgyMH0.8Yzgs33y1LQKnOXTfYLz8MZM86p7JsQtx6fhoCafdC0'

const Fileupload=({contract, account, provider})=> {
    const [file, setFile] = useState(null);
      const [fileName, setFileName] = useState("No file selected");
      console.log("hello");
      const handleSubmit = async (e) => {
        console.log("he");
        console.log(file);
        e.preventDefault();
        if (file) {
          try {
            
            const formData = new FormData();
            formData.append("file", file);
    
            const resFile =  await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
              maxContentLength: "Infinity",
                headers: {
                  'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                  Authorization: JWT
                }
              });
            
            console.log(resFile.data.IpfsHash);
            const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
            console.log(ImgHash);
            //const signer = contract.connect(provider.getSigner());
            const signer = contract.connect(provider.getSigner());
            signer.add(account, ImgHash);
            alert("Successfully file Uploaded");
          } catch (e) {
            alert("Unable to upload file to Pinata",e);
          }
        }
        
        setFileName("No file selected");
        setFile(null);
      };
      
      const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        // console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
          setFile(e.target.files[0]);
        };
        console.log(e.target.files[0]);
        setFileName(e.target.files[0].name);
        
        
        e.preventDefault();
      };
      
    return(
        <div className="File">
                <form className="upload" onSubmit={handleSubmit}>
                  <center className="upload-file">Upload Image</center>
                  <input
                    // disabled={!account}
                    type="file"
                    id="file-upload"
                    name="data"
                    
                    onChange={retrieveFile}
                    
                  ></input>
                  
                  {/* <br></br> */}
                  <button type="submit" className="upload-btn" disabled={!file} >Upload</button>
                </form>
              </div>
    );
}
export default Fileupload;