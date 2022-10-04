import React, { useState } from 'react';
//import { create } from 'ipfs-http-client';
import axios from "axios";


// https://gateway.pinata.cloud/ipfs/QmYXEZGtq2pSS7ESzSxHvzqWBokqAmwSB6UiEJAzx8CM2u

//https://ipfs.io/ipfs/QmYXEZGtq2pSS7ESzSxHvzqWBokqAmwSB6UiEJAzx8CM2u

export default function CreateNft() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const fs = require('fs')
  // const client = create('https://ipfs.infura.io:5001/api/v0')

  const handleFileUpload = (e) => {
    console.log('iam called');
    // console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }


  const sendFileToIPFS = async (e) => {

    if (file) {
      try {

        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            'pinata_api_key': `0ff5ad9412a16bad7844`,//${process.env.REACT_APP_PINATA_API_KEY}
            'pinata_secret_api_key': `db0449ed6687d85298f9ac3a92cf7ba3fee25a780a8186203566738c8603c5c5`,//${process.env.REACT_APP_PINATA_API_SECRET}
            "Content-Type": "multipart/form-data"
          },
        });

        const ImgHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`;
        console.log("file hash", ImgHash);

      } catch (error) {
        console.log("Error sending File to IPFS: ")
        console.log(error)
      }
    }
  }

  const json = async () => {
    const obj = {
      attributes: [
        {
          "color": "orange",
          "value": "ABC"
        }
      ],
      description: "This is a nice picture.",
      image: "https://ipfs.io/ipfs/QmYXEZGtq2pSS7ESzSxHvzqWBokqAmwSB6UiEJAzx8CM2u",
      name: "Fire"
    }
    const json = await JSON.stringify(obj);

    await fs.writeFile('./file.json', JSON.stringify(json), (err) => {
      if (err) console.log('Error writing file:', err);
    })

  }


  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 shadow rounded border border-primary">
            <form className='px-3 py-3'>
              <div className="form-group mt-4">
                <label htmlFor="name"><b>NFT Name</b></label>
                <input type="text" className="form-control mt-2" id="name" placeholder="name" />
              </div>

              <div className="form-group mt-4">
                <label htmlFor="desc"><b>Description</b></label>
                <input type="text" className="form-control mt-2" id="desc" placeholder="details" />
              </div>

              <div className="form-group mt-4">
                <label htmlFor="file"><b>Asset</b></label>
                <input type="file" className="form-control form-control-file mt-2" id="file" onChange={handleFileUpload} />
              </div>

              <button className="btn btn-primary mt-4 px-4 py-2" type='button' onClick={json}><b>create</b></button>
            </form>
          </div>
        </div>
      </div>

      {/* <img src="https://ipfs.io/ipfs/QmYXEZGtq2pSS7ESzSxHvzqWBokqAmwSB6UiEJAzx8CM2u" alt="" /> */}

    </>
  )
}
