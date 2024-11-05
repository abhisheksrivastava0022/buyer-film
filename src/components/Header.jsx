import React, { useEffect, useState } from 'react'
import ApiClient from './API/ApiClient'
import { Link, useNavigate } from 'react-router-dom';
import filmbazaar from "../assets/img/filmbazaar.png";
const Header = () => {
    const [data, setData] = useState({})
    const { getRequestApi, userInfo } = ApiClient();
    const navigate = useNavigate();
    const logoutHander = async (e) => {
        e.preventDefault();
        const data = await getRequestApi('auth/logout', {});
        navigate("/login");
    }
    const preloading = async () => {
        const data = await userInfo('film/buyer', {});
        if (data.status) {
            setData(data.data);
        }
    }
    useEffect(() => {
        preloading();

    }, []);


    return (
        <>

            <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
                <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" aria-labelledby="sidebarMenuLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                        <div className="col-md-12 px-3 search-sidebar">
                            <p className="logo"><img src={filmbazaar} alt="logo" /></p>


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
                                        <Link className="nav-link active" to="film" >Film</Link>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link " href="#" role="tab" >Company</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link" href="#">People</a>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Interest</a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link className="dropdown-item" to="/interest-send" >Send</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/interest-Decline" >Decline</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/interest-approved" >Approved</Link>
                                            </li>

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
                                        {data.first_name}  {data.last_name}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <Link className="dropdown-item" to="profile">Account</Link>
                                        </li>
                                        {/* <li>
                                            <Link className="dropdown-item" to="change-password">Change password</Link>
                                        </li> */}
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#" onClick={logoutHander} >Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}

export default Header