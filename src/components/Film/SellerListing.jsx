import React from 'react';
import filmbazaar from "../../assets/img/filmbazaar.png";
import defaultimg from "../../assets/img/default.jpg";

const SellerListing = () => {
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
                                    <h4 className="search-title mb-4"> Search </h4>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="Search " aria-label="Search" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="Search " aria-label="Search" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary btn-yellow">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                        <div className=" mt-4 ">
                            <div className="tabslist">
                                <div className="row">
                                    <div className="col-md-8 col-sm-8">
                                        <ul className="nav nav-tabs">
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link active" href="#" role="tab" >Company</a>
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
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                    <div className="row border-bottom mb-4 mt-4">
                                        <div className="col-md-8">
                                            <h2 className="d-flex filter-text">
                                                <i className="bi bi-funnel"></i> Sort By
                                                <select className="form-select w-70" >
                                                    <option selected="">Select </option>
                                                    <option value="1">Original Title</option>
                                                    <option value="2">English Title</option>
                                                    <option value="3">Language</option>
                                                    <option value="3">Log Line</option>
                                                    <option value="3">Synopsys</option>
                                                </select>
                                            </h2>
                                        </div>
                                        <div className="col-md-4">
                                            <nav aria-label="...">
                                                <ul className="pagination top-pager">
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
                                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 card position-relative">
                                        <div className="col-auto  d-lg-block">
                                            <img src={defaultimg} alt="user" style={{ width: "200px", height: "200px" }} />
                                        </div>
                                        <div className="col p-4 d-flex flex-column position-static">
                                            <strong className="d-inline-block mb-2 text-primary-emphasis">Co Director</strong>
                                            <h3 className="mb-0">Akesh A Anand</h3>
                                            <div className="mb-1 text-body-secondary">Nov 12</div>
                                            <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                                            <a href="#" className="icon-link gap-1 icon-link-hover stretched-link">
                                                Continue reading
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <nav aria-label="...">
                                <ul className="pagination top-pager">
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
                    </main>
                </div>
            </div>

            <div className="filter-div">
                <button className="btn btn-primary btn-yellow filterbtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="bi bi-funnel"></i> Filter
                </button>
            </div>

            <div className="container-fluid footer bg-dark mt-2 " >
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

export default SellerListing