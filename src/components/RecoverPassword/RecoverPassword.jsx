import React, { useState } from 'react';
import iffi from "../../assets/img/iffi.png";
import filmbazaar from "../../assets/img/filmbazaar.png";
import { Link, useNavigate } from 'react-router-dom';
import ApiClient from '../API/ApiClient'
const RecoverPassword = () => {
    const { postRequestApi } = ApiClient();
    const [formData, setFormData] = useState({
        password: '',
        confirm_password: ''
    });
    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        setErrors((prevErrors) => {
            if (value.trim() === "") {
              return { ...prevErrors, [name]: `${name.replace('_', ' ')} is required` };
            } else {
              const { [name]: removedError, ...restErrors } = prevErrors;
              return restErrors;
            }
          });

          setErrors((prevErrors) => {
            if (value.trim() === "") {
              return { ...prevErrors, [name]: `${name.replace('_', ' ')} is required` };
            } else {
              const { [name]: removedError, ...restErrors } = prevErrors;
              return restErrors;
            }
          });
    };

    // Form validation
    const validateForm = () => {
        const errors = {};
        if (!formData.password) errors.password = "Password is required";
        if (!formData.confirm_password) errors.confirm_password = "Confirm Password is required";
        if (formData.password !== formData.confirm_password) {
            errors.confirm_password = "Passwords do not match";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const response = await postRequestApi(`auth/register`, formData);
            if (response?.status && response.data) {
                alert("Password recovered successfully.");
                setFormData({
                    password: '',
                    confirm_password: ''
                });
                navigate("/login");
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
                                <div className="col-md-6 col-sm-6 bluebg">
                                <div class="px-3">
                                        <h1 class="bluetxt"> Welcome to the Film Bazaar Seller Portal!</h1><br/>
                                        <p>
                                            We're thrilled to have you here. This platform is designed to connect talented filmmakers and sellers like you with the vibrant film community.<br/><br/>

                                            As a seller, you have the opportunity to showcase your projects, network with industry professionals, and discover exciting collaborations. Your contributions are vital to the growth and diversity of our film ecosystem.<br/><br/>

                                            Get started by logging in below. If you have any questions, our support team is here to help!<br/><br/>
                                            
                                            You can share your queries at : info@filmbazarindia.com<br/><br/>

                                            Happy Selling!
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 form-pg">
                                    <div className="px-5 pt-4 pb-4">
                                        <h2 className="mt-3 pb-4">Recover your password</h2>
                                        <form onSubmit={handleSubmit}>

                                           
                                           
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Password"
                                                />
                                                {errors.password && <small className="text-danger">{errors.password}</small>}
                                              
                                            </div>
                                            <div className="form-group">
                                                <label>Confirm Password</label>
                                                <input
                                                    type="password"
                                                    name="confirm_password"
                                                    value={formData.confirm_password}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Confirm Password"
                                                />
                                                {errors.confirm_password && <small className="text-danger">{errors.confirm_password}</small>}
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

export default RecoverPassword;
