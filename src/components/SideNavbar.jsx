import React from 'react'
import filmbazaar from "../assets/img/filmbazaar.png"
import { Link } from 'react-router-dom';
const SideNavbar = () => {
    return (
        <div className="sidebar border border-right col-md-4 col-lg-3 p-0 bg-body-tertiary">
            <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                <div className="offcanvas-header">
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                    <ul className="nav flex-column">
                        <li className="logo"><img src={filmbazaar} alt="logo" /></li>
                        <li className="nav-item">

                            <Link to="/" className="nav-link d-flex align-items-center gap-2 active" aria-current="page" >Film listing</Link>
                        </li>
                        <li className="nav-item">

                            <Link to="/interest-send" className="nav-link d-flex align-items-center gap-2 active" aria-current="page" >Interest Send</Link>
                        </li>
                        <li className="nav-item">

                            <Link to="/interest-decline" className="nav-link d-flex align-items-center gap-2 active" aria-current="page" >Interest Decline</Link>

                        </li>
                        <li className="nav-item">

                            <Link to="/interest-approved" className="nav-link d-flex align-items-center gap-2 active" aria-current="page" >Interest Approved</Link>

                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideNavbar