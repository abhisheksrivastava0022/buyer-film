

import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import ApiClient from '../components/API/ApiClient';
import defaultimg from '../assets/img/default.jpg'
import filmbazaar from "../assets/img/filmbazaar.png";
import logo from '../assets/img/filmbazaar.png';
import Sidebar from './Sidebar/Sidebar';
const dataurl = process.env.REACT_APP_BASE_URL;
const ConnectionBuild = () => {

    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    const [filmtype, setFilmtype] = useState([]);
    const [language, setlanguage] = useState([]);
    const [country, setCountry] = useState([]);
    const [datatocheck, setDatatocheck] = useState({});


    const { getRequestApi, postRequestApi } = ApiClient();
    const requestConnection = async (data) => {
        const response = await postRequestApi("film/connection-requested", data);
        if (response.status) {
            // alert("connected requested")
            loadPreLoadData();
        }
    }
    const [pagination, setPagination] = useState({
        totalPosts: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 10,
    });
    const [searchForm, setSearchForm] = useState({ title: '', category: '' });

    const handleSearchform = async (e) => {
        e.preventDefault();
        loadPreLoadData();
    }

    // Function to handle input changes

    const preloading = async () => {

        let data1 = await getRequestApi('site/film-type', {});
        if (data1.status) {
            setFilmtype(data1.data);
        }
        data1 = await getRequestApi('site/language', {});
        if (data1.status) {
            setlanguage(data1.data);
        }
        data1 = await getRequestApi('site/country', {});
        if (data1.status) {
            setCountry(data1.data);
        }
    }
    useEffect(() => {
        preloading();
        loadPreLoadData();
    }, []);
    const loadPreLoadData = async (page = 1) => {
        try {
            const data = await getRequestApi('film/connected-buyer');
            if (data.status) {
                setData(data.data);
                setDatatocheck(data.datatocheck);

            }
            const data1 = await getRequestApi('film/connected-seller');
            if (data1.status) {
                setData1(data1.data);
                setDatatocheck(data1.datatocheck);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const handlePageChange = (page) => {
        loadPreLoadData(page);
    };
    const [key, setKey] = React.useState("home");
    const [activeTab, setActiveTab] = useState("home");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <>


            {/* Tabs Content */}

            <div className="sidebar border border-right col-md-4 col-lg-3 p-0 bg-body-tertiary">
                <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                        <div className="col-md-12 px-3 search-sidebar">
                            <p className="logo d-none-mobile"><img src={filmbazaar} alt="logo" /></p>
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>

           <main className="col-md-8 ms-sm-auto col-lg-9 px-md-4">
                <div className=" main-content-space ">
                    <div className='pagetitle-name'><h1>Your Connection</h1>
                    </div>

                    <div className='mx-auto'>

                        <div className='clearfix'></div>

                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "home" ? "active" : ""}`}
                                        onClick={() => handleTabClick("home")}
                                    >
                                        From Buyer
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                                        onClick={() => handleTabClick("profile")}
                                    >
                                        From Seller
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content-data border p-3">
                                {activeTab === "home" && (
                                    <div className='row mt-4'>
                                        {
                                            data && data.length > 0 ? (
                                                data.map((row) => (
                                                    <div className="col-md-6 col-sm-6" key={row.id}>
                                                        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 card position-relative">
                                                            <div className="col-auto d-lg-block">
                                                                <img
                                                                    src={defaultimg}
                                                                    alt="user"
                                                                    style={{ width: "200px", height: "200px" }}
                                                                />
                                                            </div>
                                                            <div className="col p-4 d-flex flex-column position-static pt-3 pb-0">
                                                                <h3 className="mb-0 title-heading">
                                                                    {row.first_name} {row.last_name}
                                                                </h3>
                                                                <div className="row dashboard-profile">
                                                                    <ul className="col-md-12 col-sm-12">
                                                                        <li>
                                                                            <i className="bi bi-envelope"></i> {row.email}
                                                                        </li>
                                                                        <li>
                                                                            <i className="bi bi-telephone"></i>
                                                                            {row.phone}
                                                                        </li>
                                                                        <li>
                                                                            <i className="bi bi-building"></i>
                                                                            {row.company}
                                                                        </li>
                                                                        <li>
                                                                            <i className="bi bi-briefcase"></i> {row.job_title}
                                                                        </li>
                                                                    </ul>
                                                                    <ul className="col-md-12 col-sm-12" style={{ textAlign: "right" }}>
                                                                        <li>
                                                                            <Link className="btn btn-info btn-yellow" to={`/buyer/view/${row.id}`}> Details</Link>
                                                                        </li>

                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-12 text-center">
                                                    <p>No data available</p>
                                                </div>
                                            )
                                        }

                                    </div>
                                )}
                                {activeTab === "profile" && (
                                    <div className='row mt-4'>
                                        {
                                            data1 && data1.length > 0 ? (
                                                data1.map((row) => (
                                                    <div className="col-md-6 col-sm-6" key={row.id}>
                                                        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 card position-relative">
                                                            <div className="col-auto d-lg-block">
                                                                <img
                                                                    src={defaultimg}
                                                                    alt="user"
                                                                    style={{ width: "200px", height: "200px" }}
                                                                />
                                                            </div>
                                                            <div className="col p-4 d-flex flex-column position-static pt-3 pb-0">
                                                                <h3 className="mb-0 title-heading">
                                                                    {row.first_name} {row.last_name}
                                                                </h3>
                                                                <div className="row dashboard-profile">
                                                                    <ul className="col-md-12 col-sm-12">
                                                                        <li><i className="bi bi-envelope"></i>  {row.email}</li>
                                                                        <li><i className="bi bi-telephone"></i>{row.phone_number} </li>
                                                                        <li><i className="bi bi-briefcase"></i>   {row.company}</li>
                                                                        <li><i className="bi bi-building"></i>{row.job_profile} </li>
                                                                    </ul>
                                                                    <ul className="col-md-12 col-sm-12" style={{ textAlign: "right" }}>
                                                                        <li>
                                                                            <Link className="btn btn-info btn-yellow" to={`/seller/view/${row.id}`}> Details</Link>
                                                                        </li>

                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-12 text-center">
                                                    <p>No data available</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                )}

                            </div>

                        </div>
                    </div>
                </div >
            </main>
        </>
    )
}

export default ConnectionBuild