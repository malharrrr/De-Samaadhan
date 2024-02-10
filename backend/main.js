
const ethersFunctions = require('./StoreHashOnChain.js');
const { storeUserHash, getUserHash, getUserCertificateHash, storeUserCertificateHash, contract, contractAddress, contractABI, connectedWallet, provider, wallet, privateKe } = ethersFunctions;
const { collection, getDocs, getDoc, doc } = require('firebase/firestore');
const db = require('./firebase.js')
const { encryptFile, decryptFile } = require('./encryption/EncryptDecrypt.js');
const fs = require('fs');
const pinFileToIPFS = require('./pinFileToIPFS.js');
//const pinImageToIPFS = require('./pinImageToIPFS.js');
require('dotenv').config();
//const downloadFile = require('./FetchFromIPFS.js');
const { deleteFile } = require('./deleteFile.js');
const secretKey = "f21fa34350a5068fdeeb05cbc05858f4";

async function addUserDetails(useRef) {
    try {
        await encryptFile(`${useRef}.json`, secretKey, `${useRef}.txt`);
        console.log(`file Encrypted with ${useRef}.txt`);   

        const IPFSObject = await pinFileToIPFS(useRef);
        await storeUserHash(useRef, IPFSObject);
        

        console.log('User created successfully');
    } catch (error) {
        console.error('Error in addUserDetails:', error);
        // Handle the error appropriately
    }
}

// addUserDetails(useRef, FormData)


async function fetchUserDetails(useRef) {
    try {
      const UserKey = await readKey(useRef);
      const IpfsHash = await getUserHash(useRef);
      await downloadFile(IpfsHash, `${useRef}`);
      const decryptedFileMsg = await decryptFile(`${useRef}.txt`, UserKey, `${useRef}_decrypt.json`);
      console.log(decryptedFileMsg);
  
      const data = await fs.readFileSync(`${useRef}_decrypt.json`);
      deleteFile(`${useRef}.txt`);
      deleteFile(`${useRef}_decrypt.json`);
      return data;
    } catch (error) {
      console.error('Error:', error);
      // Handle the error here
      return null;
    }
  }



// fetchUserDetails('JVuuma0mzMuiGh2bdH5g')
async function genCertificate(name, useRef,email) {
    const certificate = await generateCertificate(name)
    const emailsend= sendEmailToRecipient(email, name)
    const imageHash = await pinImageToIPFS(`./Certificates/${name}.png`)
    const store = await storeUserCertificateHash(useRef, imageHash)
    return imageHash
}
// genCertificate('Bhargav Pandit', 'JVuuma0mzMuiGh2bdH5g')

async function revoCertificate(name, useRef, email){
    const certificate = await revokeCertificate(name)
    const imageHash = await pinImageToIPFS(`./Certificates/${name}.png`)
    const store = await storeUserCertificateHash(useRef, imageHash)
    return imageHash

}

async function fetchuserCertificate(useRef){
    const imageHash = await getUserCertificateHash(useRef)
    return imageHash    
}


module.exports = { addUserDetails, fetchUserDetails, genCertificate, revoCertificate,fetchuserCertificate } 
