import React, { useState } from 'react';
import iffi from "../../assets/img/iffi.png";
import filmbazaar from "../../assets/img/filmbazaar.png";
import { Link, useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../API/ApiClient'
import { Alert, IconButton, InputAdornment, Snackbar, TextField } from '@mui/material';
import Footer from '../Footer/Footer';
import AuthText from '../AuthText/AuthText';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const RecoverPassword = () => {
    const { token } = useParams();
    const { postRequestApi } = ApiClient();
    const [formData, setFormData] = useState({
        password: '',
        confirm_password: ''
    });
    const [errors, setErrors] = useState({});

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");

    const [showPasswordOne, setShowPasswordOne] = useState(false);
    const [showPasswordTwo, setShowPasswordTwo] = useState(false);

    const handleClickShowPasswordOne = () => setShowPasswordOne((show) => !show);
    const handleClickShowPasswordTwo = () => setShowPasswordTwo((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


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
            const response = await postRequestApi(`auth/recover/${token}`, formData);
            if (response?.status && response.message) {
                // alert("Password recovered successfully.");
                setAlertSeverity('success');
                setAlertMessage('Password recovered successfully!.');
                setAlertOpen(true);
                setFormData({
                    password: '',
                    confirm_password: ''
                });
                navigate("/login");
            } else {
                // alert("dd");
                //   navigate("404");
                setAlertSeverity('error');
                setAlertMessage('Failed to reset password. Please try again!');
                setAlertOpen(true);

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
                                <AuthText/>
                                </div>
                                <div className="col-md-5 col-sm-5 form-pg">
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
                                                 <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                   
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
                                                    placeholder="Password"
                                                />
                                                {errors.password && <small className="text-danger">{errors.password}</small>}

                                            </div>
                                            <div className="form-group">
                                                <label>Confirm Password</label>
                                                {/* <input
                                                    type="password"
                                                    name="confirm_password"
                                                    value={formData.confirm_password}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Confirm Password"
                                                /> */}
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPasswordTwo}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                    edge="end"
                                                                >
                                                                    {showPasswordTwo ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                        // style: { border: '1px solid black', borderRadius: '5px' },
                                                    }}
                                                    type={showPasswordTwo ? "text" : "password"}
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
            {/* <div className="container-fluid footer bg-dark">
                <div className="container">
                    <div className="text-center footer-copyright">
                        <span className="text-light">
                            <a href="#" className="text-secondary">All rights reserved. Copyright© Powered by Film Bazaar.</a>
                        </span>
                    </div>
                </div>
            </div> */}

            <Footer/>
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

export default RecoverPassword;
