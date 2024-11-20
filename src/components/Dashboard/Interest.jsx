import React, { useEffect, useState } from 'react';
import filmbazaar from "../../assets/img/filmbazaar.png";
import defaultimg from "../../assets/img/default.jpg";
import Header from '../Header';
import Footer from '../Footer/Footer';
import ApiClient from '../API/ApiClient';
import { Link } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';

const Interest = () => {
    const [data, setData] = useState([])
    const [filmtype, setFilmtype] = useState([]);
    const [language, setlanguage] = useState([]);
    const [country, setCountry] = useState([]);
    const [film_status, setFilm_status] = useState({});


    const [formData, setFormData] = useState({
        title: '',
        videography_type: "",
        format_type: "",
        stage_type: "",
    });

    const [errors, setErrors] = useState({});

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");


    const [formDataDetails, setFormDataDetails] = useState([]);
    const [formatTypes, setFormatTypes] = useState([]);
    const [stageTypes, setStageTypes] = useState([]);



    const handleDropdownData = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        setErrors({
            ...errors,
            [name]: ''
        });



    };

    useEffect(() => {
        const fetchVideographyTypes = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_PREFIX}/site/videography-type`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                if (result.status) {
                    setFormDataDetails(result.data);
                } else {
                    console.error("Error: ", result.message);
                }
            } catch (error) {
                console.error("Error fetching videography types:", error);
            }
        };
        fetchVideographyTypes();
    }, []);

    useEffect(() => {

        const loadFormatTypes = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_PREFIX}/site/format-type`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                if (result.status) {
                    setFormatTypes(result.data);
                } else {
                    console.error("Error: ", result.message);
                }
            } catch (error) {
                console.error("Error fetching format types:", error);
            }
        };
        loadFormatTypes();
    }, []);

    useEffect(() => {

        const loadStageTypes = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_PREFIX}/site/stage-type`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                if (result.status) {
                    setStageTypes(result.data);
                } else {
                    console.error("Error: ", result.message);
                }
            } catch (error) {
                console.error("Error fetching stage types:", error);
            }
        };
        loadStageTypes();
    }, []);



    const validateForm = () => {
        const errors = {};
        if (!formData.title) errors.title = "Title is required";
        if (!formData.videography_type) errors.videography_type = "Type is required";
        if (!formData.format_type) errors.format_type = "Format is required";
        if (!formData.stage_type) errors.stage_type = "Stage is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };


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


    const { getRequestApi } = ApiClient();
    const [pagination, setPagination] = useState({
        totalPosts: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 10,
    });
    const [searchForm, setSearchForm] = useState({ title: '', category: '' });

    const handleSearchform = async (e) => {
        e.preventDefault();
        loadPreLoadData();
    }

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const preloading = async () => {

        let data1 = await getRequestApi('site/film-type', {});
        if (data1.status) {
            setFilmtype(data1.data);
        }
        data1 = await getRequestApi('site/language', {});
        if (data1.status) {
            setlanguage(data1.data);
        }
        data1 = await getRequestApi('site/country', {});
        if (data1.status) {
            setCountry(data1.data);
        }
    }
    useEffect(() => {
        preloading();
        loadPreLoadData();
    }, []);
    const loadPreLoadData = async (page = 1) => {
        try {
            const data = await getRequestApi('film/interested-film');
            if (data.status) {
                setData(data.data);
                setFilm_status(data.film_status);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const handlePageChange = (page) => {
        loadPreLoadData(page);
    };

    const [loadingData, setLoadingData] = useState({})

    const InterestedApply = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_PREFIX}/film/${id}/interested`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });


            if (response.ok) {
                const data = await response.json();
                loadPreLoadData();
                console.log('Response Data:', data);

            } else {
                console.error('Failed to  interest.');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    const NotInterestedApply = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_PREFIX}/film/${id}/not-interested`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });


            if (response.ok) {
                const data = await response.json();
                loadPreLoadData();
                console.log('Response Data:', data);

            } else {
                console.error('Failed to  interest.');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };



    const getVideography = (videoIds) => {
        if (!videoIds) return "";

        const Videography = formDataDetails?.find((c) => c.id === videoIds);
        return Videography ? Videography.name : "";
    };
    const getformattype = (formatIds) => {
        if (!formatIds) return "";

        const getformattypedetails = formatTypes?.find((c) => c.id === formatIds);
        return getformattypedetails ? getformattypedetails.name : "";
    };
    const getformatstagetype = (stageIds) => {
        if (!stageIds) return "";

        const stagetype = stageTypes?.find((c) => c.id === stageIds);
        return stagetype ? stagetype.name : "";
    };


    return (
        <>

            <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
                <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                        <div className="col-md-12 px-3 search-sidebar">
                            <p className="logo d-none-mobile"><img src={filmbazaar} alt="logo" /></p>
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">

                <div className=" main-content-space ">
                    <div className='pagetitle-name'><h1>My liked Project </h1>
                    </div>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className='row mt-4'>
                                {

                                    data.map((row) => {
                                        const type2Document = row.FilmDocuments.find(doc => doc.type === 3);
                                        const dataurl = process.env.REACT_APP_BASE_URL;

                                        return <div className='col-md-6 col-sm-6'>
                                            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 card position-relative">
                                                <div className="col-auto  d-lg-block">
                                                    {type2Document ?
                                                        <img src={`${dataurl}${process.env.REACT_APP_BASE_PREFIX}/file/read/${type2Document.url}`} alt={type2Document.name} style={{ width: "200px", height: "200px" }} />
                                                        :
                                                        <img src={defaultimg} alt="user" style={{ width: "200px", height: "200px" }} />
                                                    }
                                                </div>
                                                <div className="col p-4 d-flex flex-column position-static">
                                                    <h3 className="mb-0 title-heading" > {row.title}</h3>
                                                    {getVideography(row.videography_type)} | {getformattype(row.format_type)}  | {getformatstagetype(row.stage_type)}
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <div className='btn-link-card'>
                                                        <button className='btn btn-primary  w-auto'>
                                                            <Link to={`/seller-projects/${row.id}`} className="icon-link gap-1 icon-link-hover stretched-link" style={{ color: "#fff" }}>
                                                                View Details
                                                            </Link>
                                                        </button>


                                                        {film_status?.[row.id] ? (
                                                            film_status[row.id] === 1 ? (
                                                                <button
                                                                    className="btn btn-warning make-above-link w-auto"
                                                                    onClick={() => NotInterestedApply(row.id)}
                                                                    style={{ cursor: 'pointer' }}
                                                                >
                                                                    Pending
                                                                </button>
                                                            ) : film_status[row.id] === 2 ? (
                                                                <span
                                                                    className="seller-decline"
                                                                    //    onClick={() => NotInterestedApply(row.id)}
                                                                    style={{ color: 'red' }}
                                                                >
                                                                    Decline
                                                                </span>
                                                            ) : film_status[row.id] === 3 ? (
                                                                <span

                                                                    className="seller-approved"
                                                                    //    onClick={() => NotInterestedApply(row.id)}
                                                                    style={{ color: 'green' }}
                                                                >
                                                                    Approved
                                                                </span>
                                                            ) : null
                                                        ) : (
                                                            <button
                                                                className="btn btn-info make-above-link w-auto"
                                                                onClick={() => InterestedApply(row.id)}
                                                                style={{ cursor: 'pointer' }}
                                                            >
                                                                Show Interest
                                                            </button>
                                                        )}
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div >
            </main >
        </>
    )
}

export default Interest