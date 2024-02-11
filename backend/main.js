
const ethersFunctions = require('./StoreHashOnChain.js');
const { storeUserHash, getUserHash, getUserCertificateHash, getAllComplaints, storeUserCertificateHash, contract, contractAddress, contractABI, connectedWallet, provider, wallet, privateKe } = ethersFunctions;
const { collection, getDocs, getDoc, doc } = require('firebase/firestore');
const db = require('./firebase.js')
const { encryptFile, decryptFile } = require('./encryption/EncryptDecrypt.js');
const fs = require('fs');
const pinFileToIPFS = require('./pinFileToIPFS.js');
//const pinImageToIPFS = require('./pinImageToIPFS.js');
require('dotenv').config();
const downloadFile = require('./FetchFromIPFS.js');
const { deleteFile } = require('./deleteFile.js');
const secretKey = "f21fa34350a5068fdeeb05cbc05858f4";

async function addUserDetails(useRef/**should be complaint id */) {
    
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


async function fetchSpecificUserComplaintDetails(useRef /**should be user id */) {
    try {
        let res = await fetchComplaintIds(useRef);

        // Use Promise.all to await multiple asynchronous operations concurrently
        const data = await Promise.all(
            res.map(async (complaintId) => {
                const userHash = await getUserHash(useRef, complaintId);
                //const IpfsHash = await getUserHash(useRef);
                await downloadFile('QmZQH9uhEPGnf3PVsiDz8b7ftoR9UAbWc1g5pCDTogpbhH', `${useRef}_${complaintId}`);
                const decryptedFileMsg = await decryptFile(`${useRef}_${complaintId}.txt`, secretKey, `${useRef}_${complaintId}_decrypt.json`);
                console.log(decryptedFileMsg);

                const jsonData = await fs.readFileSync(`${useRef}_${complaintId}_decrypt.json`);
                deleteFile(`${useRef}_${complaintId}.txt`);
                deleteFile(`${useRef}_${complaintId}_decrypt.json`);
                
                return {
                    complaintId,
                    data: JSON.parse(jsonData)
                };
            })
        );

        // data is an array of objects containing ComplaintId and corresponding JSON data
        console.log(data);

        return data;
    } catch (error) {
        console.error('Error:', error);
        // Handle the error here
        return null;
    }
}

async function fetchAllAdmin(useRef){
    const IpfsHash = await getUserHash(useRef);
    await downloadFile(IpfsHash, `${useRef}`);
                const decryptedFileMsg = await decryptFile(`${useRef}.txt`, secretKey, `${useRef}_decrypt.json`);
                console.log(decryptedFileMsg);

                const jsonData = await fs.readFileSync(`${useRef}_${complaintId}_decrypt.json`);
                deleteFile(`${useRef}.txt`);
                deleteFile(`${useRef}_decrypt.json`);

                return {
                    data: JSON.parse(jsonData)
                };
}

  async function fetchComplaintIds(useRef/**should be user id */){

        const docSnapshot = await getDoc(doc(db,"Users",useRef));
        if (docSnapshot.exists()) {
            // Access the array field from the document snapshot data
            const grievanceIds = docSnapshot.data().grievanceIds || [];

            console.log("Grievance IDs for user:", grievanceIds);
            return grievanceIds;
        } else {
            console.log("No such document!");
            return [];
        }
  }

  async function fetchAdminComplaintIds(){
        const querySnapshot = await getDocs(collection(db,'Admin'));
        const specificFieldValues = querySnapshot.docs.map(async doc => {
            const value = doc.data().grievanceId;
            await fetchAllAdmin(value);            
        });

        return specificFieldValues;
  }

async function readKey(userRef) {
    const docSnapshot = await getDoc(doc(db, "Client", userRef));

    if (!docSnapshot.exists()) {
        console.log("No such document!");
        return null;
    } else {
        const data = docSnapshot.data();
        console.log(data)
        return data.key;
    }
}
// readKey('fpRZnoX95eVBECjNKiodUeOzAd83')

module.exports = { addUserDetails, fetchSpecificUserComplaintDetails, fetchAdminComplaintIds } 