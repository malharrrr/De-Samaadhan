const { ethers } = require('ethers');
const fs = require('fs');
require('dotenv').config();
const { JsonRpcProvider } = require('ethers/providers');

    const privateKey = `fb76ba5e64593e3de3ca191d87dcb63d1b6355a3f53c461ddedd4f545ab8ca75`;

    // Create an account from the private key
    const wallet = new ethers.Wallet(privateKey);

    // Connect to the Polygon Testnet Mumbai
    const provider = new JsonRpcProvider('https://rpc-mumbai.maticvigil.com');

    // Set the wallet as the default signer
    const connectedWallet = wallet.connect(provider);

    // Read the ABI from a JSON file
    const contractABI = JSON.parse(fs.readFileSync('./constants/ABI.json'));

    // Replace with your contract address
    //0x6fb951f33e4e52ef0e9c1f78325a9223d7dd1f4d
    const contractAddress = '0x3328358128832A260C76A4141e19E2A943CD4B6D';

    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, contractABI, connectedWallet);

    // Function to store a string
   const storeUserHash= async (userRef, IPFShash)=> {
        try {
            await contract.setUserHash(userRef, IPFShash);
            console.log('String stored successfully');
        } catch (error) {
            console.error('Error while storing string:', error);
        }
    }  
   
   const getUserHash= async(userRef)=> {
        try {
            const result =  await contract.getUserHash(userRef);
            console.log(`Hash is : `, result)
            return result;
        } catch (error) {
            console.error('Error while retrieving string:', error);
        }
    }

module.exports = { storeUserHash, getUserHash,contract,contractAddress,contractABI,connectedWallet,provider,wallet,privateKey };