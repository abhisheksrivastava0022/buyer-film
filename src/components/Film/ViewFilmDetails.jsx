import React from 'react';
import defaultimg from "../../assets/img/default.jpg";
import filmbazaar from "../../assets/img/filmbazaar.png";

const ViewFilmDetails = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
            <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
              <div className="offcanvas-header">
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                <div className="col-md-12 px-3 search-sidebar">
                  <p className="logo"><img src={filmbazaar} alt="logo" /></p>

                  <ul className="address">
                    <li> <i className="bi bi-geo-alt"></i> San Francisco, USA</li>
                    <li><i className="bi bi-envelope"></i> email@example.com</li>
                    <li> <i className="bi bi-globe"></i> www.jquery2dotnet.com</li>
                    <li> <i className="bi bi-calendar3"></i> June 02, 1988</li>
                    <li><a href=""><i className="bi bi-facebook"></i></a> <a href=""><i className="bi bi-twitter"></i></a> <a href=""><i className="bi bi-linkedin"></i></a></li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

            <div className=" mt-4 ">
              <div className="tabslist">
                <div className="row">
                  <div className="col-md-8 col-sm-8">
                    <ul className="nav " >
                      <li className="nav-item" role="presentation">
                        <a className="nav-link active" href="#" >Company</a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a className="nav-link" href="#">People</a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a className="nav-link" href="#" >Film</a>
                      </li>
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Interest</a>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#">Interest Recieved</a></li>
                          <li><a className="dropdown-item" href="#">Interest Decline</a></li>
                          <li><a className="dropdown-item" href="#">Wishlist</a></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-sm-4 ">
                    <div className="dropdown my-n2 my-menu">
                      <button className="nav-link px-3  col-md-3 col-lg-2 me-0 px-3 fs-6 my-menu-toggle " type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="bi bi-list"></i>
                      </button>
                      <a className="btn  d-inline-flex align-items-center dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="avatar avatar-sm avatar-status avatar-status-success me-2">
                          <i className="bi bi-person-circle"></i>
                        </span>
                        John Williams
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li> <a className="dropdown-item" href="#">Account</a></li>
                        <li><a className="dropdown-item" href="#">Change password</a></li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li> <a className="dropdown-item" href="#">Sign out</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-content" >


                <div className=" page-header py-5 mb-3 mt-4">
                  <div className="container text-center text-wihte py-5">
                    <h1 className="h2">Welcome Text</h1>


                  </div>
                </div>
                <div className="row g-0  overflow-hidden flex-md-row mb-4  h-md-250  position-relative">
                  <div className="col-auto  d-lg-block">
                    <div className="thumbnail"> <img src={defaultimg} alt="user" style={{ width: "200px", height: "200px" }} /></div>
                  </div>
                  <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-primary-emphasis">Co Director</strong>
                    <h3 className="mb-0">Akesh A Anand</h3>
                    <div className="mb-1 text-body-secondary">Nov 12</div>
                    <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>

                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>

      <div className="container-fluid footer bg-dark " >
         <div className="container ">
            <div className="text-center footer-copyright">
               <span className="text-light">
               <a href="#" className="text-secondary">
               All right reserved,   Copyright© Powered by Film Bazzar.
               </a></span><a href="#" className="text-secondary">
               </a>
            </div>
            <a href="#" className="text-secondary">
            </a>
         </div>
         <a href="#" className="text-secondary">
         </a>
      </div>


    </>
  )
}

export default ViewFilmDetails