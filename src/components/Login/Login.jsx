import React, { useEffect, useState } from 'react';
import iffi from "../../assets/img/iffi.png";
import filmbazaar from "../../assets/img/filmbazaar.png";
import { Link, useNavigate } from 'react-router-dom';
import ApiClient from '../API/ApiClient'
const Login = () => {
    const { postRequestApi, userLoginCheck } = ApiClient();
    const [formData, setFormData] = useState({
        email: '',
        password: '',

    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            const response = await postRequestApi(`auth/login`, formData);
            if (response?.status) {
                alert("login successfully.");
                setFormData({ email: '', password: '' });
                navigate("/");
            }

            // Reset form and submission status after success

            setIsSubmitting(false);
        } else {
            console.log('Validation failed:', errors);
        }
    };

    const preloading = async () => {
        const data = await userLoginCheck('film/buyer', {});

    }
    useEffect(() => {
        preloading();
    }, []);
    return (
        <>
            <div className="container">
                <div className="form-header text-center">
                    <img src={filmbazaar} alt="Film Bazaar Logo" width="100" className="mr-2" />
                    <img src={iffi} alt="IFFI Logo" width="100" />
                </div>
                <div className="col-md-12">
                    <div className="card mt-4 mb-4">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-md-6 col-sm-6 bluebg">
                                    <div className="px-3">
                                        <h1 className="bluetxt">Welcome to the Film Bazaar Seller Portal!</h1>
                                        <p>
                                            We're thrilled to have you here. This platform connects talented filmmakers and sellers like you with the vibrant film community.<br /><br />
                                            As a seller, you can showcase your projects, network with industry professionals, and explore exciting collaborations. Your contributions are key to the growth and diversity of our film ecosystem.<br /><br />
                                            Get started by logging in below. If you have questions, reach out to us at <a href="mailto:info@filmbazarindia.com">info@filmbazarindia.com</a>.<br /><br />
                                            Happy Selling!
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 form-pg">
                                    <div className="px-5 pt-4 pb-4">
                                        <h2 className="mt-3 pb-4">Login to your account</h2>
                                        <form onSubmit={handleSubmit} noValidate>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Enter Email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                                {errors.email && <p className="text-danger">{errors.email}</p>}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    className="form-control"
                                                    placeholder="*******"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                                {errors.password && <p className="text-danger">{errors.password}</p>}
                                            </div>

                                            <div className="form-group">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-yellow"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                                </button>
                                            </div>
                                            <div className="form-group">
                                                <div>
                                                    <Link to="/signup">Create new account</Link>
                                                </div>
                                                <div>
                                                    <Link to="/forgot-password">Forgot your password?</Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="container-fluid bg-dark">
                <div className="container">
                    <div className="text-center footer-copyright">
                        <span className="text-light">
                            All rights reserved, Copyright © Powered by Film Bazaar.
                        </span>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Login;
