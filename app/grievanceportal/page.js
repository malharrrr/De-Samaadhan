// pages/grievance.js
'use client'
import React, { useState } from 'react';
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { UserAuth } from "../context/AuthContext";
import axios from 'axios';
import {  collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from "../firebase";
import toast, { Toaster } from 'react-hot-toast';

const Grievance = () => {
  const [complaintTitle, setComplaintTitle] = useState('');
  const [category, setCategory] = useState('');
  const [complaintDescription, setComplaintDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log({ complaintTitle, category, complaintDescription });
    // Clear form fields after submission
    setComplaintTitle('');
    setCategory('');
    setComplaintDescription('');
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
                    }}
                                        />
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Grievance;
