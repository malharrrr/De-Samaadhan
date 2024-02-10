// Layout.js
import React from 'react';
import { MyProvider } from '../MyContext.js';

const Layout = ({ children }) => {
  return (
    <MyProvider>
      {children}
    </MyProvider>
  );
};

export default Layout;
