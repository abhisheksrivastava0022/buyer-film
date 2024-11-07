import React, { useEffect, useState } from 'react';
import iffi from "../../assets/img/iffi.png";
import filmbazaar from "../../assets/img/filmbazaar.png";
import { Link, useNavigate } from 'react-router-dom';
import ApiClient from '../API/ApiClient'
import { Alert, IconButton, InputAdornment, Snackbar, TextField } from '@mui/material';
import Footer from '../Footer/Footer';
import AuthText from '../AuthText/AuthText';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
    const { postRequestApi, userLoginCheck } = ApiClient();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      

    });
    const [emailError, setEmailError] = useState('');

    const [showPasswordOne, setShowPasswordOne] = useState(false);

    const handleClickShowPasswordOne = () => setShowPasswordOne((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");

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

    const handleEmailVerify = async (value) => {

        let flag = true;


        let emailErrorMsg = '';
        if (!value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
            flag = false;
            emailErrorMsg = 'Invalid email format';
        } else {
            try {
                const payload = { email: value };

                const response = await postRequestApi("auth/validate-email", payload);
                if (response.data === 0) {
                    flag = false;
                    emailErrorMsg = 'Email ID does not exist';
                }
            } catch (error) {
                console.error('Error verifying email:', error);
            }
        }
        setEmailError(emailErrorMsg);
        // console.log({flag});

        return flag
    }


    const handleChange = async (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        if (name === 'email') {
            await handleEmailVerify(value);
        }

        setErrors({
            ...errors,
            [name]: ''
        });
    };
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validate()) {
            setIsSubmitting(true);
            const emailErrorMsg = await handleEmailVerify(formData.email);
            // console.log({ emailErrorMsg });
            if (!emailErrorMsg) {
                return;
            }
            const response = await postRequestApi(`auth/login`, formData);
            if (response?.status) {
                // alert("login successfully.");
                setAlertSeverity('success');
                setAlertMessage('Login successfully!.');
                setAlertOpen(true);
                setFormData({ email: '', password: '' });
                navigate("/");
            } else {
                setAlertSeverity('error');
                setAlertMessage(response.message);
                setAlertOpen(true);
            }
            // Reset form and submission status after success
            setIsSubmitting(false);
        } else {
            console.log('Validation failed:', errors);
            setAlertSeverity('error');
            setAlertMessage('Failed to login. Please try again!');
            setAlertOpen(true);
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
                                <div className="col-md-7 col-sm-7 bluebg">
                                    <AuthText />
                                </div>
                                <div className="col-md-5 col-sm-5 form-pg">
                                    <div className="px-5 pt-4 pb-4">
                                        <h2 className="mt-3 pb-4">Login to your account</h2>
                                        <form onSubmit={handleSubmit} noValidate>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                {/* <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Enter Email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                /> */}
                                                 <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    type='email'
                                                    placeholder='Enter Email'
                                                    className="form-control"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                                {errors.email && <p className="text-danger">{errors.email}</p>}
                                                {emailError && <p className="error text-danger">{emailError}</p>}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                {/* <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    className="form-control"
                                                    placeholder="*******"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                /> */}
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    placeholder='*************'
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPasswordOne}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                    edge="end"
                                                                >
                                                                    {showPasswordOne ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                        // style: { border: '1px solid black', borderRadius: '5px' },
                                                    }}


                                                    type={showPasswordOne ? "text" : "password"}
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="form-control"
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
                                                    <Link to="/forget-password">Forgot your password?</Link>
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
            {/* <footer className="container-fluid bg-dark">
                <div className="container">
                    <div className="text-center footer-copyright">
                        <span className="text-light">
                            All rights reserved, Copyright © Powered by Film Bazaar.
                        </span>
                    </div>
                </div>
            </footer> */}
            <Footer />
            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert severity={alertSeverity} variant="filled">
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Login;
