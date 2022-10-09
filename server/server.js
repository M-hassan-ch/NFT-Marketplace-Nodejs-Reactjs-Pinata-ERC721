const express = require("express");
var path = require('path');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');
var cors = require("cors");
var FormData = require('form-data');
var axios = require('axios');

const app = express();
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// uploading metadata to pinata
// 1: send file to IPFS
// 2: send meta-data to ipfs

const sendFileToIPFS = async (myFILE) => {
    if (myFILE) {
      try {
        const formData = new FormData();
        formData.append('file', myFILE.data, myFILE.name);

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
app.get('/test', (req, res) => {
    console.log('processing file', __dirname);
    var options = {
        root: path.join(__dirname)
    };

    var fileName = '1.png';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
})

app.post('/upload', (req, res)=>{
    console.log('got upload post req');
    sendFileToIPFS(req.files.file);
    res.send(true);
})

app.listen('4000', () => {
    console.log("listening on port 4000!");
});

