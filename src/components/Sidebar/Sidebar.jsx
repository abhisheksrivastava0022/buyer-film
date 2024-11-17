import React, { useEffect, useState } from 'react'
import ApiClient from '../API/ApiClient';

import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [data, setData] = useState({})
    const { getRequestApi, userInfo } = ApiClient();
    const location = useLocation();
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
        if (location.pathname === '/profile') {
            //alert("profile")
        } else {
            if (data.data.status == 1) {
                navigate("/profile");
            }
        }
    }
    useEffect(() => {

        preloading();

    }, [location]);
    return (
        <>
            <ul className="list-unstyled ps-0 sidebar-navigation">
                <li>
                    {/* <a href="#" > <i className="bi bi-speedometer"></i> Dashboard</a> */}
                    <Link to="/"><i className="bi bi-speedometer"></i> Dashboard</Link> 
                </li>
                {/* <li>
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                        <i className="bi bi-grid"></i> Project
                    </button>
                    <div className="collapse" id="dashboard-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">List</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Interest</a></li>
                        </ul>
                    </div>
                </li> */}
                
                <li>
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                        <i className="bi bi-grid"></i> Project
                    </button>
                    <div className="collapse" id="dashboard-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><Link to="" className="link-body-emphasis d-inline-flex text-decoration-none rounded">List</Link></li>
                            <li>
                                <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#interest-collapse" aria-expanded="false">
                                 Interest

                                </button>
                                <div className="collapse" id="interest-collapse">
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li>
                                            <Link className="link-body-emphasis d-inline-flex text-decoration-none rounded" to="/interest-send">Pending</Link>
                                        </li>
                                        <li>
                                            <Link className="link-body-emphasis d-inline-flex text-decoration-none rounded" to="/interest-decline">Decline</Link>
                                        </li>
                                        <li>
                                            <Link className="link-body-emphasis d-inline-flex text-decoration-none rounded" to="/interest-approved">Connection Build</Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>



                <li>

                    {/* <a href="#"><i className="bi bi-person"></i> Buyer</a> */}
                    <Link
                        className={`nav-link ${location.pathname === "/buyer" ? "active" : ""}`}
                        to="/buyer"
                    >
                        <i className="bi bi-person"></i>
                        Buyer
                    </Link>

                </li>
                <li>
                    {/* <a href="#">
                        <i className="bi bi-person"></i> 
                        Sellers
                        </a> */}
                    <Link
                        className={`nav-link ${location.pathname === "/seller" ? "active" : ""}`}
                        to="/seller"
                    >
                        <i className="bi bi-person"></i>
                        Seller
                    </Link>

                </li>
                <li><Link href="#" to="/profile"><i className="bi bi-person"></i> Profile</Link></li>
                {/* <li><a href="#"> <i className="bi bi-gear"></i>Settings</a></li> */}
                <li><Link href="#" onClick={logoutHander}> <i className="bi bi-box-arrow-left"></i> Sign out</Link></li>
            </ul>
        </>
    )
}

export default Sidebar