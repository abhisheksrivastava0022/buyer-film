import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ApiClient from '../API/ApiClient';

const Footer = () => {

    return (
        <>
            <div className="container-fluid footer bg-dark " >
                <div className="container ">
                    <div className="text-center footer-copyright">
                        <span className="text-light">
                            <a href="#" className="text-secondary">
                                All right reserved,   Copyright© Powered by Film Bazzar.
                            </a></span><a href="#" className="text-secondary">
                        </a>
                    </div>
                    <a href="#" className="text-secondary">
                    </a>
                </div>
                <a href="#" className="text-secondary">
                </a>
            </div>
        </>
    )
}

export default Footer