import "./Home.css";
import { useState } from "react";
import axios from "axios";
const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3ZWNhMzhiYi0xNGIzLTQ2MzgtYjZhZS1hN2RiZDY0ODg0ODUiLCJlbWFpbCI6InVwYWRoeWF5cHJhdGhhbW0yMTVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjhjOGFjNDQwZmQyZWJlMWQ4NTdkIiwic2NvcGVkS2V5U2VjcmV0IjoiMjJjMGJhMjQ5ZWZjZjc0NzA1MTVjNjgzNDRiY2FkNjEyMWI2NzY0NjgzMTYzYTE1ZjEwOTBiMDM1YzliNThjOSIsImlhdCI6MTY3Njk1OTc1Nn0.Mnx8t_sfdJ3SVGUChBv-bIzqUdtWp7oI-WmVzoZNUg4'

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
                maxBodyLength: "Infinity",
                headers: {
                  'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                  Authorization: JWT
                }
              });
            // const resFile = await axios({
            //   method: "post",
            //   url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            //   data: formData,
            //   headers: {
            //     pinata_api_key: `0962b28cafb5473a2fa9`,
            //     pinata_secret_api_key: `959ad43262f30e93baa1d984ffb3979b0e58ff399e48fa7c1fc686598e8304c4`,
            //     "Content-Type": "multipart/form-data",
            //   },
            // });
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
                    accept="image/*,.pdf"
                    onChange={retrieveFile}
                    
                  ></input>
                  
                  <br></br>
                  <button type="submit" className="upload-btn" disabled={!file} >Upload</button>
                </form>
              </div>
    );
}
export default Fileupload;