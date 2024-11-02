import React, { useEffect, useState } from 'react'
import ApiClient from './API/ApiClient'
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const [data, setData] = useState({})
    const { getRequestApi, userInfo } = ApiClient();
    const navigate = useNavigate();
    const logoutHander = async () => {
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
        <nav className="navbar sticky-top  flex-md-nowrap navbg p-0 shadow" >
            <div className="dropdown my-n2 my-menu">
                <button className="nav-link px-3 text-white col-md-3 col-lg-2 me-0 px-3 fs-6 my-menu-toggle " type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="bi bi-list"></i>
                </button>
                <a className="btn btn-link d-inline-flex align-items-center dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="avatar avatar-sm avatar-status avatar-status-success me-2">
                        <i className="bi bi-person-circle"></i>
                    </span>
                    {data?.first_name} {data?.last_name}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li> <a className="dropdown-item" href="#">Account</a></li>
                    <li><a className="dropdown-item" href="#">Change password</a></li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li> <a className="dropdown-item" href="#" onClick={logoutHander}>Sign out</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header