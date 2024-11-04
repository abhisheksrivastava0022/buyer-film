import React, { useState } from 'react';
import iffi from "../../assets/img/iffi.png";
import filmbazaar from "../../assets/img/filmbazaar.png";
import { Link, useNavigate } from 'react-router-dom';
import ApiClient from '../API/ApiClient'
const ForgetPassword = () => {
    const { postRequestApi } = ApiClient();
    const [formData, setFormData] = useState({
        email: '',
    });
    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        setErrors({
            ...errors,
            [name]: ''
          });
    };

    // Form validation
    const validateForm = () => {
        const errors = {};


        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const response = await postRequestApi(`auth/forget-password`, formData);
            if (response?.status && response.data) {
                alert(response.message);
                setFormData({
                    email: '',
                });
                // navigate("login");
            } else {
                // alert("dd");
                //   navigate("404");

            }
            // Submit the form data here (e.g., API call)
        }
    };

    return (
        <>
            <div className="container">
                <div className="form-header">
                    <div className="logo text-center"><img src={filmbazaar} alt="logo" width="100" /></div>
                    <div><img src={iffi} alt="logo" width="100" /></div>
                </div>
                <div className="col-md-12">
                    <div className="card mt-4 mb-4">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-md-7 col-sm-7 bluebg">
                                <div class="px-3">
                                        <h1 class="bluetxt">Welcome to the Film Bazaar Buyer Portal!</h1><br />
                                        <p>
                                            We're excited to have you join us in this dynamic marketplace. As a buyer, you have access to a diverse array of films and projects, all curated to meet your needs and interests.<br /><br />

                                            Explore new talent, discover unique stories, and connect with creators who are passionate about their work. Your participation is essential in fostering a thriving film community.<br /><br />

                                            Log in to start your journey. If you need assistance, our support team is ready to help!<br /><br />

                                            You can share your queries at :  <a href="mailto:info@filmbazarindia.com">info@filmbazarindia.com</a><br /><br />

                                            Happy Discovering!
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-5 col-sm-5 form-pg">
                                    <div className="px-5 pt-4 pb-4">
                                        <h2 className="mt-3 pb-4">Enter your email</h2>
                                        <form onSubmit={handleSubmit}>


                                            <div className="form-group">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Email"
                                                />
                                                {errors.email && <small className="text-danger">{errors.email}</small>}
                                            </div>


                                            <div className="form-group">
                                                <button className="btn btn-primary btn-yellow" type="submit">Submit</button>
                                            </div>
                                            <div className="form-group">
                                                <div>
                                                    <Link to={"/login"}>Login</Link>
                                                </div>
                                                <div><Link to={"/signup"}>Create new account</Link></div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid footer bg-dark">
                <div className="container">
                    <div className="text-center footer-copyright">
                        <span className="text-light">
                            <a href="#" className="text-secondary">All rights reserved. Copyright© Powered by Film Bazaar.</a>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgetPassword;
