import React from 'react'

const Header = () => {
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
        </nav>
    )
}

export default Header