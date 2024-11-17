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

const SellerListing = () => {
    const [data, setData] = useState([])
    const [filmtype, setFilmtype] = useState([]);
    const [language, setlanguage] = useState([]);
    const [country, setCountry] = useState([]);


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
                const response = await fetch("https://119.82.68.149:3001/film-buyer/site/videography-type", {
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
                const response = await fetch("https://119.82.68.149:3001/film-buyer/site/format-type", {
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
                const response = await fetch("https://119.82.68.149:3001/film-buyer/site/stage-type", {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        loadPreLoadData();
        // if (validateForm()) {
        //     try {
        //         const response = await fetch(`https://119.82.68.149:3001/film-buyer/film/`, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(formData),
        //             credentials: 'include'
        //         });

        //         const data = await response.json();

        //         if (response.ok) {
        //             setAlertSeverity('success');
        //             setAlertMessage('Form submitted successfully!');
        //             setAlertOpen(true);

        //             // navigate(`/project/${data.data}`);
        //         } else {
        //             setAlertSeverity('error');
        //             setAlertMessage(data.message || 'Failed to submit form. Please try again!');
        //             setAlertOpen(true);
        //         }
        //     } catch (error) {
        //         setAlertSeverity('error');
        //         setAlertMessage('An error occurred. Please try again!');
        //         setAlertOpen(true);
        //         console.error('Error:', error);
        //     }
        // }

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
        const queryParams = new URLSearchParams({

            limit: pagination.limit,
            page: page,
            ...searchForm,
            ...formData,
        });

        try {
            const data = await getRequestApi('film', queryParams);
            if (data.status) {

                setData(data.data);
                setPagination({
                    ...pagination,
                    ...data.pagination,
                });
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
            const response = await fetch(`https://119.82.68.149:3001/film-buyer/film/${id}/interested`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });


            if (response.ok) {
                const data = await response.json();
                PageOnLoad()
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
            const response = await fetch(`https://119.82.68.149:3001/film-buyer/film/${id}/not-interested`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });


            if (response.ok) {
                const data = await response.json();
                PageOnLoad()
                console.log('Response Data:', data);

            } else {
                console.error('Failed to  interest.');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    const PageOnLoad = async () => {
        try {
            const response = await fetch(`https://119.82.68.149:3001/film-buyer/film/buyer`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });


            if (response.ok) {
                const data = await response.json();
                setLoadingData(data.data)
                console.log('Response Data:', data);

            } else {
                console.error('Failed to load data.');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    useEffect(() => {
        PageOnLoad()
    }, [])


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

                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingOne">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            Search
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">

                                            <div className="tab-content1  " >
                                                <div>
                                                    <div className='col-sm-12 col-md-12 col-lg-12 mx-auto' >
                                                        <div className="list-group">

                                                            <div className="list-group-item form-space " >


                                                                <div className="row border-0 mt-4 mb-4">

                                                                    <Grid container spacing={2}>

                                                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                                            <form>
                                                                                <div className="form-group">

                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        fullWidth
                                                                                        type='text'

                                                                                        label="search title"
                                                                                        className="form-control"
                                                                                        name="title"
                                                                                        value={formData.title}
                                                                                        onChange={handleChange}
                                                                                    />


                                                                                </div>


                                                                            </form>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                                                            <FormControl fullWidth>
                                                                                <InputLabel id="videography-label">Select type </InputLabel>
                                                                                <Select
                                                                                    labelId="videography-label"
                                                                                    name="videography_type"
                                                                                    value={formData.videography_type}
                                                                                    onChange={handleDropdownData}
                                                                                    label="Select videography"
                                                                                    renderValue={(selected) => {
                                                                                        const selectedVideography = formDataDetails.find((videography) => videography.id === selected);
                                                                                        return selectedVideography ? selectedVideography.name : '';
                                                                                    }}
                                                                                >
                                                                                    {formDataDetails.map((type) => (
                                                                                        <MenuItem key={type.id} value={type.id}>
                                                                                            {type.name}
                                                                                        </MenuItem>
                                                                                    ))}
                                                                                </Select>

                                                                            </FormControl>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                                                            <FormControl fullWidth>
                                                                                <InputLabel id="format-types">Select format </InputLabel>
                                                                                <Select
                                                                                    labelId="format-types"
                                                                                    name="format_type"
                                                                                    value={formData.format_type}
                                                                                    onChange={handleDropdownData}
                                                                                    label="Select format types"
                                                                                    renderValue={(selected) => {
                                                                                        const selectedFormat = formatTypes.find((formatTypes) => formatTypes.id === selected);
                                                                                        return selectedFormat ? selectedFormat.name : '';
                                                                                    }}
                                                                                >
                                                                                    {formatTypes.map((formatTypes) => (
                                                                                        <MenuItem key={formatTypes.id} value={formatTypes.id}>
                                                                                            {formatTypes.name}
                                                                                        </MenuItem>
                                                                                    ))}
                                                                                </Select>

                                                                            </FormControl>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                                                            <FormControl fullWidth>
                                                                                <InputLabel id="stage-types">Select stage </InputLabel>
                                                                                <Select
                                                                                    labelId="stage-types"
                                                                                    name="stage_type"
                                                                                    value={formData.stage_type || ''}
                                                                                    onChange={handleDropdownData}
                                                                                    label="Select stage types"
                                                                                    renderValue={(selected) => {
                                                                                        const selectedStage = stageTypes.find((stagetype) => stagetype.id === selected);
                                                                                        return selectedStage ? selectedStage.name : 'Select stage types';
                                                                                    }}
                                                                                >
                                                                                    {stageTypes.map((stagetype) => (
                                                                                        <MenuItem key={stagetype.id} value={stagetype.id}>
                                                                                            {stagetype.name}
                                                                                        </MenuItem>
                                                                                    ))}
                                                                                </Select>

                                                                            </FormControl>


                                                                        </Grid>
                                                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                                            <div style={{ display: "flex", justifyContent: "end", marginTop: "5px" }}>
                                                                                <button className="btn btn-primary btn-yellow" onClick={handleSubmit}>Search</button>
                                                                            </div>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>




                            <div className='row mt-4'>
                                {

                                    data.map((row) => {
                                        const type2Document = row.FilmDocuments.find(doc => doc.type === 3);
                                        console.log(type2Document, "data");
                                        const dataurl = process.env.REACT_APP_BASE_URL;
                                        console.log({ dataurl });
                                        return <div className='col-md-6 col-sm-6'>
                                            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 card position-relative">
                                                <div className="col-auto  d-lg-block">
                                                    {type2Document ?
                                                        <img src={`${dataurl}/film-buyer/file/read/${type2Document.url}`} alt={type2Document.name} style={{ width: "200px", height: "200px" }} />
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


                                                        {loadingData?.film_interest?.[row.id] ?
                                                            <>
                                                                <button className='btn btn-danger make-above-link w-auto' onClick={() => NotInterestedApply(row.id)} style={{
                                                                    cursor: 'pointer',

                                                                }}>Not Interested</button>

                                                            </>
                                                            :
                                                            <>
                                                                <button className='btn btn-yellow make-above-link  w-auto' onClick={() => InterestedApply(row.id)} style={{
                                                                    cursor: 'pointer',

                                                                }}>Show interest</button>
                                                            </>

                                                        }
                                                    </div>
                                                    {/* <div className='star'>
                                            <button className='btn btn-primary'>
                                                <Link to={`/seller-projects/${row.id}`} className="icon-link gap-1 icon-link-hover stretched-link" style={{ color: "#fff" }}>
                                                    View Details
                                                </Link>
                                            </button>


                                            {loadingData?.film_interest?.[row.id] ?
                                                <>
                                                    <button className='btn btn-danger make-above-link' onClick={() => NotInterestedApply(row.id)} style={{
                                                        cursor: 'pointer',

                                                    }}>Not Interested</button>

                                                </>
                                                :
                                                <>
                                                    <button className='btn btn-yellow make-above-link' onClick={() => InterestedApply(row.id)} style={{
                                                        cursor: 'pointer',

                                                    }}>Show interest</button>
                                                </>
                                            }
                                        </div> */}
                                                    {/* <Link to={`/film/${row.id}`} className="icon-link gap-1 icon-link-hover stretched-link">
                                                Continue reading
                                            </Link> */}
                                                </div>


                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <nav aria-label="...">
                        <div class="col-md-12 mt-4">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    {pagination.currentPage > 1 && (
                                        <li class="page-item">
                                            <button
                                                class="page-link"
                                                onClick={() =>
                                                    handlePageChange(pagination.currentPage - 1)
                                                }
                                            >
                                                Previous
                                            </button>
                                        </li>
                                    )}
                                    {[...Array(pagination.totalPages)].map((_, index) => (
                                        <li
                                            class={`page-item ${pagination.currentPage === index + 1 ? "active" : ""
                                                }`}
                                            key={index}
                                        >
                                            <button
                                                class="page-link"
                                                onClick={() => handlePageChange(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                    {pagination.currentPage < pagination.totalPages && (
                                        <li class="page-item">
                                            <button
                                                class="page-link"
                                                onClick={() =>
                                                    handlePageChange(pagination.currentPage + 1)
                                                }
                                            >
                                                Next
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </nav>
                </div >
            </main >
        </>
    )
}

export default SellerListing