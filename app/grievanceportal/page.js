    // pages/grievance.js
    'use client'
    import React, { useState, useEffect } from 'react';
    import { Player, Controls } from "@lottiefiles/react-lottie-player";
    import { UserAuth } from "../context/AuthContext";
    import axios from 'axios';
    import {  collection, doc, getDoc, arrayUnion ,getDocs, query, setDoc, where } from 'firebase/firestore';
    import { db } from "../firebase";
    import toast, { Toaster } from 'react-hot-toast';



    const Grievance = () => {   

        async function convertPdf(){
            let imgBase64 = await new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onload = function () {
                resolve(reader.result);
                };
                reader.onerror = function (error) {
                reject(error);
                };
                reader.readAsDataURL(pdfurl);
                
            });
            
            console.log(imgBase64);
        }



    const [complaintTitle, setComplaintTitle] = useState('');
    const [category, setCategory] = useState('');
    const [complaintDescription, setComplaintDescription] = useState('');
    const [pdfurl,setPdfurl]=useState('')

    const { user } = UserAuth();

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
       
        // Handle form submission, e.g., send data to backend
        // console.log({ complaintTitle, category, complaintDescription, pdfurl });

        try{

            //let imgBase64 = await convertPdf();            

            

            const userDocRef = doc(db, 'Users', user.uid);

            const userDocSnapshot = await getDoc(userDocRef);
            const userData = userDocSnapshot.data();

            const counterValue = userData ? (userData.counter || 0) : 0;

            const nextGrievanceId = counterValue + 1;

            const body = {
                useRef: nextGrievanceId,
                jsonData: {
                  "Complaint-Title": complaintTitle,
                  "Category": category,
                  "Complaint-Description": complaintDescription,
                }}

                console.log(body);

            const res = await axios.post('http://localhost:8080/addcomplaint', { body });            

            await setDoc(userDocRef, {
                counter: nextGrievanceId,
                // Assuming you have a field to store grievance IDs as an array
                grievanceIds: arrayUnion(nextGrievanceId.toString())
            }, { merge: true });

            const newComplaintId = user.uid + nextGrievanceId;//zajsda1
            const adminDocRef = doc(db,'Admin',newComplaintId);

            await setDoc(adminDocRef,{
                newGrievanceId: newComplaintId,
                grievanceId: nextGrievanceId
            },{merge: true});
            console.log("Data pushed....");
            toast.success('Your form has successfully submited');

            
        }catch(error){
            console.log(error);
            toast.error('Error in Form Submission')
        }  


        // Clear form fields after submission
        setComplaintTitle('');
        setCategory('');
        setComplaintDescription('');
        setPdfurl('');
    };

    return (<>
                <Player
                            autoplay
                            speed={1.5}
                            loop
                            src="https://lottie.host/fec3aff6-e174-4e9f-8f1f-750623025347/MUlDyKppOw.json"
                            style={{ backgroundColor: '#fff',
                            backgroundSize: 'cover',
                            //backgroundRepeat: 'no-repeat',
                            width: '100vw',
                            height: '100vh',
                            margin: '0px',
                            padding: '0px',
                            float: 'right',
                            //zIndex: '0',
                                position: 'absolute',  // Use 'fixed' to keep it fixed relative to the viewport
                            //    top: '0',
                            //right: '-25vw',  
                        }}/>

        <div className="bg-white bg-cover min-h-screen">
        <header className="h-full w-full bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100
    py-6 text-white text-center">
            <h1 className="text-3xl text-black font-semibold">Welcome to the Grievance Portal</h1>
            <p className=" text-black mt-2">Please submit your grievance below</p>
        </header>

        

        <div className="h-full bg-gray-600  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100 max-w-md mx-auto mt-8 p-8 rounded-md  shadow-md">
            <h2 className="text-2xl text-black font-semibold mb-4">Submit Your Grievance</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="complaintTitle" className="block text-black mb-1">Complaint Title</label>
                <input
                type="text"
                id="complaintTitle"
                value={complaintTitle}
                onChange={(e) => setComplaintTitle(e.target.value)}
                className="h-full  bg-gray-600  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10   w-full  text-black  rounded-md py-2 px-3 focus:outline-none "
                required
                />
            </div>
            <div>
                <label htmlFor="category" className="text-black block mb-1">Category</label>
                <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-full  bg-gray-600  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10   w-full  rounded-md text-black py-2 px-3 focus:outline-none "
                required
                >
                <option value="">Select Category</option>
                <option value="FIRs">FIRs</option>
                <option value="Tax related grievances">Tax Related Grievances</option>
                <option value="Complaints regarding public services">Complaints regarding Public Services</option>
                </select>
            </div>
            <div>
                <label htmlFor="complaintDescription" className="block text-black mb-1">Complaint Description</label>
                <textarea
                id="complaintDescription"
                value={complaintDescription}
                onChange={(e) => setComplaintDescription(e.target.value)}
                className=" h-full w-full bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10  py-2 px-3 text-black "
                rows="4"
                required
                ></textarea>
            </div>
            <h6 className='text-black'>Upload Documents</h6>
        <div className='fileupload text-black'>
            <input  accept='pdf' type="file" onChange={(e) => {setPdfurl(e.target.files[0]);e.target.files[0].onload = function() {console.log(e.target.files[0]);}}}/>
            <span className='text-black'>*Upload Documents in .pdf file format  </span>
        </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
            </form>
        </div>
        </div>
        </>
    );
    };

    export default Grievance;
