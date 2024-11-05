import React, { useEffect, useState } from 'react';
import filmbazaar from "../../assets/img/filmbazaar.png";
import defaultimg from "../../assets/img/default.jpg";
import Header from '../Header';
import Footer from '../Footer/Footer';
import ApiClient from '../API/ApiClient';
import { Link } from 'react-router-dom';

const SellerListing = () => {
    const [data, setData] = useState([])
    const [loadData, setLoadData] = useState([]);
    const [typeCount, setTypeCount] = useState([])


    const { getRequestApi } = ApiClient();
    const [pagination, setPagination] = useState({
        totalPosts: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 10,
    });

    const preloading = async () => {

        const data1 = await getRequestApi('film/type-count', {});
        if (data1.status) {
            setTypeCount(data1.data);
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
        });

        try {
            const data = await getRequestApi('film', queryParams);
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
            const response = await fetch(`https://119.82.68.149:3001/film-buyer/film/${id}/interested`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });


            if (response.ok) {
                const data = await response.json();
                console.log('Response Data:', data);
                loadPreLoadData()
            } else {
                console.error('Failed to  interest.');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    const NotInterestedApply = async (id) => {
        try {
            const response = await fetch(`https://119.82.68.149:3001/film-buyer/film/${id}/not-interested`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });


            if (response.ok) {
                const data = await response.json();
                console.log('Response Data:', data);
                loadPreLoadData()
            } else {
                console.error('Failed to  interest.');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };





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
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
                <div className=" main-content-space ">

                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                            <div className="row border-bottom mb-4 mt-4">
                                <div className="col-md-12">
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

                            </div>

                            {

                                data.map((row) => (
                                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 card position-relative">

                                        <div className="col-auto  d-lg-block">
                                            <img src={defaultimg} alt="user" style={{ width: "200px", height: "200px" }} />
                                        </div>
                                        <div className="col p-4 d-flex flex-column position-static">
                                            <strong className="d-inline-block mb-2 text-primary-emphasis">{row?.type?.name}</strong>
                                            <h3 className="mb-0">{row.title}</h3>
                                            <div className="mb-1 text-body-secondary">Nov 12</div>
                                            <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                                            <Link to={`/film/${row.id}`} className="icon-link gap-1 icon-link-hover stretched-link">
                                                Continue reading
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            }



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

export default SellerListing