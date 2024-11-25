import React, { useEffect, useState } from 'react';
import iffi from "../../assets/img/iffi.png";
import filmbazaar from "../../assets/img/filmbazaar.png";
import { Link, useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../API/ApiClient'
import { Alert, IconButton, InputAdornment, Snackbar, TextField } from '@mui/material';
import Footer from '../Footer/Footer';
import AuthText from '../AuthText/AuthText';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const VerifyUser = () => {
    const { postRequestApi, postRequestApiWithoutLogin } = ApiClient();
    const { token } = useParams();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");


    const [datacheck, setDatacheck] = useState(null);
    const preloading = async () => {
        const data = await postRequestApiWithoutLogin(`auth/activate-account/${token}`, {});
        if (data.status) {
            setDatacheck(data.data);
        }

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
                                        {datacheck === 1 && (
                                            <h2 className="mt-3 pb-4">
                                                Your account activated successfully.
                                            </h2>
                                        )}

                                        {datacheck != 1 && (
                                            <h2 className="mt-3 pb-4">
                                                Invalid token or token expired.
                                            </h2>
                                        )}
                                        <div className="form-group">
                                            <div>
                                                <Link to={"/login"}>Login</Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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

export default VerifyUser;
