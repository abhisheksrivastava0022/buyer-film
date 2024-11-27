import React, { useEffect, useState } from 'react'
import ApiClient from '../API/ApiClient';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import Loader from '../Loader/Loader';


const Sidebar = () => {
    const { getRequestApi, userInfo } = ApiClient();
    const location = useLocation();
    const [data, setData] = useState({})
    const navigate = useNavigate();
    const isActive = (path) => location.pathname === path;
    const isDropdownActive = (paths) => paths.some((path) => location.pathname.startsWith(path));

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");

    const [loading, setLoading] = useState(false);

    // const logoutHander = async (e) => {
    //     e.preventDefault();
    //     const data = await getRequestApi('auth/logout', {});
    //     navigate("/login");
    // }

    const logoutHandler = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const data = await getRequestApi('auth/logout', {});

            if (data?.status) {
                setAlertSeverity('success');
                setAlertMessage('Logout successfully!');
                setAlertOpen(true);

                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                setAlertSeverity('error');
                setAlertMessage(data.message || 'Failed to logout. Please try again.');
                setAlertOpen(true);
            }
        } catch (error) {
            console.error("Error during logout:", error);
            setAlertSeverity('error');
            setAlertMessage('An error occurred. Please try again.');
            setAlertOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const preloading = async () => {
        const data = await userInfo('film/buyer', {});
        if (data?.status) {
            setData(data.data);
        }
        if (location.pathname === '/profile') {
            //alert("profile")
        } else {
            if (data?.data.status == 1) {
                navigate("/profile");
            }
        }
    }
    useEffect(() => {

        preloading();

    }, [location]);

    return (

        <>



{loading && <Loader />}

            <ul className="list-unstyled ps-0 sidebar-navigation">
                <li>
                    <button
                        className={`btn btn-toggle d-inline-flex align-items-center rounded border-0 ${isDropdownActive(['/explore-project', '/my-project']) ? '' : 'collapsed'}`}
                        data-bs-toggle="collapse"
                        data-bs-target="#dashboard-collapse1"
                        aria-expanded={isDropdownActive(['/explore-project', '/my-liked-project'])}
                    >
                        <i className="bi bi-grid"></i> Projects
                    </button>
                    <div
                        className={`collapse ${isDropdownActive(['/explore-project', '/my-liked-project']) ? 'show' : ''}`}
                        id="dashboard-collapse1"
                    >
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li>
                                <Link
                                    to="/explore-project"
                                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded ${isActive('/explore-project') ? 'active' : ''}`}
                                >
                                    Explore projects
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/my-liked-project"
                                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded ${isActive('/my-liked-project') ? 'active' : ''}`}
                                >
                                    Liked projects
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <button
                        className={`btn btn-toggle d-inline-flex align-items-center rounded border-0 ${isDropdownActive(['/buyer', '/seller']) ? '' : 'collapsed'}`}
                        data-bs-toggle="collapse"
                        data-bs-target="#dashboard-collapse2"
                        aria-expanded={isDropdownActive(['/buyer', '/seller', '/connection-build', "/interest-received"])}
                    >
                        <i className="bi bi-grid"></i> People
                    </button>
                    <div
                        className={`collapse ${isDropdownActive(['/buyer', '/seller', '/connection-build', "/interest-received"]) ? 'show' : ''}`}
                        id="dashboard-collapse2"
                    >
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li>
                                <Link
                                    to="/buyer"
                                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded ${isActive('/buyer') ? 'active' : ''}`}
                                >
                                    Buyer
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/seller"
                                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded ${isActive('/seller') ? 'active' : ''}`}
                                >
                                    Seller
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/interest-received"
                                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded ${isActive('/interest-received') ? 'active' : ''}`}
                                >
                                    Interest Received
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/connection-build"
                                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded ${isActive('/connection-build') ? 'active' : ''}`}
                                >
                                    Your Connections
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <button
                        className={`btn btn-toggle d-inline-flex align-items-center rounded border-0 ${isDropdownActive(['/edit-personal-information']) ? '' : 'collapsed'}`}
                        data-bs-toggle="collapse"
                        data-bs-target="#dashboard-collapse3"
                        aria-expanded={isDropdownActive(['/profile'])}
                    >
                        <i className="bi bi-grid"></i> Settings
                    </button>
                    <div
                        className={`collapse ${isDropdownActive(['/profile']) ? 'show' : ''}`}
                        id="dashboard-collapse3"
                    >
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li>
                                <Link
                                    to="/profile"
                                    className={`link-body-emphasis d-inline-flex text-decoration-none rounded ${isActive('/profile') ? 'active' : ''}`}
                                >
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li><Link href="#" onClick={logoutHandler}> <i className="bi bi-box-arrow-left"></i> Sign out</Link></li>

            </ul>

            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert severity={alertSeverity} variant="filled">
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>


    )
}

export default Sidebar