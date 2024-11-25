// MainLayout.js
import React from 'react';
import Header from '../Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import SideNavbar from '../SideNavbar';

const MainLayout = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <Header />
          <div className="container-fluid">
            <div className="row">
              {/* <SideNavbar /> */}
              <Outlet />
            </div>
          </div>
         
        </div>
      </div>
      <Footer />
    </ >
  );
};

export default MainLayout;
