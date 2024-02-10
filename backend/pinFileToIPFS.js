const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
require('dotenv').config()
const {deleteFile} = require('./deleteFile.js')
const JWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3Nzg4Y2FiMS03ZjQ0LTRlNzEtOTNjNC03NDc5ZGRmYmU4NDUiLCJlbWFpbCI6InRoZXJlbmFzaGFoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlOTdlNGVjMjY5ZmE4NzY1YmE5YiIsInNjb3BlZEtleVNlY3JldCI6ImVmNTViNWU2ODQ2YjQ4ZWMyNmQ3MTg0OWNjNDkxYjBmMTdlYTI5M2UxZTI0YTc0YWJmMTg4Y2MzYWVjMzhlYzMiLCJpYXQiOjE3MDc1NzM5NTB9.Yw3cl2XrRlbnMWr6p7XBqoQJu52FgaW5aPknXPZW3GI`

const pinFileToIPFS = async (path) => {
  let hash='';
    const formData = new FormData();
  
    const src = `${path}.txt`;
    
    const file = await fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: `${path}.txt`,
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      deleteFile(`${path}.txt`)
      deleteFile(`${path}.json`)
      return res.data.IpfsHash;
    } catch (error) {
      console.log(error);
    }
    
}

module.exports = pinFileToIPFS;