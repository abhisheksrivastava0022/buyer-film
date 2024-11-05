import React from 'react';

const Footer = () => {

    return (
        <>
            <div className="filter-div">
                <button className="btn btn-primary btn-yellow filterbtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="bi bi-funnel"></i> Filter
                </button>
            </div>

            <div className="container-fluid footer bg-dark mt-2 " >
                <div className="container ">
                    <div className="text-center footer-copyright">
                        <span className="text-light">
                            All right reserved,   Copyright© Powered by Film Bazzar.
                        </span>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Footer