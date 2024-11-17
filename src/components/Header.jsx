import React, { useEffect, useState } from 'react'
import ApiClient from './API/ApiClient'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import filmbazaar from "../assets/img/filmbazaar.png";
const Header = () => {
    const location = useLocation();

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


        </>
    )
}

export default Header