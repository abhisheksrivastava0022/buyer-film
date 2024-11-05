import React from 'react';
import defaultimg from "../../assets/img/default.jpg";
import filmbazaar from "../../assets/img/filmbazaar.png";

const ViewFilmDetails = () => {
  return (
    <>
      <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
        <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
          <div className="offcanvas-header">
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            <div className="col-md-12 px-3 search-sidebar">

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

        <div className=" main-content-space ">

          <div className="tab-content" >

            {/* <div class=" page-header mb-3 mt-4">
                  <div class=" text-center text-wihte ">
                  <img src="img/carousel-1.jpg" class="img-fluid"/>
                  
                     
                  </div>
          </div> */}
            <div className=" page-header py-5 mb-3 mt-4">
              <div className="container text-center text-wihte py-5">

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




    </>
  )
}

export default ViewFilmDetails