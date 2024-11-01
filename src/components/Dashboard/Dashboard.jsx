import React from 'react'
import filmbazaar from "../../assets/img/filmbazaar.png"

const Dashboard = () => {
  return (
   <>
    <nav className="navbar sticky-top  flex-md-nowrap navbg p-0 shadow" >
         <div className="dropdown my-n2 my-menu">
            <button className="nav-link px-3 text-white col-md-3 col-lg-2 me-0 px-3 fs-6 my-menu-toggle " type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <i className="bi bi-list"></i>
            </button>
            <a className="btn btn-link d-inline-flex align-items-center dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span className="avatar avatar-sm avatar-status avatar-status-success me-2">
            <i className="bi bi-person-circle"></i>
            </span>
            John Williams
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
               <li> <a className="dropdown-item" href="#">Account</a></li>
               <li><a className="dropdown-item" href="#">Change password</a></li>
               <li>
                  <hr className="dropdown-divider"/>
               </li>
               <li> <a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
         </div>
      </nav>
      <div className="container-fluid">
         <div className="row">
            <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
               <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                  <div className="offcanvas-header">
                     <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                  </div>
                  <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                     <ul className="nav flex-column">
                        <li className="logo"><img src={filmbazaar} alt="logo"/></li>
                        <li className="nav-item">
                           <a className="nav-link d-flex align-items-center gap-2 active" aria-current="page" href="#">
                           Interest Recieved
                           </a>
                        </li>
                        <li className="nav-item">
                           <a className="nav-link d-flex align-items-center gap-2 active" aria-current="page" href="#">
                           Interest Decline
                           </a>
                        </li>
                        <li className="nav-item">
                           <a className="nav-link d-flex align-items-center gap-2 active" aria-current="page" href="#">
                           Wishlist
                           h                          </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
               <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <h1 className="h2">Seller</h1>
               </div>
              
               <div className="row mt-4 mb-4 topbox">
                  <div className="d-flex col-xxl-3 col-sm-6">
                     <div className="flex-fill card">
                        <div className=" py-4 card-body">
                           <div className="d-flex align-items-start">
                              <div className="flex-grow-1">
                                 <h4 className="mb-2">Film</h4>
                                 <p className="mb-2 total">Total No. of </p>
                                
                              </div>
                              <div className="d-inline-block ms-3">
                                 <div className="stat">
                                    50
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="d-flex col-xxl-3 col-sm-6">
                     <div className="flex-fill card">
                        <div className=" py-4 card-body">
                           <div className="d-flex align-items-start">
                              <div className="flex-grow-1">
                                 <h4 className="mb-2">Web Series</h4>
                                 <p className="mb-2 total">Total No. of </p>
                               
                              </div>
                              <div className="d-inline-block ms-3">
                                 <div className="stat">
                                    50
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="d-flex col-xxl-3 col-sm-6">
                     <div className="flex-fill card">
                        <div className=" py-4 card-body">
                           <div className="d-flex align-items-start">
                              <div className="flex-grow-1">
                                 <h4 className="mb-2">Script</h4>
                                 <p className="mb-2 total">Total No. of </p>
                              </div>
                              <div className="d-inline-block ms-3">
                                 <div className="stat">
                                    100
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="d-flex col-xxl-3 col-sm-6">
                     <div className="flex-fill card">
                        <div className=" py-4 card-body">
                           <div className="d-flex align-items-start">
                              <div className="flex-grow-1">
                                 <h4 className="mb-2">Trailer</h4>
                                 <p className="mb-2 total">Total No. of </p>
                                
                              </div>
                              <div className="d-inline-block ms-3">
                                 <div className="stat">
                                    70
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="d-flex col-xxl-3 col-sm-6">
                     <div className="flex-fill card">
                        <div className=" py-4 card-body">
                           <div className="d-flex align-items-start">
                              <div className="flex-grow-1">
                                 <h4 className="mb-2">Project Idea</h4>
                                 <p className="mb-2 total">Total No. of </p>
                              </div>
                              <div className="d-inline-block ms-3">
                                 <div className="stat">
                                    100
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="card mt-4 mb-4">
                  <div className="card-body">
                     <div className="row border-bottom mb-4">
                        <div className="col-md-8">
                           <h2><i className="bi bi-funnel"></i> Filter/Categories </h2>
                        </div>
                        <div className="col-md-4">
                           <select className="form-select" aria-label="Default select example">
                              <option selected>Select </option>
                              <option value="1">Original Title</option>
                              <option value="2">English Title</option>
                              <option value="3">Language</option>
                              <option value="3">Log Line</option>
                              <option value="3">Synopsys</option>
                           </select>
                        </div>
                     </div>
                     <div className="table-responsive">
                        <table className="table table-striped table-sm">
                           <thead>
                              <tr>
                                 <th scope="col">#</th>
                                 <th scope="col">Category</th>
                                 <th scope="col">Project Status</th>
                                 <th scope="col">Language</th>
                                 <th scope="col">Country</th>
                                 <th scope="col">Genre</th>
                                 <th scope="col">Action</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td>1</td>
                                 <td>random</td>
                                 <td className="red"> Partial Completed</td>
                                 <td>data</td>
                                 <td>text</td>
                                 <td>placeholder</td>
                                 <td><a href=""><i className="bi bi-eye"></i></a> </td>
                              </tr>
                              <tr>
                                 <td>1</td>
                                 <td>random</td>
                                 <td className="green">Completed</td>
                                 <td>data</td>
                                 <td>text</td>
                                 <td>placeholder</td>
                                 <td><a href=""><i className="bi bi-eye"></i></a></td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                     <nav aria-label="...">
                        <ul className="pagination">
                           <li className="page-item disabled">
                              <a className="page-link">Previous</a>
                           </li>
                           <li className="page-item"><a className="page-link" href="#">1</a></li>
                           <li className="page-item active" aria-current="page">
                              <a className="page-link" href="#">2</a>
                           </li>
                           <li className="page-item"><a className="page-link" href="#">3</a></li>
                           <li className="page-item">
                              <a className="page-link" href="#">Next</a>
                           </li>
                        </ul>
                     </nav>
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

export default Dashboard