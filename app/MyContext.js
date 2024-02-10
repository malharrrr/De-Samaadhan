 // MyContext.js
'use client' 
import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const encryptAadhars = (encryptedAadhar)=>{
    return encryptedAadhar;
  }

  return (
    <MyContext.Provider value={{ encryptAadhars }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
