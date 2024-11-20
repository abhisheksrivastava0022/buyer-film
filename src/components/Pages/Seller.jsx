

import React, { useEffect, useState } from 'react';
import filmbazaar from "../../assets/img/filmbazaar.png";
import defaultimg from "../../assets/img/default.jpg";
import Header from '../Header';
import Footer from '../Footer/Footer';
import ApiClient from '../API/ApiClient';
import { Link } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Sidebar from '../Sidebar/Sidebar';

const Seller = () => {
    const [data, setData] = useState([])
    const [filmtype, setFilmtype] = useState([]);
    const [datatocheck, setDatatocheck] = useState({});
    const [language, setlanguage] = useState([]);
    const [country, setCountry] = useState([]);
    const dataurl = process.env.REACT_APP_BASE_URL;

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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
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
        const queryParams = new URLSearchParams({

            limit: pagination.limit,
            page: page,
            ...searchForm,
        });

        try {
            const data = await getRequestApi('film/seller-list', queryParams);
            if (data.status) {

                setData(data.data);
                setPagination({
                    ...pagination,
                    ...data.pagination,
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const handlePageChange = (page) => {
        loadPreLoadData(page);
    };

    const [loadingData, setLoadingData] = useState({})

    const InterestedApply = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_PREFIX}/film/${id}/interested`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });


            if (response.ok) {
                const data = await response.json();
                PageOnLoad()
                console.log('Response Data:', data);

            } else {
                console.error('Failed to  interest.');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    const NotInterestedApply = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_PREFIX}/film/${id}/not-interested`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });


            if (response.ok) {
                const data = await response.json();
                PageOnLoad()
                console.log('Response Data:', data);

            } else {
                console.error('Failed to  interest.');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    const PageOnLoad = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_PREFIX}/film/buyer`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });


            if (response.ok) {
                const data = await response.json();
                setLoadingData(data.data)
                console.log('Response Data:', data);

            } else {
                console.error('Failed to load data.');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    useEffect(() => {
        PageOnLoad()
    }, [])
    return (
        <>

            <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
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
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
                <div className=" main-content-space ">
                    <div className='pagetitle-name'><h1>Seller </h1></div>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                            <div className='row'>
                                {

                                    data.map((row) => {

                                        return <div className='col-md-6 col-sm-6'>
                                            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 card position-relative">

                                                <div className="col-auto  d-lg-block">
                                                    <img
                                                        src={row?.profile_img?.url ? `${dataurl}${process.env.REACT_APP_BASE_PREFIX}/file/${row.profile_img.url}` : defaultimg}

                                                        alt={row?.profile_img?.name ? `${dataurl}${process.env.REACT_APP_BASE_PREFIX}/file/${row.profile_img.name}` : "defaultimg"} style={{ width: "200px", height: "200px" }} />

                                                </div>
                                                <div className="col p-4 d-flex flex-column position-static pt-3 pb-0">

                                                    <h3 className="mb-0 title-heading" >

                                                        {row.first_name} {row.last_name}
                                                    </h3>
                                                    <div className='row dashboard-profile'>
                                                        <ul className='col-md-12 col-sm-12'>

                                                            <li><i className="bi bi-envelope"></i>  {row.email}</li>
                                                            <li><i className="bi bi-telephone"></i>{row.phone} </li>


                                                            <li><i className="bi bi-building"></i>{row.company} </li>
                                                            <li><i className="bi bi-briefcase"></i>   {row.job_title}</li>
                                                        </ul>
                                                        <ul className='col-md-12 col-sm-12' style={{ textAlign: "right" }}>
                                                            <li>  <button className="btn btn-info btn-yellow" type="submit"> Details</button>
                                                            </li>
                                                            {
                                                                (datatocheck?.[row.id] && datatocheck[row.id] >= 1) ? (
                                                                    datatocheck[row.id] === 1 ? (
                                                                        <li>
                                                                            <button
                                                                                className="btn btn-warning"
                                                                                type="submit"
                                                                                onClick={() => requestConnection({ id: row.id, status: 0, type: 2 })}
                                                                            >
                                                                                Pending Request
                                                                            </button>
                                                                        </li>
                                                                    ) : datatocheck[row.id] === 2 ? (
                                                                        <li>
                                                                            Connected  Declined
                                                                        </li>
                                                                    ) : datatocheck[row.id] === 3 ? (
                                                                        <li>
                                                                            Connection Build
                                                                        </li>
                                                                    ) : null
                                                                ) : (
                                                                    <li>
                                                                        <button
                                                                            className="btn  btn-warning"
                                                                            type="submit"
                                                                            onClick={() => requestConnection({ id: row.id, status: 1, type: 3 })}
                                                                        >
                                                                            Request Connection
                                                                        </button>
                                                                    </li>
                                                                )
                                                            }

                                                        </ul>

                                                    </div>

                                                </div>

                                                {/* <div className='star'>
                                                <button className='btn btn-primary'>
                                                    <Link to={`/seller/${row.id}`} className="icon-link gap-1 icon-link-hover stretched-link" style={{ color: "#fff" }}>
                                                        View Details
                                                    </Link>
                                                </button> &nbsp;

                                            </div> */}
                                            </div>
                                        </div>




                                    })
                                }



                            </div>






                        </div>
                    </div>
                    <nav aria-label="...">
                        <div class="col-md-12 mt-4">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    {pagination.currentPage > 1 && (
                                        <li class="page-item">
                                            <button
                                                class="page-link"
                                                onClick={() =>
                                                    handlePageChange(pagination.currentPage - 1)
                                                }
                                            >
                                                Previous
                                            </button>
                                        </li>
                                    )}
                                    {[...Array(pagination.totalPages)].map((_, index) => (
                                        <li
                                            class={`page-item ${pagination.currentPage === index + 1 ? "active" : ""
                                                }`}
                                            key={index}
                                        >
                                            <button
                                                class="page-link"
                                                onClick={() => handlePageChange(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                    {pagination.currentPage < pagination.totalPages && (
                                        <li class="page-item">
                                            <button
                                                class="page-link"
                                                onClick={() =>
                                                    handlePageChange(pagination.currentPage + 1)
                                                }
                                            >
                                                Next
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </nav>
                </div>
            </main>



        </>
    )
}

export default Seller